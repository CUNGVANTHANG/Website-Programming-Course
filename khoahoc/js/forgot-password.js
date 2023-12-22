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
                        <a href="forgot-password.html">Tài khoản thành viên</a>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>

            <div class="container">
              <div class="row justify-content-center">
                <div class="col-md-5 col-12">
                  <div class="mb-60 rounded bg-white shadow p-30 session-login">
                    <h3 class="text-24 lh-13 mb-25">Quên mật khẩu</h3>
                    <form nh-form="forgot-password" class="contact-form" action="https://khoahoc.28tech.com.vn/member/ajax-forgot-password" method="post" autocomplete="off">
                      <div class="form-group forgot-email d-flex align-items-center mb-15 p-10 rounded">
                        <div class="icon-input text-center mr-15">
                          <i class="iconsax color-white isax-lg isax-sms"></i>
                        </div>

                        <div class="text-forgot">
                          <p class="mb-0 color-main">
                            <b>Khôi phục mật khẩu qua email</b>
                          </p>
                          <p class="mb-0 fs-12">Mã sẽ gửi qua email bạn đăng ký để thay đổi mật khẩu</p>
                        </div>

                        <div class="icon-right ml-15">
                          <i class="iconsax isax-2x isax-tick-circle5"></i>
                        </div>
                      </div>
                      <div class="form-group mb-20">
                        <label for="email" class="text-14 lh-1 fw-500 text-dark-1 mb-10">
                          Email
                          <span class="required">*</span>
                        </label>
                        <div class="input-login position-relative">
                          <input name="email" type="text" class="form-control required" />
                          <div class="icon-input">
                            <i class="iconsax isax-lg isax-sms"></i>
                          </div>
                        </div>
                      </div>

                      <div class="form-group">
                        <span nh-btn-action="submit" class="button -md -green-1 text-dark-1 fw-500 w-1/1"> Xác nhận </span>
                      </div>
                    </form>
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
