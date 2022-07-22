const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$(".tab");
const contents = $$(".content");

tabs.forEach((tab, index) => {
  const content = contents[index];
  tab.onclick = function () {
    $(".tab.active").classList.remove("active");
    $(".content.active").classList.remove("active");
    content.classList.add("active");
    this.classList.add("active");
  };
});
