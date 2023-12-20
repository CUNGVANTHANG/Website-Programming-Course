'use strict';

var nhCompare = {
	compareIds: [],
	expires_cookie: 10, // number day cookie expires
	modal: '[nh-compare="modal"]',
	wrapElement: null,
	contentElement: null,
	maxItem: 3,	//so luong hien thi tren pc
	maxItemMobile: 2,	//so luong hien thi tren mobile
	init: function(){
		var self = this;
		if(!nhMain.utilities.notEmpty($(self.modal)) && !nhMain.utilities.notEmpty($(self.wrapElement))) return false;

		self.compareIds = nhMain.utilities.notEmpty($.cookie(_COMPARE)) ? nhMain.utilities.parseJsonToObject($.cookie(_COMPARE)) : [];

		if(nhMain.isMobile) {
			self.refreshCompareIds(self.maxItem, self.maxItemMobile);
			self.maxItem = self.maxItemMobile;
		}

		if(nhMain.utilities.notEmpty(self.compareIds)){
			$.each(self.compareIds, function(index, value){
				self.loadActiveButton(nhMain.utilities.parseInt(value));
			});
		}

		$(document).on('click', '[nh-btn-action="compare"]', function(e){
			$(this).tooltip('hide');
			var recordID = nhMain.utilities.parseInt($(this).attr('data-product-id'));

			if(!nhMain.utilities.notEmpty(recordID)){
				nhMain.showAlert(_ERROR, nhMain.getLabel('khong_lay_duoc_thong_tin_so_sanh_san_pham'));
				return false;
			}
			self.addToCompare(recordID, function(){
				self.ajaxLoadCompare();
			});

			$('[nh-btn-action="compare"]').removeClass('added-compare');
			$('[nh-btn-action="compare"]').attr('data-original-title', nhMain.getLabel('so_sanh'));
			if(nhMain.utilities.notEmpty(self.compareIds)){
				$.each(self.compareIds, function(index, value){
					self.loadActiveButton(nhMain.utilities.parseInt(value));
				});
			}

			if(nhMain.utilities.notEmpty($('#compare-search-modal'))){
				$('#compare-search-modal').modal('hide');
			}
		});

		$(document).on('click', '[compare-bar="btn"]', function(e){
			if(!nhMain.utilities.notEmpty(self.contentElement)) return false;
			self.contentElement.toggleClass('open');
		});

		$(document).on('click', '[compare-remove]', function(e){
			var recordID = nhMain.utilities.parseInt($(this).attr('compare-remove'));

			if(!nhMain.utilities.notEmpty(recordID)){
				nhMain.showAlert(_ERROR, nhMain.getLabel('khong_lay_duoc_thong_tin_so_sanh_san_pham'));
				return false;
			}

			nhMain.showAlert(_WARNING, nhMain.getLabel('ban_co_muon_xoa_san_pham_ra_khoi_danh_sach_so_sanh'), function(){
				self.removeElementCookie(recordID, $(this));
				self.ajaxLoadCompare();

				$('[nh-btn-action="compare"]').removeClass('added-compare');
				$('[nh-btn-action="compare"]').attr('data-original-title', nhMain.getLabel('so_sanh'));
				if(nhMain.utilities.notEmpty(self.compareIds)){
					$.each(self.compareIds, function(index, value){
						self.loadActiveButton(nhMain.utilities.parseInt(value));
					});
				}
			});
		});

		$(document).on('click', '[nh-compare="close"]', function(e){
			if(!nhMain.utilities.notEmpty(self.contentElement)) return false;
			self.contentElement.removeClass('open');
		});

		$(document).on('click', '[compare-bar="close"]', function(e){
			if(!nhMain.utilities.notEmpty(self.contentElement) || !nhMain.utilities.notEmpty(self.modal)) return false;

			self.contentElement.removeClass('open');
			$(self.modal).removeClass('open');
		});

		self.reloadMiniCompare(); 
	},
	addToCompare: function(record_id = null, callback = null){
		var self = this;

		if(!nhMain.utilities.notEmpty(record_id)){
			nhMain.showLog(nhMain.getLabel('du_lieu_khong_hop_le'));
			return false;
		}

		if($.inArray(record_id, self.compareIds) == -1){
			self.compareIds.push(record_id);
		}

		if(self.compareIds.length > self.maxItem) self.compareIds.shift();

		$.cookie(_COMPARE, JSON.stringify(self.compareIds), {expires: self.expires_cookie});

		self.reloadMiniCompare();

		if (typeof(callback) != 'function') {
	        callback = function () {};
	    }

	    callback();
	},
	ajaxLoadCompare: function() {
		var self = this;

		nhMain.showLoading.page();

		if(nhMain.utilities.notEmpty($('[nh-block]').find('[compare-content]'))) {
			location.reload();
			return false;
		}

		nhMain.callAjax({
			async: true,
			url: '/product/compare',
			dataType: _HTML,
		}).done(function(response) {
			$(self.modal).html(response);
			nhMain.showLoading.remove();

			self.wrapElement = $('[nh-compare="warp"]');
			if(!nhMain.utilities.notEmpty($(self.wrapElement))) return false;

			self.contentElement = self.wrapElement.find('[compare-content]');

			$(self.modal).addClass('open');
			self.contentElement.addClass('open');
			

			self.wrapElement.find('div[nh-light-gallery]').each(function(index) {			
				var config = nhMain.utilities.parseJsonToObject($(this).attr('nh-light-gallery'));
			  	$(this).lightGallery(config);
			});

			$("body").tooltip({ selector: '[data-toggle=tooltip]' });
		});
	},
	loadActiveButton: function(record_id = null){
		var self = this;

		if($('[data-product-id="'+ record_id +'"][nh-btn-action="compare"]').length > 0){
			$('[data-product-id="'+ record_id +'"][nh-btn-action="compare"]').each(function(index){
				$(this).addClass('added-compare');
				$(this).attr('data-original-title', nhMain.getLabel('da_them_so_sanh'));
			});
		}
	},
	reloadMiniCompare: function() {
		var self = this;

		if($('[compare-total]').length > 0) {
			var countTotal = typeof(self.compareIds) != _UNDEFINED ? self.compareIds.length : 0;
			$('[compare-total]').html(nhMain.utilities.parseInt(countTotal));
		}
	},
	removeElementCookie: function(record_id = null, btn_delete = null) {
		var self = this;

		self.compareIds.splice($.inArray(record_id, self.compareIds), 1);

		$.cookie(_COMPARE, JSON.stringify(self.compareIds), {expires: self.expires_cookie});
		self.reloadMiniCompare();

		nhMain.showAlert(_SUCCESS, nhMain.getLabel('xoa_thanh_cong_san_pham_so_sanh')); 
	},
	refreshCompareIds: function(maxItem = null, maxItemMobile = null) {
		var self = this;
		
		if(!nhMain.utilities.notEmpty(self.compareIds)) return false;

		if(maxItem > maxItemMobile && self.compareIds.length > maxItemMobile){
			self.compareIds.splice(0, self.compareIds.length - maxItemMobile);
		}

		$.cookie(_COMPARE, JSON.stringify(self.compareIds), {expires: self.expires_cookie});
	}
}

$(document).ready(function() {
	nhCompare.init();
});