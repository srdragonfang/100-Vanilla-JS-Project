import get from "./getElement";
import { hideLoading } from "./toggleLoading";

const displayCharacters = ({}) => {
  const section = get(".section-center");
  const title = get(".title");

  if (!characters) {
    hideLoading();
    title.textContent = "sorry, no characters matched your search";
    section.innerHTML = null;
  }
  const newCharacters = characters
    .map((character) => {
      const {
        idCharacter: id,
        strCharacter: name,
        ageCharacter: age,
      } = character;

      return `
      <a href="drink.html">
          <article class="show-character" data-id="${id}">
              <h3>${name}</h3>
              <h3>Age: ${age}</h3>
          </article>
      </a>
    `;
    })
    .join("");

  hideLoading();
  title.textContent = "";
  section.innerHTML = newDrinks;
  return section;
};

export default displayCharacters;
