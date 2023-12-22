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
      <div class="content-mini-cart border-top pt-20">
        <div class="box-minicart" nh-total-quantity-cart="0">
          <ul class="cart-list list-unstyled mb-0">
            <li class="empty text-center py-30">
              <i class="iconsax isax-bag-cross-1"></i>
              <div class="empty-cart">Chưa có khóa học nào trong giỏ hàng</div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <input
      id="nh-data-init"
      type="hidden"
      value='{"device":0,"member":null,"social":{"facebook_app_id":null,"facebook_load_sdk":null,"facebook_sdk_delay":"2000","google_client_id":null,"google_load_sdk":null,"google_sdk_delay":"2000"},"template":{"code":"khoahoc01","url":"\/templates\/khoahoc01\/"},"cdn_url":"https:\/\/cdn.28tech.com.vn","wishlist":null,"recaptcha":null,"embed_code":null,"cart":null,"product":{"check_quantity":null}}'
    />`;

var cart = document.getElementById("cart");

cart.innerHTML = contentCart;
