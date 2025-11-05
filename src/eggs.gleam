////
////

import gleam/io
import gleam_community/ansi

///
///
pub fn ascii() -> Nil {
  let line_one = "                            
   ██████  ███████ ██    ██ 
   ██   ██ ██      ██    ██ 
   ██   ██ █████   ██    ██ 
   ██   ██ ██       ██  ██  
   ██████  ███████   ████   
                            
                            \n"
  let line_two = ansi.black("      ██ ███    ██  ██████  
      ██ ████   ██ ██       
█████ ██ ██ ██  ██ ██   ███ 
      ██ ██  ██ ██ ██    ██ 
      ██ ██   ████  ██████  
                            
                            \n")

  let text = line_one <> line_two

  text
  |> ansi.bg_hex(0xf54a00)
  |> io.println
}
