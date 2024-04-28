// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

mod db;
mod meme;
use db::Database;
use meme::Meme;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet]) // Your custom handler
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
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
