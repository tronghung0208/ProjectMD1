// khai báo biến

const btnSearchNameSelector = document.querySelector(".search-strong_name");

const inputNameSearch = document.querySelector(".search_product_name");

// khai báo hàm
function handleSearchName(event) {
  event.preventDefault();
  let products = JSON.parse(localStorage.getItem("products"));
  let valueInputName = inputNameSearch.value.toLowerCase();

  if (valueInputName !== "") {
    let resultSearchName = products.filter(function (item) {
      return (
        item.nameProduct.toLocaleLowerCase().indexOf(valueInputName) !== -1
      );
    });
    if (resultSearchName.length > 0) {
      let searchResult = "";
      for (let i = 0; i < resultSearchName.length; i++) {
        searchResult =
          searchResult +
          `<div class="col-lg-3 col-md-4 col-6">
        <div class="product">
          <div class="product_img">
            <a href="">
              <img
                src="${resultSearchName[i].image}"
                alt="product_img1"
              />
            </a>
            <div class="product_action_box">
              <ul class="list_none pr_action_btn">
                <li class="add-to-cart">
                  <a href=""
                    ><i class="icon-basket-loaded"></i> Add To Cart</a
                  >
                </li>
    
                <li>
                  <a href="" class="popup-ajax"
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
              <a href="shop-product-detail.html"
                >${resultSearchName[i].nameProduct}</a
              >
            </h6>
            <div class="product_price">
              
              <span class="price">${resultSearchName[i].price}$</span>
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
            <div class="pr_switch_wrap">
              <div class="product_color_switch">
                <span class="active" data-color="#87554B"></span>
                <span data-color="#333333"></span>
                <span data-color="#DA323F"></span>
              </div>
            </div>
          </div>
        </div>
      </div>`;
      }
      document.querySelector(".container_content_search h2").innerText =
        "Your search results";
      document.querySelector(".tab-content_search").innerHTML = searchResult;
    } else {
      document.querySelector(".container_content_search h2").innerText =
        "The product you are looking for is not available";
    }
  } else {
    document.querySelector(".container_content_search h2").innerText =
      "The product you are looking for is not available";
  }
}

// sự kiện

btnSearchNameSelector.addEventListener("click", handleSearchName);
