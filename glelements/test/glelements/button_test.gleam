import birdie
import lib/button
import lustre/element.{type Element}
import lustre/element/html.{text}

pub fn basic_button_test() {
  let title = "A basic button with primary background and rounded corners"

  button.basic([], [text("Button label")])
  |> snapshot(title)
}

pub fn basic_secondary_button_test() {
  let title = "A basic button with secondary background and rounded corners"

  button.basic_secondary([], [text("Button label")])
  |> snapshot(title)
}

pub fn basic_success_button_test() {
  let title = "A basic button with success background and rounded corners"

  button.basic_success([], [text("Button label")])
  |> snapshot(title)
}

pub fn basic_warn_button_test() {
  let title = "A basic button with warning background and rounded corners"

  button.basic_warn([], [text("Button label")])
  |> snapshot(title)
}

pub fn basic_error_button_test() {
  let title = "A basic button with error background and rounded corners"

  button.basic_error([], [text("Button label")])
  |> snapshot(title)
}

pub fn basic_info_button_test() {
  let title = "A basic button with info background and rounded corners"

  button.basic_info([], [text("Button label")])
  |> snapshot(title)
}

pub fn theme_toggle_button_test() {
  let title = "A basic toggle button with sun/moon icons for light/dark mode"

  button.theme_toggle([], [])
  |> snapshot(title)
}

// UTILS -----------------------------------------------------------------------

fn snapshot(el: Element(msg), title: String) -> Nil {
  el |> element.to_readable_string |> birdie.snap("[card] " <> title)
}
