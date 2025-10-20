import gleam/option.{Some}
import lib/color
import lib/tailwind
import lustre/attribute.{type Attribute}
import lustre/element.{type Element}
import lustre/element/html

// ELEMENTS --------------------------------------------------------------------

pub fn default(
  attributes: List(Attribute(msg)),
  children: List(Element(msg)),
) -> Element(msg) {
  of(html.article, attributes, children)
}

pub fn basic(
  attributes: List(Attribute(msg)),
  children: List(Element(msg)),
) -> Element(msg) {
  let attributes = [
    tailwind.background(
      color: color.Surface,
      weight: color.W200,
      theme: Some(color.Preferred),
    ),
    tailwind.text(
      color: color.OnSurface,
      weight: color.W900,
      theme: Some(color.Preferred),
    ),
    padding("md"),
    rounded(),
    shadow(),
    ..attributes
  ]
  of(html.article, attributes, children)
}

pub fn bordered(
  attributes: List(Attribute(msg)),
  children: List(Element(msg)),
) -> Element(msg) {
  let attributes = [
    tailwind.background(
      color: color.Surface,
      weight: color.W200,
      theme: Some(color.Preferred),
    ),
    tailwind.text(
      color: color.OnSurface,
      weight: color.W900,
      theme: Some(color.Preferred),
    ),
    tailwind.border(
      color: color.Surface,
      weight: color.W600,
      theme: Some(color.Preferred),
    ),
    tailwind.border_size("1"),
    padding("md"),
    rounded(),
    shadow(),
    ..attributes
  ]
  of(html.article, attributes, children)
}

pub fn of(
  element: fn(List(Attribute(msg)), List(Element(msg))) -> Element(msg),
  attributes: List(Attribute(msg)),
  children: List(Element(msg)),
) -> Element(msg) {
  element(attributes, children)
}

pub fn header(
  attributes: List(Attribute(msg)),
  children: List(Element(msg)),
) -> Element(msg) {
  html.header([attribute.class(""), ..attributes], children)
}

pub fn content(
  attributes: List(Attribute(msg)),
  children: List(Element(msg)),
) -> Element(msg) {
  html.main([attribute.class(""), ..attributes], children)
}

pub fn footer(
  attributes: List(Attribute(msg)),
  children: List(Element(msg)),
) -> Element(msg) {
  html.footer([attribute.class(""), ..attributes], children)
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
pub fn shadow() -> Attribute(msg) {
  attribute.class("shadow-lg")
}
