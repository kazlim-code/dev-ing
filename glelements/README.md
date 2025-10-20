# glelements

Gleam Lustre UI elements and components

// TODO: Update Installation to use the glelement dependency from GitHub via SSH
// TODO: Check how to correctly update the glelements submodule to latest commit for local development

## Installation

Add the following to your .gitignore
```.gitignore
glelements/
```

Then add glelements as a submodule for your project. You will
need to input the ssh passphrase in order to clone the
repository.
```sh
git submodule add git@github.com:kazlim-code/glelements.git glelements
```

If you have already previously added glelements as a submodule, then run the following:
```sh
git submodule update --init --recursive
git submodule update --remote
cd glelements && git pull
```

In your `gleam.toml` file ensure the following has been added as a dependency.
```gleam
[dependencies]
glelements = { path = "glelements" }
```

To add the required tailwind styles to your project run the following command:

```sh
gleam run -m glelements/setup
```

This will add the `glelements.css` file to `/assets` directory.
Then import it in your tailwind .css file - `/assets/[YOUR_APP].css` with:

```css
@import "./glelements.css";
```

## Development

```sh
gleam run -m glelements/setup                       # Generate latest css
gleam run -m lustre/dev start                       # Run the project
gleam test                                          # Run the tests
gleam run -m birdie                                 # Review test snapshots
```

## Deploying projects with Glelements to GitHub Pages

Create `/.github/workflows/deploy.yml` workflow file.

```
name: Build and Deploy

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v4
        with:
          submodules: 'true'

      - name: Install SSH Key
        uses: shimataro/ssh-key-action@v2
        with:
          key: ${{ secrets.ACTIONS_SSH_PRIVATE_KEY }}
          known_hosts: |
            github.com ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBEmKSENjQEezOmxkZMy7opKgwFB9nkt5YRrYMjNuG5N87uRgg6CLrbo5wAdT/y6v0mKV0U2w0WZ2YB/++Tpockg=
            github.com ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl
            github.com ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCj7ndNxQowgcQnjshcLrqPEiiphnt+VTTvDP6mHBL9j1aNUkY4Ue1gvwnGLVlOhGeYrnZaMgRK6+PKCUXaDbC7qtbW8gIkhL7aGCsOr/C56SJMy/BCZfxd1nWzAOxSDPgVsmerOBYfNqltV9/hWCqBywINIR+5dIg6JTJ72pcEpEjcYgXkE2YEFXV1JHnsKgbLWNlhScqb2UmyRkQyytRLtL+38TGxkxCflmO+5Z8CSSNY7GidjMIZ7Q4zMjA2n1nGrlTDkzwDCsw+wqFPGQA179cnfGWOWRVruj16z6XyvxvjJwbz0wQZ75XK5tKSb7FNyeIEs4TT4jk+S4dhPeAUC5y+bDYirYgM4GC7uEnztnZyaVWQ7B381AK4Qdrwt51ZqExKbQpTUNn+EjqoTwvqNj4kqx5QUCI0ThS/YkOxJCXmPUWZbhjpCg56i+2aB6CmK2JGhn57K5mj0MNdBXA4/WnwH6XoPWJzK5Nyu2zB3nAZp+S5hpQs+p1vN1/wsjk=

      - name: Initialize Submodules
        run: git submodule update --init --recursive

      - name: Set up Gleam
        uses: erlef/setup-beam@v1
        with:
          otp-version: "28.0"
          gleam-version: "1.12.0"
          rebar3-version: "3"

      - name: Set up Bun
        uses: oven-sh/setup-bun@v1

      - name: Install dependencies
        run: gleam deps download

      - name: Build application
        run: gleam run -m lustre/dev build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

```

Now, for it to work, you need to create an SSH key to allow your project to access the `glelements` project.
Here are the steps:

### 1. Generate a New SSH Key
First, generate a new SSH key pair. **Do not use your personal SSH key.**
When prompted for a file in which to save the key, just press Enter. **Do not
enter a passphrase** (leave it blank) or the action will fail.

Open your terminal and run:
```bash
ssh-keygen -t ed25519 -C "glelements-deploy-key"
```

This will create two files: `id_ed25519` (your private key) and `id_ed25519.pub` (your public key).

### 2. Add the Public Key to `glelements`
1.  Copy the contents of your new **public** key file to your clipboard. You can display it with this command:
```bash
cat ~/.ssh/id_ed25519.pub
```
2.  Go to the `glelements` repository on GitHub.
3.  Go to **Settings > Deploy keys** and click **Add deploy key**.
4.  Give it a title (e.g., "dev_ing workflow").
5.  Paste the public key into the "Key" field.
6.  **Do not** check "Allow write access". Read-only access is sufficient and more secure.
7.  Click **Add key**.
### 3. Add the Private Key to `dev_ing`
1.  Copy the contents of your new **private** key file to your clipboard.
```bash
cat ~/.ssh/id_ed25519
```
2.  Go to your `dev_ing` repository on GitHub.
3.  Go to **Settings > Secrets and variables > Actions** and click **New repository secret**.
4.  Name the secret `ACTIONS_SSH_PRIVATE_KEY`.
5.  Paste the entire private key (including `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----`) into the \"Value\" field.
6.  Click **Add secret**.
### 4. Commit and Push
That's it, just commit any changes and push.
