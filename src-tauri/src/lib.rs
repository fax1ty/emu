use std::env;

use tauri::Manager;
use tauri_plugin_positioner::{Position, WindowExt};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn get_android_home() -> Result<String, String> {
    let v = env::var("ANDROID_HOME").map_err(|err| err.to_string())?;
    Ok(v)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![get_android_home])
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();
            let _ = window.as_ref().window().move_window(Position::Center);

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
