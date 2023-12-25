const bodyContent = `<div nh-row="x1rviay" class=""><div class="row no-gutters"><div class="col-md-12 col-12"><div nh-block="n8vak24" nh-block-cache="false" class="session-cart"><div class="breadcrumbs mb-30"><div class="container"><div class="row"><div class="col-md-12 col-12"><nav class="breadcrumbs__content"><div class="breadcrumbs__item"><a href="/">Trang chủ</a></div><div class="breadcrumbs__item"><a href="/member/change-phone" class="active">Tài khoản thành viên</a></div></nav></div></div></div></div>

<div class="container">
	<div class="row justify-content-center">
		<div class="col-md-5 col-12">
			<div class="mb-60 rounded bg-white shadow p-30 session-change session-otp">
			    <form nh-form="change-phone" class="contact-form" action="/member/ajax-change-phone" method="post" autocomplete="off" novalidate="novalidate">
			        <h3 class="text-24 lh-13 mb-25">
				        Thay đổi số điện thoại
				    </h3>
			    	<div class="form-group mb-15">
			<div class="entry-choose-verify mb-15">
			<input name="type_verify" id="verify-email" checked="checked" value="email" class="form-check-input" type="radio">
            <label class="d-flex align-items-center mb-0 inner-verify border rounded-8 p-10" for="verify-email">
                <div class="icon-left text-center mr-15">
                    <i class="iconsax color-white isax-lg isax-sms"></i>
                </div>
                
                <div style="flex: 1;">
                    <p class="mb-0">
                        <b>Lấy mã xác nhận qua email</b>
                    </p>
                    <p class="mb-0 fs-12 font-weight-normal">
                    	<span class="color-hover">
                    		Email: Admin@gmail.com
                    	</span>
                    </p>
                </div>
                <div class="icon-right ml-auto">
                    <i class="iconsax isax-2x isax-tick-circle5"></i>
                </div>
            </label>
		</div>
	    
    		<div class="form-group">
        <span nh-btn-action="get-verify" class="button -icon -purple-1 text-white">
            Nhận mã
            <small class="ml-5" nh-countdown=""></small>
        </span>
    </div>
</div>

<div class="form-group mb-20 position-relative ">
    <label class="text-14 lh-1 fw-500 text-dark-1 mb-10">
        Mã xác nhận: 
        <span class="required">*</span>
    </label>
    <div class="input-opt d-flex align-items-center justify-content-between">
        <input nh-otp="input" type="text" maxlength="1">
        <input nh-otp="input" type="text" maxlength="1">
        <input nh-otp="input" type="text" maxlength="1">
        <input nh-otp="input" type="text" maxlength="1">
        <input nh-otp="input" type="text" maxlength="1">
    </div>
    <input nh-otp="verification" name="code" type="hidden">
</div>
	                <div class="form-group mb-15">
	                    <label for="new_phone" class="text-14 lh-1 fw-500 text-dark-1 mb-10">
	                        Số điện thoại mới
	                        <span class="required">*</span>
	                    </label>
	                    <div class="input-login position-relative">
	                        <input id="new_phone" name="new_phone" type="text" class="form-control">
	                        <div class="icon-input">
	                        	<i class="iconsax isax-lg isax-call-calling"></i>
	                        </div>
	                    </div>
	                </div>
	                <input type="hidden" name="type" value="phone">
				    
				    <div class="form-group">
				        <span nh-btn-action="submit" class="button -md -dark-1 text-white">
				            Xác nhận
				        </span>
				    </div>
			    </form>
			</div>
		</div>
	</div>
</div></div></div></div></div>`

var body = document.getElementById("body")

body.innerHTML = bodyContent