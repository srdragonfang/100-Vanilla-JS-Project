import presentCharacters from "./src/presentCharacters";
// #0 - create data from json local or api url
const URL = "./data/data.json";

window.addEventListener("DOMContentLoaded", () => {
  // DOMContentLoaded là sự kiện được kích hoạt khi DOM được sẵn sàng.
  // #1 get data from api
  presentCharacters(URL);
});
