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

                        <li class="">
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

                        <li class="active">
                          <a href="./order.html" class="color-black active">
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
                            href="./trang-chu.html"
                            class="button -md -dark-1 text-white fw-500 w-1/1"
                          >
                            Đăng xuất
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-12 col-md-9 col-lg-9">
                    <div class="rounded bg-white p-15 mb-10 h-100">
                      <form
                        nh-form="list-order"
                        action="/member/order"
                        method="POST"
                        autocomplete="off"
                        class="h-100"
                      >
                        <div
                          nh-form="table-order"
                          class="list-order-element h-100"
                        >
                          <table
                            class="table responsive-table mb-30 table-p-10"
                          >
                            <thead>
                              <tr>
                                <th>Mã đơn hàng</th>
                                <th>Tiền</th>
                                <th>Ngày đặt hàng</th>
                                <th>Trạng thái</th>
                                <th style="width: 75px"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">
                                  <a href="/member/order/detail/ORD675394082">
                                    ORD675394082
                                  </a>
                                </th>

                                <td data-title="Tiền">799,000 VND</td>

                                <td data-title="Ngày đặt hàng">
                                  11:40 - 19/12/2023
                                </td>

                                <td data-title="Trạng thái">
                                  <span class="fs-14 fw-600 text-dark-1">
                                    Chờ thanh toán
                                  </span>
                                </td>
                                <td class="text-left" data-title="Thao tác">
                                  <div
                                    class="d-inline-block"
                                    style="width: 24px"
                                  >
                                    <a
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Xác nhận"
                                      href="/order/checkout?code=ORD675394082"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      <i class="iconsax isax-lg isax-edit"></i>
                                    </a>
                                  </div>
                                  <div
                                    class="d-inline-block"
                                    style="width: 24px"
                                  >
                                    <a
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Hủy đơn"
                                      nh-order-btn="cancel"
                                      href="javascript:;"
                                      data-id="4222"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      <i
                                        class="iconsax isax-lg isax-close-square"
                                      ></i>
                                    </a>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <a href="/member/order/detail/ORD506394712">
                                    ORD506394712
                                  </a>
                                </th>

                                <td data-title="Tiền">799,000 VND</td>

                                <td data-title="Ngày đặt hàng">
                                  11:40 - 19/12/2023
                                </td>

                                <td data-title="Trạng thái">
                                  <span class="fs-14 fw-600 text-dark-1">
                                    Chờ thanh toán
                                  </span>
                                </td>
                                <td class="text-left" data-title="Thao tác">
                                  <div
                                    class="d-inline-block"
                                    style="width: 24px"
                                  >
                                    <a
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Xác nhận"
                                      href="/order/checkout?code=ORD506394712"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      <i class="iconsax isax-lg isax-edit"></i>
                                    </a>
                                  </div>
                                  <div
                                    class="d-inline-block"
                                    style="width: 24px"
                                  >
                                    <a
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Hủy đơn"
                                      nh-order-btn="cancel"
                                      href="javascript:;"
                                      data-id="4221"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      <i
                                        class="iconsax isax-lg isax-close-square"
                                      ></i>
                                    </a>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <a href="/member/order/detail/ORD529843017">
                                    ORD529843017
                                  </a>
                                </th>

                                <td data-title="Tiền">799,000 VND</td>

                                <td data-title="Ngày đặt hàng">
                                  10:27 - 13/12/2023
                                </td>

                                <td data-title="Trạng thái">
                                  <span class="fs-14 fw-600 text-dark-1">
                                    Đơn mới
                                  </span>
                                </td>
                                <td class="text-left" data-title="Thao tác">
                                  <div
                                    class="d-inline-block"
                                    style="width: 24px"
                                  ></div>
                                  <div
                                    class="d-inline-block"
                                    style="width: 24px"
                                  >
                                    <a
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Hủy đơn"
                                      nh-order-btn="cancel"
                                      href="javascript:;"
                                      data-id="4189"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      <i
                                        class="iconsax isax-lg isax-close-square"
                                      ></i>
                                    </a>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <a href="/member/order/detail/ORD670139428">
                                    ORD670139428
                                  </a>
                                </th>

                                <td data-title="Tiền">799,000 VND</td>

                                <td data-title="Ngày đặt hàng">
                                  21:55 - 01/12/2023
                                </td>

                                <td data-title="Trạng thái">
                                  <span class="fs-14 fw-600 text-dark-1">
                                    Chờ thanh toán
                                  </span>
                                </td>
                                <td class="text-left" data-title="Thao tác">
                                  <div
                                    class="d-inline-block"
                                    style="width: 24px"
                                  >
                                    <a
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Xác nhận"
                                      href="/order/checkout?code=ORD670139428"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      <i class="iconsax isax-lg isax-edit"></i>
                                    </a>
                                  </div>
                                  <div
                                    class="d-inline-block"
                                    style="width: 24px"
                                  >
                                    <a
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Hủy đơn"
                                      nh-order-btn="cancel"
                                      href="javascript:;"
                                      data-id="4122"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      <i
                                        class="iconsax isax-lg isax-close-square"
                                      ></i>
                                    </a>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <a href="/member/order/detail/ORD721356094">
                                    ORD721356094
                                  </a>
                                </th>

                                <td data-title="Tiền">799,000 VND</td>

                                <td data-title="Ngày đặt hàng">
                                  20:21 - 30/11/2023
                                </td>

                                <td data-title="Trạng thái">
                                  <span class="fs-14 fw-600 text-dark-1">
                                    Chờ thanh toán
                                  </span>
                                </td>
                                <td class="text-left" data-title="Thao tác">
                                  <div
                                    class="d-inline-block"
                                    style="width: 24px"
                                  >
                                    <a
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Xác nhận"
                                      href="/order/checkout?code=ORD721356094"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      <i class="iconsax isax-lg isax-edit"></i>
                                    </a>
                                  </div>
                                  <div
                                    class="d-inline-block"
                                    style="width: 24px"
                                  >
                                    <a
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Hủy đơn"
                                      nh-order-btn="cancel"
                                      href="javascript:;"
                                      data-id="4116"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      <i
                                        class="iconsax isax-lg isax-close-square"
                                      ></i>
                                    </a>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <a href="/member/order/detail/ORD538916027">
                                    ORD538916027
                                  </a>
                                </th>

                                <td data-title="Tiền">799,000 VND</td>

                                <td data-title="Ngày đặt hàng">
                                  19:56 - 09/05/2023
                                </td>

                                <td data-title="Trạng thái">
                                  <span class="fs-14 fw-600 text-dark-1">
                                    Đơn mới
                                  </span>
                                </td>
                                <td class="text-left" data-title="Thao tác">
                                  <div
                                    class="d-inline-block"
                                    style="width: 24px"
                                  ></div>
                                  <div
                                    class="d-inline-block"
                                    style="width: 24px"
                                  >
                                    <a
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Hủy đơn"
                                      nh-order-btn="cancel"
                                      href="javascript:;"
                                      data-id="2310"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      <i
                                        class="iconsax isax-lg isax-close-square"
                                      ></i>
                                    </a>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  <a href="/member/order/detail/ORD521096438">
                                    ORD521096438
                                  </a>
                                </th>

                                <td data-title="Tiền">799,000 VND</td>

                                <td data-title="Ngày đặt hàng">
                                  19:30 - 09/05/2023
                                </td>

                                <td data-title="Trạng thái">
                                  <span class="fs-14 fw-600 text-dark-1">
                                    Chờ thanh toán
                                  </span>
                                </td>
                                <td class="text-left" data-title="Thao tác">
                                  <div
                                    class="d-inline-block"
                                    style="width: 24px"
                                  >
                                    <a
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Xác nhận"
                                      href="/order/checkout?code=ORD521096438"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      <i class="iconsax isax-lg isax-edit"></i>
                                    </a>
                                  </div>
                                  <div
                                    class="d-inline-block"
                                    style="width: 24px"
                                  >
                                    <a
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      data-original-title="Hủy đơn"
                                      nh-order-btn="cancel"
                                      href="javascript:;"
                                      data-id="2309"
                                      data-bs-original-title=""
                                      title=""
                                    >
                                      <i
                                        class="iconsax isax-lg isax-close-square"
                                      ></i>
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
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
