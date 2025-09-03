import * as $ansi from "../../../gleam_community_ansi/gleam_community/ansi.mjs";
import * as $deque from "../../../gleam_deque/gleam/deque.mjs";
import * as $io from "../../../gleam_stdlib/gleam/io.mjs";
import * as $repeatedly from "../../../repeatedly/repeatedly.mjs";
import { Ok, toList, CustomType as $CustomType, makeError } from "../../gleam.mjs";

const FILEPATH = "src/lustre_dev_tools/vendor/spinner.gleam";

class Spinner extends $CustomType {
  constructor(repeater, frames) {
    super();
    this.repeater = repeater;
    this.frames = frames;
  }
}

class State extends $CustomType {
  constructor(text, frames, colour) {
    super();
    this.text = text;
    this.frames = frames;
    this.colour = colour;
  }
}

class Builder extends $CustomType {
  constructor(frames, text, colour) {
    super();
    this.frames = frames;
    this.text = text;
    this.colour = colour;
  }
}

export function with_frames(builder, frames) {
  return new Builder(frames, builder.text, builder.colour);
}

export function with_colour(builder, colour) {
  return new Builder(builder.frames, builder.text, colour);
}

export function set_text(spinner, text) {
  return $repeatedly.update_state(
    spinner.repeater,
    (state) => { return new State(text, state.frames, state.colour); },
  );
}

const clear_line_code = "\u{001b}[2K";

const go_to_start_code = "\r";

const show_cursor = "\u{001b}[?25h";

/**
 * Stop the spinner, clearing the terminal line and showing the cursor. You
 * may want to print a success message after this.
 *
 * This should be called before your program ends to re-enable the terminal
 * cursor.
 */
export function stop(spinner) {
  $repeatedly.stop(spinner.repeater);
  return $io.print((clear_line_code + go_to_start_code) + show_cursor);
}

const hide_cursor = "\u{001b}[?25l";

export function start(builder) {
  let frames = $deque.from_list(builder.frames);
  let init = new State(builder.text, frames, builder.colour);
  let repeater = ((_capture) => { return $repeatedly.call(80, init, _capture); })(
    (_use0, _) => {
      let text;
      let colour;
      text = _use0.text;
      colour = _use0.colour;
      let $ = $deque.pop_front(frames);
      let frame;
      let frames$1;
      if ($ instanceof Ok) {
        frame = $[0][0];
        frames$1 = $[0][1];
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "lustre_dev_tools/vendor/spinner",
          238,
          "start",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $,
            start: 11862,
            end: 11919,
            pattern_start: 11873,
            pattern_end: 11893
          }
        )
      }
      let frames$2 = $deque.push_back(frames$1, frame);
      $io.print(
        ((((hide_cursor + clear_line_code) + go_to_start_code) + colour(frame)) + " ") + text,
      );
      return new State(text, frames$2, colour);
    },
  );
  return new Spinner(repeater, builder.frames);
}

export const snake_frames = /* @__PURE__ */ toList([
  "⠋",
  "⠙",
  "⠹",
  "⠸",
  "⠼",
  "⠴",
  "⠦",
  "⠧",
  "⠇",
  "⠏",
]);

/**
 * Start a spinner that runs concurrently in another Erlang process or
 * JavaScript task.
 */
export function new$(text) {
  return new Builder(snake_frames, text, $ansi.magenta);
}
