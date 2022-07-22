// #9 - get element from selection
const getElement = (selection) => {
  const element = document.querySelector(selection);
  //   console.log("selection", selection);
  //   console.log("element", element);
  if (element) return element;
  throw new Error("no element selected");
};

export default getElement;
