//// The about page for the website.
//// This page contains information about me, my work, and personal projects.
////

import gleam/option.{type Option, None, Some}
import lib/card
import lustre/attribute.{type Attribute}
import lustre/element.{type Element, text}
import lustre/element/html

/// Text content ---------------------------------------------------------------
/// My card
const me = "My name is Callum Ingley, I'm a software engineer that has for the
  most part focused on developing experiences for the front end."

const frameworks = " I've explored a few different front end frameworks
  beginning with using ruby on rails in university. I've since worked with
  Angular, React, Vue 2.0 & 3.0, Svelte and Lustre. Most of my work has also
  included working with PWAs and CapacitorJS wrapped web applications."

const hobbies = "When I'm not coding, I'll typically be chilling watching
  Twitch/YouTube or playing games with friends."

/// Work card
const wyrd_title = "Wyrd Technology"

const wyrd_icon = "/wyrd-technology-icon.webp"

const wyrd_icon_label = "Wyrd Technology logo"

const wyrd_description = "Expert software development and engineering leadership consultancy to clients worldwide."

fn wyrd_projects() -> List(Element(a)) {
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

const wyrd_website = "https://wyrd-technology.com"

const grafa_title = "Grafa"

const grafa_icon = "/grafa-icon.webp"

const grafa_icon_label = "Grafa logo"

const grafa_description = "Finance media technology company that was founded with the vision of making finance entertaining so that anyone, from any background can learn about money."

fn grafa_projects() -> List(Element(a)) {
  [
    html.p([], [
      text(
        "Developed the majority of the current application front end, switching from react-native to Vue 2.6 with CapacitorJS.",
      ),
    ]),
  ]
}

const grafa_website = "https://grafa.com"

/// View -----------------------------------------------------------------------
/// A fragment that renders the content for the about page.
///
pub fn content_fragment() -> Element(a) {
  element.fragment([
    html.h1(
      [
        attribute.class(
          "mt-4 dark:text-white font-semibold text-4xl text-center",
        ),
      ],
      [
        text("About me"),
      ],
    ),
    html.div([attribute.class("flex flex-col gap-12 mt-12")], [
      my_card(),
      work_card(),
      personal_projects_card(),
    ]),
  ])
}

/// Renders a card with some background information on my career and hobbies.
///
fn my_card() -> Element(a) {
  card.basic([attribute.class("px-8 py-8 [&]:rounded-3xl")], [
    card.content(
      [
        attribute.class(
          "grid sm:flex gap-8 justify-items-center sm:justify-items-start sm:items-center",
        ),
      ],
      [
        html.img([
          attribute.class(
            "h-52 max-w-52 w-full rounded-full object-cover outline-4 outline-offset-4 outline-surface-300 dark:outline-surface-600 border-4 border-primary-300/75 dark:border-primary-400",
          ),
          attribute.src("/me.jpg"),
        ]),
        html.div([attribute.class("dark:text-white text-md grid gap-4")], [
          html.p([], [text(me)]),
          html.p([], [text(frameworks)]),
          html.p([], [text(hobbies)]),
        ]),
      ],
    ),
  ])
}

/// Renders a card with my recent work.
///
fn work_card() -> Element(a) {
  card.basic([attribute.class("px-8 py-8 [&]:rounded-3xl")], [
    card.header([], [
      html.h2([attribute.class("font-semibold text-xl")], [
        text("Recent Work"),
      ]),
    ]),
    card.content([attribute.class("mt-4")], [
      html.ul([attribute.class("dark:text-white grid gap-6")], [
        line_item(
          title: wyrd_title,
          icon: wyrd_icon,
          icon_class: None,
          icon_label: wyrd_icon_label,
          description: wyrd_description,
          projects: wyrd_projects(),
          link: wyrd_website,
        ),
        line_item(
          title: grafa_title,
          icon: grafa_icon,
          icon_class: Some(attribute.class("rounded-full")),
          icon_label: grafa_icon_label,
          description: grafa_description,
          projects: grafa_projects(),
          link: grafa_website,
        ),
      ]),
    ]),
  ])
}

/// Renders a card with my personal projects.
///
fn personal_projects_card() -> Element(a) {
  card.basic([attribute.class("px-8 py-8 [&]:rounded-3xl")], [
    card.header([], [
      html.h2([attribute.class("font-semibold text-xl")], [
        text("Personal Projects"),
      ]),
    ]),
    card.content([attribute.class("mt-4")], [
      html.ul([attribute.class("dark:text-white grid gap-6")], [
        line_item(
          title: "This Website!",
          icon: "/dev-ing.webp",
          icon_label: "Dev-Ing website logo",
          icon_class: Some(attribute.class("rounded bg-white")),
          description: "Written in Gleam + Lustre with Lustre dev tools",
          projects: [],
          link: "http://www.github.com/kazlim-code/dev-ing",
        ),
        line_item(
          title: "Glelements",
          icon: "/glelements.webp",
          icon_class: None,
          icon_label: "Glelements UI logo",
          description: "Lustre UI library utilising Tailwindcss",
          projects: [],
          link: "#",
        ),
      ]),
    ]),
  ])
}

/// Renders a line item for the work card.
///
fn line_item(
  title title: String,
  icon icon_src: String,
  icon_class icon_class: Option(Attribute(a)),
  icon_label label: String,
  description description: String,
  projects projects: List(Element(a)),
  link href: String,
) -> Element(a) {
  let icon_class = icon_class |> option.unwrap(attribute.class("h-full w-full"))
  html.li(
    [
      attribute.class(
        "flex flex-col sm:flex-row gap-2 sm:gap-6 rounded-2xl px-6 py-4 bg-surface-100/25 hover:bg-surface-100/50 dark:bg-surface-700/25 hover:dark:bg-surface-600/25 outline-2 outline-transparent outline-offset-2 hover:outline-primary-500 hover:dark:outline-primary-400 transition",
      ),
    ],
    [
      html.a(
        [
          attribute.href(href),
          attribute.target("_blank"),
          attribute.class(
            "grid max-w-24 sm:max-w-18 w-full mx-auto sm:mx-0 p-4 h-min relative before:content-[''] before:absolute before:inset-0 before:rounded-lg before:bg-surface-400/25 dark:before:bg-surface-900/25 before:z-0",
          ),
          attribute.aria_label(label),
        ],
        [
          html.img([
            attribute.src(icon_src),
            icon_class,
            attribute.class("object-contain mx-auto z-1"),
          ]),
        ],
      ),
      html.div([attribute.class("grid")], [
        html.a(
          [
            attribute.href(href),
            attribute.target("_blank"),
            attribute.class(
              "font-semibold text-lg w-fit text-on-surface-900 dark:text-on-surface-50 hover:text-primary-500 hover:dark:text-primary-400",
            ),
          ],
          [text(title)],
        ),
        html.span(
          [
            attribute.class("text-on-surface-950 dark:text-on-surface-100"),
          ],
          [text(description)],
        ),
        html.p([attribute.class("mt-2")], projects),
      ]),
    ],
  )
}
