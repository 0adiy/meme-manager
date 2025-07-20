use std::process::Command;
use std::path::PathBuf;
use tauri::{AppHandle};

#[tauri::command]
pub fn extract_text_from_image(app: AppHandle, path: String) -> Result<String, String> {
    println!("OCR function called with path: {}", path);
    
    // try bundled resource (windows only), then fall back to development path
    let tess_path = app
        .path_resolver()
        .resolve_resource("tesseract/tesseract.exe")
        .filter(|p| p.exists())
        .or_else(|| {
            let dev_path = PathBuf::from("../resources/tesseract/tesseract.exe");
            if dev_path.exists() { Some(dev_path) } else { None }
        })
        .ok_or("Failed to find Tesseract executable")?;

    //this is nice
    println!("Using tesseract at: {:?}", tess_path);

    let output_txt = std::env::temp_dir().join("ocr_output");

    let status = Command::new(tess_path)
        .arg(&path)
        .arg(output_txt.to_str().unwrap())
        .arg("-l")
        .arg("eng")
        .output()
        .map_err(|e| format!("Failed to run Tesseract: {}", e))?;

    if !status.status.success() {
        return Err(format!(
            "Tesseract error: {}",
            String::from_utf8_lossy(&status.stderr)
        ));
    }

    let txt_path = output_txt.with_extension("txt");
    let text = std::fs::read_to_string(&txt_path)
        .map_err(|e| format!("Failed to read output file: {}", e))?;

    println!("OCR text extracted: '{}'", text);

    // yeet the temporary file
    let _ = std::fs::remove_file(&txt_path);

    let result = text.trim().to_string();
    println!("Returning OCR result: '{}'", result);
    Ok(result)
}