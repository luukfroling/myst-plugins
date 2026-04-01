# Jupyter Book Editor

An editor allowing Jupyter Books to be edited in the browser! This project is adapted from the [TeachBook Wizard](https://github.com/TeachBooks/Wizard/tree/main).

## Using the editor

The editor can be added to any Jupyter Book in 2 steps:

1) Add your GitHub repository to `myst.yml` - The editor uses the path to your repository to decide which files to load and edit. 

2) Add the editor-plugin to `myst.yml` -  add [this link](https://github.com/TUD-JB-Templates/JB2_plugins/releases/download/wizard-plugin/wizard.mjs)

To edit the book, a Personal Access Token (PAT) is necessary. More details on how to create a PAT can be found [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token). 

## Overview Editor 

The Editor consists of 3 different components, the web-app, the plugin and the widget. In short, the plugin adds a widget to every page and the widget loads the web-app. The web-app allows people to edit the book online, the widget allows custom JavaScript to be added to the page allowing the web-app to be loaded, and the plugin makes sure the widget does not need to be added to every page individually. 

## Relevant places to contribute

The following three folders are important when making a contribution to the editor: `schema/` defines what the editor can represent, `parser/` converts MyST to that schema and back, and `toolbar/` provides the user interface for the editor. Rough workflow to contribute:

1. Update **`schema/`** to add/adjust the ProseMirror node/mark (and its allowed content/attrs).
2. Update **`parser/`** so the new feature round-trips: MyST > ProseMirror (`myst_to_prosemirror.ts`) and ProseMirror > MyST/Markdown (`prosemirror_to_myst.ts`).
3. (Optional) Update **`toolbar/`** to expose it: add a command, wire it to a button/dropdown, and add plugins/keymaps if needed.

Have a look in the overview below which files contain what parts of the workflow!

### [Parser folder](src/app/src/lib/parser/)

This folder converts between **MyST Markdown** and the editor’s **ProseMirror** document format.

- `README.md`: Overview of how parsing/conversion works and links to relevant docs.
- `index.ts`: Main entrypoint; exposes `parseMyst()` and re-exports conversion/serialization helpers.
- `parse_myst.ts`: Parses raw MyST Markdown text into a MyST AST (and runs MyST transform plugins).
- `myst_to_prosemirror.ts`: Converts a MyST AST into a ProseMirror document (with fallbacks for unsupported nodes).
- `prosemirror_to_myst.ts`: Converts a ProseMirror document back into a MyST AST and can serialize it to MyST Markdown.

### [Schema folder](src/app/src/lib/schema/)

This folder defines the ProseMirror schema used by the editor (the set of allowed nodes/marks and their attributes).

- `index.ts`: The main ProseMirror schema definition (nodes + marks). It describes what content the editor supports (paragraphs, headings, lists, directives, admonitions, math, tables, images, links, etc.) and how each piece is parsed from / rendered to DOM.
- `utils.ts`: Small helpers for defining and validating schema attributes (e.g. `string`, `boolean`, `integer`, `oneOf`).

### [Toolbar folder](src/app/src/lib/toolbar/)

This folder contains the editor toolbar UI plus the ProseMirror commands/plugins it triggers.

- `toolbar_buttons.tsx`: Defines the toolbar **buttons** (undo/redo, format painter, bold/italic/etc., indent/outdent, blockquote, code block) and wires them to editor commands.
- `toolbar_dropdowns.tsx`: Defines the toolbar **dropdowns** (heading level, list type, insert menu). Handles inserting links/images/equations/tables (includes the equation modal + table grid picker).
- `toolbar_commands.ts`: ProseMirror **commands** used by the toolbar (toggle marks, set paragraph/heading, lists, blockquote/code block, and insert link/image/math/table).
- `toolbar_utils.ts`: Shared **helpers** for toolbar behavior (format painter copy/apply, detecting active marks/blocks, list detection, and utilities for tables/code/blockquote like “insert paragraph after” and “delete table”).
- `editor_plugins.ts`: ProseMirror **plugins and keymaps** used by the editor (formatting shortcuts, list Enter/Tab behavior, exiting tables/code/quotes, reference-link normalization/input handling, math deletion, code-block editing helpers like auto-close pairs).


## To do list: 

- [ ] The editor looks for content at the base url of the editor. Content should however be served from the user's GitHub page. 
- [ ] Some unknown/undefined nodes still tend to break the editor. The fallback should be improved. 
 