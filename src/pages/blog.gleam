//// The blog section of the website.
//// This shows a list of the latest blog posts and is also responsible for
//// displaying full individual posts via slugs.
////

import data/blog
import gleam/list
import gleam/option.{type Option, None, Some}
import lib/blog as blog_component
import lustre/attribute
import lustre/element.{type Element, text}
import lustre/element/html
import parser
import router


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
      blog.all_posts() |> list.map(blog_component.post_to_snippet),
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
        attribute.class("flex gap-1 dark:text-white"),
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
fn post_to_article(post post: blog_component.BlogPost) -> Element(msg) {
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


