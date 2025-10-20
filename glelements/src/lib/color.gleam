pub type Color {
  Primary
  Secondary
  Success
  Warn
  Err
  Info
  Surface
  OnSurface
}

pub type Property {
  Background
  Border
  Outline
  Text
}

pub type Weight {
  W50
  W100
  W200
  W300
  W400
  W500
  W600
  W700
  W800
  W900
  W950
}

pub type Theme {
  Preferred
  Light
  Dark
}

/// Maps a colour string to the associated Color type.
///
pub fn from_string(string value: String) -> Result(Color, String) {
  case value {
    "Primary" -> Ok(Primary)
    "Secondary" -> Ok(Secondary)
    "Success" -> Ok(Success)
    "Warn" -> Ok(Warn)
    "Err" -> Ok(Err)
    "Info" -> Ok(Info)
    "Surface" -> Ok(Surface)
    "OnSurface" -> Ok(OnSurface)
    _ -> Error("No standard color found for " <> value)
  }
}

/// Maps a ColorWeight to the associated Int value.
///
pub fn weight_to_int(weight: Weight) -> Int {
  case weight {
    W50 -> 50
    W100 -> 100
    W200 -> 200
    W300 -> 300
    W400 -> 400
    W500 -> 500
    W600 -> 600
    W700 -> 700
    W800 -> 800
    W900 -> 900
    W950 -> 950
  }
}

///
///
pub fn weight_from_int(value: Int) -> Result(Weight, String) {
  case value {
    50 -> Ok(W50)
    100 -> Ok(W100)
    200 -> Ok(W200)
    300 -> Ok(W300)
    400 -> Ok(W400)
    500 -> Ok(W500)
    600 -> Ok(W600)
    700 -> Ok(W700)
    800 -> Ok(W800)
    900 -> Ok(W900)
    950 -> Ok(W950)
    _ -> Error("Invalid color weight")
  }
}

pub fn invert_weight(weight: Weight) -> Weight {
  case weight {
    W50 -> W950
    W100 -> W900
    W200 -> W800
    W300 -> W700
    W400 -> W600
    W500 -> W500
    W600 -> W400
    W700 -> W300
    W800 -> W200
    W900 -> W100
    W950 -> W50
  }
}
