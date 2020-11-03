![](https://badgen.net/badge/Editor.js/v2.0/blue)

# Strikethrough Tool

Strikethrough Tool for marking text-fragments for the [Editor.js](https://ifmo.su/editor).

## Installation

### Install via NPM

Get the package

```shell
npm i --save-dev editorjs-strikethrough
```

Include module at your application

```javascript
const Strikethrough = require('editorjs-strikethrough');
```

### Download to your project's source dir

1. Upload folder `dist` from repository
2. Add `dist/bundle.js` file to your page.

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
var editor = EditorJS({
  ...
  
  tools: {
    ...
    strikethrough: {
      class: Strikethrough,
      shortcut: 'CMD+SHIFT+X',
    },
  },
  
  ...
});
```

## Config Params

This Tool has no config params

## Output data

Marked text will be wrapped with a `del` tag with an `cdx-strikethrough` class.

```json
{
    "type" : "text",
    "data" : {
        "text" : "This is <del class='cdx-strikethrough'>test</del> text."
    }
}
```
