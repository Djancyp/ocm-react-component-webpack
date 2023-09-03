/**
 * Confidential and Proprietary for Oracle Corporation
 *
 * This computer program contains valuable, confidential, and
 * proprietary information. Disclosure, use, or reproduction
 * without the written authorization of Oracle is prohibited.
 *
 * Copyright (c) 2021, Oracle and/or its affiliates.
 */
define(['require'], function (require) {
	/**
	 * Component Factory for creating instances of the custom component
	 *
	 * This is a generic AMD wrapper module for backwards compatibility.
	 * It enables RequireJS dyanmic loading of JavaScript Module based custom components.
	 */
	return {
		createComponent: function (args, callback) {
			// import the module component
			import(require.toUrl('./render.mjs')).then(({
				default: ModuleComponent
			}) => {
				// return a new instance of the component
				callback(new ModuleComponent(args));
			}).catch((e) => {
				// typically this will be caused by syntax errors in the render.mjs file
				// make sure the render.mjs file can be imported directly
				console.error(e);
			});
		}
	};
});