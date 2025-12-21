//// Text content for the about page.
////

import gleam/option.{None, Some}
import lib/project.{Project, TechnologyIconAttributed, TechnologyIconLink}
import lustre/attribute

/// Text content ---------------------------------------------------------------
/// MY CARD
pub const me = "My name is **Callum Ingley**, a seasoned front-end developer
  with over 7 years of experience crafting performant, user-centric web
  applications. I've honed my skills across dynamic startups and distributed
  teams, specializing in modern frameworks like Vue/Nuxt, TypeScript, and
  cutting-edge tooling. My expertise extends to Node.js, design systems, and a
  strong focus on UX-driven development. I'm a proven contributor in
  multi-timezone environments, consistently delivering impactful features to
  production."

pub const frameworks = "I've gained extensive experience with a diverse range
  of frameworks including **Angular**, **React**, **Vue 2.0 & 3.0**, **Nuxt
  3**, **Svelte**, and **Lustre**. I'm proficient in TypeScript, JavaScript,
  HTML5, and CSS/Sass. My work often involves PWAs and **CapacitorJS** for
  cross-platform capabilities, including collaboration with Kotlin/Swift
  codebases for native features.
 
  I leverage modern tooling such  s Git, CI/CD,
  Vite, Pinia, Tailwindcss, Storybook, and Vitest, always with an eye towards
  robust component architecture, accessibility, and responsive design within
  established design systems. I thrive in Agile, remote, and multi-timezone
  collaborative environments."

pub const hobbies = "When I'm not coding, I'll typically be chilling watching
  Twitch/YouTube or playing games with friends."

/// WORK CARD
pub fn wyrd_card() {
  Project(
    title: wyrd_title,
    icon: wyrd_icon,
    icon_class: Some(attribute.class("rounded bg-white")),
    icon_label: wyrd_icon_label,
    description: wyrd_description,
    projects: wyrd_projects,
    link: wyrd_website,
    technologies: wyrd_technologies,
  )
}

pub fn grafa_card() {
  Project(
    title: grafa_title,
    icon: grafa_icon,
    icon_class: None,
    icon_label: grafa_icon_label,
    description: grafa_description,
    projects: grafa_projects,
    link: grafa_website,
    technologies: grafa_technologies,
  )
}

pub const wyrd_title = "Wyrd Technology"

pub const wyrd_icon = "/icons/wyrd-technology-icon.webp"

pub const wyrd_icon_label = "Wyrd Technology logo"

pub const wyrd_description = "Expert software development and engineering
  leadership consultancy to clients worldwide."

pub const wyrd_projects = "
  - Contributed to the [Masabi](https://www.masabi.com/) Voyager team using Vue 3
  and Nuxt 3, shipping a white-label application to production and pushing
  front-end features across multiple timezones.
  - Integrated CapacitorJS for cross-platform capabilities, collaborating with
  Kotlin/Swift codebases for native features and SDK integration.
  - Improved code quality by refactoring legacy components to composables,
  enhancing bundle efficiency and developer experience.
  - Operated in a remote-first environment, utilizing Git-based
  workflows (GitLab) and rigorous peer reviews."

pub const wyrd_technologies = [
  TechnologyIconAttributed(
    label: "Vue",
    alt: "Vue.js logo",
    src: "/icons/vue.webp",
    href: "https://vuejs.org",
    title: "Evan You, https://github.com/yyx990803, CC BY 4.0 <https://creativecommons.org/licenses/by/4.0>, via Wikimedia Commons",
  ),
  TechnologyIconLink(
    label: "Nuxt",
    alt: "Nuxt.js logo",
    src: "/icons/nuxt.webp",
    href: "https://nuxtjs.org",
  ),
  TechnologyIconLink(
    label: "CapacitorJS",
    alt: "CapacitorJS logo",
    src: "/icons/capacitor.webp",
    href: "https://capacitorjs.org",
  ),
  TechnologyIconLink(
    label: "Kotlin",
    alt: "Kotlin logo",
    src: "/icons/kotlin.webp",
    href: "https://kotlinlang.org",
  ),
  TechnologyIconLink(
    label: "Swift",
    alt: "Swift logo",
    src: "/icons/swift.webp",
    href: "https://swift.org",
  ),
  TechnologyIconLink(
    label: "TypeScript",
    alt: "TypeScript logo",
    src: "/icons/typescript.webp",
    href: "https://www.typescriptlang.org",
  ),
  TechnologyIconLink(
    label: "Vite",
    alt: "Vite logo",
    src: "/icons/vite.webp",
    href: "https://vite.dev",
  ),
  TechnologyIconLink(
    label: "CSS3",
    alt: "CSS3 logo",
    src: "/icons/css3.webp",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  ),
  TechnologyIconLink(
    label: "XCode",
    alt: "XCode logo",
    src: "/icons/xcode.webp",
    href: "https://developer.apple.com/xcode/",
  ),
  TechnologyIconLink(
    label: "Slack",
    alt: "Slack logo",
    src: "/icons/slack.webp",
    href: "https://slack.com/intl/en-au/",
  ),
  TechnologyIconLink(
    label: "Jira",
    alt: "Jira logo",
    src: "/icons/jira.webp",
    href: "https://www.atlassian.com/software/jira",
  ),
  TechnologyIconLink(
    label: "Confluence",
    alt: "Confluence logo",
    src: "/icons/confluence.webp",
    href: "https://www.atlassian.com/software/confluence",
  ),
  TechnologyIconLink(
    label: "Git",
    alt: "Git logo",
    src: "/icons/git.webp",
    href: "https://git-scm.com",
  ),
  TechnologyIconLink(
    label: "GitLab",
    alt: "GitLab logo",
    src: "/icons/gitlab.webp",
    href: "https://gitlab.com",
  ),
]

pub const wyrd_website = "https://wyrd-technology.com"

pub const grafa_title = "Grafa"

pub const grafa_icon = "/icons/grafa-icon.webp"

pub const grafa_icon_label = "Grafa logo"

pub const grafa_description = "Finance media technology company that was
  founded with the vision of making finance entertaining so that anyone, from
  any background can learn about money."

pub const grafa_projects = "
  - Built and maintained performant Vue 2/3 and Nuxt applications.
  - Implemented highly reusable components and robust API integrations
  - Improved delivery speed and consistency across projects.
  - Actively supported product iterations through rapid prototyping and close
  collaboration with UX/UI teams
  - Ensured a user-centric approach to development."

pub const grafa_technologies = [
  TechnologyIconAttributed(
    label: "Vue",
    alt: "Vue.js logo",
    src: "/icons/vue.webp",
    href: "https://vuejs.org",
    title: "Evan You, https://github.com/yyx990803, CC BY 4.0 <https://creativecommons.org/licenses/by/4.0>, via Wikimedia Commons",
  ),
  TechnologyIconLink(
    label: "Nuxt",
    alt: "Nuxt.js logo",
    src: "/icons/nuxt.webp",
    href: "https://nuxtjs.org",
  ),
  TechnologyIconLink(
    label: "CapacitorJS",
    alt: "CapacitorJS logo",
    src: "/icons/capacitor.webp",
    href: "https://capacitorjs.org",
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
    label: "Storybook",
    alt: "Storybook logo",
    src: "/icons/storybook.webp",
    href: "https://storybook.js.org",
  ),
  TechnologyIconLink(
    label: "PostGreSQL",
    alt: "PostGreSQL logo",
    src: "/icons/postgresql.webp",
    href: "https://www.postgresql.org",
  ),
  TechnologyIconLink(
    label: "Postman",
    alt: "Postman logo",
    src: "/icons/postman.webp",
    href: "https://www.postman.com",
  ),
  TechnologyIconLink(
    label: "AWS Amplify",
    alt: "AWS Amplify logo",
    src: "/icons/amplify.webp",
    href: "https://aws.amazon.com/amplify/",
  ),
  TechnologyIconLink(
    label: "Git",
    alt: "Git logo",
    src: "/icons/git.webp",
    href: "https://git-scm.com",
  ),
  TechnologyIconLink(
    label: "GitHub",
    alt: "GitHub logo",
    src: "/icons/github.webp",
    href: "https://github.com",
  ),
]

pub const grafa_website = "https://grafa.com"
