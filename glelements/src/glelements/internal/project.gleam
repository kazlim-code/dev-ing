import simplifile
import tom

pub fn get_name() -> Result(String, tom.GetError) {
  let assert Ok(current_directory) = simplifile.current_directory()
  let assert Ok(toml) = simplifile.read(from: current_directory <> "/gleam.toml")
  let assert Ok(parsed_toml) = tom.parse(toml)

  tom.get_string(parsed_toml, ["name"])
}
