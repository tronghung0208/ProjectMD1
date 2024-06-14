// // KHAI BÁO BIẾN
// const emailSelector = document.querySelector(".email");

// const passwordSelector = document.querySelector(".password");

// const btnLoginSelector = document.querySelector(".btn_login");

// const togglePassword = document.querySelector(".toggle_password");

// // KHAI BÁO HÀM
// function showError(input, message) {
//   input.classList.remove("success");
//   input.classList.add("error");
//   let errorMessage = input.nextElementSibling;
//   errorMessage.innerText = message;

//   input.closest(".form-group").classList.add("form-group_error");
// }

// function showSuccess(input) {
//   input.classList.remove("error");
//   input.classList.add("success");
//   let successEmail = input.nextElementSibling;
//   successEmail.innerText = "";
//   input.closest(".form-group").classList.remove("form-group_error");
// }

// function handleTogglePass(event) {
//   let clicked = event.target;
//   let typePassword = passwordSelector.getAttribute("type");
//   if (typePassword === "password") {
//     clicked.classList.remove("fa-eye-slash");
//     clicked.classList.add("fa-eye");
//     passwordSelector.setAttribute("type", "text");
//   } else {
//     clicked.classList.remove("fa-eye");
//     clicked.classList.add("fa-eye-slash");
//     passwordSelector.setAttribute("type", "password");
//   }
// }

// function validateEmail() {
//   let valueEmail = emailSelector.value;
//   let checkEmail = false;
//   let emailTestRegex =
//     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//   if (valueEmail === "") {
//     showError(emailSelector, "Email không được để trống");
//   } else if (!emailTestRegex.test(valueEmail)) {
//     showError(emailSelector, "Email không đúng định dạng");
//   } else {
//     showSuccess(emailSelector);
//     checkEmail = true;
//   }
//   return checkEmail;
// }

// function validatePassword() {
//   let valuePassword = passwordSelector.value;
//   let checkPassword = false;
//   let passwordTestRegex =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

//   if (valuePassword === "") {
//     showError(passwordSelector, "Password không được để trống");
//   } else if (valuePassword.length < 8) {
//     showError(passwordSelector, "Password lớn hơn 8 kí tự");
//   } else if (!passwordTestRegex.test(valuePassword)) {
//     showError(
//       passwordSelector,
//       "Password phải có ít nhất 1 kí tự hoa, thường,số,đặc biệt"
//     );
//   } else {
//     showSuccess(passwordSelector);
//     checkPassword = true;
//   }
//   return checkPassword;
// }

// function handleLogin(event) {
//   event.preventDefault();
//   let isEmailValid = validateEmail();

//   let isPasswordValid = validatePassword();

//   // khi email hợp lệ => ta tiến hành so sánh dữ liệu trong localStorage
//   if (isEmailValid && isPasswordValid) {
//     let usesLocalStorage = JSON.parse(localStorage.getItem("users"));
//     let userDuplicate = false;
//     for (let i = 0; i < usesLocalStorage.length; i++) {
//       if (
//         usesLocalStorage[i].email === emailSelector.value &&
//         usesLocalStorage[i].password === passwordSelector.value
//       ) {
//         userDuplicate = true;
//         break;
//       }
//     }

//     // sau khi so sánh email và pass từ localStorage và dữ liệu nhập vào ta chuyển sang trang chủ

//     if (userDuplicate) {
//       window.location.href = "index.html";
//     }
//   } else {
//     let showBoxSuccessError = document.querySelector(".container-message");
//     showBoxSuccessError.innerText = "Email hoặc password chưa đúng!";
//   }
// }
// // HÀM THỰC THI

// // login event
// btnLoginSelector.addEventListener("click", handleLogin);

// // keyup input
// emailSelector.addEventListener("keyup", validateEmail);
// passwordSelector.addEventListener("keyup", validatePassword);

// // show hide password
// togglePassword.addEventListener("click", handleTogglePass);

const buttonLogin = document.querySelector(".btn_login");

const inputSelectorAll = document.querySelectorAll(".form-group .form-control");
const emailSelector = document.querySelector(".email");

const passwordSelector = document.querySelector(".password");
const togglePassword = document.querySelector(".toggle_password");
const showBoxSuccessError = document.querySelector(".container-message");
//khai báo hàm
function handleTogglePass(event) {
  let clicked = event.target;
  let typePassword = passwordSelector.getAttribute("type");
  if (typePassword === "password") {
    clicked.classList.remove("fa-eye-slash");
    clicked.classList.add("fa-eye");
    passwordSelector.setAttribute("type", "text");
  } else {
    clicked.classList.remove("fa-eye");
    clicked.classList.add("fa-eye-slash");
    passwordSelector.setAttribute("type", "password");
  }
}

function validateEmail(valueInput) {
  let message = null;
  let emailTestRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (valueInput === "") {
    message = "không được để trống";
  } else if (emailTestRegex.test(valueInput) === false) {
    message = "Email không được để trống";
  }
  return message;
}

function validatePassword(valueInput) {
  let message = null;
  let passwordTestRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  if (valueInput === "") {
    message = "Password không được để trống";
  } else if (valueInput.length < 8) {
    message = "Password lớn hơn 8 kí tự";
  } else if (!passwordTestRegex.test(valueInput)) {
    message = "Password phải có ít nhất 1 kí tự hoa, thường,số,đặc biệt";
  }
  return message;
}

function handleLogin(event) {
  event.preventDefault();
  let message;
  let errorMessage = [];
  for (let i = 0; i < inputSelectorAll.length; i++) {
    let nameInput = inputSelectorAll[i].getAttribute("name");

    let valueInput = inputSelectorAll[i].value.trim();
    // nếu input là email thì thực hiện validate email
    if (nameInput === "email") {
      message = validateEmail(valueInput);
    } else {
      message = validatePassword(valueInput);
    }
    let errorMessageSelector = inputSelectorAll[i]
      .closest(".form-group")
      .querySelector(".error-message");

    if (message === null) {
      inputSelectorAll[i].classList.remove("error");
      inputSelectorAll[i].classList.add("success");

      errorMessageSelector.innerText = "";

      inputSelectorAll[i]
        .closest(".form-group")
        .classList.remove("form-group_error");
    } else {
      inputSelectorAll[i].classList.add("error");

      errorMessageSelector.innerText = message;
      inputSelectorAll[i]
        .closest(".form-group")
        .classList.add("form-group_error");
      errorMessage.push(message);
    }
    // Hiển thị lỗi cho người dùng
    // 1.cho ô input có màu đỏ
  }
  if (errorMessage.length === 0) {
    let isLoginExitIndex = -1;
    let users = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < users.length; i++) {
      if (
        users[i].email === emailSelector.value &&
        users[i].password === passwordSelector.value
      ) {
        isLoginExitIndex = i;
        break;
      }
    }
    if (isLoginExitIndex !== -1) {
      users[isLoginExitIndex].status = "active";
      localStorage.setItem("users", JSON.stringify(users));
      if (users[isLoginExitIndex].role === "admin") {
        window.location.href = "./my-account.html";
      } else {
        window.location.href = "index.html";
      }
    } else {
      showBoxSuccessError.classList.remove("text-message");
      showBoxSuccessError.innerText = "Email hoặc password chưa đúng!";
    }
  }
}

// Nơi lưu trữ event và chạy hàm khởi tạo
buttonLogin.addEventListener("click", handleLogin);

togglePassword.addEventListener("click", handleTogglePass);
