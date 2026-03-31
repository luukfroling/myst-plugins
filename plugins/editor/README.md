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

how to add elements etc

## AI usage

good for solidjs -> name examples when using for example codex.