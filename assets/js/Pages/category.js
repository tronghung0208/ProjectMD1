function showCategoryLoadPage() {
  let categories = JSON.parse(localStorage.getItem("categories"));
  let resultCategory = "";
  for (let i = 0; i < categories.length; i++) {
    resultCategory += `<li data-category_id ="${categories[i].id} class ="item_cate_click">
    <a href="#"><span class="categories_name" data-category_id ="${categories[i].id}">${categories[i].nameCategory}</span></a>
    </li>`;
  }
  document.querySelector(".widget_categories").innerHTML = resultCategory;
}

showCategoryLoadPage();

let products = JSON.parse(localStorage.getItem("products"));
// showProductToHtml(products);
const ulBtnCategory = document.querySelector(".show_category_click");

const perPage = 6;

function handleShowProductCategory(event) {
  event.preventDefault();

  let clicked = event.target;
  // let liSelectorClick = clicked.closest("li");

  let idCategory = clicked.getAttribute("data-category_id");
  let productFilter = products.filter(
    (item) => item.category_id === idCategory
  );

  let productFilterSlice = productFilter.slice(0, perPage);
  let resultProduct = "";
  for (let i = 0; i < productFilterSlice.length; i++) {
    resultProduct =
      resultProduct +
      `
        <div class="col-md-4 col-6">
                  <div class="product">
                    <div class="product_img">
                      <a href="/shop-product-detail.html?id="${productFilterSlice[i].id}">
                        <img
                          src="${productFilterSlice[i].image}"
                          alt="product_img1"
                        />
                      </a>
                      <div class="product_action_box">
                        <ul class="list_none pr_action_btn">
                          <li class="add-to-cart" data-id_product="${productFilterSlice[i].id}">
                            <a href="#"
                              ><i class="icon-basket-loaded"></i> Add To Cart</a
                            >
                          </li>
                          
                          <li>
                            <a href="shop-quick-view.html" class="popup-ajax"
                              ><i class="icon-magnifier-add"></i
                            ></a>
                          </li>
                          <li>
                            <a href=""><i class="icon-heart"></i></a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="product_info">
                      <h6 class="product_title">
                        <a href="/shop-product-detail.html?${productFilterSlice[i].id}"
                          >${productFilterSlice[i].nameProduct}</a
                        >
                      </h6>
                      <div class="product_price">
                        <span class="price">${productFilterSlice[i].price}$</span>
                        
                        </div>
                      </div>
                      <div class="rating_wrap">
                        <div class="rating">
                          <div class="product_rate" style="width: 80%"></div>
                        </div>
                        <span class="rating_num">(21)</span>
                      </div>
                      <div class="pr_desc">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Phasellus blandit massa enim. Nullam id varius
                          nunc id varius nunc.
                        </p>
                      </div>
                      
                      <div class="list_product_action_box">
                        <ul class="list_none pr_action_btn">
                          <li class="add-to-cart" data-id_product="${productFilterSlice[i].id}">
                            <a href="#"
                              ><i class="icon-basket-loaded"></i> Add To Cart</a
                            >
                          </li>
                          <li>
                            <a href="shop-compare.html" class="popup-ajax"
                              ><i class="icon-shuffle"></i
                            ></a>
                          </li>
                          <li>
                            <a href="shop-quick-view.html" class="popup-ajax"
                              ><i class="icon-magnifier-add"></i
                            ></a>
                          </li>
                          <li>
                            <a href=""><i class="icon-heart"></i></a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
      `;
  }
  document.querySelector(".shop_container_product").innerHTML = resultProduct;

  // tính toán tổng số trang

  let totalPage = Math.ceil(productFilter.length / perPage);
  let htmlPagination = "";
  for (let i = 1; i <= totalPage; i++) {
    htmlPagination += `<li class="page-item ${i === 1 ? "active" : ""}">
    <a data-category_id=${idCategory} data-page ="${i}" class="page-link" href="#">${i}</a>
  </li>`;
  }
  if ((i = 1)) {
  }
  document.querySelector(".pagination_style1_page").innerHTML = htmlPagination;
  document
    .querySelectorAll(".categories_name")
    .forEach((item) => item.classList.remove("active"));
  clicked.classList.add("active");
}

const paginationSelector = document.querySelector(".pagination_style1_page");

function handleClickPageCategory(event) {
  event.preventDefault();
  let clicked = event.target;

  if (clicked.classList.contains("page-link")) {
    // lấy trang
    let page = clicked.getAttribute("data-page");

    // lấy trang ca tegory để giới hạn sản phẩm theo danh mục
    let categoryId = clicked.getAttribute("data-category_id");

    let products = JSON.parse(localStorage.getItem("products"));

    let productFilter = products.filter(
      (item) => item.category_id === categoryId
    );

    //  lấy ra tất cả các sản phẩm
    let indexStart = (page - 1) * perPage;
    let indexEnd = page * perPage;

    let productFilterPagination = productFilter.slice(indexStart, indexEnd);
    let resultProduct = "";

    for (let i = 0; i < productFilterPagination.length; i++) {
      resultProduct =
        resultProduct +
        `
            <div class="col-md-4 col-6">
                      <div class="product">
                        <div class="product_img">
                          <a href="/shop-product-detail.html id=${productFilterPagination[i].id}">
                            <img
                              src="${productFilterPagination[i].image}"
                              alt="product_img1"
                            />
                          </a>
                          <div class="product_action_box">
                            <ul class="list_none pr_action_btn">
                              <li class="add-to-cart" data-id_product="${productFilterPagination[i].id}">
                                <a href="#"
                                  ><i class="icon-basket-loaded"></i> Add To Cart</a
                                >
                              </li>
                              
                              <li>
                                <a href="shop-quick-view.html" class="popup-ajax"
                                  ><i class="icon-magnifier-add"></i
                                ></a>
                              </li>
                              <li>
                                <a href=""><i class="icon-heart"></i></a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div class="product_info">
                          <h6 class="product_title">
                            <a href="/shop-product-detail.html? id=${productFilterPagination[i].id}"
                              >${productFilterPagination[i].nameProduct}</a
                            >
                          </h6>
                          <div class="product_price">
                            <span class="price">${productFilterPagination[i].price}$</span>
                            
                            </div>
                          </div>
                          <div class="rating_wrap">
                            <div class="rating">
                              <div class="product_rate" style="width: 80%"></div>
                            </div>
                            <span class="rating_num">(21)</span>
                          </div>
                          <div class="pr_desc">
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Phasellus blandit massa enim. Nullam id varius
                              nunc id varius nunc.
                            </p>
                          </div>
                          
                          <div class="list_product_action_box">
                            <ul class="list_none pr_action_btn">
                              <li class="add-to-cart" data-id_product="${productFilterPagination[i].id}">
                                <a href="#"
                                  ><i class="icon-basket-loaded"></i> Add To Cart</a
                                >
                              </li>
                              <li>
                                <a href="shop-compare.html" class="popup-ajax"
                                  ><i class="icon-shuffle"></i
                                ></a>
                              </li>
                              <li>
                                <a href="shop-quick-view.html" class="popup-ajax"
                                  ><i class="icon-magnifier-add"></i
                                ></a>
                              </li>
                              <li>
                                <a href=""><i class="icon-heart"></i></a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
          `;
    }
    document.querySelector(".shop_container_product").innerHTML = resultProduct;
    document.querySelector(".pagination .page-item").classList.remove("active");
    clicked.closest(".page-item").classList.add("active");
  }
}
// PHẦN SỰ KIỆN

ulBtnCategory.addEventListener("click", handleShowProductCategory);

// khi tràg load lần đầu tự click vào lj đầu tiên

document
  .querySelector(".widget_categories li a .categories_name:first-child")
  .click();

// thêm sk khi click vào mỗi trang phân trang
paginationSelector.addEventListener("click", handleClickPageCategory);
