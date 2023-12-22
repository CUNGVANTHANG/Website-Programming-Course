const contentBody = `
<div nh-row="x1rviay" class=""><div class="row no-gutters"><div class="col-md-12 col-12"><div nh-block="n8vak24" nh-block-cache="false" class="session-cart"><div class="breadcrumbs mb-30"><div class="container"><div class="row"><div class="col-md-12 col-12"><nav class="breadcrumbs__content"><div class="breadcrumbs__item"><a href="/">Trang chủ</a></div><div class="breadcrumbs__item"><a href="/member/promotion" class="active">Tài khoản thành viên</a></div></nav></div></div></div></div>
 
<div class="container mb-60">
	<div class="row">
		<div class="col-12 col-md-3 col-lg-3">
			    
<div class="rounded-8 bg-light-6 p-10 mb-10 h-100">
    <div class="profile-top-left mb-25">
        <div class="img-profile text-center mb-10 mt-20">
            <div class="avatar-upload">
                <div class="avatar-edit">
                    <input type="file" name="avatar" nh-avatar-upload="" id="imageUpload" accept="image/jpeg, image/png">
                    <label for="imageUpload">Sửa</label>
                </div>
                <div class="avatar-preview">
                    <div nh-avatar="" style="background-image: url(data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==)"></div>
                </div>
            </div>
        </div>
        <div class="fs-18 fw-700 text-center">
                            Admin
                    </div>
    </div>

    <ul class="member-categories-section member-list list-unstyled mb-0">
        <div class="fw-700 mb-10 fs-16">
            Tài khoản của tôi
        </div>

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

        
        <li class="">
            <a href="./order.html" class="color-black">
                <i class="iconsax isax-2x isax-clipboard-text"></i>
                Đơn hàng
            </a>
        </li>

        
        
        
                    <div class="fw-700 mb-10 fs-16">
                Quà tặng
            </div>
        
                    <li class="active">
                <a href="./promotion.html" class="color-black active">
                    <i class="iconsax isax-2x isax-ticket"></i>
                    Phiếu giảm giá
                </a>
            </li>
        
        
        
        <li class="btn-logout mt-20">
            <a href="./trang-chu.html" class="button -md -dark-1 text-white fw-500 w-1/1">
                Đăng xuất
            </a>
        </li>
    </ul>
</div>
		</div>
		<div class="col-12 col-md-9 col-lg-9">
			<div class="rounded bg-white p-15 mb-10 h-100">
				<div nh-promotion="">
                Hiện không có phiếu giảm giá nào được áp dụng
    </div>
			</div>
		</div>
	</div>	
</div></div></div></div></div>`;

var body = document.getElementById("body");

body.innerHTML = contentBody;
