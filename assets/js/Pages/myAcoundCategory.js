// phần khai báo biên

const btnCategory = document.querySelector(".btn_category_save");
const categoryBodySelector = document.querySelector(".save-category-table");

const nameCategorySelector = document.querySelector(".name-category");

// let categories = [
//   { id: crypto.randomUUID(), nameCategory: "Exclusive Products" },
//   { id: crypto.randomUUID(), nameCategory: "Exclusive Products" },
// ];

// Phần khai báo hàm

// hàm render ra html

function showCategory() {
  let categories = JSON.parse(localStorage.getItem("categories"));
  let categoryResult = "";
  for (let i = 0; i < categories.length; i++) {
    categoryResult =
      categoryResult +
      `
                <tr>
                  <td>${categories[i].nameCategory}</td>
                  <td class="image_aline">
                    <button data-id=${categories[i].id} class="btn_common btn_edit btn_edit_category">Edit</button>
                    <button data-id=${categories[i].id} class="btn_common btn_dangger btn_dangger_category">Delete</button>
                  </td>
                </tr>
                `;
  }
  categoryBodySelector.innerHTML = categoryResult;
}

// hàm thêm danh mục vào bảng

function handleAddCategory(event) {
  event.preventDefault();
  let valueNameCategory = nameCategorySelector.value.trim();
  let messageNameError = nameCategorySelector.nextElementSibling;

  let isValidForm = true;

  if (valueNameCategory === "") {
    nameCategorySelector.classList.add("error");

    messageNameError.innerText = "Tên không được để trống";
    isValidForm = false;
  } else {
    nameCategorySelector.classList.remove("error");
    messageNameError.innerText = "";
  }

  if (isValidForm) {
    let clicked = event.target;
    let idUpdate = clicked.getAttribute("data-id");
    if (clicked.classList.contains("update-category")) {
      handleUpdateFormCategory(idUpdate);
    } else {
      handleSubmitFormCategory();
    }
  }

  document.querySelector(".category_wrapper form").reset();
}
// hàm submit form

function handleSubmitFormCategory() {
  let valueNameCategory = nameCategorySelector.value.trim();

  let categories;
  if (localStorage.getItem("categories") === null) {
    categories = [];
  } else {
    categories = JSON.parse(localStorage.getItem("categories"));
  }

  let newCategorie = {
    id: crypto.randomUUID(),
    nameCategory: valueNameCategory,
  };
  categories.push(newCategorie);
  localStorage.setItem("categories", JSON.stringify(categories));
  showCategory(categories);
}

//hàm update

function handleUpdateFormCategory(idUpdate) {
  let categories = JSON.parse(localStorage.getItem("categories"));
  let indexUpdate = categories.findIndex(function (item) {
    if (item.id === idUpdate) {
      return true;
    } else {
      return false;
    }
  });

  categories[indexUpdate].nameCategory = nameCategorySelector.value;
  localStorage.setItem("categories", JSON.stringify(categories));
  btnCategory.classList.remove("update-category");
  btnCategory.removeAttribute("data-id");
  showCategory();
}

// hàm delete+edit

function handleProcessCategory(event) {
  let clicked = event.target;

  let categories = JSON.parse(localStorage.getItem("categories"));
  if (clicked.classList.contains("btn_dangger_category")) {
    let idDelete = clicked.getAttribute("data-id");
    let categoriesById = categories.filter(function (item) {
      return item.id !== idDelete;
    });
    localStorage.setItem("categories", JSON.stringify(categoriesById));

    document.querySelector(".category_wrapper form").reset();
  } else if (clicked.classList.contains("btn_edit_category")) {
    let idEdit = clicked.getAttribute("data-id");
    let objEditing = categories.find(function (item) {
      return item.id === idEdit;
    });
    nameCategorySelector.value = objEditing.nameCategory;
    btnCategory.classList.add("update-category");
    btnCategory.setAttribute("data-id", idEdit);
  }
  showCategory();
}

// Sự kiện
showCategory();

btnCategory.addEventListener("click", handleAddCategory);

categoryBodySelector.addEventListener("click", handleProcessCategory);
