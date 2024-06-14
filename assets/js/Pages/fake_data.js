function createUserAdmin() {
  // 1.laatys dữ liệu từ localStorage

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // 2. Thực hieenjupdate users cũ và thêm uses addmin mới
  let userAdmin = {
    id: crypto.randomUUID(),
    name: "Admin",
    email: "admin@gmail.com",
    password: "a@A123456",
    status: "",
    role: "admin",
  };
  //   tạo ra mảng mới gồm dữ liệu user cũ +userAdmin
  let userAll = [...users, userAdmin];
  //   cập nhật role cho users thông thường
  let userAllUpdate = userAll.map(function (item) {
    if (item.role === "admin") {
      return item;
    } else {
      item.role = "regular";

      return item;
    }
  });

  //   cập nhật localStorage

  let userAdminExit = users.find((item) => item.role === "admin");

  if (!userAdminExit) {
    localStorage.setItem("users", JSON.stringify(userAllUpdate));
  }
}

// tạo user addmin
createUserAdmin();
