# dev_ing - Developer Ingley

[![Package Version](https://img.shields.io/hexpm/v/dev_ing)](https://hex.pm/packages/dev_ing)
[![Hex Docs](https://img.shields.io/badge/hex-docs-ffaff3)](https://hexdocs.pm/dev_ing/)

Further documentation can be found at <https://hexdocs.pm/dev_ing>.

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

## Development

To start the development server, run:

```sh
gleam run -m lustre/dev start
```

This will start a server at `http://localhost:8000` and automatically reload the browser when you make changes to the code.

To run the tests, use:

```sh
gleam test
```

## TODO
What I will need to create to even get started displaying my work and blog posts:
- A simple website and server
- Some form of CMS
