//// This module provides functions for parsing HTML and Markdown into Lustre elements.
////

import gleam/list
import gleam/result
import gleam/string
import javascript_dom_parser
import lustre/attribute
import lustre/element.{type Element}
import mork

/// Parses a string of Markdown into a list of Lustre elements.
///
/// ## Example
///
/// ```gleam
/// let markdown = "# Hello\n\nWorld"
/// to_lustre(markdown)
/// // -> [
/// //   element.element("h1", [], [element.text("Hello")]),
/// //   element.element("p", [], [element.text("World")])
/// // ]
/// ```
///
pub fn to_lustre(markdown text: String) -> List(Element(msg)) {
  text
  |> mork.parse
  |> mork.to_html
  |> from_html
}

/// Parses a string of HTML into a list of Lustre elements.
///
/// ## Example
///
/// ```gleam
/// let html = "<h1>Hello</h1><p>World</p>"
/// from_html(html)
/// // -> [
/// //   element.element("h1", [], [element.text("Hello")]),
/// //   element.element("p", [], [element.text("World")])
/// // ]
/// ```
///
pub fn from_html(html text: String) -> List(Element(msg)) {
  javascript_dom_parser.parse_to_records(text)
  |> body_children_from_html_root
  |> list.map(convert_node)
}

/// Takes a root `HtmlNode` and returns a list of its body's children nodes.
///
fn body_children_from_html_root(
  html_node root_node: javascript_dom_parser.HtmlNode,
) -> List(javascript_dom_parser.HtmlNode) {
  case root_node {
    javascript_dom_parser.Element("HTML", _, children) ->
      find_body_children(children)
      |> result.unwrap([])
    _ -> []
  }
}

/// Finds the `BODY` element in a list of `HtmlNode`s and returns its children.
///
fn find_body_children(
  list_node children: List(javascript_dom_parser.HtmlNode),
) -> Result(List(javascript_dom_parser.HtmlNode), Nil) {
  list.find_map(children, fn(child) {
    case child {
      javascript_dom_parser.Element("BODY", _, body_children) ->
        Ok(body_children)
      _ -> Error(Nil)
    }
  })
}

/// Recursively converts an `HtmlNode` into a Lustre `Element(msg)`.
///
fn convert_node(node: javascript_dom_parser.HtmlNode) -> Element(msg) {
  case node {
    javascript_dom_parser.Element(tag, attrs, children) -> {
      let lustre_attrs =
        list.map(attrs, fn(attr_tuple) {
          attribute.attribute(attr_tuple.0, attr_tuple.1)
        })
      let lustre_children = list.map(children, convert_node)

      element.element(string.lowercase(tag), lustre_attrs, lustre_children)
    }
    javascript_dom_parser.Text(content) -> element.text(content)
    javascript_dom_parser.Comment(_) -> element.text("")
  }
}
