import birdie
import gleam/string
import gleeunit
import javascript_dom_parser/deno_polyfill
import lustre/element
import parser

pub fn main() -> Nil {
  deno_polyfill.install_polyfill()
  gleeunit.main()
}

pub fn parser_to_lustre_test() {
  let title = "Convert markdown string to a list of Lustre Elements."

  let markdown = "# Hello\n\nWorld"
  let elements = parser.to_lustre(markdown)

  element.fragment(elements)
  |> element.to_readable_string
  |> string.trim
  |> birdie.snap(title)
}

pub fn parser_from_html_test() {
  let title = "Convert html string to a list of Lustre Elements."
  let html_string =
    "
<!doctype html>
<html lang=en>
<head>
  <title>Hi!</title>
</head>
<body>
  <p style='color: #ffaff3'>How are you?</p>
  <!-- Wooo coding! -->
</body>
</html>
"

  let elements =
    html_string
    |> parser.from_html

  element.fragment(elements)
  |> element.to_readable_string
  |> string.trim
  |> birdie.snap(title)
}
