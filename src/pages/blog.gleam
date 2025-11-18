//// The blog section of the website.
//// This shows a list of the latest blog posts and is also responsible for
//// displaying full individual posts via slugs.
////

import data/blog
import gleam/list
import gleam/option.{type Option, None, Some}
import lib/card
import lustre/attribute
import lustre/element.{type Element, text}
import lustre/element/html
import tempo
import tempo/datetime

// import parser

const datetime_format = "ddd, DD MMMM YYYY h:mm A"

/// View -----------------------------------------------------------------------
/// A fragment that renders the content for the blog page - for both viewing a
/// blog post or showing all the latest posts.
///
pub fn content_fragment(post_id id: Option(String)) -> Element(msg) {
  case id {
    Some(id) -> post_content_for_id(id)
    None -> blog_posts()
  }
}

///
///
fn blog_posts() -> Element(msg) {
  element.fragment([
    html.h1(
      [
        attribute.class(
          "absolute -top-12 left-[15%] z-0 font-semibold text-5xl blur-[1px] text-on-surface-900/25 dark:text-white/25 uppercase",
        ),
        attribute.id("title"),
      ],
      [
        text("Latest posts"),
      ],
    ),
    html.div(
      [
        attribute.class("flex flex-col gap-12 mt-16 max-w-[75ch] mx-auto py-8"),
      ],
      blog.all_posts() |> list.map(post_to_snippet),
    ),
  ])
}

/// Gets the markdown content for a post by its post id.
///
/// Returns:
/// - html article content if a post with the matching ID is found.
/// - element none if no post with the matching ID is found.
///
fn post_content_for_id(post_id id: String) -> Element(msg) {
  let post = blog.find_post_by_id(id)

  case post {
    Ok(post) -> post_to_article(post)
    Error(_) -> element.none()
  }
}

///
///
fn post_to_article(post post: blog.BlogPost) -> Element(msg) {
  html.article([], [text(post.content)])
}

/// Displays a short snippet of the blog post for viewing in a list.
///
fn post_to_snippet(post post: blog.BlogPost) -> Element(msg) {
  let href = "/blog/" <> post.id

  card.basic(
    [
      attribute.class("relative px-8 py-6 [&]:rounded-3xl"),
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
                "text-sm text-on-surface-400 dark:text-on-surface-dark-300",
              ),
            ],
            [
              text("By "),
              html.span([], [text(post.author)]),
              text(" on "),
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
            ],
          ),
        ],
      ),
      card.content([attribute.class("mt-2 pb-4 text-sm")], [
        text(post.snippet <> "..."),
      ]),
      card.footer(
        [attribute.class("absolute bottom-2 right-6 text-md flex justify-end")],
        [
          html.a(
            [
              attribute.class("text-accent dark:text-accent-dark font-semibold"),
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
