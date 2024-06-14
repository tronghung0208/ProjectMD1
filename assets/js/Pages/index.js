// const ulTabSelector = document.querySelector(".product_tab_click");

// function handleShowProductByTab(event) {
//   let clicked = event.target;
//   if (clicked.classList.contains("product_item_tab")) {
//     let productType = clicked.getAttribute("data-type");

//     console.log(productType);
//     let products = JSON.parse(localStorage.getItem("products"));
//     let productFilterByType = products.filter(function (item) {
//       return item.type === productType;
//     });

//     let result = renderProduct(productFilterByType);

//     let objMapping = {
//       new_arrival: "#arrival",
//       best_seller: "#sellers",
//       featured: "#featured",
//       special_offer: "#special",
//     };

//     document
//       .querySelector(objMapping[productType])
//       .querySelector(".shop_container").innerHTML = result;
//   }
// }

// function renderProduct(productFilterByType) {
//   let result = "";
//   for (let i = 0; i < productFilterByType.length; i++) {
//     result =
//       result +
//       `
//     <div class="col-lg-3 col-md-4 col-6">
//                       <div class="product">
//                         <div class="product_img">
//                           <a href="">
//                             <img
//                               src="${productFilterByType[i].image}"
//                               alt="product_img1"
//                             />
//                           </a>
//                           <div class="product_action_box">
//                             <ul class="list_none pr_action_btn">
//                               <li class="add-to-cart">
//                                 <a href=""
//                                   ><i class="icon-basket-loaded"></i> Add To
//                                   Cart</a
//                                 >
//                               </li>

//                               <li>
//                                 <a href="" class="popup-ajax"
//                                   ><i class="icon-magnifier-add"></i
//                                 ></a>
//                               </li>
//                               <li>
//                                 <a href=""><i class="icon-heart"></i></a>
//                               </li>
//                             </ul>
//                           </div>
//                         </div>
//                         <div class="product_info">
//                           <h6 class="product_title">
//                             <a href="shop-product-detail.html"
//                               >${productFilterByType[i].nameProduct}</a
//                             >
//                           </h6>
//                           <div class="product_price">
//                             <p>Corwin Chrysler Dodge Jeep Ram(Fargo, ND)</p>
//                             <span class="price">${
//                               productFilterByType[i].price
//                             }$</span>
//                             <del>${
//                               +productFilterByType[i].price +
//                               (+productFilterByType[i].price * 35) / 100
//                             }$</del>
//                             <div class="on_sale">
//                               <span>35% Off</span>
//                             </div>
//                           </div>
//                           <div class="rating_wrap">
//                             <div class="rating">
//                               <div
//                                 class="product_rate"
//                                 style="width: 80%"
//                               ></div>
//                             </div>
//                             <span class="rating_num">(21)</span>
//                           </div>
//                           <div class="pr_desc">
//                             <p>
//                               Lorem ipsum dolor sit amet, consectetur adipiscing
//                               elit. Phasellus blandit massa enim. Nullam id
//                               varius nunc id varius nunc.
//                             </p>
//                           </div>
//                           <div class="pr_switch_wrap">
//                             <div class="product_color_switch">
//                               <span class="active" data-color="#87554B"></span>
//                               <span data-color="#333333"></span>
//                               <span data-color="#DA323F"></span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                         </div>
//                       </div>
//                     </div>
//     `;
//   }
//   return result;
// }

// function loadDataArival() {
//   let products = JSON.parse(localStorage.getItem("products"));
//   let productFilterByType = products.filter(function (item) {
//     return item.type === "new_arrival";
//   });
//   let result = renderProduct(productFilterByType);
//   document.querySelector("#arrival .shop_container").innerHTML = result;
// }

// // add event
// loadDataArival();

// ulTabSelector.addEventListener("click", handleShowProductByTab);

// // phần Featured Products

// function renderItemFeature() {
//   let products = JSON.parse(localStorage.getItem("products"));

//   let itemFilterFeature = products.filter(function (item) {
//     return item.type === "featured";
//   });
//   console.log(itemFilterFeature);
//   let resultItem = "";
//   for (let i = 0; i < itemFilterFeature.length; i++) {
//     resultItem =
//       resultItem +
//       `
//     <div class="item">
//                   <div class="product">
//                     <div class="product_img">
//                       <a href="shop-product-detail.html">
//                         <img
//                           src="${itemFilterFeature[i].image}"
//                           alt="product_img1"
//                         />
//                       </a>
//                       <div class="product_action_box">
//                         <ul class="list_none pr_action_btn">
//                           <li class="add-to-cart">
//                             <a href="#"
//                               ><i class="icon-basket-loaded"></i> Add To Cart</a
//                             >
//                           </li>

//                           <li>
//                             <a href="shop-quick-view.html" class="popup-ajax"
//                               ><i class="icon-magnifier-add"></i
//                             ></a>
//                           </li>
//                           <li>
//                             <a href="#"><i class="icon-heart"></i></a>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                     <div class="product_info">
//                       <h6 class="product_title">
//                         <a href="shop-product-detail.html"
//                           >${itemFilterFeature[i].nameProduct}</a
//                         >
//                       </h6>
//                       <p>BMW's 3-Series and Mercedes' C-Class a serious</p>
//                       <div class="product_price">
//                         <span class="price">${itemFilterFeature[i].price}</span>
//                         <del>${(+itemFilterFeature[i].price)}</del>
//                         <div class="on_sale">
//                           <span>35% Off</span>
//                         </div>
//                       </div>
//                       <div class="rating_wrap">
//                         <div class="rating">
//                           <div class="product_rate" style="width: 80%"></div>
//                         </div>
//                         <span class="rating_num">(21)</span>
//                       </div>
//                       <div class="pr_desc">
//                         <p>
//                           Lorem ipsum dolor sit amet, consectetur adipiscing
//                           elit. Phasellus blandit massa enim. Nullam id varius
//                           nunc id varius nunc.
//                         </p>
//                       </div>
//                       <div class="pr_switch_wrap">
//                         <div class="product_color_switch">
//                           <span class="active" data-color="#87554B"></span>
//                           <span data-color="#333333"></span>
//                           <span data-color="#DA323F"></span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//     `;
//   }
//   document.querySelector(".product_slider_feature").innerHTML = resultItem;
// }

// renderItemFeature();

// 1. khai báo biến

const ulTabSelector = document.querySelector(".product_tab_click");

// 2. gọi hàm
function handelShowProductByTab(event) {
  let clicked = event.target;
  let products = JSON.parse(localStorage.getItem("products"));
  if (clicked.classList.contains("product_item_tab")) {
    let productDataType = clicked.getAttribute("data-type");

    let productByType = products.filter(function (item) {
      return item.type === productDataType;
    });
    productByType = productByType.slice(0, 8);

    let resultHtml = renderItemProduct(productByType);
    let objMapping = {
      new_arrival: "#arrival",
      best_seller: "#sellers",
      featured: "#featured",
      special_offer: "#special",
    };

    document
      .querySelector(objMapping[productDataType])
      .querySelector(".shop_container").innerHTML = resultHtml;
  }
}

function renderItemProduct(productByType) {
  let resultHtml = "";
  for (let i = 0; i < productByType.length; i++) {
    resultHtml += `
    <div class="col-lg-3 col-md-4 col-6">
                          <div class="product">
                            <div class="product_img">
                              <a href="/shop-product-detail.html id=${productByType[i].id}">
                                <img
                                  src="${productByType[i].image}"
                                  alt="product_img1"
                                />
                              </a>
                              <div class="product_action_box">
                                <ul class="list_none pr_action_btn">
                                  <li  data-id="${productByType[i].id}" class="add-to-cart cart_click">
                                    <a href="" class="cart_click" 
                                      ><i class="icon-basket-loaded cart_click"></i> Add To
                                      Cart</a
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
                                <a href="/shop-product-detail.html?id=${productByType[i].id}"
                                  >${productByType[i].nameProduct}</a
                                >
                              </h6>
                              <div class="product_price">
                                <span class="price">${productByType[i].price}$</span>
                              </div>
                              <div class="rating_wrap">
                                <div class="rating">
                                  <div
                                    class="product_rate"
                                    style="width: 80%"
                                  ></div>
                                </div>
                                <span class="rating_num">(21)</span>
                              </div>
                              <div class="pr_desc">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing
                                  elit. Phasellus blandit massa enim. Nullam id
                                  varius nunc id varius nunc.
                                </p>
                              </div>
                              
                            </div>
                          </div>
    
                            </div>
                          </div>
                        </div>
          `;
  }
  return resultHtml;
}

function renderItemFeature() {
  let products = JSON.parse(localStorage.getItem("products"));

  let itemFilterFeature = products.filter((item) => item.type === "featured");

  itemFilterFeature = itemFilterFeature.slice(0, 12);

  let resultItem = "";
  for (let i = 0; i < itemFilterFeature.length; i++) {
    resultItem =
      resultItem +
      `
    <div class="item">
                  <div class="product">
                    <div class="product_img">
                      <a href="/shop-product-detail.html id=${itemFilterFeature[i].id}">
                        <img
                          src="${itemFilterFeature[i].image}"
                          alt="product_img1"
                        />
                      </a>
                      <div class="product_action_box">
                        <ul class="list_none pr_action_btn">



                          <li class="add-to-cart" data-id=${itemFilterFeature[i].id}>
                            <a href=""
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
                        <a href="/shop-product-detail.html id=${itemFilterFeature[i].id}"
                          >${itemFilterFeature[i].nameProduct}</a
                        >
                      </h6>
                      
                      <div class="product_price">
                        <span class="price">${itemFilterFeature[i].price}$</span>
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
                      
                    </div>
                  </div>
                </div>
    `;
  }
  document.querySelector(".product_slider_feature").innerHTML = resultItem;
}

// 3.sự kiện.

ulTabSelector.addEventListener("click", handelShowProductByTab);
// tự động click vào tab đầu tiên
document.querySelector(`a[href="#arrival"]`).click();

renderItemFeature();
