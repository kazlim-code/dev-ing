import gleam/string
import gleam/result
import simplifile
import glelements/internal/project

// TODO: Handle showing file errors

// MAIN -----------------------------------------------------------------------

pub fn main() {
  let assert Ok(project_name) = project.get_name()
  case project_name {
    "glelements" -> generate_glelement_css()
    _ -> use_glelements_css()
  }
}

// MODULE FUNCTIONS -----------------------------------------------------------

/// This function creates the required tailwindcss file in the project under
/// the /priv/static directory. This file contains any custom css configuration
/// used for the styling of the glelement components and elements.
///
pub fn generate_glelement_css() -> Result(Nil, simplifile.FileError) {
  use src <- result.map(simplifile.read("./src/glelements.css"))
  let css = src
    |> string.replace(each: "@import \"tailwindcss\";\n\n", with: "")

  let assert Ok(_) = simplifile.write("./priv/static/glelements.css", css)
  Nil
}

/// Copies the required Glelements tailwind css layer to the current projects
/// `/priv/static` folder.
///
pub fn use_glelements_css() -> Result(Nil, simplifile.FileError) {
  let _ = simplifile.copy_file(
    at: "./build/dev/javascript/glelements/priv/static/glelements.css",
    to: "./priv/static/glelements.css"
  )
}

