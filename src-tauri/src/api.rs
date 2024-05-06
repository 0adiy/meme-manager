use crate::db::Database;
use crate::meme::Meme;

#[tauri::command]
pub fn search(query: &str, db: tauri::State<Database>) -> Vec<Meme> {
    // println!("{}\n\n\n\n", query);
    let query = query.trim();
    if query.is_empty() {
        return db.get_memes(None, None).unwrap();
    }
    db.search_memes(query, None, None)
        .expect("Failed to search")
}

#[tauri::command]
pub fn get_meme(id: &str, db: tauri::State<Database>) -> Result<Meme, String> {
    db.get_meme(id)
        .map_err(|_| "Failed to get meme".to_string())
}

#[tauri::command]
pub fn get_memes(db: tauri::State<Database>) -> Result<Vec<Meme>, String> {
    let memes = db.get_memes(None, None).unwrap();
    // printing
    for row in &memes {
        println!("{:?}", row.name);
    }
    Ok(memes)
}

#[tauri::command]
pub fn insert_meme(mut meme: Meme, db: tauri::State<Database>) -> Result<(), String> {
    // validation
    for tag in &mut meme.tags {
        *tag = tag.trim().to_string();
    }
    db.insert_meme(&meme).unwrap();
    println!("inserted meme {:?}", meme.name);
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
    db.update_meme(&meme).unwrap();
    println!("updated meme {:?}", meme);
    Ok(())
}

#[tauri::command]
pub fn clear_memes(db: tauri::State<Database>) -> Result<(), String> {
    db.clear_memes().unwrap();
    Ok(())
}
