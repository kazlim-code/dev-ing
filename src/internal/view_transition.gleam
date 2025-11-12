//// This module provides a custom Lustre effect for wrapping DOM updates
//// in a view transition.
////

import lustre/effect.{type Effect}

@external(javascript, "../ffi.mjs", "startTransition")
fn start_transition(callback: fn() -> Nil) -> Nil

/// Creates a Lustre effect that wraps a DOM update within a view transition.
///
/// It takes a `thunk` (a zero-argument function) that returns the message to
/// be dispatched once the transition has started.
///
pub fn in_transition(thunk: fn() -> msg) -> Effect(msg) {
  effect.from(fn(dispatch) { start_transition(fn() { dispatch(thunk()) }) })
}
