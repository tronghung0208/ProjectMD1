function redirect() {
  let users = JSON.parse(localStorage.getItem("users"));
  //   kiểm tra xem users có active hay không
  let usersFind = users.find(function (userItem) {
    if (userItem.status === "active") {
      return true;
    } else {
      return false;
    }
  });
  if (usersFind) {
    window.location.href = "index.html";
  }
}
redirect();
