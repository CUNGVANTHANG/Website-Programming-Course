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
                        <a href="login.html">Tài khoản thành viên</a>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>

            <div class="container">
              <div class="row justify-content-center">
                <div class="col-md-5 col-12">
                  <div class="mb-60 rounded bg-white shadow p-30">
                    <h3 class="text-24 lh-13 mb-25">Đăng nhập</h3>

                    <div
                      class="session-login d-flex flex-column justify-content-between"
                    >
                      <form
                        nh-form="member-login"
                        class="contact-form"
                        action="https://khoahoc.28tech.com.vn/member/ajax-login"
                        method="post"
                        autocomplete="off"
                      >
                        <div class="form-group mb-20">
                          <label
                            for="username"
                            class="text-14 lh-1 fw-500 text-dark-1 mb-10"
                          >
                            Tài khoản
                            <span class="required">*</span>
                          </label>
                          <div class="input-login position-relative">
                            <input
                              name="username"
                              id="username"
                              type="text"
                              class="form-control required"
                              placeholder="Ví dụ: nguyenvana"
                            />
                            <div class="icon-input">
                              <i class="iconsax isax-lg isax-user"></i>
                            </div>
                          </div>
                        </div>

                        <div class="form-group mb-20">
                          <label
                            for="password"
                            class="text-14 lh-1 fw-500 text-dark-1 mb-10"
                          >
                            Mật khẩu
                            <span class="required">*</span>
                          </label>
                          <div class="input-login position-relative">
                            <input
                              name="password"
                              id="password"
                              type="password"
                              class="password form-control required"
                            />
                            <span class="show-btn" nh-show-password>
                              <i class="iconsax isax-lg isax-eye"></i>
                            </span>
                            <div class="icon-input">
                              <i class="iconsax isax-lg isax-lock"></i>
                            </div>
                          </div>
                        </div>

                        <button
                          id="login"
                          nh-btn-action="submit"
                          class="button -md -green-1 text-dark-1 fw-500 w-1/1"
                        >
                          Đăng nhập
                        </button>

                        <a
                          class="fs-14 d-block mt-5"
                          href="forgot-password.html"
                        >
                          Quên mật khẩu ?
                        </a>

                        <input type="hidden" name="redirect" value="" />
                      </form>
                      <div
                        class="d-flex justify-content-center flex-wrap fs-14 mt-10"
                      >
                        Bạn chưa có tài khoản?
                        <a href="register.html" class="color-main ml-5">
                          <strong>Đăng ký ngay</strong>
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
