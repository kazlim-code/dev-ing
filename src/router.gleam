//// This module defines the routes for the application and provides
//// functions for parsing the URL and determining the current route.
////

import gleam/option.{Some}
import gleam/uri.{type Uri}
import internal/routes.{type Route}

import modem

/// Returns the initial route of the application based on the current URL.
/// Useful for Lustres init() function.
///
pub fn init_route() -> routes.Route {
  case modem.initial_uri() {
    Ok(uri) -> on_url_change(uri)
    Error(_) -> routes.Home
  }
}

/// Gets the base path for the url based on whether the uri host is
/// `localhost`. Production paths being hosted on GitHub Pages requires the
/// base url.
///
pub fn base_path() -> String {
  let uri = modem.initial_uri()
  case uri {
    Ok(uri) -> {
      case uri.host {
        Some("localhost") -> ""
        _ -> routes.dev_ing_base_url
      }
    }
    Error(_) -> ""
  }
}

/// Takes a `Uri` and returns the corresponding page `Route`.
///
pub fn on_url_change(uri: Uri) -> Route {
  case uri.host {
    Some("localhost") -> on_local_url_change(uri.path)
    _ -> on_production_url_change(uri.path)
  }
}

/// Returns the Route for a path for local development.
///
fn on_local_url_change(path: String) -> Route {
  case uri.path_segments(path) {
    ["blog"] -> routes.Blog
    ["about"] -> routes.About
    [] -> routes.Home
    _ -> routes.NotFound
  }
}

/// Returns the Route for a path for production environment.
///
fn on_production_url_change(path: String) -> Route {
  case uri.path_segments(path) {
    ["dev-ing", "blog"] -> routes.Blog
    ["dev-ing", "about"] -> routes.About
    ["dev-ing"] -> routes.Home
    _ -> routes.NotFound
  }
}
