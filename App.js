import React from "react";
import ReactDOM from "react-dom/client";

// JSX
const Title = () => (
  <h1 className="head" tabIndex={1}>
    Namste React Using JSX🚀
  </h1>
);

const elem = <span>React element</span>;

const data = 1000;

//React Component

//Functional Component = A function that returns jsx code or react elements that is called functional component.

//Component Composition(Component inside Component)
const HeadingComponent = () => (
  <>
    {/* React Fragmentation */}
    <div id="container">
      {Title()} {/* React COmponent writting methods*/}
      <Title />
      <h1 className="heading">Namste React Functional Component</h1>
    </div>
    <div id="container 2">
      <Title></Title>
      <h1 id="title 2"> Title 2</h1>
    </div>
  </>
);

//React Fragments = If we have to use two div in the jsx then we use it

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<HeadingComponent />);
