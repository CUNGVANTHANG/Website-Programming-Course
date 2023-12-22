const contentBody = `
<div nh-row="x1rviay" class="">
      <div class="row no-gutters">
        <div class="col-md-12 col-12">
          <div nh-block="n8vak24" nh-block-cache="false" class="session-cart">
            <div class="breadcrumbs mb-30">
              <div class="container">
                <div class="row">
                  <div class="col-md-12 col-12">
                    <nav class="breadcrumbs__content">
                      <div class="breadcrumbs__item">
                        <a href="../index.html">Trang chủ</a>
                      </div>
                      <div class="breadcrumbs__item">
                        <a href="register.html">Tài khoản thành viên</a>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>

            <div class="container">
              <div class="row justify-content-center">
                <div class="col-md-6 col-12">
                  <div class="mb-60 rounded bg-white shadow p-30">
                    <h3 class="text-24 lh-13 mb-25">Đăng ký</h3>
                    <div class="session-login d-flex flex-column justify-content-between">
                      <form nh-form="member-register" id="member-register" class="contact-form" action="https://khoahoc.28tech.com.vn/member/ajax-register" method="post" autocomplete="off">
                        <div class="row">
                          <div class="col-md-6 col-12">
                            <div class="form-group mb-20">
                              <label for="full_name" class="text-14 lh-1 fw-500 text-dark-1 mb-10">
                                Họ và tên
                                <span class="required">*</span>
                              </label>
                              <div class="input-login position-relative">
                                <input name="full_name" type="text" class="form-control required" placeholder="Nguyen Van A" />
                                <div class="icon-input">
                                  <i class="iconsax isax-lg isax-user"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6 col-12">
                            <div class="form-group mb-20">
                              <label for="username" class="text-14 lh-1 fw-500 text-dark-1 mb-10">
                                Tài khoản
                                <span class="required">*</span>
                              </label>
                              <div class="input-login position-relative">
                                <input name="username" type="text" class="form-control required" placeholder="nguyenvana" />
                                <div class="icon-input">
                                  <i class="iconsax isax-lg isax-user"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-md-6 col-12">
                            <div class="form-group mb-20">
                              <label for="email" class="text-14 lh-1 fw-500 text-dark-1 mb-10">
                                Email
                                <span class="required">*</span>
                              </label>
                              <div class="input-login position-relative">
                                <input name="email" type="text" class="form-control required" placeholder="nguyenvana@gmail.com" />
                                <div class="icon-input">
                                  <i class="iconsax isax-lg isax-sms"></i>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-md-6 col-12">
                            <div class="form-group mb-20">
                              <label for="phone" class="text-14 lh-1 fw-500 text-dark-1 mb-10">
                                Số điện thoại
                                <span class="required">*</span>
                              </label>
                              <div class="input-login position-relative">
                                <input name="phone" type="text" class="form-control required" placeholder="0987654321" />
                                <div class="icon-input">
                                  <i class="iconsax isax-lg isax-call-calling"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-md-6 col-12">
                            <div class="form-group mb-20">
                              <label for="password" class="text-14 lh-1 fw-500 text-dark-1 mb-10">
                                Mật khẩu
                                <span class="required">*</span>
                              </label>
                              <div class="input-login position-relative">
                                <input name="password" id="password-register" type="password" class="form-control required" />
                                <div class="icon-input">
                                  <i class="iconsax isax-lg isax-lock"></i>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-md-6 col-12">
                            <div class="form-group mb-20">
                              <label for="password" class="text-14 lh-1 fw-500 text-dark-1 mb-10">
                                Xác nhận mật khẩu
                                <span class="required">*</span>
                              </label>
                              <div class="input-login position-relative">
                                <input name="verify_password" id="password-register" type="password" class="form-control required" />
                                <div class="icon-input">
                                  <i class="iconsax isax-lg isax-lock"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <button nh-btn-action="submit" class="button -md -green-1 text-dark-1 fw-500 w-1/1">Đăng ký</button>
                      </form>
                      <div class="d-flex justify-content-center flex-wrap fs-14 mt-10">
                        Bạn đã có tài khoản?
                        <a href="./sign-in.html" class="color-main ml-5">
                          <strong>Đăng nhập</strong>
                        </a>
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
