---
exports:
    - format: typst
      template: https://github.com/myst-templates/plain_typst_book.git
      output: exports/iframe-to-qr.pdf
      id: iframe-to-qr
downloads:
    - id: iframe-to-qr
---

# iframe-to-qr pdf

This plugin will replace every iframe directive with the youtube thumbnail for PDF builds, as well as a qr code pointing to the video. 

```{iframe} https://www.youtube.com/embed/seKOq-VMJgY?si=NjrDJRkoPczQbznv
Overview of Jupyter Book
```

In case the iframe does not contain a youtube video, only the qr code will be used. 

```{iframe} https://trinket.io/embed/glowscript/44e9d32f7951
:name: trinket_iframe

A non-youtube iframe
```