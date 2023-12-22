const contentBody = `
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
                  <a href="search.html">Tìm kiếm</a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="search">
      <div class="container">
        <div class="row">
          <div class="mb-60">
            <h3 style="margin-bottom: 20px">Tìm kiếm</h3>

            <div class="input-group">
              <input type="text" placeholder="Từ khóa tìm kiếm" style="width: calc(100% - 148px)" />
              <div class="input-group-append">
                <span>Tìm kiếm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="result-search">
      <div class="container">
        <div class="row">
          <div class="mb-60">
            <h3 style="margin-bottom: 20px">Kết quả tìm kiếm</h3>
          </div>
        </div>
      </div>
    </div>`;

var body = document.getElementById("body");

body.innerHTML = contentBody;
