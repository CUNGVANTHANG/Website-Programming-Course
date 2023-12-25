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
              <div class="payment-section">
                <div class="row">
                  <div class="col-lg-7 col-md-6">
                    <div class="mb-25">
                      <div class="d-flex justify-content-between align-items-center mb-20">
                        <h5 class="text-20">Thông tin học viên</h5>
                      </div>

                      <div class="p-15 bg-light-6 rounded-8">
                        <p class="mb-0">Họ tên: <strong>Admin</strong></p>

                        <p class="mb-0">Số điện thoại: <strong>0987654321</strong></p>

                        <p class="mb-0">Email: <strong>Admin@gmail.com</strong></p>
                      </div>
                    </div>

                    <div class="d-flex justify-content-between align-items-center mb-20">
                      <h5 class="text-20">Phương thức thanh toán</h5>
                    </div>

                    <div class="payment-method p-15 bg-light-6 rounded-8">
                      <form id="form-checkout" action="" method="post">
                        <div class="d-flex align-content-stretch flex-wrap">
                          <ul class="nav w-100 d-none" role="tablist">
                            <li class="nav-item clearfix mb-10">
                              <a nh-gateway-item="bank" href="#bank" class="nav-link color-black d-flex align-items-center border p-15 active" data-toggle="tab" role="tab">
                                <div class="inner-icon position-relative mr-15">
                                  <img class="img-fluid rti-abs-contain" src="/templates/khoahoc01/assets/img/payment/bank.png" alt="bank" />
                                </div>
                                <div class="inner-label text-left">Phương thức thanh toán</div>
                              </a>
                            </li>
                          </ul>

                          <div class="tab-content w-100">
                            <div id="bank" class="tab-pane active" role="tabpanel">
                              <h3 class="text-18 fw-600 mb-20">Chuyển khoản ngân hàng</h3>

                              <div class="entry-bank mb-30">
                                <table class="table w-1/1 mb-0 bg-white">
                                  <tbody>
                                    <tr>
                                      <td class="p-10">Tên ngân hàng</td>
                                      <td class="p-10">
                                        <b>MB BANK</b>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td class="p-10">Chủ tài khoản</td>
                                      <td class="p-10">
                                        <b>CUNG VĂN THẮNG</b>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td class="p-10">Số tài khoản</td>
                                      <td class="p-10">
                                        <b>130721061808</b>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>

                              <h3 class="text-18 fw-600 mb-5">Thanh toán qua ví MoMo</h3>

                              <p>
                                Truy cập đường dẫn:
                                <a href="https://me.momo.vn/pay28tech" target="_blank">https://me.momo.vn/pay28tech</a>
                              </p>
                              <p><strong>HOẶC</strong></p>
                              <p class="mb-20">Quét mã QR:</p>

                              <div class="entry-bank mb-30">
                                <img nh-lazy="image" class="img-fluid" data-src="https://cdn.28tech.com.vn/media/core/momo-pay28tech.png" alt="Thanh toán qua ví MoMo" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" />
                              </div>

                              <h3 class="text-20 fw-700">
                                Nội dung thanh toán:
                                <span class="text-danger fw-800">0987654321_ORD890231674</span>
                              </h3>

                              <div class="my-20">
                                <p>
                                  Sau khi thanh toán xong bấm
                                  <b>Hoàn tất thanh toán</b> để hoàn tất quá trình mua khóa học.
                                </p>
                              </div>

                              <div class="checkout-payment text-lg-left text-center pt-15 p-lg-0">
                                <!-- nh-btn-action="checkout" -->
                                <a href="./success.html" class="button -md -dark-1 text-white"> Hoàn tất thanh toán </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <input name="payment_gateway" value="" type="hidden" />
                        <input name="code" value="ORD890231674" type="hidden" />
                      </form>
                    </div>
                  </div>

                  <div class="col-lg-5 col-md-6">
                    <div class="order-review">
                      <div class="mb-15">
                        <div class="d-flex justify-content-between align-items-center mb-20">
                          <h5 class="text-20">Danh sách khóa học</h5>
                        </div>

                        <div class="p-15 bg-light-6 rounded-8">
                          <div class="d-flex items-center mb-10">
                            <div class="">
                              <div class="size-60 bg-image rounded-8 js-lazy" data-bg="https://cdn.28tech.com.vn/thumbs/logo/79f8cc3e-dbb3-48a9-a021-7f09e6df6704_thumb_150.png"></div>
                            </div>
                            <div class="fw-500 text-dark-1 ml-15">
                              <p class="text-14">Lập Trình Python Từ Cơ Bản Tới Nâng Cao Qua 120 Video Và 300 Bài Tập Hackerrank</p>
                              <p class="fw-700">799,000 VND</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="entry-order-review">
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
        </div>
      </div>
    </div>`;

var body = document.getElementById("body");

body.innerHTML = contentBody;
