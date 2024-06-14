// khai báo biến
const btnAcounDetailSelector = document.querySelector(".btn_acound_detail");
const displayNameSelector = document.querySelector(".form_display_name");
const displayEmailSelector = document.querySelector(".form_display_email");
const displayCurrentPasswordSelector = document.querySelector(
  ".form_display_current_password"
);

const displayNewPassworldSelector =
  document.querySelector(".form_new_password");

const displayNewConfirmPassworldSelector = document.querySelector(
  ".form_new_confirm_password"
);

const toggleCurrentPassword = document.querySelector(".toggle_curent_password");

const toggleNewPass = document.querySelector(".toggle_new_password");
const toggleConfirmNewPassword = document.querySelector(
  ".toggle_new_confirm_password"
);

// khai báo hàm

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

function validateDisplayName() {
  let isValidate = false;
  let displayNameValue = displayNameSelector.value.trim();
  if (displayNameValue === "") {
    showError(displayNameSelector, "Tên không được để trống");
  } else {
    isValidate = true;
    showSuccess(displayNameSelector);
  }
  // thông báo name validate có thành công hay không
  return isValidate;
}

// lấy dữ liệu từ localStorage để so sánh  email và password

let users = JSON.parse(localStorage.getItem("users")) || [];

let indexUser = users.findIndex((item) => item.status === "active");

let user = users[indexUser];

function inputShow() {
  if (user) {
    displayNameSelector.value = user.name;
    displayEmailSelector.value = user.email;

    displayEmailSelector.disabled = true;
  } else {
    window.location.href = "/login.html";
  }
}
inputShow();

// validate email
function validateDisplayEmail() {
  let isValidate = false;
  let emailValue = displayEmailSelector.value.trim();
  let emailTestRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailValue === "") {
    showError(displayEmailSelector, "Email không được để trống");
  } else if (!emailTestRegex.test(emailValue)) {
    showError(displayEmailSelector, "Email không không đúng định dạng");
  } else if (user.email !== emailValue) {
    showError(displayEmailSelector, "Email không chính xác");
  } else {
    isValidate = true;
    showSuccess(displayEmailSelector);
  }
  return isValidate;
}
// // validate password
function validateDisplayCurrentPassword() {
  let isValidate = false;
  let passwordValue = displayCurrentPasswordSelector.value.trim();
  let passwordTestRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  if (passwordValue === "") {
    showError(displayCurrentPasswordSelector, "PassWord không được để trống");
  } else if (passwordValue.length < 8) {
    showError(displayCurrentPasswordSelector, "PassWord phải trên 8 kí tự");
  } else if (!passwordTestRegex.test(passwordValue)) {
    showError(
      displayCurrentPasswordSelector,
      "PassWord phải có ít nhất 1 kí tự hoa, thường, số, đặc biệt"
    );
  } else if (user.password !== passwordValue) {
    showError(displayCurrentPasswordSelector, "PassWord không chính xác");
  } else {
    isValidate = true;
    showSuccess(displayCurrentPasswordSelector);
  }
  return isValidate;
}

function validateNewPassword() {
  let isValidate = false;
  let passwordValue = displayNewPassworldSelector.value.trim();
  let passwordTestRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  if (passwordValue === "") {
    showError(displayNewPassworldSelector, "PassWord không được để trống");
  } else if (passwordValue.length < 8) {
    showError(displayNewPassworldSelector, "PassWord phải trên 8 kí tự");
  } else if (!passwordTestRegex.test(passwordValue)) {
    showError(
      displayNewPassworldSelector,
      "PassWord phải có ít nhất 1 kí tự hoa, thường, số, đặc biệt"
    );
  } else {
    isValidate = true;
    showSuccess(displayNewPassworldSelector);
  }
  return isValidate;
}

// // validate confirm password
function validateNewConfirmPassword() {
  let isValidate = false;
  let passwordValue = displayNewPassworldSelector.value.trim();
  let confirmPasswordValue = displayNewConfirmPassworldSelector.value.trim();
  let passwordTestRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  if (confirmPasswordValue === "") {
    showError(
      displayNewConfirmPassworldSelector,
      "PassWord không được để trống"
    );
  } else if (confirmPasswordValue.length < 8) {
    showError(
      displayNewConfirmPassworldSelector,
      "Confirm PassWord phải trên 8 kí tự"
    );
  } else if (!passwordTestRegex.test(confirmPasswordValue)) {
    showError(
      displayNewConfirmPassworldSelector,
      "Confirm PassWord phải có ít nhất 1 kí tự hoa, thường, số, đặc biệt"
    );
  } else if (confirmPasswordValue !== passwordValue) {
    showError(displayNewConfirmPassworldSelector, "Password không trùng nhau");
  } else {
    showSuccess(displayNewConfirmPassworldSelector);
    isValidate = true;
  }
  return isValidate;
}

function handleChangeTheAccountInformation(event) {
  event.preventDefault();
  validateNewConfirmPassword();
  let displayNameValue = displayNameSelector.value.trim();
  let emailValue = displayEmailSelector.value.trim();
  let passwordValue = displayNewPassworldSelector.value.trim();

  let isValidateName = validateDisplayName();
  let isValidateEmail = validateDisplayEmail();
  let isValidateCurrent = validateDisplayCurrentPassword();
  let isValidateNew = validateNewPassword();
  let isValidateConfirm = validateNewConfirmPassword();

  if (
    isValidateName &&
    isValidateEmail &&
    isValidateCurrent &&
    isValidateNew &&
    isValidateConfirm
  ) {
    user.name = displayNameValue;
    user.email = emailValue;
    user.password = passwordValue;
  }

  let newUser = user;

  users[indexUser] = newUser;

  localStorage.setItem("users", JSON.stringify(users));
  document.querySelector(".form_display_user").reset();
}

function handleToggleCurrentPass(event) {
  let typePass = displayCurrentPasswordSelector.getAttribute("type");
  let clicked = event.target;

  if (typePass === "password") {
    displayCurrentPasswordSelector.setAttribute("type", "text");
    clicked.classList.remove("fa-eye-slash");
    clicked.classList.add("fa-eye");
  } else {
    displayCurrentPasswordSelector.setAttribute("type", "password");
    clicked.classList.add("fa-eye-slash");
    clicked.classList.remove("fa-eye");
  }
}

function handleToggleNewPass(event) {
  let typePass = displayNewPassworldSelector.getAttribute("type");
  let clicked = event.target;

  if (typePass === "password") {
    displayNewPassworldSelector.setAttribute("type", "text");
    clicked.classList.remove("fa-eye-slash");
    clicked.classList.add("fa-eye");
  } else {
    displayNewPassworldSelector.setAttribute("type", "password");
    clicked.classList.add("fa-eye-slash");
    clicked.classList.remove("fa-eye");
  }
}

function handleConfirmNewPass(event) {
  let typeConfirmPass = displayNewConfirmPassworldSelector.getAttribute("type");
  let clicked = event.target;
  if (typeConfirmPass === "password") {
    displayNewConfirmPassworldSelector.setAttribute("type", "text");
    clicked.classList.remove("fa-eye-slash");
    clicked.classList.add("fa-eye");
  } else {
    displayNewConfirmPassworldSelector.setAttribute("type", "password");
    clicked.classList.remove("fa-eye");
    clicked.classList.add("fa-eye-slash");
  }
}
// sự kiện
btnAcounDetailSelector.addEventListener(
  "click",
  handleChangeTheAccountInformation
);

toggleCurrentPassword.addEventListener("click", handleToggleCurrentPass);
toggleNewPass.addEventListener("click", handleToggleNewPass);

toggleConfirmNewPassword.addEventListener("click", handleConfirmNewPass);

displayNameSelector.addEventListener("keyup", validateDisplayName);
displayEmailSelector.addEventListener("keyup", validateDisplayEmail);
displayCurrentPasswordSelector.addEventListener(
  "keyup",
  validateDisplayCurrentPassword
);
displayNewPassworldSelector.addEventListener("keyup", validateNewPassword);

displayNewConfirmPassworldSelector.addEventListener(
  "keyup",
  validateNewConfirmPassword
);
