const contentCart = `
<div nh-mini-cart="sidebar" class="sidebar-mini-cart">
      <div
        class="title-top-cart d-flex justify-content-between align-items-center mx-md-20 mx-10"
      >
        <div class="title-cart fs-18 fw-bold">Giỏ hàng của bạn</div>
        <div class="sidebar-header">
          <a
            href="javascript:;"
            nh-mini-cart="close"
            class="close-sidebar effect-rotate icon-close"
            ><i class="iconsax isax-add"></i
          ></a>
        </div>
      </div>

      <div id="removeCart" class="content-mini-cart border-top pt-20">
          <div class="box-minicart" nh-total-quantity-cart="0">
            <ul class="cart-list list-unstyled mb-0">
              <li class="empty text-center py-30">
                <i class="iconsax isax-bag-cross-1"></i>
                  <div class="empty-cart">Chưa có khóa học nào trong giỏ hàng</div>
              </li>
            </ul>
          </div>
        </div>

      <div id="addCart">
        
      </div>
      
    </div>

    <input
      id="nh-data-init"
      type="hidden"
      value='{"device":0,"member":null,"social":{"facebook_app_id":null,"facebook_load_sdk":null,"facebook_sdk_delay":"2000","google_client_id":null,"google_load_sdk":null,"google_sdk_delay":"2000"},"template":{"code":"khoahoc01","url":"\/templates\/khoahoc01\/"},"cdn_url":"https:\/\/cdn.28tech.com.vn","wishlist":null,"recaptcha":null,"embed_code":null,"cart":null,"product":{"check_quantity":null}}'
    />`;

const contentCartUpdate = `<div nh-mini-cart="sidebar" class="sidebar-mini-cart open"><div class="title-top-cart d-flex justify-content-between align-items-center mx-md-20 mx-10"><div class="title-cart fs-18 fw-bold">Giỏ hàng của bạn</div><div class="sidebar-header"><a href="javascript:;" nh-mini-cart="close" class="close-sidebar effect-rotate icon-close"><i class="iconsax isax-add"></i></a></div></div><div class="content-mini-cart border-top pt-20"><div class="box-minicart " nh-total-quantity-cart="1"><ul class="cart-list list-unstyled mb-0 px-20"><li nh-cart-item="1" nh-cart-item-quantity="1" class="cart-item clearfix"><div class="inner-image"><a href="/hoc-lap-trinh-c-qua-170-bai-giang-320-bai-tap-coding-hackerrank-va-200-cau-trac-nghiem" title="Học Lập Trình C qua 170 bài giảng, 320 bài tập coding Hackerrank và 200 câu trắc nghiệm"><img class="img-fluid" src="https://cdn.28tech.com.vn/thumbs/video_khoa_lap_trinh_c/image/50aadc4748bc97e2cead_thumb_150.jpg" alt="Học Lập Trình C qua 170 bài giảng, 320 bài tập coding Hackerrank và 200 câu trắc nghiệm"></a></div><div class="inner-content"><a class="product-title" href="/hoc-lap-trinh-c-qua-170-bai-giang-320-bai-tap-coding-hackerrank-va-200-cau-trac-nghiem">Học Lập Trình C qua 170 bài giảng, 320 bài tập ...</a><div class="quantity"><span class="price-amount">799,000<span class="currency-symbol">VND</span></span></div><a href="javascript:;" class="btn-delete-save" nh-remove-item-cart="1">Xóa</a></div></li></ul><div class="entire-bottom-minicart border-top px-20"><div class="total-price mb-10 clearfix"><label>Giá tạm tính: </label><p class="price-amount">799,000<span class="currency-symbol">VND</span></p></div><div class="row x-gap-20 y-gap-10 pt-30 pb-30"><div class="col-sm-6"><a href="/order/cart-info" class="button py-20 -dark-1 text-white -dark-button-white col-12">Xem Giỏ hàng</a></div><div class="col-sm-6"><a href="/order/info" class="button py-20 -purple-1 text-white col-12">Thanh toán</a></div></div></div></div></div></div>
<input
      id="nh-data-init"
      type="hidden"
      value='{"device":0,"member":null,"social":{"facebook_app_id":null,"facebook_load_sdk":null,"facebook_sdk_delay":"2000","google_client_id":null,"google_load_sdk":null,"google_sdk_delay":"2000"},"template":{"code":"khoahoc01","url":"\/templates\/khoahoc01\/"},"cdn_url":"https:\/\/cdn.28tech.com.vn","wishlist":null,"recaptcha":null,"embed_code":null,"cart":null,"product":{"check_quantity":null}}'
    />
`;

var cartElement = document.getElementById("cart");

cartElement.innerHTML = contentCartUpdate;

// var cartElement1 = document.getElementById("orderCourse1");
// var cartElement2 = document.getElementById("orderCourse2");
// var addCartElement = document.getElementById("addCart");

// var removeCart = document.getElementById("removeCart")
// var valueOrderCourse2 = parseInt(1)

// var totalOrder = sessionStorage.getItem("totalOrder") || 0;

// cart.innerHTML = contentCart;

// sessionStorage.setItem("totalOrder", totalOrder);

// function handleCart1() {
//     var valueOrderCourse1 = parseInt(1)
//     if (valueOrderCourse1 == 1) {

//     }
//     totalOrder = parseInt(totalOrder) + valueOrderCourse1;
//     valueOrderCourse1 = parseInt(0)
//     sessionStorage.setItem("totalOrder", totalOrder);
// }

// if (cartElement1) {
//   cartElement1.addEventListener("click", handleCart1);
// }

// function handleCart2() {
//   totalOrder = parseInt(totalOrder) + valueOrderCourse2;
//   valueOrderCourse2 = parseInt(0)
//   sessionStorage.setItem("totalOrder", totalOrder);
// }

// if (cartElement2) {
//   cartElement2.addEventListener("click", handleCart2);
// }
