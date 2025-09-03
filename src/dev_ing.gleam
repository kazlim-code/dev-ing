import lustre
import lustre/element.{text}
import lustre/element/html.{div}

pub fn main() {
  let app = lustre.element(view())
  let assert Ok(_) = lustre.start(app, "#app", Nil)
  Nil
}

fn view() {
  div([], [
    text("Hello, world!")
  ])
}
