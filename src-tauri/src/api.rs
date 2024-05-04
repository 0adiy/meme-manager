use crate::db::Database;
use crate::meme::Meme;

#[tauri::command]
pub fn search(query: &str, db: tauri::State<Database>) -> Vec<Meme> {
    // println!("{}\n\n\n\n", query);
    db.search_memes(query, None, None)
        .expect("Failed to search")
}

#[tauri::command]
pub fn get_memes(db: tauri::State<Database>) -> Result<Vec<Meme>, String> {
    let memes = db.get_memes(None, None).unwrap();
    Ok(memes)
}

#[tauri::command]
pub fn insert_meme(meme: Meme, db: tauri::State<Database>) -> Result<(), String> {
    // validation
    db.insert_meme(&meme).unwrap();
    println!("inserted meme {:?}", meme);
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
