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
import parser
import router
import tempo
import tempo/datetime

const datetime_format = "ddd, DD MMMM YYYY h:mm A"

/// View -----------------------------------------------------------------------
/// A fragment that renders the content for the blog page - for both viewing a
/// blog post or showing all the latest posts.
///
pub fn content_fragment(post_id id: Option(String)) -> Element(msg) {
  case id {
    Some(id) -> blog_post(id)
    None -> latest_blog_posts()
  }
}

/// Latest blog page content.
///
fn latest_blog_posts() -> Element(msg) {
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

/// Gets the blog content page for a specific blog post from its id.
///
fn blog_post(post_id id: String) -> Element(msg) {
  html.div([attribute.class("flex flex-col gap-4")], [
    html.a(
      [
        attribute.href(router.base_path() <> "/blog"),
        attribute.class("flex gap-1"),
      ],
      [
        html.span([], [text("\u{2190}")]),
        html.span([], [text("BACK")]),
      ],
    ),
    post_content_for_id(id),
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

/// Generates the associated article html from a blog post.
///
fn post_to_article(post post: blog.BlogPost) -> Element(msg) {
  html.article([attribute.class("mx-auto max-w-[75ch]")], [
    html.header([], [
      html.h1(
        [attribute.class("text-5xl text-on-surface-900 dark:text-white")],
        [text(post.title)],
      ),
    ]),
    html.div(
      [attribute.class("markdown mt-10")],
      post.content |> parser.to_lustre,
    ),
  ])
}

/// Displays a short snippet of the blog post for viewing in a list.
///
fn post_to_snippet(post post: blog.BlogPost) -> Element(msg) {
  let href = "/blog#" <> post.id

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
        [attribute.class("absolute bottom-2 right-6 text-md flex justify-end")],
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
