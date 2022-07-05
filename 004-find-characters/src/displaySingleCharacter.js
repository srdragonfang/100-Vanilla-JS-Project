import { hideLoading } from "./toggleLoading.js";
import get from "./getElement.js";

const displayCharacter = (data) => {
  hideLoading();

  const character = data.characters[0];
  const {
    strcharacterThumb: image,
    strcharacter: name,
    strInstructions: desc,
  } = character;
  const list = [
    character.strIngredient1,
    character.strIngredient2,
    character.strIngredient3,
    character.strIngredient4,
    character.strIngredient5,
  ];
  const img = get(".character-img");
  const characterName = get(".character-name");
  const description = get(".character-desc");
  const ingredients = get(".character-ingredients");
  img.src = image;
  document.title = name;
  characterName.textContent = name;
  description.textContent = desc;
  ingredients.innerHTML = list
    .map((item) => {
      if (!item) return;
      return `<li><i class="far fa-check-square"></i>${item}</li>`;
    })
    .join("");
};
export default displayCharacter;
