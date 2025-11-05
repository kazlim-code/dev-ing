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
import lustre/element/svg
import lustre/event
import modem
import pages/about
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
          attribute.src("/under-construction.png"),
          attribute.alt("Under Construction"),
          attribute.class("w-1/2 mx-auto mt-8 rounded-4xl max-h-80 max-w-80"),
        ]),
        html.div([attribute.class("grid gap-1 mt-2 max-w-lg")], [
          html.p([attribute.class("dark:text-white text-xl font-semibold")], [
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
  main_content([], [about.content_fragment()])
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
        "fixed left-0 right-0 top-0 px-4 py-2 flex items-center justify-between gap-6 dark:text-white bg-surface-100/75 dark:bg-surface-900/75 backdrop-blur-sm",
      ),
    ],
    [
      html.a(
        [
          attribute.href(routes.base_path() <> "/"),
          attribute.class("rounded-lg bg-surface-100/95 hover:bg-surface-100"),
        ],
        [html.img([attribute.class("h-10 w-auto"), attribute.src("/dev-ing.webp")])],
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
        ],
      ),
      html.div([attribute.class("flex items-center gap-4")], [
        html.a(
          [
            attribute.href("https://github.com/kazlim-code/dev-ing"),
            attribute.target("_blank"),
            attribute.class(
              "text-inherit hover:text-primary-200",
            ),
          ],
          [
            svg.svg(
              [
                attribute.attribute("viewBox", "0 0 24 24"),
                attribute.attribute("fill", "currentColor"),
                attribute.class("w-6 h-6"),
              ],
              [
                svg.path([
                  attribute.attribute(
                    "d",
                    "M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12A12 12 0 0 0 12 0z",
                  ),
                ]),
              ],
            ),
          ],
        ),
        button.theme_toggle(
          [
            event.on_click(UserToggledColorScheme),
          ],
          [],
        ),
      ]),
    ],
  )
}

/// The default main content container for the application.
///
fn main_content(attributes: List(Attribute(msg)), children: List(Element(msg))) {
  html.main([attribute.class("flex-1 px-4 py-8")], [
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
