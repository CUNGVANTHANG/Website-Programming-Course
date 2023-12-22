const contentBody = `<div class="pb-30">
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
                        <input type="file" name="avatar" nh-avatar-upload="" id="imageUpload" accept="image/jpeg, image/png" />
                        <label for="imageUpload">Sửa</label>
                      </div>
                      <div class="avatar-preview">
                        <div nh-avatar="" style="background-image: url(data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==)"></div>
                      </div>
                    </div>
                  </div>
                  <div class="fs-18 fw-700 text-center">Admin</div>
                </div>

                <ul class="member-categories-section member-list list-unstyled mb-0">
                  <div class="fw-700 mb-10 fs-16">Tài khoản của tôi</div>

                  <li class="active">
                    <a href="./dashboard.html" class="color-black active">
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
                    <a href="../index.html" class="button -md -dark-1 text-white fw-500 w-1/1"> Đăng xuất </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-12 col-md-9 col-lg-9">
              <div class="rounded-8 bg-light-6 p-15 h-100">
                <h4 class="text-20 fw-700 mb-20">Thông tin cá nhân</h4>
                <ul class="member-categories-section list-unstyled mb-0">
                  <li class="d-flex justify-content-between py-5 mb-10">
                    <span class="color-gray">Tên</span>
                    <span>
                      <strong>Admin</strong>
                    </span>
                  </li>

                  <li class="d-flex justify-content-between py-5 mb-10">
                    <span class="color-gray">Email</span>
                    <span>
                      <strong>Admin@gmail.com</strong>
                    </span>
                  </li>
                  <li class="d-flex justify-content-between py-5 mb-10">
                    <span class="color-gray">Số điện thoại</span>
                    <span>
                      <strong>0987654321</strong>
                    </span>
                  </li>

                  <li class="d-flex justify-content-between py-5 mb-10">
                    <span class="color-gray">Mã khách hàng</span>
                    <span>
                      <strong>CUS073426951</strong>
                    </span>
                  </li>
                </ul>
                <div class="text-right mb-30">
                  <a href="./change-password.html" class="btn bg-main btn-1a color-white fs-14 px-25 rounded mt-10"> Thay đổi mật khẩu </a>
                  <a href="./profile.html" class="btn bg-main btn-1a color-white fs-14 px-25 rounded mt-10"> Sửa thông tin </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>`

var body = document.getElementById("body");

body.innerHTML = contentBody;
