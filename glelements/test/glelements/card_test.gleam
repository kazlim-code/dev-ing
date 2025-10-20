import birdie
import lib/card
import lustre/element.{type Element, text}

pub fn basic_card_test() {
  let title = "Without header, content or footer"

  card.basic([], [])
  |> snapshot(title)
}

pub fn header_card_test() {
  let title = "With only a header"

  card.basic([], [card.header([], [text("This is the card header")])])
  |> snapshot(title)
}

pub fn content_card_test() {
  let title = "With only body content"

  card.basic([], [card.content([], [text("This is the card content")])])
  |> snapshot(title)
}

pub fn footer_card_test() {
  let title = "With only a footer"

  card.basic([], [card.footer([], [text("This is the card footer")])])
  |> snapshot(title)
}

pub fn complete_card_test() {
  let title = "With a header, content & footer"

  card.basic([], [
    card.header([], [text("This is the card header")]),
    card.content([], [text("This is the body content")]),
    card.footer([], [text("This is the card footer")]),
  ])
  |> snapshot(title)
}

pub fn squared_card_test() {
  let title = "With a squared border"

  card.basic([card.square()], inner_card())
  |> snapshot(title)
}

pub fn large_padding_card_test() {
  let title = "With large padding"

  card.basic([card.padding("lg")], inner_card())
  |> snapshot(title)
}

pub fn no_padding_card_test() {
  let title = "With no padding"

  card.basic([card.padding("")], inner_card())
  |> snapshot(title)
}

pub fn bordered_card_test() {
  let title = "With a simple border"

  card.bordered([], inner_card())
  |> snapshot(title)
}

// UTILS -----------------------------------------------------------------------

fn snapshot(el: Element(msg), title: String) -> Nil {
  el |> element.to_readable_string |> birdie.snap("[card] " <> title)
}

fn inner_card() -> List(Element(a)) {
  [
    card.header([], [text("This is the card header")]),
    card.content([], [text("This is the body content")]),
    card.footer([], [text("This is the card footer")]),
  ]
}
