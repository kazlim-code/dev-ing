//// The about page for the website.
//// This page contains information about me, my work, and personal projects.
////

import data/about
import gleam/option.{type Option, None, Some}
import lib/card
import lustre/attribute.{type Attribute}
import lustre/element.{type Element, text}
import lustre/element/html
import parser

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
    html.div(
      [attribute.class("flex flex-col gap-12 mt-12 max-w-[80ch] mx-auto")],
      [
        my_card(),
        work_card(),
        personal_projects_card(),
      ],
    ),
  ])
}

/// Renders a card with some background information on my career and hobbies.
///
fn my_card() -> Element(a) {
  card.basic([attribute.class("px-8 py-8 [&]:rounded-3xl")], [
    card.content(
      [
        attribute.class("grid items-center gap-8 relative pb-16"),
      ],
      [
        html.div(
          [
            attribute.class(
              "dark:text-white text-md grid gap-4 leading-6 z-1 max-w-[65ch] mx-auto",
            ),
          ],
          [
            element.fragment(parser.to_lustre(about.me)),
            element.fragment(parser.to_lustre(about.frameworks)),
            html.p([], [text(about.hobbies)]),
          ],
        ),
        html.img([
          attribute.class(
            "absolute right-0 bottom-0 mx-auto opacity-50 h-40 max-w-40 w-full rounded-full object-cover outline-4 outline-offset-4 outline-surface-300 dark:outline-surface-600 border-4 border-primary-300/75 dark:border-primary-400",
          ),
          attribute.src("/me.jpg"),
        ]),
      ],
    ),
  ])
}

/// Renders a card with my recent work.
///
fn work_card() -> Element(a) {
  card.basic([attribute.class("px-6 py-6 sm:px-8 sm:py-8 [&]:rounded-3xl")], [
    card.header([], [
      html.h2([attribute.class("font-semibold text-xl")], [
        text("Recent Work"),
      ]),
    ]),
    card.content([attribute.class("mt-6")], [
      html.ul([attribute.class("dark:text-white grid gap-12")], [
        line_item(
          title: about.wyrd_title,
          icon: about.wyrd_icon,
          icon_class: None,
          icon_label: about.wyrd_icon_label,
          description: about.wyrd_description,
          projects: about.wyrd_projects,
          link: about.wyrd_website,
        ),
        line_item(
          title: about.grafa_title,
          icon: about.grafa_icon,
          icon_class: Some(attribute.class("rounded-full")),
          icon_label: about.grafa_icon_label,
          description: about.grafa_description,
          projects: about.grafa_projects,
          link: about.grafa_website,
        ),
      ]),
    ]),
  ])
}

/// Renders a card with my personal projects.
///
fn personal_projects_card() -> Element(a) {
  card.basic([attribute.class("px-6 py-6 sm:px-8 sm:py-8 [&]:rounded-3xl")], [
    card.header([], [
      html.h2([attribute.class("font-semibold text-xl")], [
        text("Personal Projects"),
      ]),
    ]),
    card.content([attribute.class("mt-6")], [
      html.ul([attribute.class("dark:text-white grid gap-12")], [
        line_item(
          title: "This Website!",
          icon: "/dev-ing.webp",
          icon_label: "Dev-Ing website logo",
          icon_class: Some(attribute.class("rounded bg-white")),
          description: "Written in Gleam + Lustre with Lustre dev tools",
          projects: "",
          link: "http://www.github.com/kazlim-code/dev-ing",
        ),
        line_item(
          title: "Glelements",
          icon: "/glelements.webp",
          icon_class: None,
          icon_label: "Glelements UI logo",
          description: "Lustre UI library utilising Tailwindcss",
          projects: "",
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
  projects projects: String,
  link href: String,
) -> Element(a) {
  let icon_class = icon_class |> option.unwrap(attribute.class("h-full w-full"))
  html.li(
    [
      attribute.class(
        "flex flex-col sm:flex-row gap-2 sm:gap-6 rounded-2xl sm:px-6 sm:py-4 sm:bg-surface-100/25 hover:sm:bg-surface-100/50 dark:sm:bg-surface-700/25 hover:dark:sm:bg-surface-600/25 transition",
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
      html.div(
        [
          attribute.class(
            "grid gap-4 sm:gap-1 leading-6 justify-items-center sm:justify-items-start",
          ),
        ],
        [
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
          html.p(
            [
              attribute.class(
                "text-sm font-semibold text-on-surface-950 dark:text-on-surface-100",
              ),
            ],
            [text(description)],
          ),
          html.div(
            [attribute.class("mt-6 sm:mt-4 markdown")],
            parser.to_lustre(projects),
          ),
        ],
      ),
    ],
  )
}
