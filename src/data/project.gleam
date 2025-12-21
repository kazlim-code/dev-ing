import gleam/option.{None, Some}
import lib/project.{Project, TechnologyIconLink}
import lustre/attribute

/// PERSONAL PROJECTS CARD
pub fn dev_ing_card() {
  Project(
    title: dev_ing_title,
    icon: dev_ing_icon,
    icon_class: Some(attribute.class("rounded bg-white")),
    icon_label: dev_ing_icon_label,
    description: dev_ing_description,
    projects: dev_ing_projects,
    link: dev_ing_website,
    technologies: dev_ing_technologies,
  )
}

pub fn glelements_card() {
  Project(
    title: glelements_title,
    icon: glelements_icon,
    icon_class: None,
    icon_label: glelements_icon_label,
    description: glelements_description,
    projects: glelements_projects,
    link: glelements_website,
    technologies: glelements_technologies,
  )
}

pub const dev_ing_title = "Dev.Ing - This website!!!"

pub const dev_ing_icon = "/icons/dev-ing.webp"

pub const dev_ing_icon_label = "Dev.Ing logo"

pub const dev_ing_description = "Dev.Ing is a platform for developers to share their knowledge and expertise through articles, tutorials, and other resources."

pub const dev_ing_projects = "
  - Created the Dev.Ing platform to showcase my skillset and document my learnings
  - Learned Functional Programming with Gleam and built the site using Lustre
  - Learned how to host the Lustre build via GitHub pages
"

pub const dev_ing_technologies = [
  TechnologyIconLink(
    label: "Gleam",
    alt: "Gleam logo",
    src: "/icons/lucy.webp",
    href: "https://gleam.run",
  ),
  TechnologyIconLink(
    label: "Gleam (JavaScript)",
    alt: "Gleam (JavaScript) logo",
    src: "/icons/lucyjs.webp",
    href: "https://gleam.run",
  ),
  TechnologyIconLink(
    label: "Lustre",
    alt: "Lustre logo",
    src: "/icons/lustre.webp",
    href: "https://lustre.build",
  ),
  TechnologyIconLink(
    label: "Tailwindcss",
    alt: "Tailwindcss logo",
    src: "/icons/tailwindcss.webp",
    href: "https://tailwindcss.com",
  ),
  TechnologyIconLink(
    label: "JavaScript",
    alt: "JavaScript logo",
    src: "/icons/javascript.webp",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  ),
  TechnologyIconLink(
    label: "CSS3",
    alt: "CSS3 logo",
    src: "/icons/css3.webp",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  ),
  TechnologyIconLink(
    label: "Neovim",
    alt: "Neovim logo",
    src: "/icons/neovim.webp",
    href: "https://neovim.io",
  ),
  TechnologyIconLink(
    label: "Jujutsu",
    alt: "Jujutsu logo",
    src: "/icons/jj-logo.webp",
    href: "https://jj-vcs.github.io/jj/latest/",
  ),
  TechnologyIconLink(
    label: "GitHub",
    alt: "GitHub logo",
    src: "/icons/github.webp",
    href: "https://github.com",
  ),
]

pub const dev_ing_website = "http://www.github.com/kazlim-code/dev-ing"

pub const glelements_title = "Glelements"

pub const glelements_icon = "/icons/glelements.webp"

pub const glelements_icon_label = "Glelements UI logo"

pub const glelements_description = "Glelements is a library of reusable components for building web applications utilising Tailwindcss."

pub const glelements_projects = "
  - Developed a set of UI components for use in web applications
  - Implemented accessibility best practices to ensure all users can interact with the components
"

pub const glelements_technologies = [
  TechnologyIconLink(
    label: "Gleam",
    alt: "Gleam logo",
    src: "/icons/lucy.webp",
    href: "https://gleam.run",
  ),
  TechnologyIconLink(
    label: "Gleam (JavaScript)",
    alt: "Gleam (JavaScript) logo",
    src: "/icons/lucyjs.webp",
    href: "https://gleam.run",
  ),
  TechnologyIconLink(
    label: "Lustre",
    alt: "Lustre logo",
    src: "/icons/lustre.webp",
    href: "https://lustre.build",
  ),
  TechnologyIconLink(
    label: "Tailwindcss",
    alt: "Tailwindcss logo",
    src: "/icons/tailwindcss.webp",
    href: "https://tailwindcss.com",
  ),
  TechnologyIconLink(
    label: "JavaScript",
    alt: "JavaScript logo",
    src: "/icons/javascript.webp",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  ),
  TechnologyIconLink(
    label: "CSS3",
    alt: "CSS3 logo",
    src: "/icons/css3.webp",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  ),
  TechnologyIconLink(
    label: "Neovim",
    alt: "Neovim logo",
    src: "/icons/neovim.webp",
    href: "https://neovim.io",
  ),
  TechnologyIconLink(
    label: "Jujutsu",
    alt: "Jujutsu logo",
    src: "/icons/jj-logo.webp",
    href: "https://jj-vcs.github.io/jj/latest/",
  ),
  TechnologyIconLink(
    label: "GitHub",
    alt: "GitHub logo",
    src: "/icons/github.webp",
    href: "https://github.com",
  ),
]

pub const glelements_website = "#"
