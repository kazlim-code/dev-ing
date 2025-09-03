import * as $lustre from "../lustre/lustre.mjs";
import * as $element from "../lustre/lustre/element.mjs";
import { text } from "../lustre/lustre/element.mjs";
import * as $html from "../lustre/lustre/element/html.mjs";
import { div } from "../lustre/lustre/element/html.mjs";
import { Ok, toList, makeError } from "./gleam.mjs";

const FILEPATH = "src/dev_ing.gleam";

function view() {
  return div(toList([]), toList([text("Hello, world!")]));
}

export function main() {
  let app = $lustre.element(view());
  let $ = $lustre.start(app, "#app", undefined);
  if (!($ instanceof Ok)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "dev_ing",
      7,
      "main",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 130, end: 179, pattern_start: 141, pattern_end: 146 }
    )
  }
  return undefined;
}
