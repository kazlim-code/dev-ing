# glelements

Gleam Lustre UI elements and components

## Installation

```gleam
[dependencies]
glelements = { path = "/PATH/TO/glelements" }
```

To add the required tailwind styles to your project run the following command:

```sh
gleam run -m glelements/setup
```

This will add the `glelements.css` file to `/priv/static` directory.
Then import it in your tailwind .css file - [YOUR_APP].css with:

```css
@import "../priv/static/glelements";
```

## Development

```sh
gleam run -m glelements/setup                       # Generate latest css
gleam run -m lustre/dev start --entry="demo/demo"   # Run the project
gleam test                                          # Run the tests
gleam run -m birdie                                 # Review test snapshots
```
