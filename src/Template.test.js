import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Template from "./components/Template";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with template", () => {
 const fakeTemplate =  {
  "category": [
      "Health", 
      "E-commerce", 
      "Education"
  ], 
  "created": "2022-02-03T15:09:04.827903", 
  "description": "mollit reprehenderit velit aliqua. laboris", 
  "link": "https://formpl.us/templates", 
  "name": "ipsum nulla mollit"
} 
  act(() => {
    render(<Template template={fakeTemplate} />, container);
  });
  expect(container.querySelector("#name").textContent).toBe(fakeTemplate.name);
  expect(container.querySelector("#desc").textContent).toBe(fakeTemplate.description);
});