use std::process::Command;

pub fn run_ocr_internal(image_path: &str) -> Result<String, String> {
    let output = Command::new("ocrs")
        .arg(image_path)
        .output()
        .map_err(|e| format!("Failed to run ocrs: {}", e))?;

    //keep everything as is (dont filter)
    let stdout = String::from_utf8_lossy(&output.stdout).to_string();
    let stderr = String::from_utf8_lossy(&output.stderr);

    // only log if model couldn't be downloaded
    if stderr.contains("Failed to load text detection model")
        || stderr.contains("Failed to load text recognition model")
        || stderr.contains("No such host")
        || stderr.contains("os error 11001")
    {
        eprintln!("Warning: OCR model could not be downloaded");
        return Ok(String::new());
    }

    Ok(stdout)
}

#[tauri::command]
pub fn run_ocr(image_path: &str) -> Result<String, String> {
    run_ocr_internal(image_path)
}