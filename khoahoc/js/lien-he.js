const contentBody = `
<div nh-row="4y7cqx0" class="breadcrumbs mb-30">
      <div class="container">
        <div class="row">
          <div class="col-md-12 col-12">
            <div nh-block="mz4eo5d" nh-block-cache="false" class="">
              <nav class="breadcrumbs__content">
                <div class="breadcrumbs__item">
                  <a href="index.html">Trang chủ</a>
                </div>
                <div class="breadcrumbs__item">
                  <a href="lien-he.html">Liên hệ</a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div nh-row="853t1a6" class="">
      <div class="row no-gutters">
        <div class="col-md-12 col-12">
          <div nh-block="pvjcryf" nh-block-cache="true" class="">
            <section class="layout-pt-md layout-pb-md">
              <div data-anim-wrap class="container">
                <div class="row y-gap-50 justify-between">
                  <div class="col-lg-4">
                    <h3 class="text-24 fw-500">Giữ liên lạc với chúng tôi.</h3>
                    <div class="y-gap-30 pt-60 lg:pt-40">
                      <div class="d-flex items-center">
                        <div class="d-flex justify-center items-center size-60 rounded-full bg-light-7">
                          <img src="https://cdn.28tech.com.vn/media/core/icon-address.svg" alt="icon" />
                        </div>
                        <div class="ml-20">Hà Nội</div>
                      </div>
                      <div class="d-flex items-center">
                        <div class="d-flex justify-center items-center size-60 rounded-full bg-light-7">
                          <img src="https://cdn.28tech.com.vn/media/core/icon-phone.svg" alt="icon" />
                        </div>
                        <div class="ml-20">0987654321</div>
                      </div>
                      <div class="d-flex items-center">
                        <div class="d-flex justify-center items-center size-60 rounded-full bg-light-7">
                          <img src="https://cdn.28tech.com.vn/media/core/icon-mail.svg" alt="icon" />
                        </div>
                        <div class="ml-20">Admin@gmail.com</div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-7">
                    <h3 class="text-24 fw-500">Gửi tin nhắn.</h3>
                    <form class="contact-form row y-gap-30 pt-60 lg:pt-40" nh-form-contact="3HZO5VFWIK" action="https://khoahoc.28tech.com.vn/contact/send-info" method="POST" autocomplete="off">
                      <div class="col-md-6">
                        <label class="text-16 lh-1 fw-500 text-dark-1 mb-10">Họ tên *</label
                        ><input required="" data-rule-number="false" data-msg-number="vui_long_nhap_dung_dinh_dang" data-msg="Vui lòng nhập thông tin" data-rule-maxlength="50" data-msg-maxlength="thong_tin_nhap_qua_dai" name="full_name" type="text" class="form-control" />
                      </div>
                      <div class="col-md-6">
                        <label class="text-16 lh-1 fw-500 text-dark-1 mb-10">Số điện thoại *</label><input required maxlength="11" data-msg="Vui lòng nhập số điện thoại" data-rule-phonevn data-msg-phonevn="Số điện thoại chưa chính xác" name="phone" type="text" class="form-control" />
                      </div>
                      <div class="col-12"><label class="text-16 lh-1 fw-500 text-dark-1 mb-10">Tiêu đề</label><input type="text" name="title" /></div>
                      <div class="col-12"><label class="text-16 lh-1 fw-500 text-dark-1 mb-10">Nội dung</label><textarea name="content" rows="4" maxlength="500"></textarea></div>
                      <div class="col-12">
                        <button type="submit" nh-btn-action="submit" class="button -md -purple-1 text-white">Gửi Tin Nhắn</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    <div nh-row="l9nr6oi" class="entire-map">
      <div class="row no-gutters">
        <div class="col-md-12 col-12">
          <div nh-block="fnwdcmr" nh-block-cache="true" class="">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14897.82888934562!2d105.8138878!3d21.0143838!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xced66c342202530e!2sChung%20c%C6%B0%20Petrowaco%20Tower!5e0!3m2!1svi!2s!4v1646108853816!5m2!1svi!2s"
              width="600"
              height="450"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>`;

var body = document.getElementById("body");

body.innerHTML = contentBody;