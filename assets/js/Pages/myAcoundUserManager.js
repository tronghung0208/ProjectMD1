const btnSaveManager = document.querySelector(".save_user_manager");

const inputUserNameManagerSelector = document.querySelector(
  ".form-control_user_name"
);

const inputUserEmailManagerSelector = document.querySelector(
  ".form-control_user_email"
);

const inputUserPassManagerSelector = document.querySelector(
  ".form-control_user_password"
);

const tbodySaveManager = document.querySelector(".save-table_manager");

// khai báo hàm

function showErrorManagement(input, message) {
  input.classList.remove("seccess");
  input.classList.add("error");
  let showMessageEurro = input.nextElementSibling;
  showMessageEurro.innerText = message;

  input.closest(".form-group").classList.add("form-group_error");
}

function showSuccessManagement(input) {
  input.classList.remove("error");
  input.classList.add("seccess");
  let showMessageEurro = input.nextElementSibling;
  showMessageEurro.innerText = "";
  input.closest(".form-group").classList.remove("form-group_error");
}

function validateManagerName() {
  let isValidate = false;
  let displayNameValue = inputUserNameManagerSelector.value.trim();
  if (displayNameValue === "") {
    showError(inputUserNameManagerSelector, "Tên không được để trống");
  } else {
    isValidate = true;
    showSuccess(inputUserNameManagerSelector);
  }
  // thông báo name validate có thành công hay không
  return isValidate;
}

function validateManagerEmail() {
  let isValidate = false;
  let emailValue = inputUserEmailManagerSelector.value.trim();
  let emailTestRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailValue === "") {
    showError(inputUserEmailManagerSelector, "Email không được để trống");
  } else if (!emailTestRegex.test(emailValue)) {
    showError(
      inputUserEmailManagerSelector,
      "Email không không đúng định dạng"
    );
  } else {
    isValidate = true;
    showSuccess(inputUserEmailManagerSelector);
  }
  return isValidate;
}

function validateManagerPassword() {
  let isValidate = false;
  let passwordValue = inputUserPassManagerSelector.value.trim();
  let passwordTestRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  if (passwordValue === "") {
    showError(inputUserPassManagerSelector, "PassWord không được để trống");
  } else if (passwordValue.length < 8) {
    showError(inputUserPassManagerSelector, "PassWord phải trên 8 kí tự");
  } else if (!passwordTestRegex.test(passwordValue)) {
    showError(
      inputUserPassManagerSelector,
      "PassWord phải có ít nhất 1 kí tự hoa, thường, số, đặc biệt"
    );
  } else {
    isValidate = true;
    showSuccess(inputUserPassManagerSelector);
  }
  return isValidate;
}

function handleSubmitUserManager(event) {
  event.preventDefault();
  let isValidateName = validateManagerName();
  let isValidateEmail = validateManagerEmail();
  let isValidatePassword = validateManagerPassword();

  if (isValidateName && isValidateEmail && isValidatePassword) {
    let users;
    if (JSON.parse(localStorage.getItem("users")) === null) {
      users = [];
    } else {
      users = JSON.parse(localStorage.getItem("users"));
    }

    if (btnSaveManager.classList.contains("update")) {
      let users = JSON.parse(localStorage.getItem("users"));

      let idUpdate = btnSaveManager.getAttribute("data-id");

      let indexUpdate = users.findIndex((item) => item.id === idUpdate);

      users[indexUpdate].name = inputUserNameManagerSelector.value;
      users[indexUpdate].email = inputUserEmailManagerSelector.value;
      users[indexUpdate].password = inputUserPassManagerSelector.value;
      btnSaveManager.classList.remove("update");
      btnSaveManager.removeAttribute("data-id");

      localStorage.setItem("users", JSON.stringify(users));

      document.querySelector(".form_manager_user").reset();
    } else {
      let isEmailUnique = true;
      for (let i = 0; i < users.length; i++) {
        if (users[i].email === inputUserEmailManagerSelector.value) {
          isEmailUnique = false;
          break;
        }
      }
      if (isEmailUnique) {
        let objUser = {
          id: crypto.randomUUID(),
          name: inputUserNameManagerSelector.value,
          email: inputUserEmailManagerSelector.value,
          password: inputUserPassManagerSelector.value,
          status: "",
        };

        users.push(objUser);
        localStorage.setItem("users", JSON.stringify(users));
        document.querySelector(".form_manager_user").reset();
      } else {
        alert("Email đã được dùng cho tài khoản khác");
      }
    }
  }
  renderUserOfManager();
}

function renderUserOfManager() {
  let users = JSON.parse(localStorage.getItem("users"));
  let result = "";
  let userNotLogin = users.filter((item) => item.status !== "active");

  for (let i = 0; i < userNotLogin.length; i++) {
    result =
      result +
      `
    
    <tr>
                        <td>${i + 1}</td>
                        <td>${userNotLogin[i].name}</td>
                        <td>${userNotLogin[i].email}</td>
                        <td>${userNotLogin[i].password}</td>
                        <td class="image_aline">
                          <button
                            data-id="${userNotLogin[i].id}"
                            class="btn_common btn_edit btn_edit_manager"
                          >
                            Edit
                          </button>

                          <button
                            data-id="${userNotLogin[i].id}"
                            class="btn_common btn_dangger btn_dangger_manager"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
    
    
    `;
  }
  document.querySelector(".save-table_manager").innerHTML = result;
}

function handeleProcessUserManager(event) {
  let users = JSON.parse(localStorage.getItem("users"));
  let clicked = event.target;

  if (clicked.classList.contains("btn_dangger_manager")) {
    if (confirm("bạn muốn xóa không ?")) {
      let id = clicked.getAttribute("data-id");
      let userRemovebyId = users.filter(function (item) {
        if (item.id === id) {
          return false;
        } else {
          return true;
        }
      });
      localStorage.setItem("users", JSON.stringify(userRemovebyId));
      // render lại danh sách sản phẩm
    }
    renderUserOfManager();
    document.querySelector(".form_manager_user").reset();
  } else if (clicked.classList.contains("btn_edit_manager")) {
    let idEdit = clicked.getAttribute("data-id");

    let ObjEditing = users.find(function (item) {
      if (item.id === idEdit) {
        return true;
      } else {
        return false;
      }
    });

    inputUserNameManagerSelector.value = ObjEditing.name;
    inputUserEmailManagerSelector.value = ObjEditing.email;
    inputUserEmailManagerSelector.disabled = true;
    inputUserPassManagerSelector.value = ObjEditing.password;

    btnSaveManager.classList.add("update");
    btnSaveManager.setAttribute("data-id", idEdit);
  }
}

// sự kiện
renderUserOfManager();
btnSaveManager.addEventListener("click", handleSubmitUserManager);

tbodySaveManager.addEventListener("click", handeleProcessUserManager);
