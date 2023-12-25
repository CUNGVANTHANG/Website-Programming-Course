const contentBody = `
<div class="pb-30">
      <div class="row no-gutters">
        <div class="col-md-12 col-12">
          <div class="session-cart">
            <div nh-row="bxgfhs1" class="breadcrumbs mb-30">
              <div class="container">
                <div class="row">
                  <div class="col-md-12 col-12">
                    <div nh-block="mz4eo5d" nh-block-cache="false" class="">
                      <nav class="breadcrumbs__content">
                        <div class="breadcrumbs__item">
                          <a href="./trang-chu.html">Trang chủ</a>
                        </div>
                        <div class="breadcrumbs__item">
                          <a href="./info.html">Đơn hàng</a>
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="container">
              <div class="row no-gutters justify-content-center">
                <div class="col-xl-8 col-lg-9 col-md-11">
                  <div class="shopCompleted-header mb-40">
                    <div class="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-check"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <h2 class="title">Bạn đã đặt hàng thành công!</h2>
                    <div class="subtitle">
                      <p>
                        Cảm ơn bạn đã đăng ký khóa học. Chúng tôi sẽ kích hoạt
                        khóa học của bạn trong vòng 24 giờ.
                      </p>
                      <p class="italic text-danger">
                        <b>Lưu ý:</b> Nếu bạn chưa có tài khoản, chúng tôi sẽ
                        tạo mới tài khoản và gửi thông tin đăng nhập vào Email
                        của bạn.
                      </p>
                    </div>
                  </div>

                  <h5 class="text-20 mb-20">Thông tin đơn hàng</h5>
                  <div class="shopCompleted-info mb-25">
                    <div class="row no-gutters y-gap-32">
                      <div class="col-md-3 col-sm-6">
                        <div class="shopCompleted-info__item">
                          <div class="subtitle">Họ tên</div>
                          <div class="title text-purple-1 mt-5">
                            Admin
                          </div>
                        </div>
                      </div>

                      <div class="col-md-3 col-sm-6">
                        <div class="shopCompleted-info__item">
                          <div class="subtitle">Số điện thoại</div>
                          <div class="title text-purple-1 mt-5">0987654321</div>
                        </div>
                      </div>

                      <div class="col-md-3 col-sm-6">
                        <div class="shopCompleted-info__item">
                          <div class="subtitle">Email</div>
                          <div class="title text-purple-1 mt-5">
                            Admin@gmail.com
                          </div>
                        </div>
                      </div>

                      <div class="col-md-3 col-sm-6">
                        <div class="shopCompleted-info__item">
                          <div class="subtitle">Mã đơn hàng</div>
                          <div class="title text-purple-1 mt-5">
                            ORD890231674
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mb-25">
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
                              data-bg="https://cdn.28tech.com.vn/thumbs/logo/79f8cc3e-dbb3-48a9-a021-7f09e6df6704_thumb_150.png"
                            ></div>
                          </div>
                          <div class="fw-500 text-dark-1 ml-15">
                            <p class="text-14">
                              Lập Trình Python Từ Cơ Bản Tới Nâng Cao Qua 120
                              Video Và 300 Bài Tập Hackerrank
                            </p>
                            <p class="fw-700">799,000 VND</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mb-25">
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
