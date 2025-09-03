import * as $gleeunit from "../gleeunit/gleeunit.mjs";
import { makeError } from "./gleam.mjs";

const FILEPATH = "test/dev_ing_test.gleam";

export function main() {
  return $gleeunit.main();
}

export function hello_world_test() {
  let name = "Joe";
  let greeting = ("Hello, " + name) + "!";
  let $ = "Hello, Joe!";
  if (!(greeting === $)) {
    throw makeError(
      "assert",
      FILEPATH,
      "dev_ing_test",
      12,
      "hello_world_test",
      "Assertion failed.",
      {
        kind: "binary_operator",
        operator: "==",
        left: { kind: "expression", value: greeting, start: 202, end: 210 },
        right: { kind: "literal", value: $, start: 214, end: 227 },
        start: 195,
        end: 227,
        expression_start: 202
      }
    )
  }
  return undefined;
}
