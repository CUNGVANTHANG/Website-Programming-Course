const contentLogin = `
<div class="modal-dialog modal-md modal-dialog-centered">
        <div class="modal-content bg-white shadow-1 rounded-16">
          <div class="modal-header">
            <h3 class="text-24 lh-13">Đăng nhập</h3>
            <button
              type="button"
              class="close icon-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i class="iconsax isax-add"></i>
            </button>
          </div>
          <div class="modal-body">
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

                <a
                  class="button -md -green-1 text-dark-1 fw-500 w-1/1"
                  id="login"
                >
                  Đăng nhập
                </a>

                <a
                  class="fs-14 d-block mt-5"
                  href="./forgot-password.html"
                >
                  Quên mật khẩu ?
                </a>

                <input type="hidden" name="redirect" value="" />
              </form>
              <div class="d-flex justify-content-center flex-wrap fs-14 mt-10">
                Bạn chưa có tài khoản?
                <a href="./register.html" class="color-main ml-5">
                  <strong>Đăng ký ngay</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>`

var login = document.getElementById("login-modal")

login.innerHTML = contentLogin;     