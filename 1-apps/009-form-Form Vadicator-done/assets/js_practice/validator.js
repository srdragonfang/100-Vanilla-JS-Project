function Validator(options) {
  function validate(inputEl, rule) {
    document.querySelector(".form-message").innerText =
      "Vui long nhap truong nay!";
  }

  // step#1 lay element cua form can validate
  var formEl = document.querySelector("#form-1");
  if (formEl) {
    var inputEl = formEl.querySelector(rule.selector);
    if (inputEl) {
      inputEl.onblur = function () {
        console.log("hey");
      };
    }
  }
}

Validator.isRequired = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : "Vui long nhap fullname!";
    },
  };
};
