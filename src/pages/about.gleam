//// The about page for the website.
//// This page contains information about me, my work, and personal projects.
////

import data/about.{
  type Technology, TechnologyIcon, TechnologyIconAttributed, TechnologyIconLink,
}
import gleam/list
import gleam/option.{type Option}
import lib/card
import lustre/attribute.{type Attribute}
import lustre/element.{type Element, text}
import lustre/element/html
import parser
import router

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
        work_section(),
        personal_projects_section(),
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
        "px-0 py-0 mt-8 [&]:rounded-3xl [&]:bg-transparent [&]:shadow-none",
      ),
    ],
    [
      card.content(
        [
          attribute.class("grid items-center gap-8 relative"),
        ],
        [
          html.div(
            [
              attribute.class(
                "dark:text-white text-md grid gap-4 leading-6 z-1",
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
            attribute.src(router.base_path() <> "/me.jpg"),
          ]),
        ],
      ),
    ],
  )
}

/// Renders a section with my recent work.
///
fn work_section() -> Element(a) {
  card_section(title: "Recent Work", projects: [
    about.wyrd_card(),
    about.grafa_card(),
  ])
}

/// Renders a section with my personal projects.
///
fn personal_projects_section() -> Element(a) {
  card_section(title: "Personal Projects", projects: [
    about.dev_ing_card(),
    about.glelements_card(),
  ])
}

/// Renders an about section with a title and a list of project cards.
///
fn card_section(
  title title: String,
  projects projects: List(about.Project(a)),
) -> Element(a) {
  let project_cards =
    list.map(projects, fn(project) -> Element(a) {
      html.li([], [
        project_card(
          title: project.title,
          icon: project.icon,
          icon_class: project.icon_class,
          icon_label: project.icon_label,
          description: project.description,
          projects: project.projects,
          link: project.link,
          technologies: project.technologies,
        ),
      ])
    })
  html.section([], [
    html.h2([attribute.class("font-semibold text-2xl dark:text-white")], [
      text(title),
    ]),

    html.ul([attribute.class("dark:text-white grid gap-8 mt-8")], project_cards),
  ])
}

/// Renders a card based on a specific coding project.
///
fn project_card(
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

  card.basic(
    [
      attribute.class(
        "px-6 py-6 sm:px-8 sm:py-8 [&]:rounded-3xl bg-linear-to-b from-surface-200 to-surface-300 dark:from-surface-700 dark:to-surface-800",
      ),
    ],
    [
      card.header(
        [attribute.class("flex gap-2 sm:gap-6 flex-col sm:flex-row")],
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
                attribute.src(router.base_path() <> icon_src),
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
      card.content(
        [attribute.class("markdown mt-8 ml-8 text-sm")],
        parser.to_lustre(projects),
      ),
      card.footer([attribute.class("mt-8")], [
        tech_container(attributes: [], technologies:),
      ]),
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
              attribute.src(router.base_path() <> src),
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
                  attribute.src(router.base_path() <> src),
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
                  attribute.src(router.base_path() <> src),
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
            "px-6 py-2 rounded-md border border-surface-400 dark:border-surface-600 w-full flex flex-wrap gap-4 justify-center bg-surface-200 dark:bg-surface-700",
          ),
          ..attributes
        ],
        tech_items,
      )
  }
}
