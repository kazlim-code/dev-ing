//// This module defines the routes for the application and provides
//// functions for parsing the URL and determining the current route.
////

import gleam/option.{Some}
import gleam/uri.{type Uri}
import internal/routes.{type Route}
import modem

/// Returns the initial route and uri of the application based on the current
/// URL.
///
/// Useful for Lustres init() function.
///
pub fn init_route() -> #(routes.Route, Uri) {
  case modem.initial_uri() {
    Ok(uri) -> on_url_change(uri)
    Error(_) -> #(routes.Home, uri.empty)
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

/// Takes a `Uri` and returns it with the corresponding page `Route` as a
/// tuple.
///
pub fn on_url_change(uri: Uri) -> #(Route, Uri) {
  case uri.host {
    Some("localhost") -> on_local_url_change(uri)
    _ -> on_production_url_change(uri)
  }
}

/// Returns the Route and Uri as a tuple for a path for local development.
///
fn on_local_url_change(uri: Uri) -> #(Route, Uri) {
  case uri.path_segments(uri.path) {
    ["blog"] -> #(routes.Blog, uri)
    ["about"] -> #(routes.About, uri)
    [] -> #(routes.Home, uri)
    _ -> #(routes.NotFound, uri)
  }
}

/// Returns the Route and Uri as a tuple for a path for production environment.
///
fn on_production_url_change(uri: Uri) -> #(Route, Uri) {
  case uri.path_segments(uri.path) {
    ["dev-ing", "blog"] -> #(routes.Blog, uri)
    ["dev-ing", "about"] -> #(routes.About, uri)
    ["dev-ing"] -> #(routes.Home, uri)
    _ -> #(routes.NotFound, uri)
  }
}
