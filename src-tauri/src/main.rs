// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod db;
mod meme;

use std::vec;

use db::Database;
use meme::Meme;
use tauri::Manager;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// #[tauri::command]
// fn search(db: tauri::State<Database>, query: &str) -> Vec<meme::Meme> {
//     println!("{}\n\n\n\n", query);
//     db.search_memes(query, None, None)
//         .expect("Failed to search memes")
// }

#[tauri::command]
fn search(query: &str, db: tauri::State<Database>) -> Vec<meme::Meme> {
    println!("{}\n\n\n\n", query);
    db.search_memes("meme".into(), None, None)
        .expect("Failed to search");
    vec![Meme::new(
        "Meme".into(),
        "url".into(),
        "desc".into(),
        vec!["tag".to_string()],
    )]
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, search]) // Your custom handler
        .setup(|app| {
            let app_dir = app.path_resolver().app_local_data_dir();
            let db = Database::init(
                format!("{}/db.sqlite", app_dir.unwrap().to_str().unwrap()).as_str(),
            );
            // db.insert_meme(&Meme::new(
            //     String::from("meme1"),
            //     "url1".to_string(),
            //     "desc1".to_string(),
            //     vec!["tag1".to_string(), "tag2".to_string()],
            // ))?;
            // db.delete_meme("meme1")?;
            // let m = db.search_memes("meme", None, None);
            // println!("{:?}", m);

            app.manage(db);

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
