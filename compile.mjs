import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import React from 'react';
import ReactDOMServer from 'react-dom/server.js';
import CommonUtils from './common.mjs';
import Template from './lib/compile-template.mjs';

// Custom Component Class
export default class {
	constructor(args) {
		// Store the context information
		this.componentId = args.componentId;
		this.componentInstanceObject = args.componentInstanceObject;
		this.componentsFolder = args.componentsFolder;
		this.SCSCompileAPI = args.SCSCompileAPI;

		// store the data for the component
		this.compData = this.componentInstanceObject.data;
	}

	// implement the compile() API to generate the HTML for the component
	compile(args) {
		return new Promise((resolve, reject) => {
			try {
				// use the common code to generate the HTML for this component based on the componentLayout and customSettingsData
				let componentHTML = CommonUtils.renderTemplate({
					Template,
					render: ReactDOMServer.renderToString,
					createElement: React.createElement,
					componentLayout: this.compData.componentLayout,
					customSettingsData: this.compData.customSettingsData,
					id: this.componentId
				});

				// Prefix a <style> tag for the entries in the component's CSS file
				if (componentHTML && componentHTML.trim()) {
					const dir = fileURLToPath(import.meta.url).replace('compile.mjs', ''),
						templateFile = path.join(dir, 'styles', 'design.css'),
						css = fs.readFileSync(templateFile, 'utf8');

					if (css && css.trim()) {
						componentHTML = '<style>' + css + '</style>' + componentHTML;
					}
				}

				// It is up to the developer to ensure the output from the compile.js:compile() function remains in sync with the render.js:render() function.
				// To see what the default output would be, switch the following to true
				if (false) {
					// return the generated HTML and use hydrate in the render.js file to add any event handlers at runtime
					return resolve({
						hydrate: true,
						content: componentHTML
					});
				} else {
					// warn the user that the compile function hasn't been implemented
					console.log('Warning: the custom compile() function has not been implemented in: ' + import.meta.url);

					// If the compile() function doesn't return any content, then the component will execute dynamically at runtime
					return resolve({});
				}
			} catch (e) {
				console.log('Error: Failed to expand the React template in: ' + import.meta.url, e);
				return resolve({});
			}
		});
	}
}