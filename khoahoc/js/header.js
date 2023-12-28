const contentHeaderout = `
<div nh-row="lx8y1qo" class="header-main align-row-center py-10">
        <div class="container">
          <div class="row">
            <div class="col-md-2 col-12">
              <div nh-block="hysxug5" nh-block-cache="true" class="">
                <div class="logo-section">
                  <a href="./trang-chu.html"
                    ><img
                      nh-lazy="image"
                      class="img-fluid"
                      data-src="../cdn.khoahoc/media/logo/logo.png"
                      alt="28Tech - Become A Better Developer"
                      src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                  /></a>
                </div>
              </div>
            </div>
            <div class="col-md-7 col-12">
              <div
                nh-block="ap149zd"
                nh-block-cache="false"
                class="menu-mobile"
              >
                <div class="menu-container">
                  <a
                    class="btn-menu-mobile"
                    nh-menu="btn-open"
                    href="javascript:;"
                    ><i class="iconsax isax-menu-1"></i
                  ></a>
                  <div class="back-drop"></div>
                  <nav class="menu-section" nh-menu="sidebar">
                    <div class="menu-top">
                      <span class="menu-header">Menu</span
                      ><a
                        href="javascript:;"
                        nh-menu="btn-close"
                        class="close-sidebar effect-rotate icon-close"
                        ><i class="iconsax isax-add"></i
                      ></a>
                    </div>
                    <ul>
                      <li>
                        <a href="./trang-chu.html"
                          >Trang chủ<span
                            class="iconsax isax-arrow-down-1"
                          ></span
                        ></a>
                      </li>
                      <li>
                        <a href="./khoa-hoc-online.html"
                          >Khóa học online<span
                            class="iconsax isax-arrow-down-1"
                          ></span
                        ></a>
                      </li>
                      <li>
                        <a href="./ve-chung-toi.html"
                          >Về chúng tôi<span
                            class="iconsax isax-arrow-down-1"
                          ></span
                        ></a>
                      </li>
                      <li>
                        <a href="./blog.html"
                          >Blog<span class="iconsax isax-arrow-down-1"></span
                        ></a>
                      </li>
                      <li class="menu-left">
                        <a href="./lien-he.html"
                          >Liên hệ<span class="iconsax isax-arrow-down-1"></span
                        ></a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            <div class="col-md-3 col-12">
              <div nh-block="7fdlry1" nh-block-cache="true" class="float-right">
                <div nh-mini-member class="user-section entire-action-header">
                  <a
                    id="guest"
                    class="btn-action-header"
                    title="Tài khoản"
                    href="javascript:;"
                    data-bs-toggle="modal"
                    data-bs-target="#login-modal"
                    ><i class="iconsax isax-user"></i
                  ></a>

                  <div class="dropdown show" id="user" style="display:none;">
                    <a
                      class="btn-action-header"
                      href="javascript:;"
                      title="Admin"
                      role="button"
                      id="member-info"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="iconsax isax-user-tick"></i>
                    </a>

                    <div
                      class="dropdown-menu dropdown-menu-end"
                      aria-labelledby="member-info"
                      style=""
                    >
                      <a
                        class="dropdown-item border-bottom p-10"
                        href="./dashboard.html"
                      >
                        <i class="iconsax isax-lg isax-tag-user mr-5"></i>
                        Thông tin cá nhân
                      </a>

                      <a
                        class="dropdown-item border-bottom p-10"
                        href="./khoa-hoc-da-mua.html"
                      >
                        <i class="iconsax isax-lg isax-video-square mr-5"></i>
                        Khóa học đã mua
                      </a>

                      <a id="logout" class="dropdown-item p-10">
                        <i class="iconsax isax-lg isax-logout mr-5"></i>
                        Thoát
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div nh-block="6gxudh8" nh-block-cache="true" class="float-right">
                <div class="entire-action-header">
                  <a
                    class="btn-mini-cart btn-action-header"
                    nh-mini-cart="open"
                    title="Giỏ hàng"
                    href="javascript:;"
                    ><i class="iconsax isax-bag-2"></i
                    ><span nh-total-quantity-mini-cart class="items-number"
                      >1</span
                    ></a
                  >
                </div>
              </div>

              <div nh-block="6gxudh8" nh-block-cache="true" class="float-right">
                <div class="entire-action-header search-section">
                  <a
                    class="btn-action-header"
                    title="Tìm kiếm"
                    href="./search.html"
                  >
                    <i class="iconsax isax-search-normal-1"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`

      var headerout = document.getElementById("header");

      headerout.innerHTML = contentHeaderout;

// var itemsNumber = document.querySelector(".items-number")

// itemsNumber.innerHTML = sessionStorage.getItem("totalOrder")
