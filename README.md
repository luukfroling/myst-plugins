# myst-plugins

This is (as yet) a non-official repository for MyST plugins.

## Contribute
We welcome new plugins! To share your plugin, please fork this repository, add your plugin, update the gallery table below and include an example page to demonstrate its output, then submit a pull request. Edits and improvements to existing plugins are also encouraged.

We distinguish three levels of plugin maturity:  
* in development: the plugin is still being developed and may have bugs or incomplete features. It may not be fully documented or tested. Use at your own risk.
* tested: the plugin has been tested - at least by two developers - and is functional, but may not be fully documented or may have some limitations. Use with caution.
* stable: the plugin is stable, well-documented, and has been tested by multiple users. It is ready for production use.

Once a plugin reaches the stable level, we will create a release for it - it then becomes available through an url. All other levels require a download from this git repository.

## Gallery of plugins
|name|functionalities|type|requirements|status|maintainer(s)|
|---|---|---|---|---|---|
| experiment | A custom admonition with its transform for converting to pdf | directive & transform | stable | requires a custom css for | Luuk Fröling & Freek Pols |
| pdf_exercise | A plugin that converts exercises and solutions to numbered exercises and solutions in both LaTeX and Typst pdf | transform | |stable |Luuk Fröling & Freek Pols |
| iframe | A plugin that replaces iframe elements with a qr code as figure and a caption with the link so that it is accessible in pdf format | transform | | in development |Luuk Fröling & Freek Pols |
| picsum | A plugin that adds a directive to include random images from picsum.photos | directive | | stable | Angus Hollands |


