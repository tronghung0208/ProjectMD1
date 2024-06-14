const loguotSelector = document.querySelector(".user_logout");

const loginInfor = document.querySelector(".user_login");

function getUserIsLogin() {
  let users = JSON.parse(localStorage.getItem("users"));
  //   kiểm tra xem users có active hay không

  let usersFind;

  if (users) {
    usersFind = users.find(function (userItem) {
      if (userItem.status === "active") {
        return true;
      } else {
        return false;
      }
    });
  }
}

function handleLogout(event) {
  event.preventDefault();
  //   lấy ra tất cả user trong localStorage
  if (confirm("bạn muốn đăng xuất không")) {
    let users = JSON.parse(localStorage.getItem("users"));
    // update tất cả users status =""
    for (let i = 0; i < users.length; i++) {
      users[i].status = "";
    }
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "login.html";
  }
}

loguotSelector.addEventListener("click", handleLogout);
getUserIsLogin();

const btnUlCategoryList = document.querySelector(".dashboard_menu_click");
