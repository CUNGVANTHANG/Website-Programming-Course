'use strict';

var nhProduct = {
	init: function(){
		var self = this;
		self.quickView.init();		
		self.selectAttribute.init();
		self.quantityInput.init();
		self.detailProduct.init();
		self.filter.init();
	},
	quickView: {
		idModal: '#quick-view-modal',
		init: function(){
			var self = this;

			if($(self.idModal).length == 0){
				return false;
			}

			$(document).on('click', '[nh-btn-action="quick-view"]', function(e){
				$(this).tooltip('hide');
				$(this).addClass('effect-spin');

				var productId = $(this).data('product-id');
				if(!productId > 0){
					nhMain.showLog(nhMain.getLabel('khong_lay_duoc_ID_san_pham'));
					return false;
				}

				var _modal = $(self.idModal);
				nhMain.callAjax({
					async: true,
					url: '/product/quick-view/' + productId,
					dataType: _HTML,
				}).done(function(response) {
					_modal.find('.modal-content').html(response);
					nhMain.initLibrary();
					nhProduct.selectAttribute.activeOptionDefault(_modal.find('[nh-product]'));
					_modal.modal('show');
				});
			});

			$(self.idModal).on('shown.bs.modal', function () {
				$('[nh-btn-action="quick-view"]').removeClass('effect-spin');
				$('[nh-owl-slick]').slick('setPosition');
	  		});

	  		$(self.idModal).on('hide.bs.modal', function () {
	  			$(this).find('.modal-content').html('');
	  		});
		}
	},
	detailProduct: {
		init: function(){
			var self = this;
			if($('[nh-product-detail]').length == 0){
				return false;
			}
			nhProduct.selectAttribute.activeOptionDefault($('[nh-product-detail]'));
		}
	},
	selectAttribute: {
		wrapElement: null,
		attributeSpecial: {},
		init: function(){
			var self = this;

			$(document).on('click', '[nh-attribute-option]', function(e){
				var attributeElement = $(this).closest('[nh-attribute]');

				if($(this).attr('data-trigger') != _UNDEFINED){
					$('[nh-slider-thumbs]').find('img[src="'+ $(this).attr('data-trigger') +'"]').trigger('click');
				}
				
				attributeElement.find('[nh-attribute-option]').removeClass('active');
				$(this).addClass('active');

				self.selectAttributeOption($(this).closest('[nh-product]'));
			});

			$(document).on('click', '[nh-btn-action="clear-attribute-option"]', function(e){
				self.clearOptions($(this).closest('[nh-product]'));
			});
		},
		validateElement: function(wrapElement = null){
			var self = this;

			if(wrapElement == null || wrapElement == _UNDEFINED || wrapElement.length == 0){
				nhMain.showLog(nhMain.getLabel('khong_tim_thay_the_bao_ngoai_san_pham') + ' [nh-product]');
				return false
			};

			self.wrapElement = wrapElement;

			self.attributeSpecial = {};
			if(self.wrapElement.attr('nh-product-attribute-special') != _UNDEFINED && self.wrapElement.attr('nh-product-attribute-special').length > 0){
				self.attributeSpecial = nhMain.utilities.parseJsonToObject(self.wrapElement.attr('nh-product-attribute-special'));
			}

			if($.isEmptyObject(self.attributeSpecial)){
				return false;
			}
			
			return true;
		},
		selectAttributeOption: function(wrapElement = null){
			var self = this;
			var validateElement = self.validateElement(wrapElement);
			if(!validateElement) return false;
			
			var optionSelected = [];			
			self.wrapElement.find('[nh-attribute]').each(function(index) {
				var attributeElement = $(this);
				var attributeCode = attributeElement.attr('nh-attribute');

				attributeElement.find('[nh-attribute-option].active').each(function(index) {
					var optionElement = $(this);
					var optionCode = optionElement.attr('nh-attribute-option');

					optionSelected.push(attributeCode);
					optionSelected.push(optionCode);
				});
			});

			// set text for label
			var labelPrice = self.wrapElement.find('[nh-label-price]');
			var labelPriceSpecial = self.wrapElement.find('[nh-label-price-special]');
			var labelCode = self.wrapElement.find('[nh-label-code]');
			var productItemId = null;
			var price = null;
			var priceSpecial = null;
			var applySpecial = false;

			var checkQuantity = false;
			if(typeof(nhMain.dataInit.product) != _UNDEFINED && nhMain.utilities.notEmpty(nhMain.dataInit.product.check_quantity)){
				checkQuantity = true;
			}

			var quantityAvailable = 0;
			var code = null;

			if(!$.isEmptyObject(optionSelected) && !$.isEmptyObject(self.attributeSpecial)){
				var specialCode = optionSelected.join('_');
				var itemSpecial = typeof(self.attributeSpecial[specialCode]) != _UNDEFINED ? self.attributeSpecial[specialCode] : {};

				applySpecial = typeof(itemSpecial.apply_special) != _UNDEFINED ? itemSpecial.apply_special : false;

				productItemId = typeof(itemSpecial.product_item_id) != _UNDEFINED ? itemSpecial.product_item_id : null;
				price = typeof(itemSpecial.price) != _UNDEFINED ? itemSpecial.price : null;
				priceSpecial = typeof(itemSpecial.price_special) != _UNDEFINED ? itemSpecial.price_special : null;
				
				quantityAvailable = typeof(itemSpecial.quantity_available) != _UNDEFINED ? nhMain.utilities.parseInt(itemSpecial.quantity_available) : 0;
				code = typeof(itemSpecial.code) != _UNDEFINED ? itemSpecial.code : null;
			}			

			if(productItemId > 0){
				labelPriceSpecial.toggleClass('d-none', !applySpecial);
				if(applySpecial){
					labelPrice.find('[nh-label-value]').text(nhMain.utilities.parseNumberToTextMoney(priceSpecial));
					labelPriceSpecial.find('[nh-label-value]').text(nhMain.utilities.parseNumberToTextMoney(price));
				}else{
					labelPrice.find('[nh-label-value]').text(nhMain.utilities.parseNumberToTextMoney(price));	
				}

				labelCode.text(code);

				if(checkQuantity){
					self.wrapElement.find('[nh-quantity-product="wrap"]').toggleClass('d-none', !quantityAvailable > 0);
					self.wrapElement.find('[nh-btn-action="add-cart"]').toggleClass('d-none', !quantityAvailable > 0);
					self.wrapElement.find('[nh-quantity-product="out-stock"]').toggleClass('d-none', quantityAvailable > 0);
				}				
			}

			self.wrapElement.attr('nh-product-item-id', productItemId);
			self.wrapElement.find('[nh-btn-action="add-cart"]').toggleClass('disable', !productItemId > 0)	
		},
		clearOptions: function(wrapElement = null){
			var self = this;
			var validateElement = self.validateElement(wrapElement);
			if(!validateElement) return false;

			self.wrapElement.find('[nh-attribute-option]').removeClass('active');
			self.wrapElement.attr('nh-product-item-id', '');
			self.wrapElement.find('[nh-btn-action="add-cart"]').addClass('disable');
		},
		activeOptionDefault: function(wrapElement = null){
			var self = this;

			var validateElement = self.validateElement(wrapElement);
			if(!validateElement) return false;

			var productItemId = self.wrapElement.attr('nh-product-item-id');
			if(!productItemId > 0) return false;

			var keySpecialString = null;
			$.each(self.attributeSpecial, function(key, item) {
			  	if(typeof(item.product_item_id) != _UNDEFINED && item.product_item_id == productItemId){
			  		keySpecialString = key;
			  	}
			});			

			if(keySpecialString == null || keySpecialString.length == 0) return false;

			var keySpecial = [];
			var keySpecialArray = keySpecialString.split('_');
			while (keySpecialArray.length) {
		        keySpecial.push(keySpecialArray.splice(0, 2));
		    }
		    
		    $.each(keySpecial, function(index, item) {
			  	var attributeCode = typeof(item[0]) != _UNDEFINED ? item[0] : null;
			  	var optionCode = typeof(item[1]) != _UNDEFINED ? item[1] : null;

			  	if(attributeCode == null || optionCode == null) return;

			  	var elementAttribute = self.wrapElement.find('[nh-attribute="' + attributeCode + '"]');
			  	if(elementAttribute.length == 0) return;

			  	var elementOption = elementAttribute.find('[nh-attribute-option="' + optionCode + '"]');
			  	if(elementOption.length == 0) return;

			  	elementOption.addClass('active');
			});
		}
	},
	quantityInput: {
		init: function(){
			var self = this;

			var min = 1;
			var max = 1000;
			
			$(document).on('click', '[nh-quantity-product="subtract"]', function(e){
				var wrapElement = $(this).closest('[nh-quantity-product="wrap"]');
				var input = wrapElement.find('[nh-quantity-product="quantity"]');
			  	var value = nhMain.utilities.parseInt(input.val()) - 1;

			  	if(value < min) value = min;
			  	input.val(value);
			});

			$(document).on('click', '[nh-quantity-product="add"]', function(e){
				var wrapElement = $(this).closest('[nh-quantity-product="wrap"]');
				var input = wrapElement.find('[nh-quantity-product="quantity"]');
			  	var value = nhMain.utilities.parseInt(input.val()) + 1;
			  	
			  	if(value > max) value = max;
			  	input.val(value);
			});
		}
	},
	filter: {
		wrapElement: null,
		priceRangerEl: null,
		minRangerPrice: 0,
		maxRangerPrice: 10000000,
		stepPrice: 500000,
		toPriceEl: null,
		fromPriceEl: null,
		btnRangerPrice: '[nh-price-range=button]',
		init: function(){
			var self = this;
			self.showFilterAdvanced();

			self.wrapElement = $('[nh-filter-params]');
			if(self.wrapElement.length == 0){
				return false;
			}

			self.wrapElement.on('click', 'a[href]', function(e){
				nhMain.showLoading.page()
			});

			self.priceRanger();
			self.getPriceFromUrl();
		},

		showFilterAdvanced: function(){
			var self = this;
			$(document).on('click', '[nh-filter="btn-toggle"]', function(e) {
				if(nhMain.utilities.notEmpty($('#click_show'))) {
					$('#click_show').toggleClass('toggle');
				}
			});

			$(document).on('click', '[nh-filter="close"]', function(e) {
				if(nhMain.utilities.notEmpty($('#click_show'))) {
					$('#click_show').removeClass('toggle');
				}
			});
		},
		
	    priceRanger: function(){
			var self = this;

			self.priceRangerEl = self.wrapElement.find('[nh-price-range=slider]');
			self.fromPriceEl = self.wrapElement.find('[nh-price-range=from]');
			self.toPriceEl = self.wrapElement.find('[nh-price-range=to]');

			if(self.priceRangerEl.length == 0 || self.fromPriceEl.length == 0 || self.toPriceEl.length == 0 || self.btnRangerPrice == 0) return false;

			self.priceRangerEl.slider({
				range: true,
				min: self.minRangerPrice,
				max: self.maxRangerPrice,
				step: self.stepPrice,
				slide: function(event, ui) {
					self.fromPriceEl.text(nhMain.utilities.parseNumberToTextMoney(ui.values[0]));
	                self.toPriceEl.text(nhMain.utilities.parseNumberToTextMoney(ui.values[1]));
	                self.updateBtnSliderPrice(ui.values[0] , ui.values[1]);
				}
			});
		},
		getPriceFromUrl: function(){
	        var self = this;

	        var params = nhMain.utilities.getUrlVars();

	        if (typeof(params.price_from) == _UNDEFINED && typeof(params.price_to) == _UNDEFINED){
	        	self.updateSliderPrice(self.minRangerPrice, self.maxRangerPrice);
	        } else {
	        	var priceFrom = nhMain.utilities.notEmpty(params.price_from) ? nhMain.utilities.parseInt(params.price_from) : self.minRangerPrice;
		        var priceTo = nhMain.utilities.notEmpty(params.price_to) ? nhMain.utilities.parseInt(params.price_to) : self.maxRangerPrice;
		        self.updateSliderPrice(priceFrom, priceTo);
	        }
	    },
		updateSliderPrice: function(fromPrice = self.minRangerPrice, toPrice = self.maxRangerPrice) {
			var self = this;

			if(self.priceRangerEl.length == 0 || self.fromPriceEl.length == 0 || self.toPriceEl.length == 0) return false;
			self.priceRangerEl.slider("values", [fromPrice, toPrice]);

			self.fromPriceEl.text(nhMain.utilities.parseNumberToTextMoney(fromPrice));
			self.toPriceEl.text(nhMain.utilities.parseNumberToTextMoney(toPrice));

			self.updateBtnSliderPrice(fromPrice , toPrice);
		},
		updateBtnSliderPrice: function(fromPrice = self.minRangerPrice, toPrice = self.maxRangerPrice) {
			var self = this;

			if(self.btnRangerPrice == 0) return false;
			var params = nhMain.utilities.getUrlVars();

			$.extend(params, {'price_from': fromPrice, 'price_to': toPrice});

			var url = nhMain.pathname;

			if ($.isEmptyObject(params)) {
				url = nhMain.utilities.replaceUrlParam(url, 'price_from', fromPrice);
	        	url = nhMain.utilities.replaceUrlParam(url, 'price_to', toPrice);
			} else {
				$.each(params, function (index, value) {
					url = nhMain.utilities.replaceUrlParam(url, index, value);
				});
			}

	        $(self.btnRangerPrice).attr('nh-link-redirect', url);
		}
	}
}

$(document).ready(function() {
	nhProduct.init();
});