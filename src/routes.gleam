//// This module defines the routes for the application and provides
//// functions for parsing the URL and determining the current route.
////

import envoy
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

const dev_ing_base_url = "/dev-ing"

/// Returns the initial route of the application based on the current URL.
/// Useful for Lustres init() function.
///
pub fn init_route() -> Route {
  case modem.initial_uri() {
    Ok(uri) -> on_url_change(uri)
    Error(_) -> Home
  }
}

/// Gets the base path for the url based on the environment.
///
pub fn base_path() -> String {
  case envoy.get("GLEAM_ENV") {
    Ok("production") -> {
      echo "base_path: production"
      dev_ing_base_url
    }
    Ok(env) -> {
      echo "base_path: env"
      echo env
      ""
    }
    _ -> {
      echo "base_path: no env"
      ""
    }
  }
}

/// Takes a `Uri` and returns the corresponding page `Route`.
///
pub fn on_url_change(uri: Uri) -> Route {
  echo "uri"
  echo uri
  echo "uri.host"
  echo uri.host
  echo "uri.path"
  echo uri.path
  case uri.path_segments(uri.path) {
    ["blog"] | ["dev-ing", "blog"] -> Blog
    ["about"] | ["dev-ing", "about"] -> About
    [] | ["dev-ing"] -> Home
    _ -> NotFound
  }
}
