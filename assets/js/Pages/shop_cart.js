const bodyCartTable = document.querySelector(".cart_show_tbody");

const btnUpdateCare = document.querySelector(".btn_update_cart");
const btnCheckOut = document.querySelector(".btn-fill-out");
let cartOfUserTemp = checkUserNotLoggin().cart;

function showCartOfUser() {
  let userLogin = checkUserNotLoggin();
  let cartOfUser = userLogin.cart;

  let resultHtml = "";
  for (let i = 0; i < cartOfUser.length; i++) {
    resultHtml += `
    <tr data-product_id=${cartOfUser[i].id}>
    <td class="product-thumbnail">
      <a href="#"
        ><img
          src="${cartOfUser[i].image}"
          alt="product1"
      /></a>
    </td>
    <td class="product-name" data-title="Product">
      <a href="#">${cartOfUser[i].nameProduct}</a>
    </td>
    <td class="product-price" data-title="Price">${cartOfUser[i].price}$</td>
    <td class="product-quantity" data-title="Quantity">
      <div class="quantity">
        <input type="button" value="-" class="minus" />
        <input
          type="text"
          name="quantity"
          value="${cartOfUser[i].quantity}"
          title="Qty"
          class="qty"
          size="4"
        />
        <input type="button" value="+" class="plus" />
      </div>
    </td>
    <td class="product-subtotal" data-title="Total">
    ${cartOfUser[i].price * cartOfUser[i].quantity}
    $</td>
    <td class="product-remove" data-title="Remove">
      <a href=""><i class="ti-close"></i></a>
    </td>
  </tr>
    `;
  }
  bodyCartTable.innerHTML = resultHtml;
}
showCartOfUser();

function renderCartByTmp(cartUpdateQuantity) {
  let resultHtml = "";
  for (let i = 0; i < cartUpdateQuantity.length; i++) {
    resultHtml += `
    <tr data-product_id=${cartUpdateQuantity[i].id}>
    <td class="product-thumbnail">
      <a href="#"
        ><img
          src="${cartUpdateQuantity[i].image}"
          alt="product1"
      /></a>
    </td>
    <td class="product-name" data-title="Product">
      <a href="#">${cartUpdateQuantity[i].nameProduct}</a>
    </td>
    <td class="product-price" data-title="Price">${
      cartUpdateQuantity[i].price
    }$</td>
    <td class="product-quantity" data-title="Quantity">
      <div class="quantity">
        <input type="button" value="-" class="minus" />
        <input
          type="text"
          name="quantity"
          value="${cartUpdateQuantity[i].quantity}"
          title="Qty"
          class="qty"
          size="4"
        />
        <input type="button" value="+" class="plus" />
      </div>
    </td>
    <td class="product-subtotal" data-title="Total">
    ${cartUpdateQuantity[i].price * cartUpdateQuantity[i].quantity}
    $</td>
    <td class="product-remove" data-title="Remove">
      <a href=""><i class="ti-close"></i></a>
    </td>
  </tr>
    `;
  }
  bodyCartTable.innerHTML = resultHtml;
}

function totalCartTemp(cartUpdateQuantity) {
  let totalCart = 0;
  for (let i = 0; i < cartUpdateQuantity.length; i++) {
    let quantity = cartUpdateQuantity[i].quantity;
    totalCart = totalCart + parseInt(quantity);
  }
  document.querySelector(".cart_count").innerText = totalCart;
}

function totalMoneyTemp(cartUpdateQuantity) {
  let totleMoney = 0;
  for (let i = 0; i < cartUpdateQuantity.length; i++) {
    totleMoney =
      totleMoney +
      parseInt(cartUpdateQuantity[i].price * cartUpdateQuantity[i].quantity);
  }
  document.querySelector(".cart_total_amount strong").innerText =
    totleMoney + "$";
}



function handleProcessCart(event) {
  event.preventDefault();
  let clicked = event.target;

  if (clicked.classList.contains("plus")) {
    let inputSelector = clicked.closest(".quantity").querySelector(".qty");
    let inputValue = parseInt(inputSelector.value);
    inputSelector.value = +(inputValue + 1);
    let idProduct = clicked.closest("tr").getAttribute("data-product_id");
    let cartUpdateQuantity = cartOfUserTemp.map(function (item) {
      if (item.id === idProduct) {
        item.quantity = parseInt(inputSelector.value);
        return item;
      } else {
        return item;
      }
    });
    renderCartByTmp(cartUpdateQuantity);
    totalCartTemp(cartUpdateQuantity);
    totalMoneyTemp(cartUpdateQuantity);
  } else if (clicked.classList.contains("minus")) {
    let inputSelector = clicked.closest(".quantity").querySelector(".qty");
    let inputValue = parseInt(inputSelector.value);
    if (inputValue === 1) {
      return;
    }
    inputSelector.value = inputValue - 1;
    let idProduct = clicked.closest("tr").getAttribute("data-product_id");
    let cartUpdateQuantity = cartOfUserTemp.map(function (item) {
      if (item.id === idProduct) {
        item.quantity = parseInt(inputSelector.value);
        return item;
      } else {
        return item;
      }
    });
    renderCartByTmp(cartUpdateQuantity);
    totalCartTemp(cartUpdateQuantity);
    totalMoneyTemp(cartUpdateQuantity);
  } else if (clicked.classList.contains("ti-close")) {
    let idProduct = clicked.closest("tr").getAttribute("data-product_id");
    let cartUpdateQuantity = cartOfUserTemp.filter(
      (item) => item.id !== idProduct
    );
    clicked.closest("tr").remove();
    totalCartTemp(cartUpdateQuantity);
    totalMoneyTemp(cartUpdateQuantity);
    cartOfUserTemp = cartUpdateQuantity;
  }
}

function totalMoneyCart() {
  let userLogin = checkUserNotLoggin();
  let cartOfUser = userLogin.cart;

  let totleMoney = 0;
  for (let i = 0; i < cartOfUser.length; i++) {
    totleMoney = totleMoney + cartOfUser[i].price * cartOfUser[i].quantity;
  }
  document.querySelector(".cart_total_amount strong").innerText =
    totleMoney + "$";
}

function handleCheckOut(event) {
  event.preventDefault();
  let userIsLoginning = checkUserNotLoggin();

  const oders = [{ user_id: userIsLoginning.id, cart: userIsLoginning.cart }];
  let users = JSON.parse(localStorage.getItem("users"));
  localStorage.setItem("oder", JSON.stringify(oders));
  let userUpdate = users.map(function (item) {
    if (item.status === "active") {
      item.cart = [];
      return item;
    } else {
      return item;
    }
  });
  localStorage.setItem("oders", JSON.stringify(oders));
  // reset cart to emty
  localStorage.setItem("users", JSON.stringify(userUpdate));

  // chuyển trang hoàn tất
  window.location.href = "/order-completed.html";
}

function handleUpdateCart(event) {
  event.preventDefault();
  // 1. lấy cart user
  let userLogin = checkUserNotLoggin();
  let cartOfUser = userLogin.cart;
  let cartUpdate = [];
  for (let i = 0; i < cartOfUser.length; i++) {
    let cartItem = cartOfUser[i];
    let idProduct = cartOfUser[i].id;
    // query lên trên để tìm sản phẩm tương ứng

    let trProductWrapper = document.querySelector(
      `tr[data-product_id="${idProduct}"]`
    );
    if (trProductWrapper) {
      let inputSelector = trProductWrapper.querySelector(".qty");
      let valueInput = inputSelector.value;
      cartItem.quantity = valueInput;
      // sửa đổi quantity ở cartItem
      cartUpdate.push(cartItem);
    }
  }

  let users = JSON.parse(localStorage.getItem("users"));

  let userUpdateCart = users.map(function (item) {
    if (item.status === "active") {
      item.cart = cartUpdate;
      return item;
    } else {
      return item;
    }
  });

  localStorage.setItem("users", JSON.stringify(userUpdateCart));
  totalMoneyCart();
  totalCartNumber();
}

bodyCartTable.addEventListener("click", handleProcessCart);

// tính tổng tiền

totalMoneyCart();

btnUpdateCare.addEventListener("click", handleUpdateCart);
btnCheckOut.addEventListener("click", handleCheckOut);
