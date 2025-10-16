import lustre/attribute.{type Attribute}
import gleam/option.{type Option, Some, None}
import glelements/color
import glelements/internal/tailwind_maps

/// Creates a css attribute for tailwind background css string based on the
/// color and weight.
///
pub fn background(
  color color: color.Color,
  weight weight: color.Weight,
  theme theme: Option(color.Theme),
) -> Attribute(msg) {
  color_attr(property: color.Background, color:, weight:, theme:)
}


/// Creates a css attribute for tailwind text css string based on the
/// color and weight.
///
pub fn text(
  color color: color.Color,
  weight weight: color.Weight,
  theme theme: Option(color.Theme),
) -> Attribute(msg) {
  color_attr(property: color.Text, color:, weight:, theme:)
}

/// Creates a css attribute for tailwind border css string based on the
/// color and weight.
///
pub fn border(
  color color: color.Color,
  weight weight: color.Weight,
  theme theme: Option(color.Theme),
) -> Attribute(msg) {
  color_attr(property: color.Border, color:, weight:, theme:)
}

/// Creates a css attribute for tailwind border width css string
/// for the most common values.
///
pub fn border_size(width value: String) -> Attribute(msg) {
  border_width_class(value) |> attribute.class
}

/// Common tailwind border width classes.
///
pub fn border_width_class(width value: String) -> String {
  case value {
    "2" -> "border-2"
    "4" -> "border-4"
    "8" -> "border-8"
    _ -> "border"
  }
}

/// Converts a color to its associated tailwindcss class string based on the
/// property given.
///
/// These classes need to be mapped in full instead of
/// dynamically generated otherwise tailwind cannot scan the classes correctly.
///
pub fn color_class(
  property property: color.Property,
  color color: color.Color,
  weight weight: color.Weight,
  theme theme: Option(color.Theme),
) -> String {
  case theme {
    Some(color.Light) | None -> {
      case property {
        color.Background -> tailwind_maps.background_class(color, weight)
        color.Text -> tailwind_maps.text_class(color, weight)
        color.Border -> tailwind_maps.border_class(color, weight)
        color.Outline -> tailwind_maps.outline_class(color, weight)
      }
    }
    Some(color.Preferred) | Some(color.Dark) -> {
      let light_class = case property {
        color.Background -> tailwind_maps.background_class(color, weight)
        color.Text -> tailwind_maps.text_class(color, weight)
        color.Border -> tailwind_maps.border_class(color, weight)
        color.Outline -> tailwind_maps.outline_class(color, weight)
      }
      let dark_weight = color.invert_weight(weight)
      let dark_class = case property {
        color.Background ->
          tailwind_maps.dark_background_class(color, dark_weight)
        color.Text -> tailwind_maps.dark_text_class(color, dark_weight)
        color.Border -> tailwind_maps.dark_border_class(color, dark_weight)
        color.Outline -> tailwind_maps.dark_outline_class(color, dark_weight)
      }
      light_class <> " " <> dark_class
    }
  }
}

/// Converts a color to its associated tailwindcss class as a Lustre class
/// attribute.
///
pub fn color_attr(
  property property: color.Property,
  color color: color.Color,
  weight weight: color.Weight,
  theme theme: Option(color.Theme),
) -> Attribute(msg) {
  attribute.class(color_class(property:, color:, weight:, theme:))
}
