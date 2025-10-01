import lustre/attribute
import lustre/effect.{type Effect}
import lustre
import lustre/element.{type Element, text}
import lustre/element/html
// import glelements/card.{basic}

type Model {
  Model(Nil)
}

type Msg {}

pub fn main() {
  let app = lustre.application(init:, update:, view:)
  let assert Ok(_) = lustre.start(app, "#app", Nil)
  Nil
}

fn init(_: Nil) -> #(Model, Effect(Msg)) {
  #(Model(Nil), effect.none())
}

fn update(_model: Model, _msg: Msg) -> #(Model, Effect(Msg)) {
  #(Model(Nil), effect.none())
}

fn view(_model: Model) -> Element(Msg) {
  element.fragment([
    header(),
    html.div([attribute.class("min-h-screen flex flex-col")], [
      html.div([attribute.class("flex flex-1 pt-20")], [
        side_menu(),
        content(),
      ]),
      footer(),
    ]),
  ])
}

fn header() {
  html.header([attribute.class("fixed left-0 right-0 top-0 px-4 py-4 grid border-b border-secondary-500")], [
    html.div([attribute.class("w-full max-w-5xl mx-auto flex align-center gap-4")], [
      // TODO: Add a logo here
      html.div([attribute.class("font-bold text-xl")], [text("Dev-Ing")]),
      html.ul([attribute.class("flex flex-row gap-2")], [
        html.li([], [html.a([attribute.href("#")], [text("Blog")])]),
        html.li([], [html.a([attribute.href("#")], [text("About")])]),
      ]),
    ])
  ])
}

fn content() {
  html.main([attribute.class("px-4")], [
    html.div([attribute.class("w-full max-w-5xl mx-auto")], [
      html.h1([attribute.class("font-semibold text-2xl")], [text("Page header")]),
    ]),
  ])
}

fn side_menu() {
  html.aside([attribute.class("w-64 p-4 border-r border-secondary-500")], [
    html.h2([attribute.class("font-semibold text-lg")], [text("Side Menu")]),
    html.ul([attribute.class("mt-4")], [
      html.li([], [text("Link 1")]),
      html.li([], [text("Link 2")]),
      html.li([], [text("Link 3")]),
    ]),
  ])
}

fn footer() {
  html.footer(
    [attribute.class("px-4 py-4 grid border-t border-secondary-500 mt-10")],
    [
      html.div(
        [attribute.class("w-full max-w-5xl mx-auto flex justify-center")],
        [html.p([], [text("© 2025 Dev-Ing. All rights reserved.")])],
      ),
    ],
  )
}
