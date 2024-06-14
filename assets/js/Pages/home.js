const logininfor = document.querySelector(
  ".header_list .ti-user"
).nextElementSibling;

function getUserIsLogin() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  //   kiểm tra xem users có active hay không

  let usersFind = users.find(function (userItem) {
    return userItem.status === "active";
  });

  if (usersFind) {
    logininfor.innerText = usersFind.name;
    logininfor.closest("a").setAttribute("href", "my-account.html");
  }
}

logininfor.addEventListener("click", getUserIsLogin);

getUserIsLogin();
