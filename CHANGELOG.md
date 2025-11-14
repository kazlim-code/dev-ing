# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Moved icons from /assets to /assets/icons

## 0.1.2 - 2025-11-13

### Added

- Added cross fade view transitions for navigation changes

## 0.1.1 - 2025-11-12

### Added

- A content rendering pipeline to convert Markdown strings into Lustre UI elements.
  - WIP: Build currently fails as dependency Mork does not support Bun due to
  an upstream crash bug.
- Added content for 'About' page with personal, work, and project information.

### Changed

- General styling of navigation, about page content width and card styling

## [0.1.0] - 2025-11-03

### Added

- Initial project setup as a Gleam Single Page Application using the Lustre framework.
- Client-side routing implemented for Home, About, and Blog pages using `modem`.
- A dark mode theme toggle.
- Placeholder pages for the 'Home' and 'Blog' sections.
