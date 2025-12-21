import lib/card
import lustre/attribute
import lustre/element.{type Element, text}
import lustre/element/html
import parser
import router
import tempo.{type DateTime}
import tempo/datetime

pub type Tag {
  JJ
}

pub type BlogPost {
  Post(
    id: String,
    created: DateTime,
    latest: DateTime,
    author: String,
    title: String,
    snippet: String,
    content: String,
    tags: List(Tag),
  )
}

const datetime_format = "ddd, DD MMMM YYYY h:mm A"

/// Displays a short snippet of the blog post for viewing in a list.
///
pub fn post_to_snippet(post post: BlogPost) -> Element(msg) {
  let href = router.base_path() <> "/blog#" <> post.id

  card.basic(
    [
      attribute.class("relative px-6 py-6 [&]:rounded-3xl"),
    ],
    [
      html.header(
        [
          attribute.class("flex flex-col gap-1"),
        ],
        [
          html.h2([attribute.class("text-xl font-semibold")], [
            html.a([attribute.href(href)], [text(post.title)]),
          ]),
          html.p(
            [
              attribute.class(
                "text-xs text-on-surface-400 dark:text-on-surface-dark-300 flex gap-1 justify-between",
              ),
            ],
            [
              html.time(
                [
                  attribute.attribute(
                    "datetime",
                    datetime.to_string(post.created),
                  ),
                ],
                [
                  text(datetime.format(
                    post.created,
                    tempo.Custom(datetime_format),
                  )),
                ],
              ),
              html.span([], [
                text("By "),
                html.span([], [text(post.author)]),
              ]),
            ],
          ),
        ],
      ),
      card.content(
        [attribute.class("markdown mt-2 pb-4 text-xs")],
        { post.snippet <> "..." } |> parser.to_lustre,
      ),
      card.footer(
        [attribute.class("absolute bottom-4 right-6 text-md flex justify-end")],
        [
          html.a(
            [
              attribute.class(
                "text-on-surface-700 hover:text-primary-600 dark:text-on-surface-200 font-semibold text-sm",
              ),
              attribute.href(href),
              attribute.aria_label("Read more about " <> post.title),
            ],
            [text("Read more")],
          ),
        ],
      ),
    ],
  )
}
