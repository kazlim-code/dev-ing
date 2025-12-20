# dev_ing - Developer Ingley

## Description

This project is most likely going to end up being a front facing web
application where I can showcase my own person development work and learnings.

## Features

- SPA written in Gleam using Lustre
- CMS capable of simple blog functionality
- Potential to host/reference other projects and demos (most likely written in Gleam too)

## Technology stack

I'm planning on using Gleam as the backbone of this since I can make use of
strongly typed language that works on both the front/backend that compiles to
javascript. It is a fairly new language that I have been learning on and off
and being new to functional programming I'd like to continue using it to
improve my knowledge in this area.

- Gleam
  - SPA
    - Lustre
- Database
  - Mysql?
    - What Gleam libraries can I use here?
- Hosting
  - Will GitHub pages suffice for now?
    - Using GitHub pages has a few limitations
      - SPA/static
      - No server/database/backend
      - Issues with trying to use environment variables

## Development

To start the development server, run:

```sh
gleam run -m lustre/dev start
```

This will start a server at `http://localhost:1234` and automatically reload
the browser when you make changes to the code.

To run the tests, use:

```sh
gleam test
```

## Build

```sh
gleam run -m lustre/dev build --minify=true
```

## Troubleshooting

### dependencies

If you are running into issues after running `gleam update`, try the following:

- `gleam clean`
- Delete **manifest.toml** and run `gleam update`

### Glelements

If you need to remove the glelements submodule:

1. Deinit the submodule

```sh
git submodule deinit glelements
```
1. Remove the submodule directory from your project:

```sh
rm -rf glelements
```
1. Remove the cached directory from git cache.

```sh
git rm -r --cached glelements
```
1. Check the .git/modules and remove glelements from there if it still exists.
2. It's also usually a good idea to remove glelements package from `gleam.toml` and running:

```sh
gleam clean
```

## TODO

What I will need to create to even get started displaying my work and blog posts:

- A simple website, server can come later after moving from GitHub pages to a different host.
- Some form of CMS
