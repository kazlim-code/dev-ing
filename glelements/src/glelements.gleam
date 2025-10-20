import gleam/option.{None}
import lib/button
import lib/card
import lib/theme
import lustre
import lustre/attribute
import lustre/element.{type Element, text}
import lustre/element/html
import lustre/event

pub type Model {
  Model(Nil)
}

pub type Msg {
  UserToggledColorScheme
}

pub fn main() {
  let app = lustre.simple(init, update, view)
  let assert Ok(_) = lustre.start(app, "#app", None)
}

fn init(_) -> Model {
  theme.initialize_color_scheme()
  Model(Nil)
}

fn update(model: Model, msg: Msg) -> Model {
  case msg {
    UserToggledColorScheme -> {
      theme.toggle_color_scheme()
      model
    }
  }
}

fn view(_: Model) -> Element(Msg) {
  html.div([attribute.class("grid gap-4 px-4 py-8 max-w-6xl mx-auto")], [
    html.div([attribute.class("flex justify-between gap-2")], [
      html.h1([attribute.class("text-2xl bold mb-8")], [text("Glelements")]),
      button.theme_toggle(
        attr: [
          attribute.aria_labelledby("button_theme_toggle"),
          attribute.class("bg-info-400 dark:bg-info-600 text-white h-min"),
          event.on_click(UserToggledColorScheme),
        ],
        children: [],
      ),
    ]),
    card_section(),
    button_section(),
  ])
}

fn card_section() -> Element(a) {
  html.section(
    [
      attribute.class(
        "grid gap-4 p-4 border border-neutral-200 dark:border-neutral-800 rounded bg-neutral-100 dark:bg-neutral-900 dark:text-white",
      ),
    ],
    [
      html.h2([attribute.class("text-xl")], [text("Cards")]),
      html.div([attribute.class("grid gap-4")], [
        html.div([attribute.class("grid gap-2")], [
          html.label(
            [attribute.class("font-medium"), attribute.id("card_default")],
            [text("Default")],
          ),
          card.default([attribute.aria_labelledby("card_default")], [
            card.header([], [text("Card Header")]),
            card.content([], [text("This is the card content.")]),
            card.footer([], [text("Card Footer")]),
          ]),
        ]),
        html.div([attribute.class("grid gap-2")], [
          html.label(
            [attribute.class("font-medium"), attribute.id("card_basic")],
            [text("Basic")],
          ),
          card.basic([attribute.aria_labelledby("card_basic")], [
            card.header([], [text("Card Header")]),
            card.content([], [text("This is the card content.")]),
            card.footer([], [text("Card Footer")]),
          ]),
        ]),
        html.div([attribute.class("grid gap-2")], [
          html.label(
            [attribute.class("font-medium"), attribute.id("card_bordered")],
            [text("Bordered")],
          ),
          card.bordered(
            [attribute.class(""), attribute.aria_labelledby("card_bordered")],
            [
              card.header([], [text("Card Header")]),
              card.content([], [text("This is the card content.")]),
              card.footer([], [text("Card Footer")]),
            ],
          ),
        ]),
      ]),
    ],
  )
}

fn button_section() -> Element(Msg) {
  html.section(
    [
      attribute.class(
        "grid gap-4 p-4 border border-neutral-200 dark:border-neutral-800 rounded bg-neutral-100 dark:bg-neutral-900 dark:text-white",
      ),
    ],
    [
      html.h2([attribute.class("text-xl")], [text("Buttons")]),
      html.div([attribute.class("grid gap-4")], [
        html.h3([attribute.class("text-lg")], [text("Basic")]),
        html.div([attribute.class("grid gap-2")], [
          html.label(
            [
              attribute.class("font-medium"),
              attribute.id("button_basic_primary"),
            ],
            [text("Primary")],
          ),
          button.basic(
            attr: [attribute.aria_labelledby("button_basic_primary")],
            children: [text("Click here")],
          ),
        ]),
        html.div([attribute.class("grid gap-2")], [
          html.label(
            [
              attribute.class("font-medium"),
              attribute.id("button_basic_secondary"),
            ],
            [text("Secondary")],
          ),
          button.basic_secondary(
            attr: [attribute.aria_labelledby("button_basic_secondary")],
            children: [text("Click here")],
          ),
        ]),
        html.div([attribute.class("grid gap-2")], [
          html.label(
            [
              attribute.class("font-medium"),
              attribute.id("button_basic_success"),
            ],
            [text("Success")],
          ),
          button.basic_success(
            attr: [attribute.aria_labelledby("button_basic_success")],
            children: [text("Click here")],
          ),
        ]),
        html.div([attribute.class("grid gap-2")], [
          html.label(
            [attribute.class("font-medium"), attribute.id("button_basic_warn")],
            [text("Warn")],
          ),
          button.basic_warn(
            attr: [attribute.aria_labelledby("button_basic_warn")],
            children: [text("Click here")],
          ),
        ]),
        html.div([attribute.class("grid gap-2")], [
          html.label(
            [attribute.class("font-medium"), attribute.id("button_basic_error")],
            [text("Error")],
          ),
          button.basic_error(
            attr: [attribute.aria_labelledby("button_basic_error")],
            children: [text("Click here")],
          ),
        ]),
        html.div([attribute.class("grid gap-2")], [
          html.label(
            [attribute.class("font-medium"), attribute.id("button_basic_info")],
            [text("Info")],
          ),
          button.basic_info(
            attr: [attribute.aria_labelledby("button_basic_info")],
            children: [text("Click here")],
          ),
        ]),
        html.div([attribute.class("grid gap-2")], [
          html.label(
            [
              attribute.class("font-medium"),
              attribute.id("button_theme_toggle"),
            ],
            [text("Theme toggle")],
          ),
          button.theme_toggle(
            attr: [
              attribute.aria_labelledby("button_theme_toggle"),
              event.on_click(UserToggledColorScheme),
            ],
            children: [],
          ),
        ]),
      ]),
    ],
  )
}
