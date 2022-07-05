const setCharacter = () => {
  section.addEventListener("click", (e) => {
    // e.preventDefault();
    const id = e.target.parentElement.dataset.id;
    localStorage.setItem("characters", id);
  });
};

export default setCharacter;
