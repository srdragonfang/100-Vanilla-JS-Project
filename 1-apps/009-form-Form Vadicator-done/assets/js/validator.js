// Constructor function > doi tuong 'Validator'
function Validator(options) {
  var selectorRules = {};
  function cleanValidate(inputElement, rule) {
    var errorElement = inputElement.parentElement.querySelector(
      options.errorSelector
    );
    errorElement.innerText = "";
    inputElement.parentElement.classList.remove("invalid");
  }
  // Ham thuc hien validate
  function validate(inputElement, rule) {
    var errorElement = inputElement.parentElement.querySelector(
      options.errorSelector
    );
    var errorMessage;

    var rules = selectorRules[rule.selector];

    // lap qua tung rule va kiem tra
    for (var i = 0; i < rules.length; ++i) {
      errorMessage = rules[i](inputElement.value);
      // neu co loi thi dung viec kiem tra
      if (errorMessage) break;
    }

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add("invalid");
    } else {
      errorElement.innerText = "";
      inputElement.parentElement.classList.remove("invalid");
    }

    return !errorMessage;
  }
  //   Lay element cua form can validate
  var formElement = document.querySelector(options.form);
  if (formElement) {
    formElement.onsubmit = function (e) {
      //   "xoa" hanh vi mac dinh
      e.preventDefault();

      var isFormValid = true;
      // Lap qua tung rule va validate
      options.rules.forEach(function (rule) {
        var inputElement = formElement.querySelector(rule.selector);
        var isValid = validate(inputElement, rule);
        if (!isValid) {
          isFormValid = false;
        }
      });
      if (isFormValid) {
        // Truong hop submit voi javascript
        if (typeof options.onSubmit === "function") {
          var enableInputs = formElement.querySelectorAll(
            "[name]:not([disabled])"
          );

          var formValues = Array.from(enableInputs).reduce(function (
            values,
            input
          ) {
            values[input.name] = input.value;
            return values;
          },
          {});

          options.onSubmit(formValues);
          // Truong hop submit voi submit voi hanh vi mac dinh
        } else {
          formElement.submit();
        }
      }
    };

    // lap qua moi rule va xu ly (lang nghe su kien blur, input,...)
    options.rules.forEach(function (rule) {
      // luu lai cac rules cho mỗi input
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }

      var inputElement = formElement.querySelector(rule.selector);
      if (inputElement) {
        //   Xu li truong hop blur khoi input
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };
        // Xu li truong hop khi user nhap vao input
        inputElement.oninput = function () {
          cleanValidate(inputElement, rule);
        };
      }
    });
  }
}

// > Dinh nghia cac rules
// Nguyen tac cua cac rules
// 1. Khi co loi thi tra ra err message
Validator.isRequired = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : message || "Vui lòng nhập trường này.";
    },
  };
};
Validator.isEmail = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value)
        ? undefined
        : message || "Trường này phải là email.";
    },
  };
};

Validator.minLength = function (selector, min, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.length > min
        ? undefined
        : message || `Vui long nhập tối thiếu ${min} kí tự.`;
    },
  };
};
Validator.isConfirmed = function (selector, getConfirmValue, message) {
  return {
    selector: selector,
    test: function (value) {
      return value === getConfirmValue()
        ? undefined
        : message || "Password không trùng khớp!";
    },
  };
};
