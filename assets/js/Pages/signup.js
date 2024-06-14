// KHAI BÁO BIẾN

const registerSelector = document.querySelector(".btn-signup");
const nameSelector = document.querySelector(".name");

const emailSelector = document.querySelector(".email");
const messageName = document.querySelector(".error-name");




const passwordSelector = document.querySelector(".password");
const confirmPasswordSelector = document.querySelector(".confirm_password");
const togglePassword = document.querySelector(".toggle_password");
const toggleConfirmPassword = document.querySelector(".toggle_confirmpassword");
let users = [];



// KHAI BÁO HÀM


function showError(input, message) {
  input.classList.remove("seccess");
  input.classList.add("error");
  let showMessageEurro = input.nextElementSibling;
  showMessageEurro.innerText = message;

  input.closest(".form-group").classList.add("form-group_error");
}

function showSuccess(input) {
  input.classList.remove("error");
  input.classList.add("seccess");
  let showMessageEurro = input.nextElementSibling;
  showMessageEurro.innerText = "";
  input.closest(".form-group").classList.remove("form-group_error");
}

//xử lí show hide pass
function handleTogglePass(event) {
  let typePass = passwordSelector.getAttribute("type");
  let clicked = event.target;

  if (typePass === "password") {
    passwordSelector.setAttribute("type", "text");
    clicked.classList.remove("fa-eye-slash");
    clicked.classList.add("fa-eye");
  } else {
    passwordSelector.setAttribute("type", "password");
    clicked.classList.add("fa-eye-slash");
    clicked.classList.remove("fa-eye");
  }
}

function handleConfirmPass(event) {
  let typeConfirmPass = confirmPasswordSelector.getAttribute("type");
  let clicked = event.target;
  if (typeConfirmPass === "password") {
    confirmPasswordSelector.setAttribute("type", "text");
    clicked.classList.remove("fa-eye-slash");
    clicked.classList.add("fa-eye");
  } else {
    confirmPasswordSelector.setAttribute("type", "password");
    clicked.classList.remove("fa-eye");
    clicked.classList.add("fa-eye-slash");
  }
}

// validate name
function validateName() {
  let isValidate = false;
  let nameValue = nameSelector.value.trim();
  if (nameValue === "") {
    showError(nameSelector, "Tên không được để trống");
  } else {
    isValidate = true;
    showSuccess(nameSelector);
  }
  // thông báo name validate có thành công hay không
  return isValidate;
}
// validate email
function validateEmail() {
  let isValidate = false;
  let emailValue = emailSelector.value.trim();
  let emailTestRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailValue === "") {
    showError(emailSelector, "Email không được để trống");
  } else if (!emailTestRegex.test(emailValue)) {
    showError(emailSelector, "Email không không đúng định dạng");
  } else {
    isValidate = true;
    showSuccess(emailSelector);
  }
  return isValidate;
}
// validate password
function validatePassword() {
  let isValidate = false;
  let passwordValue = passwordSelector.value.trim();
  let passwordTestRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  if (passwordValue === "") {
    showError(passwordSelector, "PassWord không được để trống");
  } else if (passwordValue.length < 8) {
    showError(passwordSelector, "PassWord phải trên 8 kí tự");
  } else if (!passwordTestRegex.test(passwordValue)) {
    showError(
      passwordSelector,
      "PassWord phải có ít nhất 1 kí tự hoa, thường, số, đặc biệt"
    );
  } else {
    isValidate = true;
    showSuccess(passwordSelector);
  }
  return isValidate;
}
// validate confirm password
function validateConfirmPassword() {
  let isValidate = false;
  let passwordValue = passwordSelector.value.trim();
  let confirmPasswordValue = confirmPasswordSelector.value.trim();
  let passwordTestRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  if (confirmPasswordValue === "") {
    showError(confirmPasswordSelector, "PassWord không được để trống");
  } else if (confirmPasswordValue.length < 8) {
    showError(confirmPasswordSelector, "Confirm PassWord phải trên 8 kí tự");
  } else if (!passwordTestRegex.test(confirmPasswordValue)) {
    showError(
      confirmPasswordSelector,
      "Confirm PassWord phải có ít nhất 1 kí tự hoa, thường, số, đặc biệt"
    );
  } else if (confirmPasswordValue !== passwordValue) {
    showError(confirmPasswordSelector, "Password không trùng nhau");
  } else {
    showSuccess(confirmPasswordSelector);
    isValidate = true;
  }
  return isValidate;
}

function handleSignup(event) {
  event.preventDefault();
  // validate name
  let isNameValid = validateName();

  // validate email
  let isEmailValid = validateEmail();

  // validate password
  let isPasswordValid = validatePassword();

  // validate confirm password
  let isConfirmPassword = validateConfirmPassword();

  if (isNameValid && isEmailValid && isPasswordValid && isConfirmPassword) {
    let usersBefore;
    // Khi tất cả validate hợp lệ chúng ta thực hiện lưu trữ data
    if (localStorage.getItem("users") === null) {
      usersBefore = [];
    } else {
      usersBefore = JSON.parse(localStorage.getItem("users"));
    }

    // kiểm tra email không trùng mới lưu vào local
    let isEmailUnique = true;
    for (let i = 0; i < usersBefore.length; i++) {
      if (usersBefore[i].email === emailSelector.value) {
        isEmailUnique = false;
        break;
      }
    }
    if (isEmailUnique) {
      let objUser = {
        id: crypto.randomUUID(),
        name: nameSelector.value,
        email: emailSelector.value,
        password: passwordSelector.value,
        status: "",
        role: "regular",
      };
      usersBefore.push(objUser);
      localStorage.setItem("users", JSON.stringify(usersBefore));
      window.location.href = "/login.html";

      document.querySelector("form").reset();
    } else {
      let showBoxSuccessError = document.querySelector(".container-message");
      showBoxSuccessError.innerText = "Email đã được dùng cho tài khoản khác!";
    }
  }
}
// GỌI HÀM THỰC THI
registerSelector.addEventListener("click", handleSignup);
// khi nhấn vào icon show hide password eye
togglePassword.addEventListener("click", handleTogglePass);
toggleConfirmPassword.addEventListener("click", handleConfirmPass);
// keyup input
nameSelector.addEventListener("keyup", validateName);
emailSelector.addEventListener("keyup", validateEmail);
passwordSelector.addEventListener("keyup", validatePassword);
confirmPasswordSelector.addEventListener("keyup", validateConfirmPassword);
