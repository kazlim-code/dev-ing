//// This is the main module for the dev_ing application.
//// It's a single-page application (SPA) built with Lustre.
////
//// The application has the following features:
//// - Routing with the `modem` library.
//// - A dark mode theme toggle.
//// - A simple layout with a header, side menu, and footer.

// IMPORTS ---------------------------------------------------------------------

import gleam/uri
import lib/button
import lib/theme
import lustre
import lustre/attribute.{type Attribute}
import lustre/effect.{type Effect}
import lustre/element.{type Element, text}
import lustre/element/html
import lustre/event
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

/// The page content for a page that is under construction.
///
fn under_construction_content(page_name: String) -> Element(Msg) {
  main_content([], [
    html.div(
      [
        attribute.class(
          "flex flex-col items-center justify-center gap-4 text-center w-full",
        ),
      ],
      [
        html.h1([attribute.class("font-semibold text-2xl dark:text-white")], [
          text(page_name),
        ]),
        html.img([
          attribute.src("https://i.giphy.com/media/aEZgmm8e0I31S/giphy.gif"),
          attribute.alt("Under Construction"),
          attribute.class("w-1/2 mx-auto mt-8 clip-cool"),
        ]),
        html.div([attribute.class("grid gap-1 mt-2 max-w-lg")], [
          html.p([attribute.class("dark:text-white")], [
            text("🚧 This page is under construction 👷‍♂️"),
          ]),
          html.p([attribute.class("dark:text-white mt-2")], [
            text("Our developers are currently powered by coffee and dreams."),
          ]),
          html.p([attribute.class("dark:text-white mt-2")], [
            text("Please check back later for updates."),
          ]),
        ]),
      ],
    ),
  ])
}

/// The page content for the home page (Home route: "/").
///
fn home_content() -> Element(Msg) {
  under_construction_content("Home")
}

/// The page content for the blog page (Blog route: "/blog").
///
fn blog_content() -> Element(Msg) {
  under_construction_content("Blog")
}

/// The page content for the about page (About route: "/about").
///
fn about_content() -> Element(Msg) {
  under_construction_content("About")
}

/// The page content representing the 404 Not Found route.
///
fn not_found_content() -> Element(Msg) {
  main_content([], [
    html.h1([attribute.class("font-semibold text-2xl dark:text-white")], [
      text("Not Found"),
    ]),
  ])
}

/// The main header for the site/application that stays fixed to the top of the page.
/// TODO: Should responsively move to the bottom of the page for mobile.
///
fn header() -> Element(Msg) {
  html.header(
    [
      attribute.class(
        "fixed left-0 right-0 top-0 px-4 py-4 flex align-center gap-6 dark:text-white bg-surface-100/75 dark:bg-surface-900/75 backdrop-blur-sm",
      ),
    ],
    [
      html.a(
        [
          attribute.href(routes.base_path() <> "/"),
          attribute.class("font-bold text-xl whitespace-nowrap"),
        ],
        [text("Dev-Ing")],
      ),
      html.div(
        [
          attribute.class(
            "w-full max-w-5xl mx-auto flex items-center justify-between",
          ),
        ],
        [
          html.div([attribute.class("flex items-center gap-4")], [
            html.ul([attribute.class("flex flex-row gap-4")], [
              html.li([], [
                html.a([attribute.href(routes.base_path() <> "/blog")], [
                  text("Blog"),
                ]),
              ]),
              html.li([], [
                html.a([attribute.href(routes.base_path() <> "/about")], [
                  text("About"),
                ]),
              ]),
            ]),
          ]),
          button.theme_toggle(
            [
              event.on_click(UserToggledColorScheme),
            ],
            [],
          ),
        ],
      ),
    ],
  )
}

/// The default main content container for the application.
///
fn main_content(attributes: List(Attribute(msg)), children: List(Element(msg))) {
  html.main([attribute.class("flex-1 p-4")], [
    html.div(
      [attribute.class("w-full max-w-5xl mx-auto"), ..attributes],
      children,
    ),
  ])
}

/// The footer for the application.
///
fn footer() {
  html.footer(
    [
      attribute.class(
        "px-4 py-4 grid dark:border-on-surface-500 dark:text-white",
      ),
    ],
    [
      html.div(
        [attribute.class("w-full max-w-5xl mx-auto flex justify-center")],
        [html.p([], [text("© 2025 Dev-Ing. All rights reserved.")])],
      ),
    ],
  )
}
