// Common Utilities Class
export default class {
	constructor() { }

	static renderTemplate({
		Template,
		render,
		createElement,
		componentLayout,
		customSettingsData,
		id,
		container
	}, args) {
		// extract the original values (or apply deafult values)
		const layout = (args && args.componentLayout) || componentLayout || 'default',
			customData = (args && args.customSettingsData) || customSettingsData || {},
			imageWidth = (args && args.imageWidth) || (customData.hasOwnProperty('width') ? customData.width : '');

		customData.nls = customData.nls || {};

		// create the props
		const props = {
			imageId: 'image' + id,
			linkURL: customData.linkURL || '',
			linkText: customData.nls.linkText || '',
			titleText: customData.nls.titleText || 'Template Component',
			paragraphText: customData.nls.paragraphText || '',
			layout: layout,
			alignImageRight: layout === 'right',
			showTopLayout: layout === 'top',
			showStoryLayout: (layout === 'default' || layout === 'right'),
			imageWidth: imageWidth || '200px',
			imageStyle: {},
			paragraphStyle: {}
		};

		if (!props.showTopLayout) {
			// Style on left- or right-aligned image
			props.imageStyle = {flexShrink: "0", width: props.imageWidth};

			// Style around paragraph component
			props.paragraphStyle = {flexGrow: "1"};
		}

		// render the component
		try {
			return render(createElement(Template, props), container);
		} catch (e) {
			console.log('Failed to render the React template.', e);
			return '';
		}
	}
}