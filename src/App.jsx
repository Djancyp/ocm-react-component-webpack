import React from "react";
import Component from "./Component";
import Carousel from "./react-slick";
import "./css/styles.css";
const App = (props) => {
  console.log(props);
  return (
    <div className="main-app">
      <h1>This is OCM Component Example with full build</h1>
      <Component />
        <Carousel />
    </div>
  );
};
export default App;
