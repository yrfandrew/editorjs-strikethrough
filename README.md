# Strikethrough Tool

Strikethrough Tool for highlighting text-fragments for the [Editor.js](https://editorjs.io).

## Installation

### Install via NPM

Get the package

```shell
npm i @itech-indrustries/editorjs-strikethrough
```

Include module at your application

```javascript
const Strikethrough = require('@itech-indrustries/editorjs-strikethrough');
```

## install via CDN
```javascript
  <script src="https://cdn.jsdelivr.net/npm/@itech-indrustries/editorjs-strikethrough@latest"></script>
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
    strikethrough: Strikethrough,
  },
  
  ...
});
```

## Config Params

This Tool has no config params

## Output data

Marked text will be wrapped with a `s` tag.

```json
{
    "type" : "text",
    "data" : {
        "text" : "Create a directory for your module, enter it and run <s>npm init</s> command."
    }
}
```
