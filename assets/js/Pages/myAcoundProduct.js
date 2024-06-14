// KHAI BÁO BIẾN

const buttonSave = document.querySelector(".btn_save");

const nameSelector = document.querySelector(".name");
const priceSelector = document.querySelector(".price_product");
const imageSelector = document.querySelector(".image");
const descriptionSelector = document.querySelector(".description");

const tbodySelector = document.querySelector("tbody.save-table");
const formCategorySelector = document.querySelector(
  ".category_wrapper_form_select"
);

const radioSelectorAll = document.querySelector(".type_product:checked");

function handleAddProduct(event) {
  event.preventDefault();
  let ValueName = nameSelector.value.trim();
  let valuePrice = priceSelector.value.trim();
  let valueImage = imageSelector.value.trim();
  let valueDescription = descriptionSelector.value.trim();

  let messageNameError = nameSelector.nextElementSibling;
  let messagePriceError = priceSelector.nextElementSibling;
  let messageImageError = imageSelector.nextElementSibling;
  let messageDescriptionError = descriptionSelector.nextElementSibling;

  let isValidForm = true;
  if (ValueName === "") {
    nameSelector.classList.add("error");
    messageNameError.innerText = "Tên không được để trống";
    isValidForm = false;
  } else {
    nameSelector.classList.remove("error");
    messageNameError.innerText = "";
  }

  if (valuePrice === "") {
    priceSelector.classList.add("error");
    messagePriceError.innerText = "Giá không được để trống";
    isValidForm = false;
  } else if (isNaN(valuePrice) || valuePrice < 0) {
    priceSelector.classList.add("error");
    messagePriceError.innerText = "Nhập số vào";
    isValidForm = false;
  } else {
    priceSelector.classList.remove("error");
    messagePriceError.innerText = "";
  }

  if (valueImage === "") {
    imageSelector.classList.add("error");
    messageImageError.innerText = "Image không được để trống";
    isValidForm = false;
  } else {
    imageSelector.classList.remove("error");
    messageImageError.innerText = "";
  }

  if (valueDescription === "") {
    descriptionSelector.classList.add("error");
    messageDescriptionError.innerText = "phần mô tả không được để trống";
    isValidForm = false;
  } else {
    descriptionSelector.classList.remove("error");
    messageDescriptionError.innerText = "";
  }

  if (isValidForm) {
    let clicked = event.target;

    if (clicked.classList.contains("update")) {
      let idUpdate = clicked.getAttribute("data-id");
      handleUpdateForm(idUpdate);
    } else {
      handleSubmitForm();
    }
    document.querySelector(".form-save-product").reset();
  }
}

// hàm update

function handleUpdateForm(idUpdate) {
  let products = JSON.parse(localStorage.getItem("products"));
  // tìm ra index của obj cần update
  let indexUpdate = products.findIndex(function (item) {
    if (item.id === idUpdate) {
      return true;
    } else {
      return false;
    }
  });

  // thay đổi value obj theo value người dùng nhập
  let ValueName = nameSelector.value.trim();
  let valuePrice = priceSelector.value.trim();
  let valueImage = imageSelector.value.trim();
  let valueDescription = descriptionSelector.value.trim();
  let valueRadio = document.querySelector(".type_product:checked").value;

  let valueCategory = formCategorySelector.value;

  products[indexUpdate].nameProduct = ValueName;
  products[indexUpdate].price = valuePrice;
  products[indexUpdate].image = valueImage;
  products[indexUpdate].description = valueDescription;
  products[indexUpdate].type = valueRadio;
  products[indexUpdate].category_id = valueCategory;

  localStorage.setItem("products", JSON.stringify(products));
  renderDataProduct();

  buttonSave.classList.remove("update");
  buttonSave.removeAttribute("data-id");
  buttonSave.innerText = "Save";
}

// lưu dữ liệu vào localStorage
function handleSubmitForm() {
  let ValueName = nameSelector.value.trim();
  let valuePrice = priceSelector.value.trim();
  let valueImage = imageSelector.value.trim();
  let valueDescription = descriptionSelector.value.trim();
  let valueRadio = document.querySelector(".type_product:checked").value;

  let valueCategorySelect = formCategorySelector.value;

  //   khi chưa có dữ liệu về product ở local chúng ta tạo mảng rỗng
  //   khi có rồi phải lấy về và đẩy thêm dữ liệu mới vào
  let products;
  if (localStorage.getItem("products") === null) {
    products = [];
  } else {
    products = JSON.parse(localStorage.getItem("products"));
  }
  let newProduct = {
    id: crypto.randomUUID(),
    nameProduct: ValueName,
    price: valuePrice,
    image: valueImage,
    description: valueDescription,
    type: valueRadio,
    category_id: valueCategorySelect,
  };
  products.push(newProduct);

  localStorage.setItem("products", JSON.stringify(products));

  // hiển thi dữ liệu từ localStorage ra table

  renderDataProduct();
}

// phần show data
function renderDataProduct() {
  let products = JSON.parse(localStorage.getItem("products"));

  if (products) {
    let productsResult = "";
    for (let i = 0; i < products.length; i++) {
      productsResult =
        productsResult +
        `
        <tr>
                      <td>${products[i].nameProduct}</td>
                      <td>${products[i].price}$</td>
                      <td class="image_aline">
                        <img
                          src="${products[i].image}"
                          alt=""
                        />
                      </td>
                      <td class="image_aline">
                        <button data-id=${products[i].id} class="btn_common btn_edit">Edit</button>
                        <button data-id=${products[i].id} class="btn_common btn_dangger">Delete</button>
                      </td>
                    </tr>
        `;
    }
    tbodySelector.innerHTML = productsResult;
  }
}

// phần delete+ edit
function handleProcessProduct(event) {
  let clicked = event.target;
  let products = JSON.parse(localStorage.getItem("products"));

  if (clicked.classList.contains("btn_dangger")) {
    if (confirm("Bạn chắc chắn muốn xóa sản phẩm?")) {
      let idDelete = clicked.getAttribute("data-id");

      let productRemovebyId = products.filter(function (item) {
        if (item.id === idDelete) {
          return false;
        } else {
          return true;
        }
      });
      localStorage.setItem("products", JSON.stringify(productRemovebyId));
      // render lại danh sách sản phẩm
      renderDataProduct();
      if (idDelete === buttonSave.getAttribute("data-id")) {
        document.querySelector(".form-save-product").reset();
        buttonSave.classList.remove("update");
        buttonSave.removeAttribute("data-id");
      }
    }
  } else if (clicked.classList.contains("btn_edit")) {
    // lấy obj từ product theo id

    let id = clicked.getAttribute("data-id");

    let ObjEditing = products.find(function (item) {
      if (item.id === id) {
        return true;
      } else {
        return false;
      }
    });
    nameSelector.value = ObjEditing.nameProduct;
    priceSelector.value = ObjEditing.price;
    imageSelector.value = ObjEditing.image;
    descriptionSelector.value = ObjEditing.description;
    let valueTypeEditing = ObjEditing.type;

    // chọn input có giá trị là dạng editting cho thuộc tính checked =true

    if (valueTypeEditing) {
      document.querySelector(`input[value=${valueTypeEditing}]`).checked = true;
    } else {
      document.querySelector(`input[value=new_arrival]`).checked = true;
    }

    formCategorySelector.value = ObjEditing.category_id;
    buttonSave.classList.add("update");
    buttonSave.setAttribute("data-id", id);
    buttonSave.innerText = "Update";
  }
}

function showCategoryInit() {
  let categories = JSON.parse(localStorage.getItem("categories"));

  let resultHtml = "<option>Select Category</option>";
  for (let i = 0; i < categories.length; i++) {
    resultHtml =
      resultHtml +
      `
    <option value="${categories[i].id}"> ${categories[i].nameCategory}</option>`;
  }
  formCategorySelector.innerHTML = resultHtml;
}
// BẮT SỰ KIỆN

renderDataProduct();

//thêm mới sản phẩm
buttonSave.addEventListener("click", handleAddProduct);

tbodySelector.addEventListener("click", handleProcessProduct);

// HÀM TẠO RA OPTION VÀ ĐƯA VÀO CATEGORY

showCategoryInit();
