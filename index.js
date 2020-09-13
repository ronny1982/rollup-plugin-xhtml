//import fs from 'fs';
const fs = require('fs');

const defaults = {
    style: {
        placeholder: '<![CDATA[styles]]>',
        pattern: /\.css$/
    },
    script: {
        placeholder: '<![CDATA[scripts]]>',
        pattern: /\.m?js$/
    }
}

function replaceStyles(content, styles, placeholder) {
    const attributes = 'rel="stylesheet"';
    const tags = styles.map(style => `<link ${attributes} href="${style}">`);
    return content.replace(placeholder, tags.join(''));
}

function replaceScripts(content, scripts, format, placeholder) {
    const attributes = /^esm?$/.test(format) ? 'type="module"' : '';
    const tags = scripts.map(script => `<script ${attributes} src="${script}"></script>`);
    return content.replace(placeholder, tags.join(''));
}

function extractFiles(artifacts, pattern) {
    return Object.keys(artifacts).map(entry => artifacts[entry].fileName).filter(file => pattern.test(file));
}

function xhtml(options = { targets: [] }) {
	return {
        writeBundle(configuration, artifacts) {
            for(let target of options.targets) {
                let content = fs.readFileSync(target.src).toString('utf8');
                const styles = extractFiles(artifacts, target.stylePattern || defaults.style.pattern);
                content = replaceStyles(content, styles, defaults.style.placeholder);
                const scripts = extractFiles(artifacts, target.scriptPattern || defaults.script.pattern);
                content = replaceScripts(content, scripts, configuration.format, defaults.script.placeholder);
                fs.writeFileSync(target.dest, content);
                console.log('\x1b[36;1m' + target.src, '→', target.dest, '\x1b[0m');
            }
        }
	};
}

//export default xhtml;
module.exports = xhtml;