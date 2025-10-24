//// This module defines the routes for the application and provides
//// functions for parsing the URL and determining the current route.
////

import modem
import gleam/uri.{type Uri}

/// Routes/pages of the application.
///
pub type Route {
  Home
  Blog
  About
  NotFound
}

/// Returns the initial route of the application based on the current URL.
/// Useful for Lustres init() function.
///
pub fn init_route() -> Route {
  case modem.initial_uri() {
    Ok(uri) -> on_url_change(uri)
    Error(_) -> Home
  }
}

/// Takes a `Uri` and returns the corresponding page `Route`.
///
pub fn on_url_change(uri: Uri) -> Route {
  case uri.path_segments(uri.path) {
    ["blog"] -> Blog
    ["about"] -> About
    [] -> Home
    _ -> NotFound
  }
}
