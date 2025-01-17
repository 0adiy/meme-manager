use crate::db::Database;
use crate::meme::Meme;

#[tauri::command]
pub fn search(
    query: &str,
    limit: Option<i64>,
    offset: Option<i64>,
    media_type: Option<String>,
    date_form: Option<String>,
    date_to: Option<String>,
    order_by: Option<String>,
    db: tauri::State<Database>,
) -> Result<Vec<Meme>, String> {
    // println!("{}\n\n\n\n", query);
    let query = query.trim();
    if query.is_empty() {
        match db.get_memes(None, None) {
            Ok(memes) => return Ok(memes),
            Err(e) => return Err(e.to_string()),
        };
    }
    match db.search_memes(
        query, limit, offset, media_type, date_form, date_to, order_by,
    ) {
        Ok(memes) => return Ok(memes),
        Err(e) => return Err(e.to_string()),
    }
}

#[tauri::command]
pub fn get_meme(id: &str, db: tauri::State<Database>) -> Result<Meme, String> {
    println!("get_meme: {}", id);
    db.get_meme(id)
        .map_err(|_| "Failed to get meme".to_string())
}

#[tauri::command]
pub fn get_memes(
    db: tauri::State<Database>,
    limit: Option<i64>,
    offset: Option<i64>,
) -> Result<Vec<Meme>, String> {
    let memes = db.get_memes(limit, offset).unwrap();
    // printing
    print!("memes: ");
    for row in &memes {
        print!("{:?},", row.name);
    }
    println!();
    Ok(memes)
}

#[tauri::command]
pub fn insert_meme(mut meme: Meme, db: tauri::State<Database>) -> Result<(), String> {
    // validation
    for tag in &mut meme.tags {
        *tag = tag.trim().to_string();
    }
    db.insert_meme(&meme).unwrap();
    println!("inserted meme {:?}", meme.local_path);
    Ok(())
}

#[tauri::command]
pub fn delete_meme(id: &str, db: tauri::State<Database>) -> Result<(), String> {
    db.delete_meme(id).unwrap();
    println!("deleted meme {:?}", id);
    Ok(())
}

#[tauri::command]
pub fn update_meme(meme: Meme, db: tauri::State<Database>) -> Result<(), String> {
    println!("update_meme: {:?}", meme);
    db.update_meme(&meme).unwrap();
    println!("updated meme {:?}", meme);
    Ok(())
}

#[tauri::command]
pub fn clear_memes(db: tauri::State<Database>) -> Result<(), String> {
    db.clear_memes().unwrap();
    Ok(())
}

#[tauri::command]
pub fn count_memes(db: tauri::State<Database>) -> Result<usize, String> {
    match db.count_memes() {
        Ok(count) => Ok(count),
        Err(e) => Err(e.to_string()),
    }
}

// code from https://github.com/tauri-apps/plugins-workspace/issues/999#issuecomment-1965624515
#[cfg(target_os = "linux")]
use fork::{daemon, Fork};
use std::process::Command;
#[cfg(target_os = "linux")]
use std::{fs::metadata, path::PathBuf}; // dep: fork = "0.1"

#[tauri::command]
pub fn show_in_folder(path: String) {
    #[cfg(target_os = "windows")]
    {
        Command::new("explorer")
            .args(["/select,", &path]) // The comma after select is not a typo
            .spawn()
            .unwrap();
    }

    #[cfg(target_os = "linux")]
    {
        if path.contains(",") {
            // see https://gitlab.freedesktop.org/dbus/dbus/-/issues/76
            let new_path = match metadata(&path).unwrap().is_dir() {
                true => path,
                false => {
                    let mut path2 = PathBuf::from(path);
                    path2.pop();
                    path2.into_os_string().into_string().unwrap()
                }
            };
            Command::new("xdg-open").arg(&new_path).spawn().unwrap();
        } else {
            if let Ok(Fork::Child) = daemon(false, false) {
                Command::new("dbus-send")
                    .args([
                        "--session",
                        "--dest=org.freedesktop.FileManager1",
                        "--type=method_call",
                        "/org/freedesktop/FileManager1",
                        "org.freedesktop.FileManager1.ShowItems",
                        format!("array:string:\"file://{path}\"").as_str(),
                        "string:\"\"",
                    ])
                    .spawn()
                    .unwrap();
            }
        }
    }

    #[cfg(target_os = "macos")]
    {
        Command::new("open").args(["-R", &path]).spawn().unwrap();
    }
}
