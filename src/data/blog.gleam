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

const snippet_length = 300

/// Text content ---------------------------------------------------------------
/// Posts
/// Returns a list of all the blog posts in no particular order.
///
pub fn all_posts() {
  [
    // Post(
    //   id: "what-is-jj",
    //   created: datetime.literal("2024-11-17T20:00:00+11:00"),
    //   latest: datetime.literal("2024-12-07T14:00:00+11:00"),
    //   author: "Callum Ingley",
    //   title: "Experimenting with VCS other than Git",
    //   snippet: what_is_jj_snippet
    //     |> string.slice(0, snippet_length)
    //     |> string.trim,
    //   content: what_is_jj_content,
    //   tags: [JJ],
    // ),
    Post(
      id: "what-is-dev-ing",
      created: datetime.literal("2024-12-07T20:00:00+11:00"),
      latest: datetime.literal("2024-12-07T20:00:00+11:00"),
      author: "Callum Ingley",
      title: "What is Dev_Ing - Learning to blog",
      snippet: what_is_dev_ing_snippet
        |> string.slice(0, snippet_length)
        |> string.trim,
      content: what_is_dev_ing_content,
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

pub const what_is_dev_ing_snippet = "
Welcome to dev_ing, my personal space for
continuous learning, practice, and sharing within the vast world of software
development. This blog serves as a dynamic journal where I'll be exploring a
diverse range of topics, including programming fundamentals, cutting-edge web
development techniques, essential tools, and best practices that elevate code
quality and efficiency. While the primary focus will be on technical
subjects, don't be surprised if some personal interests occasionally weave
their way into the narrative!"

pub const what_is_dev_ing_content = "
Welcome to dev_ing, my personal space for
continuous learning, practice, and sharing within the vast world of software
development. This blog serves as a dynamic journal where I'll be exploring a
diverse range of topics, including programming fundamentals, cutting-edge web
development techniques, essential tools, and best practices that elevate code
quality and efficiency. While the primary focus will be on technical
subjects, don't be surprised if some personal interests occasionally weave
their way into the narrative!

## Why dev_ing?

My journey into creating this platform is rooted in a few core beliefs about
effective learning and personal growth. For me, I've found that true
understanding often solidifies only after actively practicing and
implementing concepts I've read or heard about. Passively consuming material
and content leads me to feel like I understand but I fail to be able to
implement or regurgitate my learnings while retention fades too. So dev_ing
is my commitment to bridging that gap through hands-on application.

Secondly, I'm dedicated to honing my documentation skills. Making clear,
concise, and helpful notes should be a natural extension of the development
process, not an afterthought. This blog will be a training ground for making
documentation an integral part of my workflow. This should be made even
easier with the use of AI such that I can often dot point my ideas and then
allow it to expand upon my learnings while using better or more concise
wording. English was always a more difficult subject for me since my brain
often becomes blocked on particular words.

Furthermore, with the sheer volume of information encountered daily, it's easy
to forget intricate details of what I've learned. dev_ing will act as a
centralized, searchable repository of my accumulated knowledge, allowing me
to revisit past topics and reinforce my understanding whenever needed.

Beyond personal learning, this platform will also serve as a central hub to
link and showcase the personal projects I'm working on, providing a more
cohesive overview of my practical endeavors.

Finally, and perhaps most excitingly, dev_ing is itself a learning project.
It's built with Gleam and Lustre, allowing me to dive deep into these
fascinating technologies and document my experience with them firsthand.

**Join me as I build, learn, and share!**"

pub const what_is_jj_snippet = "
When doing my casual exploring of the web and
youtube, I came across a [video that caught my
interest](https://www.youtube.com/watch?v=MR6KSB6I_60&t=4s) that discussed a
Version Control System (VCS) that seemed to flip the standard Git process on
its head and allow for more flexibility with your workflow process. Now I
have only previously used Git in the past and even more recently had been
happy working with a LazyGit workflow but was very intrigued with some of the
ideas that this VCS was putting forth.
"

pub const what_is_jj_content = "
When doing my casual exploring of the web and
youtube, I came across a [video that caught my
interest](https://www.youtube.com/watch?v=MR6KSB6I_60&t=4s) that discussed a
Version Control System (VCS) called Jujutsu that seemed to flip the standard
Git process on its head and allow for more flexibility with your workflow
process. Now I have only previously used Git in the past and even more
recently had been happy working with a LazyGit workflow but was very
intrigued with some of the ideas that this VCS was putting forth.

## So what is Jujutsu?

In a nutshell, [Jujutsu](https://jj-vcs.github.io/jj/latest/) is a version
control system, developed by Martin von Zweigbergk as a hobby project at
Google, that takes inspiration and features from popular VCS's and is
Git-compatible. This means that you should hopefully be able to use JJ as
your VCS locally while collaborating with others on a project that uses Git
as its backend and your team mates should be none the wiser.

Funny fact, the name Jujutsu actually came after the initials JJ. This was
because JJ just came from the easy keypress combination to access it via the
commandline.

## A Shift in Perspective: New Terminology, New Mindset

The first step to understanding `jj` is to learn its language. The changes seem
subtle, but they represent a significant shift in the mental model of version
control.

- `commit` -> **`revision`**: In `jj`, everything is a revision. It's a
snapshot of your repository, just like a Git commit. However, `jj` treats them
as more malleable and lightweight entities. The distinction becomes clearer
when you realize your uncommitted work is simply a temporary \"working-copy
revision.\"

- `branch` -> **`bookmark`**: Where Git uses branches to point to a line of
development, `jj` uses bookmarks. Bookmarks are lightweight, movable labels.
This change encourages you to think less about the \"branch\" you are on and more
about the chain of revisions you are creating.

## Why use JJ?

- It is designed from the ground up to be easy to use—whether you're new or
experienced, working on brand new projects alone, or large scale software
projects with large histories and teams.
- Internally it abstracts the user interface and version control algorithms
from the storage systems used to serve your content.
- Allows it to serve as a VCS with many possible physical backends

What really intrigued me with using `jj` is its \"working copy as a commit\"
model. Your work is always part of a temporary revision, which completely
changes the game for context switching.

Here are a couple of familiar scenarios that `jj` makes painless:

**Scenario 1: The Urgent Interruption**

You're deep in a feature, but your changes aren't ready for a formal commit. A
coworker needs you to review their work on another branch.

- **Without `jj`:** You'd `git stash` your work, maybe try to name it
descriptively, switch branches, and later try to remember which stash to `pop`.
It's a clumsy interruption of your flow.
- **With `jj`:** You just switch. Run `jj git fetch -b <BRANCH-NAME>` and your
  current work is kept safe in its own revision. When you're done, `jj edit
<original-revision>` brings you right back. No stashing needed.

**Scenario 2: The Mid-Conflict Detour**

You're untangling a nasty merge conflict and someone needs your help.

- **Without `jj`:** You're stuck. You either tell them to wait or you abort the
merge, losing your progress on the conflict resolution.
- **With `jj`:** Conflicts are stored as part of the revision's state. You can
simply check out another revision, do your work, and come back later. The
conflict state, including any partial resolutions, will be waiting for you.

## Key Features

Jujutsu is built on a foundation of powerful concepts that enable the fluid
workflows mentioned earlier. Many of these are inspired by other version
control systems, while some are unique innovations.

- **Working-Copy-as-a-Commit:** As highlighted in the scenarios above, your
file changes are automatically recorded in a temporary revision. This is the
feature that subsumes `git stash` and the staging area, simplifying the data
model so you only have to think about revisions.

- **Operation Log & Undo:** Every operation that modifies the repository's
history is recorded. This means you have a complete log of your actions and can
reverse a mistake at any time with a simple `jj undo`. It brings the safety of
an \"undo\" button to version control.

- **Automatic Rebase:** When you modify a revision (e.g., to change its
description), `jj` automatically and transparently rebases all its descendants.
This makes history editing feel effortless compared to a manual interactive
rebase in Git.

- **First-Class Conflicts:** Conflicts are not just text markers in a file;
they are treated as first-class objects in `jj`'s data model. This is what
allows you to check out other revisions even with a conflict pending.

- **Git-Compatible:** `jj` works with existing Git repositories. You can use it
as a powerful local client while your collaborators continue to use their
standard Git workflows. To them, your work will appear as normal commits.

## Useful Findings

The most significant finding has been the mental model shift. Once you stop
thinking in terms of `git stash` and start trusting the operation log, your
workflow becomes dramatically more fluid. The `jj undo` command provides a
safety net that encourages you to experiment and move faster.

## Downsides?

While the experience has been overwhelmingly positive, it's worth noting that
`jj` is still a young project compared to the decades-old Git. While the core
is stable, some advanced or experimental features are subject to change. The
community is active and growing but smaller, so finding answers to obscure
problems is challenging. A lot of the newer useful Git features are also not
supported yet so depending on project setups, you may not be able to use `jj`
behind the scenes.

## Thoughts?

My journey with Jujutsu is just beginning, but it has already been
transformative. It eliminates sources of friction I had long accepted as a
normal part of version control. By rethinking fundamental concepts, `jj`
provides a more fluid, flexible, and forgiving workflow. If you've ever felt
constrained by the Git dance of stashing, staging, and committing, I highly
recommend giving `jj` a try.
"
