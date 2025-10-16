//// Collection of commonly used button types. The buttons make use of the
//// tailwindcss theme variables setup in glelements.css to apply any
//// colours/themes.
////
//// ## Examples:
//// Non-styled button with icon and text.
//// ```gleam
//// import lustre/element/html.{text}
//// import lustre/event
//// import glelement/button
//// import glelement/icon
////
//// button.default([event.on_click()], [icon.info(), text("More info")])
//// ```
////

import glelements/icon
import gleam/string
import gleam/list
import gleam/option.{Some}
import glelements/color
import glelements/tailwind
import lustre/attribute.{type Attribute}
import lustre/vdom/vattr
import lustre/element.{type Element}
import lustre/element/html

pub type Hover {
  Outline
  BgLight
  BgDark
}

/// Standard button without any styles applied.
///
pub fn default(
  attr attributes: List(Attribute(msg)),
  children children: List(Element(msg)),
) {
  of(html.button, attributes, children)
}

/// Basic button that uses rounded corners and primary.
///
pub fn basic(
  attr attributes: List(Attribute(msg)),
  children children: List(Element(msg)),
) -> Element(msg) {
  let basic_attributes: List(Attribute(msg)) = [
    hover(Outline),
    padding("md"),
    rounded(),
    transition(),
  ]
  let attr = attributes
  |> ensure_default_background
  |> list.append(basic_attributes)
  |> list.append(attributes)

  of(el: html.button, attr:, children:)
}

///
///
pub fn basic_secondary(
  attr attributes: List(Attribute(msg)),
  children children: List(Element(msg)),
) -> Element(msg) {
  let attributes = [
      tailwind.background(color: color.Secondary, weight: color.W400, theme: Some(color.Preferred)),
    ..attributes,
  ]
  basic(attr: attributes, children:)
}

///
///
pub fn basic_success(
  attr attributes: List(Attribute(msg)),
  children children: List(Element(msg)),
) -> Element(msg) {
  let attributes = [
      tailwind.background(color: color.Success, weight: color.W400, theme: Some(color.Preferred)),
    ..attributes,
  ]
  basic(attr: attributes, children:)
}

///
///
pub fn basic_warn(
  attr attributes: List(Attribute(msg)),
  children children: List(Element(msg)),
) -> Element(msg) {
  let attributes = [
      tailwind.background(color: color.Warn, weight: color.W400, theme: Some(color.Preferred)),
    ..attributes,
  ]
  basic(attr: attributes, children:)
}

///
///
pub fn basic_error(
  attr attributes: List(Attribute(msg)),
  children children: List(Element(msg)),
) -> Element(msg) {
  let attributes = [
      tailwind.background(color: color.Err, weight: color.W500, theme: Some(color.Preferred)),
    ..attributes,
  ]
  basic(attr: attributes, children:)
}

///
///
pub fn basic_info(
  attr attributes: List(Attribute(msg)),
  children children: List(Element(msg)),
) -> Element(msg) {
  let attributes = [
      tailwind.background(color: color.Info, weight: color.W400, theme: Some(color.Preferred)),
    ..attributes,
  ]
  basic(attr: attributes, children:)
}

/// Simple theme toggle button with a sun icon for light mode and a moon icon
/// for dark.
///
pub fn theme_toggle(
  attr attributes: List(Attribute(msg)),
  children children: List(Element(msg)),
) -> Element(msg) {
  let children = [
    html.span([attribute.class("grid grid-cols-1 grid-rows-1 place-items-center")] ,[
      icon.sun([attribute.class("col-start-1 row-start-1 dark:opacity-0 duration-300"), transition()]),
      icon.moon([attribute.class("col-start-1 row-start-1 opacity-0 dark:opacity-100 duration-300"), transition()]),
    ]),
    ..children,
  ]
  basic(attr: attributes, children:)
}

pub fn of(
  el element: fn(List(Attribute(msg)), List(Element(msg))) -> Element(msg),
  attr attributes: List(Attribute(msg)),
  children children: List(Element(msg)),
) -> Element(msg) {
  element([attribute.role("button"), ..attributes], children)
}

// ATTRIBUTES ------------------------------------------------------------------

///
///
pub fn square() -> Attribute(msg) {
  attribute.class("rounded-none")
}

///
///
pub fn rounded() -> Attribute(msg) {
  attribute.class("rounded-md")
}

///
///
pub fn padding(size value: String) -> Attribute(msg) {
  case value {
    "sm" -> attribute.class("px-2 py-1")
    "md" -> attribute.class("px-4 py-2")
    "lg" -> attribute.class("px-8 py-4")
    _ -> attribute.class("p-0")
  }
}

///
///
pub fn hover(effect value: Hover) -> Attribute(msg) {
  case value {
    Outline -> attribute.class("outline outline-transparent outline-2 hover:outline-on-surface-500 dark:hover:outline-on-surface-200")
    BgLight -> tailwind.background(color: color.Primary, weight: color.W400, theme: Some(color.Preferred))
    BgDark ->tailwind.background(color: color.Primary, weight: color.W600, theme: Some(color.Preferred)) 
  }
}

///
///
pub fn transition() -> Attribute(msg) {
  attribute.class("transition ease-in-out")
}

// HELPERS ---------------------------------------------------------------------

/// Checks to see if any tailwindcss background class is already being
/// supplied. If not, it returns a default background class for the button.
///
fn ensure_default_background(attr attributes: List(Attribute(msg))) -> List(Attribute(msg)) {
  let has_bg_attr = attributes |> list.any(fn (attr: Attribute(msg)) {
    case attr {
      vattr.Attribute(_name, _kind, value) -> attr.name == "class" && string.contains(does: value, contain: "bg-") 
      _ -> False
    }
  })
  case has_bg_attr {
    True -> []
    False -> [tailwind.background(
      color: color.Primary,
      weight: color.W400,
      theme: Some(color.Preferred),
    )]
  }
}
