import gleam/list
import gleam/option.{type Option}
import lib/card
import lustre/attribute.{type Attribute}
import lustre/element.{type Element, text}
import lustre/element/html
import parser
import router

pub type Project(a) {
  Project(
    title: String,
    icon: String,
    icon_class: Option(Attribute(a)),
    icon_label: String,
    description: String,
    projects: String,
    link: String,
    technologies: List(Technology),
  )
}

pub type Technology {
  Technology(label: String)
  TechnologyIcon(label: String, alt: String, src: String)
  TechnologyIconLink(label: String, alt: String, src: String, href: String)
  TechnologyIconAttributed(
    label: String,
    alt: String,
    src: String,
    href: String,
    title: String,
  )
}

/// Renders a card based on a specific coding project.
///
pub fn card(
  project project: Project(a),
) -> Element(a) {
  let icon_class =
    project.icon_class |> option.unwrap(attribute.class("h-full w-full"))

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
              attribute.href(project.link),
              attribute.target("_blank"),
              attribute.class(
                "grid max-w-24 sm:max-w-18 w-full mx-auto sm:mx-0 p-4 h-min relative before:content-[''] before:absolute before:inset-0 before:rounded-lg before:bg-surface-400/25 dark:before:bg-surface-900/25 before:z-0",
              ),
              attribute.aria_label(project.icon_label),
            ],
            [
              html.img([
                attribute.src(router.base_path() <> project.icon),
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
                  attribute.href(project.link),
                  attribute.target("_blank"),
                  attribute.class(
                    "font-semibold text-lg w-fit text-on-surface-900 dark:text-on-surface-50 hover:text-primary-500 hover:dark:text-primary-400",
                  ),
                ],
                [text(project.title)],
              ),
              html.p(
                [
                  attribute.class(
                    "text-sm font-semibold text-on-surface-700 dark:text-on-surface-300",
                  ),
                ],
                [text(project.description)],
              ),
            ],
          ),
        ],
      ),
      card.content(
        [attribute.class("markdown mt-8 ml-8 text-sm")],
        parser.to_lustre(project.projects),
      ),
      card.footer([attribute.class("mt-8")], [
        tech_container(attributes: [], technologies: project.technologies),
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