import React from 'https://esm.sh/react';
export default function Template(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "sample-react-component"
  }, props.showStoryLayout ? props.alignImageRight ? /*#__PURE__*/React.createElement("div", {
    className: "scs-story-layout"
  }, /*#__PURE__*/React.createElement(Paragraph, props), /*#__PURE__*/React.createElement(Image, props)) : /*#__PURE__*/React.createElement("div", {
    className: "scs-story-layout"
  }, /*#__PURE__*/React.createElement(Image, props), /*#__PURE__*/React.createElement(Paragraph, props)) : '', props.showTopLayout ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Image, props), /*#__PURE__*/React.createElement(Paragraph, props)) : '');
}

function Paragraph(props) {
  return /*#__PURE__*/React.createElement("div", {
    style: props.paragraphStyle
  }, /*#__PURE__*/React.createElement("div", {
    className: "scs-title-text"
  }, /*#__PURE__*/React.createElement("div", null, props.titleText)), /*#__PURE__*/React.createElement("div", {
    className: "scs-paragraph-text"
  }, /*#__PURE__*/React.createElement("p", {
    dangerouslySetInnerHTML: {
      __html: props.paragraphText
    }
  })), /*#__PURE__*/React.createElement(Link, props));
}

function Link(props) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, props.linkText ? /*#__PURE__*/React.createElement("a", {
    target: "_blank",
    href: props.linkURL
  }, /*#__PURE__*/React.createElement("span", null, props.linkText)) : '');
}

function Image(props) {
  return /*#__PURE__*/React.createElement("div", {
    style: props.imageStyle,
    "data-layout": props.alignImage
  }, /*#__PURE__*/React.createElement("div", {
    className: "scs-image-container"
  }, /*#__PURE__*/React.createElement("img", {
    id: props.imageId,
    className: "scs-image-image",
    src: "/_sitescloud/renderer/app/sdk/images/sample-image.png",
    alt: "",
    title: ""
  })));
}
