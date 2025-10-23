import modem
import gleam/uri.{type Uri}

pub type Route {
  Home
  Blog
  About
  NotFound
}

pub fn init_route() -> Route {
  case modem.initial_uri() {
    Ok(uri) -> on_url_change(uri)
    Error(_) -> Home
  }
}

pub fn on_url_change(uri: Uri) -> Route {
  case uri.path_segments(uri.path) {
    ["blog"] -> Blog
    ["about"] -> About
    [] -> Home
    _ -> NotFound
  }
}
