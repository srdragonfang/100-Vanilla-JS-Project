// #5 - create file
import fetchCharacters from "./fetchCharacters";
import displayCharacters from "./displayCharacters";
// #11 - setCharacter
import setCharacter from "./setCharacter";

const showCharacters = async (url) => {
  // #3 - fetch characters
  const data = await fetchCharacters(url);

  // #4 - display characters
  const section = await displayCharacters(data);
  //   #11 - setCharacter
  if (section) {
    setCharacter(section);
  }
};

export default showCharacters;
