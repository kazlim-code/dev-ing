pub fn toggle_color_scheme() -> Nil {
  do_toggle_color_scheme()
}

pub fn initialize_color_scheme() -> Nil {
  do_initialize_color_scheme()
}

@external(javascript, "../theme.ffi.mjs", "toggleColorScheme")
fn do_toggle_color_scheme() -> Nil {
  Nil
}

@external(javascript, "../theme.ffi.mjs", "initializeColorScheme")
fn do_initialize_color_scheme() -> Nil {
  Nil
}
