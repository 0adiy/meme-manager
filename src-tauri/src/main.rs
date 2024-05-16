// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod api;
mod db;
mod meme;

use std::vec;

use api::{clear_memes, delete_meme, get_meme, get_memes, insert_meme, search, update_meme, show_in_folder};
use db::Database;
use tauri::Manager;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    tauri::Builder::default()
        .setup(|app| {
            let app_dir = app.path_resolver().app_local_data_dir();
            let db = Database::init(
                format!("{}/db.sqlite", app_dir.unwrap().to_str().unwrap()).as_str(),
            );
            // db.insert_meme(&meme::Meme::new(
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
        .invoke_handler(tauri::generate_handler![
            clear_memes,
            delete_meme,
            get_meme,
            get_memes,
            insert_meme,
            search,
            update_meme,
						show_in_folder,
        ]) // Your custom handler
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
