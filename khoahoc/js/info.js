const contentBody = `
<div class="pb-30">
      <div class="row no-gutters">
        <div class="col-md-12 col-12">
          <div class="session-cart">
            <div>
              <div nh-row="bxgfhs1" class="breadcrumbs mb-30">
                <div class="container">
                  <div class="row">
                    <div class="col-md-12 col-12">
                      <div nh-block="mz4eo5d" nh-block-cache="false" class="">
                        <nav class="breadcrumbs__content">
                          <div class="breadcrumbs__item">
                            <a href="../index.html">Trang chủ</a>
                          </div>
                          <div class="breadcrumbs__item">
                            <a href="info.html">Đơn hàng</a>
                          </div>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="container">
                <div class="checkout-section">
                  <form id="order-info" method="post" novalidate="novalidate">
                    <div class="row">
                      <div id="order-info-left" class="col-lg-7 col-md-6 mb-30">
                        <div class="billing-details">
                          <div
                            class="d-flex justify-content-between align-items-center mb-20"
                          >
                            <h5 class="text-20">Thông tin học viên</h5>
                            <p class="fs-13 lh-13">
                              Bạn đã có tài khoản?
                              <a
                                nh-order-login
                                href="javascript:;"
                                class="text-dark-1"
                              >
                                Đăng nhập
                              </a>
                            </p>
                          </div>

                          <div class="inner-col-1">
                            <div
                              class="form-billing contact-form p-15 bg-light-6 rounded-8"
                            >
                              <div class="form-group mb-25 validate-form">
                                <label
                                  class="text-16 lh-1 fw-500 text-dark-1 mb-10"
                                  >Họ và tên *</label
                                >
                                <input
                                  class="bg-white border form-control rounded input-hover"
                                  name="full_name"
                                  value=""
                                  type="text"
                                />
                              </div>

                              <div class="form-group mb-25 validate-form">
                                <label
                                  class="text-16 lh-1 fw-500 text-dark-1 mb-10"
                                  >Số điện thoại *</label
                                >
                                <input
                                  class="bg-white border form-control rounded input-hover"
                                  name="phone"
                                  value=""
                                  type="text"
                                />
                              </div>

                              <div class="form-group mb-25 validate-form">
                                <label
                                  class="text-16 lh-1 fw-500 text-dark-1 mb-10"
                                  >Email *</label
                                >
                                <input
                                  class="bg-white border form-control rounded input-hover"
                                  name="email"
                                  value=""
                                  type="text"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="order-info-right" class="col-lg-5 col-md-6">
                        <div class="order-review">
                          <div class="mb-15">
                            <div
                              class="d-flex justify-content-between align-items-center mb-20"
                            >
                              <h5 class="text-20">Danh sách khóa học</h5>
                            </div>

                            <div class="p-15 bg-light-6 rounded-8">
                              <div class="d-flex items-center mb-10">
                                <div class="">
                                  <div
                                    class="size-60 bg-image rounded-8 js-lazy"
                                    data-bg="https://cdn.28tech.com.vn/thumbs/video_khoa_lap_trinh_c/image/50aadc4748bc97e2cead_thumb_150.jpg"
                                  ></div>
                                </div>
                                <div class="fw-500 text-dark-1 ml-15">
                                  <p class="text-14">
                                    Học Lập Trình C qua 170 bài giảng, 320 bài
                                    tập coding Hackerrank và 200 câu trắc nghiệm
                                  </p>
                                  <p class="fw-700">799,000 VND</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="entry-order-review">
                            <div class="cart-drop-botoom">
                              <div id="accordion-order">
                                <div
                                  class="card bg-white border-0 rounded mb-10"
                                >
                                  <div
                                    class="card-header border-0 p-15 bg-light-6 rounded-8"
                                  >
                                    <div
                                      class="btn d-flex justify-content-between align-items-center w-100"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#coupon-panel"
                                      aria-expanded="true"
                                    >
                                      <span class="d-flex align-items-center">
                                        <i
                                          class="iconsax isax-2x color-hover isax-ticket"
                                        ></i>
                                        <span class="pl-10">
                                          Phiếu giảm giá
                                        </span>
                                      </span>
                                      <span class="d-flex align-items-center">
                                        <span>
                                          <i
                                            class="iconsax isax-arrow-down-1"
                                          ></i>
                                        </span>
                                      </span>
                                    </div>
                                  </div>

                                  <div
                                    id="coupon-panel"
                                    class="collapse"
                                    data-parent="#accordion-order"
                                  >
                                    <div class="p-15 bg-light-6 rounded-8">
                                      <div class="form-group mb-10">
                                        <input
                                          id="order-coupon-code"
                                          value=""
                                          type="text"
                                          class="bg-white p-10 border form-control rounded input-hover"
                                          placeholder="Nhập phiếu giảm giá"
                                        />
                                      </div>
                                      <span
                                        nh-btn-action="apply-coupon"
                                        class="btn bg-main btn-1a color-white py-10 fs-16 fs-14 px-25 mb-15 w-100 rounded"
                                      >
                                        Áp dụng
                                      </span>

                                      <div
                                        class="d-flex justify-content-between align-items-center mb-5"
                                      >
                                        <a
                                          class="button -outline-purple-1 text-purple-1 px-10 py-8"
                                          href="javascript:;"
                                          nh-btn-action="list-coupon"
                                        >
                                          <i
                                            class="iconsax isax-ticket fs-18 mr-5"
                                          ></i>
                                          Lấy phiếu giảm giá
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <input name="coupon" value="" type="hidden" />
                                <input
                                  name="promotion_id"
                                  value=""
                                  type="hidden"
                                />
                              </div>
                            </div>

                            <div class="p-15 bg-light-6 rounded-8 mb-10">
                              <div class="d-flex justify-content-between mb-15">
                                <span> Đơn giá </span>

                                <span class="text-right">
                                  <strong>
                                    <span class="price-amount">
                                      799,000
                                      <span class="currency-symbol"> VND </span>
                                    </span>
                                  </strong>
                                </span>
                              </div>

                              <div class="separation-dash mb-15"></div>

                              <div class="d-flex justify-content-between mb-15">
                                <span> Tổng tiền </span>

                                <span class="color-hover text-right">
                                  <strong>
                                    <span class="price-amount">
                                      799,000
                                      <span class="currency-symbol"> VND </span>
                                    </span>
                                  </strong>
                                </span>
                              </div>
                            </div>

                            
                            <div class="checkout-payment mb-10">
                              <a
                                class="button -md -dark-1 text-white"
                                href="./checkout.html"
                              >
                                Thanh toán
                              </a>
                              <a
                                title="Quay lại giỏ hàng"
                                class="order-back fs-14 d-flex align-items-center color-main mt-15"
                                href="./cart-info.html"
                              >
                                <i class="iconsax isax-arrow-left mr-5"></i>
                                Quay lại giỏ hàng
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div
                id="list-coupon-modal"
                class="modal fade"
                tabindex="-1"
                role="dialog"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-lg modal-dialog-centered">
                  <div class="modal-content bg-light-6 shadow-1 rounded-16">
                    <button
                      class="close icon-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <i class="iconsax isax-add"></i>
                    </button>
                    <div class="modal-body">
                      <div nh-promotion>
                        Hiện không có phiếu giảm giá nào được áp dụng
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;

var body = document.getElementById("body");

body.innerHTML = contentBody;
