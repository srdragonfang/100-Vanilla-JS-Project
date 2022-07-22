Validator({
  form: "#form-1",
  errorSelector: ".form-message",
  rules: [
    Validator.isRequired("#fullname"),
    Validator.isRequired("#email"),
    Validator.isEmail("#email"),
    Validator.isRequired("#password"),
    Validator.minLength("#password", 6),
    Validator.isRequired("#passwordConfirm"),
    Validator.isConfirmed(
      "#passwordConfirm",
      function () {
        return document.querySelector("#form-1 #password").value;
      },
      "Password không trùng khớp!"
    ),
  ],
  onSubmit: function (data) {
    //   Call API
    console.log(data);
  },
});
