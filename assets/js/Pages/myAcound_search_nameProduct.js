const searchAllSelector = document.querySelector(".search-strong_name");

const inputSearchName = document.querySelector(".search_product_name");

const inputSearchCategory = document.querySelector(".search_category_name");

// khai báo hàm

// dữ liệu từ localStorage
let products = JSON.parse(localStorage.getItem("products"));
let categories = JSON.parse(localStorage.getItem("categories"));

function handleSearchNameProduct() {
  let valueInputName = inputSearchName.value.toLowerCase();

  let resultSearchName = products.filter(function (item) {
    return item.nameProduct.toLocaleLowerCase().indexOf(valueInputName) !== -1;
  });

  let productsResult = "";
  for (let i = 0; i < resultSearchName.length; i++) {
    productsResult =
      productsResult +
      `
            <tr>
                          <td>${resultSearchName[i].nameProduct}</td>
                          <td>${resultSearchName[i].price}$</td>
                          <td class="image_aline">
                            <img
                              src="${resultSearchName[i].image}"
                              alt=""
                            />
                          </td>
                          <td class="image_aline">
                            <button data-id=${resultSearchName[i].id} class="btn_common btn_edit">Edit</button>
                            <button data-id=${resultSearchName[i].id} class="btn_common btn_dangger">Delete</button>
                          </td>
                        </tr>
            `;
  }
  tbodySelector.innerHTML = productsResult;
}

// sự kiên

searchAllSelector.addEventListener("click", handleSearchNameProduct);

inputSearchName.addEventListener("keyup", handleSearchNameProduct);

//　tìm kiếm theo category
const btnCategorySelector = document.querySelector(".search-strong_category");
const inputCategorySelector = document.querySelector(".search_category_name");
function handleSearchCategory() {
  let valueCategory = inputCategorySelector.value.toLowerCase();

  let category = categories.find(function (item) {
    return item.nameCategory.toLocaleLowerCase().indexOf(valueCategory) !== -1;
  });
  let idCategory = category.id;
  let product = products.filter(function (item) {
    return item.category_id === idCategory;
  });
  let resultcategory = "";
  for (let i = 0; i < product.length; i++) {
    resultcategory =
      resultcategory +
      `
            <tr>
                          <td>${product[i].nameProduct}</td>
                          <td>${product[i].price}$</td>
                          <td class="image_aline">
                            <img
                              src="${product[i].image}"
                              alt=""
                            />
                          </td>
                          <td class="image_aline">
                            <button data-id=${product[i].id} class="btn_common btn_edit">Edit</button>
                            <button data-id=${product[i].id} class="btn_common btn_dangger">Delete</button>
                          </td>
                        </tr>
            `;
  }
  tbodySelector.innerHTML = resultcategory;
}

btnCategorySelector.addEventListener("click", handleSearchCategory);
inputCategorySelector.addEventListener("keyup", handleSearchCategory);
