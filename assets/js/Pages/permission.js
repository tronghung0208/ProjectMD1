// nếu use thông thường ẩn CSSMathProduct,category,oder đi

function hideManagenmentIfUserRegular() {
  let users = JSON.parse(localStorage.getItem("users"));

  let userLogin = users.find((item) => item.status === "active");

  if (userLogin.role !== "admin") {
    document.querySelector("#dashboard-tab").closest("li").remove();
    document.querySelector("#user-tab").closest("li").remove();
    document.querySelector("#orders-tab").closest("li").remove();
    document.querySelector("#address-tab").closest("li").remove();
  }
  // ẩn quản lí sản phẩm
  document.querySelector(".dashboard_menu ul li:first-child a").click();
}

hideManagenmentIfUserRegular();
