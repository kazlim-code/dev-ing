//// Text content for the blog pages.
////

import gleam/list
import gleam/string
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

const snippet_length = 200

/// Text content ---------------------------------------------------------------
/// Posts
/// Returns a list of all the blog posts in no particular order.
///
pub fn all_posts() {
  [
    Post(
      id: "what-is-jj",
      created: datetime.literal("2024-11-17T20:00:00+08:00"),
      latest: datetime.literal("2024-11-17T20:00:00+08:00"),
      author: "Callum Ingley",
      title: "Experimenting with VCS other than Git",
      snippet: what_is_jj_content |> string.slice(0, snippet_length),
      content: what_is_jj_content,
      tags: [JJ],
    ),
  ]
}

/// Finds a single BlogPost in a list by matching its ID.
///
/// Returns:
/// - Ok(blog_post) if a post with the matching ID is found.
/// - Error(Nil) if no post with the matching ID is found.
///
pub fn find_post_by_id(post_id id: String) -> Result(BlogPost, Nil) {
  all_posts()
  |> list.find(fn(post) { post.id == id })
}

pub const what_is_jj_content = "
# Experimenting with VCS other than Git

## Learning Jujutsu

- Why did I want to change
  - I was happy with using Git but didn't actually use the command line
  arguments/flags. I was in a happy place using LazyGit in my terminal based
  workflow along side neovim.
  - I saw a video on Youtube that explained that using jujutsu could make a lot
  of difficult/impossible Git workflows possible
    - Most original flows were mentioning moving commits or \"revisions\" around
    but that currently seemed easy enough using LazyGit
    - The thing that really drew me in was the fact that the current working
    space is always in a committed state, thus allowing you to leave a \"branch\"
    of work easily if you needed to swap to a different feature
      - I've run into many situations talking to coworkers requiring me to help
      them with their work on another branch with my response being, \"Yes, I
      can look into that in a bit, just resolving a merge conflict right now.\"

## What is Jujutsu

In a nutshell, Jujutsu is a version control system, developed by Martin von
Zweigbergk as a hobby project at Google, that takes inspiration and features
from popular VCS's and is Git-compatible. This means that you should hopefully
be able to use JJ as your VCS locally while collaborating with others on a
project that uses Git as its backend and your team mates should be none the
wiser.

Funny fact, the name Jujutsu actually came after the initials JJ. This was
because JJ just came from the easy keypress combination to access it via the
commandline.
"
