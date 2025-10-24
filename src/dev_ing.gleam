//// This is the main module for the dev_ing application.
//// It's a single-page application (SPA) built with Lustre.
////
//// The application has the following features:
//// - Routing with the `modem` library.
//// - A dark mode theme toggle.
//// - A simple layout with a header, side menu, and footer.

// IMPORTS ---------------------------------------------------------------------

import gleam/uri
import lustre/attribute.{type Attribute}
import lustre/effect.{type Effect}
import lustre
import lustre/element.{type Element, text}
import lustre/element/html
import lustre/event
import lib/button
import lib/theme
import modem
import routes.{type Route}

// APPLICATION -----------------------------------------------------------------

type Model {
  Model(route: Route)
}

pub type Msg {
  UserToggledColorScheme
  RouteChanged(uri.Uri)
}

pub fn main() {
  let app = lustre.application(init:, update:, view:)
  let assert Ok(_) = lustre.start(app, "#app", Nil)
  Nil
}

fn init(_: Nil) -> #(Model, Effect(Msg)) {
  theme.initialize_color_scheme()
  let route = routes.init_route()
  let model = Model(route:)
  let effect = modem.init(RouteChanged)
  #(model, effect)
}

fn update(model: Model, msg: Msg) -> #(Model, Effect(Msg)) {
  case msg {
    UserToggledColorScheme -> {
      theme.toggle_color_scheme()
      #(model, effect.none())
    }
    RouteChanged(uri) -> {
      let route = routes.on_url_change(uri)
      #(Model(route:), effect.none())
    }
  }
}

// VIEW -----------------------------------------------------------------------

/// The main view for the application.
///
fn view(model: Model) -> Element(Msg) {
  element.fragment([
    header(),
    html.div([attribute.class("min-h-screen flex flex-col")], [
      html.div([attribute.class("flex flex-1 pt-16")], [
        side_menu(),
        case model.route {
          routes.Blog -> blog_content()
          routes.About -> about_content()
          routes.Home -> home_content()
          routes.NotFound -> not_found_content()
        },
      ]),
      footer(),
    ]),
  ])
}

/// The page content for the home page (Home route: "/").
///
fn home_content() -> Element(Msg) {
  main_content([], [
    html.h1([attribute.class("font-semibold text-2xl dark:text-white")], [text("Home")]),
  ])
}

/// The page content for the blog page (Blog route: "/blog").
///
fn blog_content() -> Element(Msg) {
  main_content([], [
    html.h1([attribute.class("font-semibold text-2xl dark:text-white")], [text("Blog")]),
  ])
}

/// The page content for the about page (About route: "/about").
///
fn about_content() -> Element(Msg) {
  main_content([], [
    html.h1([attribute.class("font-semibold text-2xl dark:text-white")], [text("About")]),
  ])
}

/// The page content representing the 404 Not Found route.
///
fn not_found_content() -> Element(Msg) {
  main_content([], [
    html.h1([attribute.class("font-semibold text-2xl dark:text-white")], [text("Not Found")]),
  ])
}

/// The main header for the site/application that stays fixed to the top of the page.
/// TODO: Should responsively move to the bottom of the page for mobile.
///
fn header() -> Element(Msg) {
  html.header([attribute.class("fixed left-0 right-0 top-0 px-4 py-4 grid border-b border-on-surface-900 dark:border-on-surface-500 dark:text-white bg-surface-100/75 dark:bg-surface-900/75 backdrop-blur-sm")], [
    html.div([attribute.class("w-full max-w-5xl mx-auto flex items-center justify-between h-200vh")], [
      html.div([attribute.class("flex items-center gap-4")], [
        html.a([attribute.href("/"), attribute.class("font-bold text-xl")], [text("Dev-Ing")]),
        html.ul([attribute.class("flex flex-row gap-2")], [
          html.li([], [html.a([attribute.href("/blog")], [text("Blog")])]),
          html.li([], [html.a([attribute.href("/about")], [text("About")])]),
        ]),
      ]),
      button.theme_toggle([
        event.on_click(UserToggledColorScheme), 
      ], []),
    ])
  ])
}

/// The default main content container for the application.
///
fn main_content(
  attributes: List(Attribute(msg)),
  children: List(Element(msg)),
) {
  html.main([attribute.class("p-4")], [
    html.div([attribute.class("w-full max-w-5xl mx-auto"), ..attributes], children),
  ])
}

/// The side menu for the application.
///
fn side_menu() {
  html.aside([attribute.class("w-64 p-4 border-r border-on-surface-900 dark:border-on-surface-500")], [
    html.h2([attribute.class("font-semibold text-lg dark:text-white")], [text("Side Menu")]),
    html.ul([attribute.class("mt-4 dark:text-white")], [
      html.li([], [html.a([attribute.href("#")], [text("Link 1")])]),
      html.li([], [html.a([attribute.href("#")], [text("Link 2")])]),
      html.li([], [html.a([attribute.href("#")], [text("Link 3")])]),
    ]),
  ])
}

/// The footer for the application.
///
fn footer() {
  html.footer(
    [attribute.class("px-4 py-4 grid border-t border-on-surface-900 dark:border-on-surface-500 dark:text-white")],
    [
      html.div(
        [attribute.class("w-full max-w-5xl mx-auto flex justify-center")],
        [html.p([], [text("© 2025 Dev-Ing. All rights reserved.")])],
      ),
    ],
  )
}
