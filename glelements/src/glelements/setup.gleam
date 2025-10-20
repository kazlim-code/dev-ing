import gleam/io
import gleam/result
import gleam/string
import simplifile
import tom

// MAIN -----------------------------------------------------------------------

pub fn main() {
  use toml_content <- result.try(
    simplifile.read(from: "./gleam.toml")
    |> result.map_error(with: simplifile.describe_error),
  )
  use toml <- result.try(
    tom.parse(toml_content)
    |> result.map_error(with: fn(_) { "Failed to parse gleam.toml" }),
  )
  use project_name <- result.try(
    tom.get_string(toml, ["name"])
    |> result.map_error(with: fn(_) { "Project name not found in gleam.toml" }),
  )
  case project_name {
    "glelements" -> {
      io.println(
        "Cannot generate CSS file from within the 'glelements' project.",
      )
      Ok(Nil)
    }
    _ ->
      generate_glelement_css()
      |> result.map_error(with: simplifile.describe_error)
  }
}

// MODULE FUNCTIONS -----------------------------------------------------------

/// This function creates the required tailwindcss file in the project under
/// the /src directory. It copies it to /src such that when referenced by the
/// apps main css file (same name as project) in this directory then lustre dev
/// tools can correctly use tailwindcss to generate the css files correctly.
///
/// This file contains any custom css configuration used for the styling of the
/// glelement components and elements.
///
pub fn generate_glelement_css() -> Result(Nil, simplifile.FileError) {
  use src <- result.try(simplifile.read("./glelements/assets/glelements.css"))
  let css =
    src
    |> string.replace(each: "@import \"tailwindcss\";\n\n", with: "")
    |> string.trim()

  simplifile.write("src/glelements.css", css)
}
