'use strict';

var nhWishlist = {
	wishlistCookie: {},
	wishlistProduct: [],
	wishlistArticle: [],
	accountId: null,
	expires_cookie: 10, // number day cookie expires
	countTotal: 0,
	messages: '',
	init: function(){
		var self = this;

		self.wishlistCookie = nhMain.utilities.notEmpty(nhMain.dataInit.wishlist) ? nhMain.dataInit.wishlist : {};

		self.wishlistProduct = nhMain.utilities.notEmpty(self.wishlistCookie.product) ? self.wishlistCookie.product : [];
		self.wishlistArticle = nhMain.utilities.notEmpty(self.wishlistCookie.article) ? self.wishlistCookie.article : [];

		var accountInfo = typeof(nhMain.dataInit.member) != _UNDEFINED && !$.isEmptyObject(nhMain.dataInit.member) ? nhMain.dataInit.member : {};
		self.accountId = typeof(accountInfo.account_id) != _UNDEFINED ? accountInfo.account_id : null;

		if(nhMain.utilities.notEmpty(self.wishlistProduct)){
			$.each(self.wishlistProduct, function(index, value){
				self.loadWishlist(nhMain.utilities.parseInt(value), _PRODUCT);
			});
		}

		if(nhMain.utilities.notEmpty(self.wishlistArticle)){
			$.each(self.wishlistArticle, function(index, value){
				self.loadWishlist(nhMain.utilities.parseInt(value), _ARTICLE);
			});
		}

		$(document).on('click', '[nh-btn-action="wishlist"]:not(.added-wishlist)', function(e){
			$(this).tooltip('hide');
			var recordID = nhMain.utilities.parseInt($(this).attr('wishlist-id'));
			var type = $(this).attr('wishlist-type');

			if(!nhMain.utilities.notEmpty(recordID) || !nhMain.utilities.notEmpty(type)){
				nhMain.showAlert(_ERROR, nhMain.getLabel('khong_lay_duoc_thong_tin_yeu_thich'));
				return false;
			}

			var btnWishlist = $(this);
			btnWishlist.addClass('effect-spin');
			self.addToWishlist(recordID, type, function(){
				setTimeout(function(){
					btnWishlist.removeClass('effect-spin');
				}, 1000);
				btnWishlist.addClass('added-wishlist');
			});
		});

		$(document).on('click', '.added-wishlist[nh-btn-action="wishlist"]', function(e){
			var recordID = nhMain.utilities.parseInt($(this).attr('wishlist-id'));
			var type = $(this).attr('wishlist-type');
			var btn_delete = $(this);

			if(!nhMain.utilities.notEmpty(recordID) || !nhMain.utilities.notEmpty(type)){
				nhMain.showAlert(_ERROR, nhMain.getLabel('khong_lay_duoc_thong_tin_yeu_thich'));
				return false;
			}

			self.messages = nhMain.getLabel('ban_co_muon_xoa_san_pham_yeu_thich_nay');
			if(type == _ARTICLE) {
				self.messages = nhMain.getLabel('ban_co_muon_xoa_bai_viet_yeu_thich_nay');
			}
			nhMain.showAlert(_WARNING, self.messages, function(){
				btn_delete.removeClass('added-wishlist');
				self.remove(recordID, type, btn_delete);
			});
		});

		$(document).on('click', '[wishlist-remove]', function(e){
			var recordID = nhMain.utilities.parseInt($(this).attr('wishlist-remove'));
			var type = $(this).attr('wishlist-type');
			var btn_delete = $(this);

			if(!nhMain.utilities.notEmpty(recordID) || !nhMain.utilities.notEmpty(type)){
				nhMain.showAlert(_ERROR, nhMain.getLabel('khong_lay_duoc_thong_tin_yeu_thich'));
				return false;
			}

			self.messages = nhMain.getLabel('ban_co_muon_xoa_san_pham_yeu_thich_nay');
			if(type == _ARTICLE) {
				self.messages = nhMain.getLabel('ban_co_muon_xoa_bai_viet_yeu_thich_nay');
			}
			nhMain.showAlert(_WARNING, self.messages, function(){
				self.remove(recordID, type, btn_delete);
			});
		});

		self.reloadMiniWishlist();
	},

	addToWishlist: function(record_id = null, type = null, callback = null){
		var self = this;

		if (typeof(callback) != 'function') {
	        callback = function () {};
	    }

		if(!nhMain.utilities.notEmpty(record_id) || !nhMain.utilities.notEmpty(type)){
			nhMain.showLog(nhMain.getLabel('du_lieu_khong_hop_le'));
			return false;
		}

		callback();

		if(nhMain.utilities.notEmpty(self.accountId)) {
			nhMain.callAjax({
				async: true,
				url: '/wishlist/add-product',
				data: {
					account_id: self.accountId,
					record_id: record_id,
					type: type
				},
			}).done(function(response) {
				var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
	        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
	        	var status = typeof(response.status) != _UNDEFINED ? response.status : {};

	            if (code == _SUCCESS) {
	            	nhMain.showAlert(_SUCCESS, message);
	            } else {
	            	nhMain.showAlert(_ERROR, message);
	            }
			});
		} else {
			if($.inArray(record_id, self.wishlistProduct) == -1 && type == _PRODUCT){
				self.wishlistProduct.push(record_id);
			}

			if($.inArray(record_id, self.wishlistArticle) == -1 && type == _ARTICLE){
				self.wishlistArticle.push(record_id);
			}

			self.wishlistCookie = {
				product: self.wishlistProduct,
				article: self.wishlistArticle
			};

			self.messages = nhMain.getLabel('them_thanh_cong_san_pham_yeu_thich');
			if(type == _ARTICLE) {
				self.messages = nhMain.getLabel('them_thanh_cong_bai_viet_yeu_thich');
			}
			$.cookie(_WISHLIST, JSON.stringify(self.wishlistCookie), {expires: self.expires_cookie, path: '/'});
			setTimeout(function(){
				nhMain.showAlert(_SUCCESS, self.messages); 
			}, 1000);
		}

		self.reloadMiniWishlist(self.countTotal + 1);
	},

	loadWishlist: function(record_id = null, type = null){
		var self = this;

		if($('[wishlist-id="'+ record_id +'"][wishlist-type="'+ type +'"]').length > 0){
			$('[wishlist-id="'+ record_id +'"][wishlist-type="'+ type +'"]').each(function(index){
				$(this).addClass('added-wishlist');
			});
		}
	},

	reloadMiniWishlist: function(updateCount = null, callback = null) {
		var self = this;

		if (typeof(callback) != 'function') {
	        callback = function () {};
	    }

		if($('[wishlist-total]').length > 0) {
			self.countTotal = typeof(self.wishlistProduct) != _UNDEFINED ? self.wishlistProduct.length : 0;
			if(nhMain.utilities.notEmpty(updateCount)) {
				self.countTotal = updateCount;
			}
			$('[wishlist-total]').html(nhMain.utilities.parseInt(self.countTotal));
		}

		if($('[wishlist-total="article"]').length > 0) {
			self.countTotal = typeof(self.wishlistArticle) != _UNDEFINED ? self.wishlistArticle.length : 0;
			if(nhMain.utilities.notEmpty(updateCount)) {
				self.countTotal = updateCount;
			}
			$('[wishlist-total]').html(nhMain.utilities.parseInt(self.countTotal));
		}

		if($('[wishlist-total="all"]').length > 0) {
			var countProduct = typeof(self.wishlistProduct) != _UNDEFINED ? self.wishlistProduct.length : 0;
			var countArticle = typeof(self.wishlistArticle) != _UNDEFINED ? self.wishlistArticle.length : 0;

			self.countTotal = (countProduct + countArticle);
			if(nhMain.utilities.notEmpty(updateCount)) {
				self.countTotal = updateCount;
			}
			$('[wishlist-total]').html(nhMain.utilities.parseInt(self.countTotal));
		}
	},

	remove: function(record_id = null, type = null, btn_delete = null) {
		var self = this;

		if(nhMain.utilities.notEmpty(self.accountId)) {
			nhMain.callAjax({
				async: true,
				url: '/wishlist/remove-product',
				data: {
					account_id: self.accountId,
					record_id: record_id,
					type: type
				},
			}).done(function(response) {
				var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
	        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
	        	var status = typeof(response.status) != _UNDEFINED ? response.status : {};

	            if (code == _SUCCESS) {
	            	nhMain.showAlert(_SUCCESS, message);
	            	if(nhMain.utilities.notEmpty(btn_delete)) {
	            		btn_delete.closest('tr:not([nh-cart-item])').remove();
	            	}
	            	self.reloadMiniWishlist(self.countTotal - 1);
	            } else {
	            	nhMain.showAlert(_ERROR, message);
	            }
			});

		} else {
			if(type == _PRODUCT) {
				self.wishlistProduct.splice($.inArray(record_id, self.wishlistProduct), 1);
			}

			if(type == _ARTICLE) {
				self.wishlistArticle.splice($.inArray(record_id, self.wishlistArticle), 1);
			}

			self.wishlistCookie = {
				product: self.wishlistProduct,
				article: self.wishlistArticle
			};

			self.messages = nhMain.getLabel('xoa_thanh_cong_san_pham_yeu_thich');
			if(type == _ARTICLE) {
				self.messages = nhMain.getLabel('xoa_thanh_cong_bai_viet_yeu_thich');
			}

			$.cookie(_WISHLIST, JSON.stringify(self.wishlistCookie), {expires: self.expires_cookie, path: '/'});
			if(nhMain.utilities.notEmpty(btn_delete)) {
        		btn_delete.closest('tr:not([nh-cart-item])').remove();
        	}
			self.reloadMiniWishlist(self.countTotal - 1);
			setTimeout(function(){
				nhMain.showAlert(_SUCCESS, self.messages); 
			}, 1000);
		}
	}
}

$(document).ready(function() {
	nhWishlist.init();
});