//// The about page for the website.
//// This page contains information about me, my work, and personal projects.
////

import data/about.{
  type Technology, TechnologyIcon, TechnologyIconAttributed, TechnologyIconLink,
}
import gleam/list
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
          "absolute -top-12 left-[15%] z-0 font-semibold text-5xl blur-[1px] text-on-surface-900/25 dark:text-white/25 uppercase",
        ),
        attribute.id("title"),
      ],
      [
        text("About me"),
      ],
    ),
    html.div(
      [attribute.class("flex flex-col gap-12 mt-16 max-w-[75ch] mx-auto")],
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
  card.basic(
    [
      attribute.class(
        "px-8 py-8 [&]:rounded-3xl [&]:bg-transparent [&]:shadow-none",
      ),
    ],
    [
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
              "absolute right-0 bottom-0 mx-auto opacity-25 max-h-40 max-w-40 h-full w-full rounded-full object-cover border-4 border-primary-300/75 dark:border-primary-400 z-1",
            ),
            attribute.src("/me.jpg"),
          ]),
        ],
      ),
    ],
  )
}

/// Renders a card with my recent work.
///
fn work_card() -> Element(a) {
  card.basic(
    [
      attribute.class(
        "px-6 py-6 sm:px-8 sm:py-8 [&]:rounded-3xl bg-linear-to-b from-surface-200 to-surface-300 dark:from-surface-700 dark:to-surface-800",
      ),
    ],
    [
      card.header([], [
        html.h2([attribute.class("font-semibold text-2xl")], [
          text("Recent Work"),
        ]),
      ]),
      card.content([attribute.class("mt-6")], [
        html.ul([attribute.class("dark:text-white grid gap-8")], [
          line_item(
            title: about.wyrd_title,
            icon: about.wyrd_icon,
            icon_class: None,
            icon_label: about.wyrd_icon_label,
            description: about.wyrd_description,
            projects: about.wyrd_projects,
            link: about.wyrd_website,
            technologies: about.wyrd_technologies,
          ),
          line_item(
            title: about.grafa_title,
            icon: about.grafa_icon,
            icon_class: Some(attribute.class("rounded-full")),
            icon_label: about.grafa_icon_label,
            description: about.grafa_description,
            projects: about.grafa_projects,
            link: about.grafa_website,
            technologies: about.grafa_technologies,
          ),
        ]),
      ]),
    ],
  )
}

/// Renders a card with my personal projects.
///
fn personal_projects_card() -> Element(a) {
  card.basic(
    [
      attribute.class(
        "px-6 py-6 sm:px-8 sm:py-8 [&]:rounded-3xl bg-linear-to-b from-surface-200 to-surface-300 dark:from-surface-700 dark:to-surface-800",
      ),
    ],
    [
      card.header([], [
        html.h2([attribute.class("font-semibold text-2xl")], [
          text("Personal Projects"),
        ]),
      ]),
      card.content([attribute.class("mt-6")], [
        html.ul([attribute.class("dark:text-white grid gap-8")], [
          line_item(
            title: about.dev_ing_title,
            icon: about.dev_ing_icon,
            icon_class: Some(attribute.class("rounded bg-white")),
            icon_label: about.dev_ing_icon_label,
            description: about.dev_ing_description,
            projects: about.dev_ing_projects,
            link: about.dev_ing_website,
            technologies: about.dev_ing_technologies,
          ),
          line_item(
            title: about.glelements_title,
            icon: about.glelements_icon,
            icon_class: None,
            icon_label: about.glelements_icon_label,
            description: about.glelements_description,
            projects: about.glelements_projects,
            link: about.glelements_website,
            technologies: about.glelements_technologies,
          ),
        ]),
      ]),
    ],
  )
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
  technologies technologies: List(Technology),
) -> Element(a) {
  let icon_class = icon_class |> option.unwrap(attribute.class("h-full w-full"))

  html.li(
    [
      attribute.class("grid gap-2 sm:gap-6 rounded-2xl sm:px-6 sm:py-6"),
    ],
    [
      html.div(
        [
          attribute.class("flex gap-2 sm:gap-6 flex-col sm:flex-row"),
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
                    "text-sm font-semibold text-on-surface-700 dark:text-on-surface-300",
                  ),
                ],
                [text(description)],
              ),
            ],
          ),
        ],
      ),
      html.div(
        [attribute.class("markdown ml-8 text-sm")],
        parser.to_lustre(projects),
      ),
      tech_container(attributes: [attribute.class("mt-4")], technologies:),
    ],
  )
}

/// Renders a container for the technologies used in a project.
///
fn tech_container(
  attributes attributes: List(Attribute(msg)),
  technologies technologies: List(Technology),
) -> Element(msg) {
  let tech_items =
    technologies
    |> list.map(fn(tech) {
      case tech {
        TechnologyIcon(_, alt, src) ->
          html.li([], [
            html.img([
              attribute.alt(alt),
              attribute.class(
                "h-5 w-5 object-cover opacity-75 hover:opacity-100 hover:scale-125 transition",
              ),
              attribute.src(src),
            ]),
          ])
        TechnologyIconLink(_, alt, src, href) ->
          html.li([], [
            html.a(
              [
                attribute.class("cursor-pointer"),
                attribute.href(href),
                attribute.target("_blank"),
              ],
              [
                html.img([
                  attribute.alt(alt),
                  attribute.class(
                    "h-5 w-5 object-cover opacity-75 hover:opacity-100 hover:scale-125 transition",
                  ),
                  attribute.src(src),
                ]),
              ],
            ),
          ])
        TechnologyIconAttributed(_, alt, src, href, title) ->
          html.li([], [
            html.a(
              [
                attribute.class("cursor-pointer"),
                attribute.href(href),
                attribute.target("_blank"),
              ],
              [
                html.img([
                  attribute.alt(alt),
                  attribute.class(
                    "h-5 w-5 object-cover opacity-75 hover:opacity-100 hover:scale-125 transition",
                  ),
                  attribute.src(src),
                  attribute.title(title),
                ]),
              ],
            ),
          ])
        _ -> element.fragment([])
      }
    })
  case technologies {
    [] -> element.none()
    _ ->
      html.ul(
        [
          attribute.class(
            "px-6 py-2 rounded-md border border-surface-200 dark:border-surface-600 w-full flex flex-wrap gap-4 justify-center bg-surface-300 dark:bg-surface-700",
          ),
          ..attributes
        ],
        tech_items,
      )
  }
}
