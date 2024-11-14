use std::env;

use tauri::{
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    Manager,
};
use tauri_plugin_positioner::{Position, WindowExt};

#[tauri::command]
fn get_android_home() -> Result<String, String> {
    let v = env::var("ANDROID_HOME").map_err(|err| err.to_string())?;
    Ok(v)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|app, _, __| {
            app.get_webview_window("main")
                .expect("no main window")
                .set_focus()
                .unwrap();
        }))
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![get_android_home])
        .setup(|app| {
            #[cfg(target_os = "windows")]
            app.get_webview_window("main")
                .unwrap()
                .set_always_on_top(true)
                .unwrap();

            app.handle()
                .plugin(tauri_plugin_positioner::init())
                .unwrap();

            TrayIconBuilder::new()
                .on_tray_icon_event(|tray, event| {
                    tauri_plugin_positioner::on_tray_event(tray.app_handle(), &event);

                    #[cfg(target_os = "windows")]
                    let mut aligned = false;

                    match event {
                        TrayIconEvent::Click {
                            button: MouseButton::Left,
                            button_state: MouseButtonState::Up,
                            ..
                        } => {
                            let app = tray.app_handle();

                            if let Some(window) = app.get_webview_window("main") {
                                #[cfg(target_os = "windows")]
                                {
                                    if !aligned {
                                        window.move_window(Position::TrayLeft).unwrap();
                                        let scale = window.scale_factor().unwrap();
                                        let pos = window
                                            .inner_position()
                                            .unwrap()
                                            .to_logical::<u32>(scale);
                                        let target =
                                            tauri::LogicalPosition::new(pos.x - 30 as u32, pos.y);
                                        window.set_position(target).unwrap();

                                        aligned = true;
                                    }
                                }

                                #[cfg(target_os = "macos")]
                                {
                                    window.move_window(Position::TrayBottomCenter).unwrap();
                                }

                                window.show().unwrap();
                                window.set_focus().unwrap();
                            }
                        }
                        _ => {}
                    }
                })
                .icon(app.default_window_icon().unwrap().clone())
                .build(app)?;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
