import data/blog
import data/project
import gleam/list
import lib/blog as blog_component
import lib/card
import lib/project as project_component
import lustre/attribute
import lustre/element.{type Element, text}
import lustre/element/html
import router

/// View -----------------------------------------------------------------------
/// A fragment that renders the content for the home page.
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
        text("Home"),
      ],
    ),
    html.div(
      [attribute.class("flex flex-col gap-12 mt-16 max-w-[75ch] mx-auto pb-12")],
      [
        hero_section(),
        whats_new(),
        latest_projects(),
        featured_articles(),
      ],
    ),
  ])
}

/// Hero Section
///
fn hero_section() -> Element(a) {
  html.section([attribute.class("flex flex-col gap-6 py-8")], [
    html.h1(
      [
        attribute.class(
          "font-bold text-5xl text-on-surface-900 dark:text-white leading-tight",
        ),
      ],
      [
        text("Continuous Learning & Development"),
      ],
    ),
    html.p(
      [
        attribute.class(
          "text-xl text-on-surface-600 dark:text-on-surface-200 leading-relaxed",
        ),
      ],
      [
        text(
          "Welcome to dev_ing, my personal space for sharing knowledge, projects, and experiences in software engineering. Join me as I build, learn, and share.",
        ),
      ],
    ),
    html.div([attribute.class("flex gap-4 mt-2")], [
      html.a(
        [
          attribute.href(router.base_path() <> "/about"),
          attribute.class(
            "px-6 py-3 rounded-full bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors",
          ),
        ],
        [text("About Me")],
      ),
    ]),
  ])
}

/// Section containing any new content to be surfaced on the front page
///
pub fn whats_new() -> Element(a) {
  let latest_post = blog.all_posts() |> list.first()

  let content = case latest_post {
    Ok(post) -> blog_component.post_to_snippet(post)
    Error(_) ->
      card.basic(
        [
          attribute.class(
            "px-6 py-6 sm:px-8 sm:py-8 [&]:rounded-3xl bg-linear-to-b from-surface-200 to-surface-300 dark:from-surface-700 dark:to-surface-800 transform-gpu",
          ),
        ],
        [
          html.p([], [text("No new updates yet.")]),
        ],
      )
  }

  html.section([attribute.class("flex flex-col gap-6")], [
    html.h2(
      [
        attribute.class(
          "font-semibold text-3xl text-on-surface-900 dark:text-white",
        ),
      ],
      [text("What's New")],
    ),
    content,
  ])
}

/// Latest Projects Section
///
fn latest_projects() -> Element(a) {
  let projects = [project.dev_ing_card(), project.glelements_card()]

  let project_cards =
    projects
    |> list.map(fn(project) { project_component.card(project: project) })

  html.section([attribute.class("flex flex-col gap-6")], [
    html.h2(
      [
        attribute.class(
          "font-semibold text-3xl text-on-surface-900 dark:text-white",
        ),
      ],
      [text("Latest Projects")],
    ),
    html.div([attribute.class("grid grid-cols-1 gap-6")], project_cards),
  ])
}

/// Featured Articles Section
///
fn featured_articles() -> Element(a) {
  html.section([attribute.class("flex flex-col gap-6")], [
    html.h2(
      [
        attribute.class(
          "font-semibold text-3xl text-on-surface-900 dark:text-white",
        ),
      ],
      [text("Featured Articles")],
    ),
    // Placeholder content
    html.p(
      [
        attribute.class("text-on-surface-500 dark:text-on-surface-400 italic"),
      ],
      [text("Curated articles coming soon...")],
    ),
  ])
}
