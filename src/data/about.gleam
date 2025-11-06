//// Text content for the about page.
////

import lustre/attribute
import lustre/element.{type Element}
import lustre/element/html.{text}

/// Text content ---------------------------------------------------------------
/// My card
pub const me = "My name is **Callum Ingley**, I'm a software engineer that has for the
  most part focused on developing experiences for the front end."

/// Helpers --------------------------------------------------------------------
pub const frameworks = "I've explored a few different front end frameworks
  beginning with using ruby on rails in university. I've since worked with
  **Angular**, **React**, **Vue 2.0 & 3.0**, **Svelte** and **Lustre**. Most of my work has also
  included working with PWAs and **CapacitorJS** wrapped web applications."

pub const hobbies = "When I'm not coding, I'll typically be chilling watching
  Twitch/YouTube or playing games with friends."

/// Work card
pub const wyrd_title = "Wyrd Technology"

pub const wyrd_icon = "/wyrd-technology-icon.webp"

pub const wyrd_icon_label = "Wyrd Technology logo"

pub const wyrd_description = "Expert software development and engineering leadership consultancy to clients worldwide."

pub fn wyrd_projects() -> List(Element(a)) {
  [
    html.p([], [
      html.span([], [text("Contract work for ")]),
      html.a(
        [
          attribute.href("https://masabi.com"),
          attribute.target("_blank"),
          attribute.class(
            "underline hover:text-primary-500 hover:dark:text-primary-400",
          ),
        ],
        [text("Masabi")],
      ),
    ]),
  ]
}

pub const wyrd_website = "https://wyrd-technology.com"

pub const grafa_title = "Grafa"

pub const grafa_icon = "/grafa-icon.webp"

pub const grafa_icon_label = "Grafa logo"

pub const grafa_description = "Finance media technology company that was founded with the vision of making finance entertaining so that anyone, from any background can learn about money."

pub fn grafa_projects() -> List(Element(a)) {
  [
    html.p([], [
      text(
        "Developed the majority of the current application front end, switching from react-native to Vue 2.6 with CapacitorJS.",
      ),
    ]),
  ]
}

pub const grafa_website = "https://grafa.com"
