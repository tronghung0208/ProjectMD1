// // 1. khai báo biến

const btnCartExclusive = document.querySelector(".main_content");

// // 2. khai báo hàm

function checkUserNotLoggin() {
  let users = JSON.parse(localStorage.getItem("users"));

  let userLogin = users.find((item) => item.status === "active");

  return userLogin;
}

function handleShopCartExclusive(event) {
  //  1. kiểm tra nếu user chưa log gin thì link đến trang login

  let clicked = event.target;
  let liClicked = clicked.closest("li.add-to-cart");

  if (liClicked) {
    event.preventDefault();
    let idProduct = liClicked.getAttribute("data-id");
    let products = JSON.parse(localStorage.getItem("products"));
    let product = products.find((item) => item.id === idProduct);
    let userIsLoginning = checkUserNotLoggin();
    //2. chắc chắn đã login thì thực hiện logic add to cart
    if (!userIsLoginning) {
      window.location.href = "/login.html";
    }
    //2. chắc chắn đã login thì thực hiện logic add to cart
    //   2.1 bulit ra value của cart

    // user chưa có cart là user chưa có key cart

    let cartOfUser = userIsLoginning.cart;
    
    let cart;

    // chưa có key cart hay lần đầu mua hàng
    if (!cartOfUser) {
      cart = [{ ...product, quantity: 1 }];
    }
    // đã có cart
    else {
      // kiểm tra sản phẩm chưa có trong cart
      let productExit = cartOfUser.find((item) => item.id === idProduct);
      // sản phẩm đã có trong giỏ hàng
      if (productExit) {
        cart = cartOfUser.map(function (item) {
          if (item.id === idProduct) {
            item.quantity = item.quantity + 1;
            return item;
          } else {
            return item;
          }
        });
      }
      // sản phẩm chưa có trong giỏ hàng
      else {
        cart = [...cartOfUser, { ...product, quantity: 1 }];
      }
    }

    // udate

    let users = JSON.parse(localStorage.getItem("users"));

    let userUpdateCart = users.map(function (item) {
      if (item.status === "active") {
        item.cart = cart;
        return item;
      } else {
        return item;
      }
    });

    localStorage.setItem("users", JSON.stringify(userUpdateCart));
    totalCartNumber();
  }
}

function totalCartNumber() {
  let userLogin = checkUserNotLoggin();
  if (userLogin) {
    let cartOfUser = userLogin.cart || [];
    let totalCart = 0;
    for (let i = 0; i < cartOfUser.length; i++) {
      totalCart = totalCart + parseInt(cartOfUser[i].quantity);
    }
    document.querySelector(".cart_count").innerText = totalCart;
  }
}
totalCartNumber();
// // 3. sự kiện
btnCartExclusive.addEventListener("click", handleShopCartExclusive);
