# rollup-plugin-xhtml

No bells and whistles rollup plugin to inject bundled files into HTML templates.
Why yet another HTML template plugin?
Because i just want to copy an HTML template file and inject bundled styles/scripts with easy to understand options.
I don't want to spend hours to figure out all the complex options of the existing HTML plugins and even with all these options in the end still being unable to exactly achive my simple goal.

## Installation

In your project folder run the following command to install the plugin as development dependency.

```bash
npm install --save-dev rollup-plugin-xhtml
```

## Usage

The plugin will process a list of given template files by replacing certain placeholders with the corresponding bundled files.
The placeholder `<![CDATA[styles]]>` will be replaced with all bundled stylesheets.
The placeholder `<![CDATA[scripts]]>` will be replaced with all bundled scripts/modules.

> **TIP:** To prevent certain bundles from being injected, just remove the corresponding placeholder

**src/index.html**
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>Hello World</title>
        <link rel="icon" href="/favicon.ico">
        <link rel="stylesheet" href="/css/style.css">
        <![CDATA[styles]]> <!-- NOTE: This placeholder will be replaced with bundled CSS files -->
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <![CDATA[scripts]]> <!-- NOTE: This placeholder will be replaced with bundled JS/MJS files -->
    </head>
    <body></body>
</html>
```

Within the rollup configuration add the plugin.
Simply provide a list of templates with their source and destination path to inject the bundled files.

> **NOTE:** Pattern matching such as regex or glob is not support

**rollup.config.js**
```javascript
/* other imports ... */
import xhtml from 'rollup-plugin-xhtml';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/bundle.js',
        format: 'es'
    },
    plugins: [
        /* other plugins ... */
        xhtml({
            targets: [
                { src: 'src/index.html', dest: 'dist/index.html' }
            ]
        })
    ]
};
```