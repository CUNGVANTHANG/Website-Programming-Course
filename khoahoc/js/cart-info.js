const contentBodyUpdate = `
<div nh-row="73ai61d" class="pb-30 "><div class="row no-gutters"><div class="col-md-12 col-12"><div nh-block="n8vak24" nh-block-cache="false" class="session-cart"><div class="breadcrumbs mb-30"><div class="container"><div class="row"><div class="col-md-12 col-12"><nav class="breadcrumbs__content"><div class="breadcrumbs__item"><a href="/">Trang chủ</a></div><div class="breadcrumbs__item"><a href="/order/cart-info" class="active">Đơn hàng</a></div></nav></div></div></div></div>   
<div class="container">
            <div nh-cart-info="" class="row">
            
            <div class="col-12">
                <div class="text-20 mb-30 fw-600">
                    Thông tin khóa học
                    <small class="fs-14 text-blue-1">
                         (1 Khóa học)                     </small>
                </div>
            </div>
    
            <div class="col-xl-8 col-lg-8">
                <table class="table w-1/1">
                    <thead>
                        <tr>
                            <th>Khóa học</th>
                            <th class="text-right">Giá</th>
                            <th class="text-right">Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                                                <tr nh-cart-item="1" nh-cart-item-quantity="1">
                            <td>
                                                                                                                                    
                                <div class="d-flex items-center">
                                    <div class="">
                                        <div class="size-60 bg-image rounded-8 js-lazy loaded" data-ll-status="loaded" style="background-image: url(&quot;https://cdn.28tech.com.vn/thumbs/video_khoa_lap_trinh_c/image/50aadc4748bc97e2cead_thumb_150.jpg&quot;);"></div>
                                    </div>
                                    <div class="fw-500 text-dark-1 ml-30">
                                        <a href="/hoc-lap-trinh-c-qua-170-bai-giang-320-bai-tap-coding-hackerrank-va-200-cau-trac-nghiem" title="Học Lập Trình C qua 170 bài giảng, 320 bài tập coding Hackerrank và 200 câu trắc nghiệm">
                                            Học Lập Trình C qua 170 bài giảng, 320 bài tập coding Hackerrank và 200 câu trắc nghiệm                                        </a>
                                    </div>
                                </div>
                            </td>
        
                            <td class="text-right">
                                <span nh-cart-price="799000">
                                                                            799,000
                                                                    </span>
                                <span class="currency-symbol">VND</span>
        
                                                            </td>
                            
                            <td>
                                <a href="javascript:;" title="Xóa khóa học" nh-remove-item-cart="1" class="d-flex justify-end">
                                    <i class="fas fa-trash"></i>
                                </a>
                            </td>
                        </tr>
                                            </tbody>
                </table>
            </div>
            <div class="col-xl-4 col-lg-4">
                <div class="py-20 bg-light-4 rounded-8 border-light">
                    <div class="d-flex justify-between px-20 item">
                        <div class="py-15 fw-500 text-dark-1">Tổng tiền</div>
                        <div nh-cart-total="" class="py-15 fw-600 text-dark-1">
                             
                                799,000 
                                                        VND
                        </div>
                    </div>
                
                    <div class="d-flex justify-between px-20 item border-top-dark">
                        <a nh-cart-action="checkout" href="javascript:;" class="button -md -purple-1 text-white col-12 mt-30">
                            Xác nhận giỏ hàng
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div></div></div></div></div>`

const contentBodynoUpdate = `
<div nh-row="73ai61d" class="pb-30 "><div class="row no-gutters"><div class="col-md-12 col-12"><div nh-block="n8vak24" nh-block-cache="false" class="session-cart"><div class="breadcrumbs mb-30"><div class="container"><div class="row"><div class="col-md-12 col-12"><nav class="breadcrumbs__content"><div class="breadcrumbs__item"><a href="/">Trang chủ</a></div><div class="breadcrumbs__item"><a href="/order/cart-info" class="active">Đơn hàng</a></div></nav></div></div></div></div> 
<div class="container">
            <div class="empty text-center my-80">
            <i class="iconsax isax-bag-cross-1"></i>
            <div class="empty-cart mb-20">
                Bạn cần thêm một số khóa học vào giỏ hàng của mình.<br>
                Vui lòng truy cập "Trang Chủ" và tìm khóa học của bạn.
            </div>
            <a class="btn bg-main btn-1a color-white fs-27 px-25 rounded text-uppercase" href="/">
                Trang chủ
            </a>
        </div>
    </div></div></div></div></div>`

var body = document.getElementById("body")

body.innerHTML = contentBodyUpdate