import React from 'https://esm.sh/react';

export default class SettingsLayout extends React.Component {
	constructor() {
		super();

		this.state = {
			width: '',
			linkURL: '',
			nls: {
				titleText: '',
				paragraphText: '',
				linkText: ''
			}
		};
		this.lastState = JSON.stringify(this.state);
	}

	componentDidMount() {
		SitesSDK.getProperty('customSettingsData', data => {
			let state = {};
			state.width = data.width || '';
			state.linkURL = data.linkURL || '';
			state.nls = data.nls || {};
			state.nls.titleText = state.nls.titleText || '';
			state.nls.paragraphText = state.nls.paragraphText || '';
			state.nls.linkText = state.nls.linkText || '';
			this.setState(state);
			this.lastState = JSON.stringify(state);

			document.body.style.display = 'block';
		})
	}

	onWidthChange = e => {
		const width = e.target.value;
		this.state.width = isNaN(width) ? width : width + 'px';
		this.setState(this.state);
	}
	onTitleTextTextChange = e => {
		this.state.nls.titleText = e.target.value;
		this.setState(this.state);
	}
	onParagraphTextChange = e => {
		this.state.nls.paragraphText = e.target.value;
		this.setState(this.state);
	}
	onLinkTextChange = e => {
		this.state.nls.linkText = e.target.value;
		this.setState(this.state);
	}
	onLinkURLChange = e => {
		this.state.linkURL = e.target.value;
		this.setState(this.state);
	}

	updateState = e => {
		const newState = JSON.stringify(this.state);
		if (newState !== this.lastState) {
			SitesSDK.setProperty('customSettingsData', this.state);
			this.lastState = newState;
		}
	}

	render(props, state) {
		return (
		<div>
			<label for="width" className="settings-heading">Image Width</label>
			<input id="width" onChange={this.onWidthChange} onBlur={this.updateState} value={this.state.width} placeholder="example: 200px or 33%" className="settings-text-box" style={{marginBottom: "10px"}} />

			<label for="titleText" className="settings-heading">Title Text</label>
			<input id="titleText" onChange={this.onTitleTextTextChange} onBlur={this.updateState} value={this.state.nls.titleText} placeholder="example: Template Component" className="settings-text-box" style={{marginBottom: "10px"}} />

			<label for="paragraphText" className="settings-heading">Description Text</label>
			<textarea id="paragraphText" onChange={this.onParagraphTextChange} style={{height: "180px"}} onBlur={this.updateState} value={this.state.nls.paragraphText} className="settings-text-box"></textarea>

			<label for="linkText" className="settings-heading">Link Text</label>
			<input id="linkText" onChange={this.onLinkTextChange} onBlur={this.updateState}  value={this.state.nls.linkText} placeholder="example: More..." className="settings-text-box" style={{marginBottom: "10px;"}} />

			<label for="linkURL" className="settings-heading">Link URL</label>
			<textarea id="linkURL" onChange={this.onLinkURLChange} onBlur={this.updateState} value={this.state.linkURL} className="settings-text-box"></textarea>
		</div>);
	}
}
