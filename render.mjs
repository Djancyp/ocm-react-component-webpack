/**
 * Confidential and Proprietary for Oracle Corporation
 *
 * This computer program contains valuable, confidential, and
 * proprietary information. Disclosure, use, or reproduction
 * without the written authorization of Oracle is prohibited.
 *
 * Copyright (c) 2022, Oracle and/or its affiliates.
 */

import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import CommonUtils from "./common.mjs";
import Template from "./dist/bundle.js";

// The Custom Component class will be the "default" export from the module
export default class {
  constructor(args) {
    // store the args
    this.mode = args.viewMode;
    this.id = args.id;

    // store the path to the <component>/assets folder
    this.assetsPath = import.meta.url.replace("/render.mjs", "");

    // get the OCM environment resources
    this.sitesSDK = args.SitesSDK;

    // add in the event listeners
    this.addEventListeners();
  }

  // add in the listeners for the triggers/actions and whenever the settings values change
  // in this case, we want to re-render the component on the screen
  addEventListeners() {
    // listen for settings update
    this.sitesSDK.subscribe(
      this.sitesSDK.MESSAGE_TYPES.SETTINGS_UPDATED,
      (props) => {
        if (props.property === "customSettingsData") {
          this.renderComponent({
            customSettingsData: props.value,
          });
        } else if (props.property === "componentLayout") {
          this.renderComponent({
            componentLayout: props.value,
          });
        }
      }
    );

    // listen for actions
    this.sitesSDK.subscribe(
      this.sitesSDK.MESSAGE_TYPES.EXECUTE_ACTION,
      (args) => {
        // get action and payload
        var payload = Array.isArray(args.payload) ? args.payload : [],
          action = args.action;

        // handle 'setImageWidth' actions
        if (action && action.actionName === "setImageWidth") {
          payload.forEach((data) => {
            if (data.name === "imageWidth") {
              this.renderComponent({
                imageWidth: data.value,
              });
            }
          });
        }
      }
    );
  }

  // insert the component's HTML into the page
  // after it has added the component, it applies any clickHandlers to elements that were added to the page
  renderComponent(args) {
    // use the common code to generate the HTML for this component based on the componentLayout and customSettingsData
    CommonUtils.renderTemplate(
      {
        Template,
        render: ReactDOM.render,
        createElement: React.createElement,
        componentLayout: this.sitesSDK.getProperty("componentLayout"),
        customSettingsData: this.sitesSDK.getProperty("customSettingsData"),
        id: this.id,
        container: this.container,
      },
      args
    );

    // add in the click handlers
    this.addClickHandlers(this.container);
  }

  addClickHandlers(container) {
    // when the image is clicked
    const img = document.getElementById("image" + this.id);

    if (img) {
      img.addEventListener("click", (event) => {
        this.sitesSDK.publish(this.sitesSDK.MESSAGE_TYPES.TRIGGER_ACTIONS, {
          triggerName: "imageClicked", // 'imageClicked' matches value in appinfo.json
          triggerPayload: {
            payloadData: "some data here", // customize with data you want pass
          },
        });
      });
    }
  }

  // the hydrate method is called when a component has been compiled into the page at runtime
  // this gives the opportunity to add any event handlers to the HTML that has been inserted into the page
  hydrate(container) {
    this.container = container;
    this.addClickHandlers(container);
  }

  // the render method is called to render the component dynamically onto the page
  render(container) {
    this.container = container;
    this.renderComponent();
  }
}
