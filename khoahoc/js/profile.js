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
                            <a href="./dashboard.html">Tài khoản thành viên</a>
                          </div>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="container mb-60">
                <div class="row">
                  <div class="col-12 col-md-3 col-lg-3">
                    <div class="rounded-8 bg-light-6 p-10 mb-10 h-100">
                      <div class="profile-top-left mb-25">
                        <div class="img-profile text-center mb-10 mt-20">
                          <div class="avatar-upload">
                            <div class="avatar-edit">
                              <input
                                type="file"
                                name="avatar"
                                nh-avatar-upload=""
                                id="imageUpload"
                                accept="image/jpeg, image/png"
                              />
                              <label for="imageUpload">Sửa</label>
                            </div>
                            <div class="avatar-preview">
                              <div
                                nh-avatar=""
                                style="
                                  background-image: url(data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==);
                                "
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div class="fs-18 fw-700 text-center">Admin</div>
                      </div>

                      <ul
                        class="member-categories-section member-list list-unstyled mb-0"
                      >
                        <div class="fw-700 mb-10 fs-16">Tài khoản của tôi</div>

                        <li class="active">
                          <a href="./dashboard.html" class="color-black">
                            <i class="iconsax isax-2x isax-tag-user"></i>
                            Thông tin cá nhân
                          </a>
                        </li>

                        <li>
                          <a href="./khoa-hoc-da-mua.html" class="color-black">
                            <i class="iconsax isax-2x isax-video-square"></i>
                            Khóa học đã mua
                          </a>
                        </li>

                        <li class="">
                          <a href="./order.html" class="color-black">
                            <i class="iconsax isax-2x isax-clipboard-text"></i>
                            Đơn hàng
                          </a>
                        </li>

                        <div class="fw-700 mb-10 fs-16">Quà tặng</div>

                        <li class="">
                          <a href="./promotion.html" class="color-black">
                            <i class="iconsax isax-2x isax-ticket"></i>
                            Phiếu giảm giá
                          </a>
                        </li>

                        <li class="btn-logout mt-20">
                          <a
                            href="../index.html"
                            class="button -md -dark-1 text-white fw-500 w-1/1"
                          >
                            Đăng xuất
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-12 col-md-9 col-lg-9">
                    <div class="rounded-8 bg-light-6 p-15 mb-10 h-100">
                      <form
                        nh-form="member-profile"
                        class="contact-form"
                        action="/member/save-profile"
                        method="post"
                        autocomplete="off"
                        novalidate="novalidate"
                      >
                        <h4 class="text-20 fw-700 mb-20">Sửa thông tin</h4>
                        <div class="row">
                          <div class="col-md-6 col-12">
                            <div class="form-group mb-20">
                              <label
                                for="full_name"
                                class="text-14 lh-1 fw-500 text-dark-1 mb-10"
                              >
                                Họ và tên:
                                <span class="required">*</span>
                              </label>
                              <input
                                name="full_name"
                                value="Admin"
                                type="text"
                                class="form-control bg-white"
                                autocomplete="off"
                              />
                            </div>

                            <div class="form-group mb-20">
                              <label
                                for="birthday"
                                class="text-14 lh-1 fw-500 text-dark-1 mb-10"
                              >
                                Ngày sinh:
                              </label>
                              <input
                                nh-date=""
                                name="birthday"
                                value=""
                                type="text"
                                autocomplete="off"
                                data-date-end-date="0d"
                                class="form-control bg-white"
                                placeholder="dd/mm/yyyy"
                              />
                            </div>

                            <div class="form-group mb-20">
                              <label
                                for="phone"
                                class="text-14 lh-1 fw-500 text-dark-1 mb-10"
                              >
                                Giới tính:
                              </label>
                              <div
                                class="dropdown bootstrap-select form-control form-control-sm input-hover"
                              >
                                <select
                                  name="sex"
                                  class="form-control form-control-sm selectpicker input-hover"
                                >
                                  <option value="other">-- Giới tính --</option>

                                  <option value="male">Nam</option>

                                  <option value="female">Nữ</option>
                                </select>
                                <div class="dropdown-menu">
                                  <div
                                    class="inner show"
                                    role="listbox"
                                    id="bs-select-1"
                                    tabindex="-1"
                                  >
                                    <ul
                                      class="dropdown-menu inner show"
                                      role="presentation"
                                    ></ul>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="form-group mb-20">
                              <label
                                class="text-14 lh-1 fw-500 text-dark-1 mb-10"
                              >
                                Email:
                              </label>
                              <div>
                                Admin@gmail.com
                                <small>
                                  <a
                                    class="font-danger"
                                    href="./change-email.html"
                                  >
                                    (Chỉnh sửa)
                                  </a>
                                </small>
                              </div>
                              <input
                                name="email"
                                type="hidden"
                                value="Admin@gmail.com"
                              />
                            </div>

                            <div class="form-group mb-20">
                              <label
                                class="text-14 lh-1 fw-500 text-dark-1 mb-10"
                              >
                                Số điện thoại:
                              </label>
                              <div>
                                0987654321
                                <small>
                                  <a
                                    class="font-danger"
                                    href="./change-phone.html"
                                  >
                                    (Chỉnh sửa)
                                  </a>
                                </small>
                              </div>
                              <input
                                name="phone"
                                type="hidden"
                                value="0987654321"
                              />
                            </div>

                            <div class="form-group">
                              <span
                                nh-btn-action="submit"
                                type="submit"
                                class="button -md -green-1 text-dark-1 fw-500 w-1/1"
                              >
                                Cập nhật
                              </span>
                            </div>
                          </div>
                        </div>
                      </form>
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
