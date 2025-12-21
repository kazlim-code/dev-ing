import data/about
import data/project
import gleam/list
import lib/card
import lib/project as project_component
import lustre/attribute
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
    project.dev_ing_card(),
    project.glelements_card(),
  ])
}

/// Renders an about section with a title and a list of project cards.
///
fn card_section(
  title title: String,
  projects projects: List(project_component.Project(a)),
) -> Element(a) {
  let project_cards =
    list.map(projects, fn(project) -> Element(a) {
      html.li([], [
        project_component.card(project: project),
      ])
    })
  html.section([], [
    html.h2([attribute.class("font-semibold text-2xl dark:text-white")], [
      text(title),
    ]),

    html.ul([attribute.class("dark:text-white grid gap-8 mt-8")], project_cards),
  ])
}
