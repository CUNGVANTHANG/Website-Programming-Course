'use strict';

var nhOrder = {
	init: function(){
		var self = this;

		self.cart.init();
		self.sidebar.init();
		self.orderInfo.init();
		self.checkout.init();
		self.coupon.init();
		self.point.init();
		self.affiliate.init();
		self.shippingMethod.init();
	},
	cart: {
		wrapElement: null,	
		init: function(){
			var self = this;
			var checkChangeQuantity = false;			

			// events
			$(document).on('click', '[nh-btn-action="add-cart"]:not(.disable)', function(e){
				e.preventDefault();
				$(this).tooltip('hide');
				var wrapElement = $(this).closest('[nh-product]');
				if(wrapElement == _UNDEFINED || wrapElement.length == 0){
					nhMain.showLog(nhMain.getLabel('khong_tim_thay_the_bao_ngoai_san_pham') + ' [nh-product]');
					return false;
				};

				var productItemId = wrapElement.attr('nh-product-item-id');
				var btnAddCart = $(this);
				var inputQuantity = wrapElement.find('input[nh-quantity-product="quantity"]');
				var quantity = inputQuantity.length > 0 ? nhMain.utilities.parseInt(inputQuantity.val()) : 1;
				var redirect = btnAddCart.attr('nh-redirect');
				if(productItemId == _UNDEFINED || !productItemId > 0){
					nhMain.showAlert(_ERROR, nhMain.getLabel('khong_lay_duoc_thong_tin_san_pham'));
					return false;
				}
				
				btnAddCart.addClass('effect-spin');
				self.addProductToCart(productItemId, quantity, function(){
					nhOrder.sidebar.reloadSidebarCart(function(){
						if(typeof(redirect) != _UNDEFINED && redirect.length > 0){
							window.location.href = redirect;
							return false;
						}

                    	if(typeof(nhProduct) != _UNDEFINED && $(nhProduct.quickView.idModal).length > 0){
							$(nhProduct.quickView.idModal).modal('hide');
						}
                    	nhOrder.sidebar.toggleSidebarCart(true);
                    });   
					btnAddCart.removeClass('effect-spin');
				});
			});

			$(document).on('click', '[nh-quantity-product="subtract"], [nh-quantity-product="add"]', function(e) {
				e.preventDefault();
				var wrapCartInfo = $('[nh-cart-info]');
				var itemElement = $(this).closest('[nh-cart-item]');
				if(itemElement.length == 0) return false;

				var quantity = itemElement.find('input[nh-quantity-product="quantity"]').val();
				var old_quantity = itemElement.attr('nh-cart-item-quantity');

				var price = itemElement.find('[nh-cart-price]').attr('nh-cart-price');
				var totalItem = itemElement.find('[nh-cart-total-item]');
				var total = wrapCartInfo.find('[nh-cart-total]');

				if(quantity != old_quantity){
					checkChangeQuantity = true;
				}
				totalItem.text(nhMain.utilities.parseNumberToTextMoney(quantity * price));
				totalItem.attr('nh-cart-total-item', quantity * price);

				var sumTotal = 0;
				wrapCartInfo.find('[nh-cart-item]').each(function(index) {
					sumTotal += Number($(this).find('[nh-cart-total-item]').attr('nh-cart-total-item'));
				});
				total.text(nhMain.utilities.parseNumberToTextMoney(sumTotal));
			});

			$(document).on('click', '[nh-cart-action="checkout"]', function(e) {
				e.preventDefault();
				if(typeof(checkChangeQuantity) != _UNDEFINED && Boolean(checkChangeQuantity)){
			    	var items = [];
					$('[nh-cart-item]').each(function(index) {
						var productItemId = $(this).attr('nh-cart-item');
						var quantity = $(this).find('input[nh-quantity-product="quantity"]').val();

						if(productItemId > 0 && quantity > 0){
							items.push({
								'product_item_id': productItemId,
								'quantity': quantity
							});
						}
					});

					if($.isEmptyObject(items)){
						nhMain.showAlert(_ERROR, nhMain.getLabel('khong_lay_duoc_thong_tin_gio_hang'));
						return false;
					}
					nhMain.showLoading.page();
					self.updateCart(items, function(){
						window.location.href = '/order/info';
					});
			    }
			    window.location.href = '/order/info';
			});

			$(document).on('click', '[nh-update-item-cart]', function(e) {
				e.preventDefault();

				var item = [];
				var wrapElement = $(this).closest('[nh-cart-item]');
				var productItemId = wrapElement.attr('nh-cart-item');
				var quantity = wrapElement.find('input[nh-quantity-product="quantity"]').val();

				if(productItemId > 0 && quantity > 0){
					item = [{
						'product_item_id': productItemId,
						'quantity': quantity
					}]
				}

				if($.isEmptyObject(item)){
					nhMain.showAlert(_ERROR, nhMain.getLabel('khong_lay_duoc_thong_tin_gio_hang'));
					return false;
				}

				self.updateCart(item, function(){
					nhMain.showAlert(_SUCCESS, nhMain.getLabel('cap_nhap_gio_hang_thanh_cong'));
					var wrapCartInfo = $('[nh-cart-info]');
					if(wrapCartInfo.length > 0){
						location.reload();
					}
					nhOrder.sidebar.reloadSidebarCart();
				});

			});
			
			$(document).on('click', '[nh-remove-item-cart]', function(e) {
				e.preventDefault();
				
				var productItemId = $(this).attr('nh-remove-item-cart');
				if(productItemId > 0){
					nhMain.showAlert(_WARNING, nhMain.getLabel('ban_co_muon_xoa_san_pham_nay_khoi_gio_hang_khong'), function(){
						nhOrder.cart.removeProductInCart(productItemId, function(){
							nhMain.showAlert(_SUCCESS, nhMain.getLabel('cap_nhap_gio_hang_thanh_cong'));
							var wrapCartInfo = $('[nh-cart-info]');
							if(wrapCartInfo.length > 0){
								location.reload();
							}
							nhOrder.sidebar.reloadSidebarCart();
						});
					});					
				}
			});

			$(document).on('click', '[nh-btn-action="select-option"]:not(.disable)', function(e){
				e.preventDefault();
				$(this).tooltip('hide');
				var wrapElement = $(this).closest('[nh-product]');
				if(wrapElement == _UNDEFINED || wrapElement.length == 0){
					nhMain.showLog(nhMain.getLabel('khong_tim_thay_the_bao_ngoai_san_pham') + ' [nh-product]');
					return false;
				};

				wrapElement.find('.inner-image').addClass('effect-attribute-cart');
				if(typeof(nhProduct.selectAttribute) != _UNDEFINED){
					nhProduct.selectAttribute.activeOptionDefault(wrapElement);
				}
				setTimeout(function(){
					wrapElement.addClass('active-quick-shop');
				}, 500);			
				
				setTimeout(function(){
					wrapElement.find('.inner-image').removeClass('effect-attribute-cart');
				}, 900);
			});

			$(document).on('click', '[nh-btn-action="close-quick-shop"]:not(.disable)', function(e) {
				var wrapElement = $(this).closest('[nh-product]');
				if(wrapElement == _UNDEFINED || wrapElement.length == 0){
					nhMain.showLog(nhMain.getLabel('khong_tim_thay_the_bao_ngoai_san_pham') + ' [nh-product]');
					return false;
				};				
				wrapElement.removeClass('active-quick-shop');
			});
		},
		addProductToCart: function(productItemId = null, quantity = 1, callback = null){
			var self = this;

			if (typeof(callback) != 'function') {
		        callback = function () {};
		    }

			if(!productItemId > 0 || !quantity > 0){
				nhMain.showLog(nhMain.getLabel('du_lieu_khong_hop_le'));
				return false;
			}

			nhMain.callAjax({
	    		async: true,
				url: '/cart/add-product',
				data: {
					product_item_id: productItemId,
					quantity: quantity
				},
			}).done(function(response) {
				var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
	        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';

	        	if (code == _ERROR){
	        		nhMain.showAlert(_ERROR, message);
	        	}

	        	if (code == _SUCCESS && typeof(nhOrder.sidebar) != _UNDEFINED) {
	        		callback(response);             
	            }

	            
			});
		},
		removeProductInCart: function(productItemId = null, callback = null){
			var self = this;

			if (typeof(callback) != 'function') {
		        callback = function () {};
		    }

			nhMain.callAjax({
	    		async: true,
				url: '/cart/remove-product',
				data: {
					product_item_id: productItemId
				},
			}).done(function(response) {
				var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
	        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
	        	if (code == _SUCCESS) {
                    callback();
	            } else {
	            	nhMain.showAlert(_ERROR, message);
	            }
			});
		},
		updateCart: function(items = [], callback = null){
			var self = this;

			if (typeof(callback) != 'function') {
		        callback = function () {};
		    }

		    nhMain.callAjax({
	    		async: true,
				url: '/cart/update',
				data: {
					items: items
				}
			}).done(function(response) {
				var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
	        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
	        	if (code == _SUCCESS) {
                    callback();
	            } else {
	            	nhMain.showAlert(_ERROR, message);
	            }
			});
		}
	},
	sidebar: {
		sidebarCartElement: null,
		miniCartElement: null,
		init: function(){
			var self = this;

			// validate element exist
			self.sidebarCartElement = $('[nh-mini-cart="sidebar"]');
			if(self.sidebarCartElement == null || self.sidebarCartElement == _UNDEFINED || self.sidebarCartElement.length == 0){
				return false
			};

			self.miniCartElement = $('[nh-total-quantity-mini-cart]');
			
			// reload cart if exist product added
			var cartInfo = typeof(nhMain.dataInit.cart) != _UNDEFINED && nhMain.dataInit.cart != null ? nhMain.dataInit.cart : {};
			if(!$.isEmptyObject(cartInfo)){
				nhOrder.sidebar.reloadSidebarCart();
			}


			// events of mini-cart
			$(document).on('click', '[nh-mini-cart="open"]', function(e) {
				e.preventDefault();
				self.toggleSidebarCart(!self.sidebarCartElement.hasClass('open'));
			});

			$(document).on('click', '[nh-mini-cart="close"]', function(e) {
				e.preventDefault();
				self.toggleSidebarCart(false);
			});

			$(document).on('click', '[nh-remove-item-mini-cart]', function(e) {
				e.preventDefault();
				var productItemId = $(this).attr('nh-remove-item-mini-cart');
				if(productItemId > 0){
					nhMain.showAlert(_WARNING, nhMain.getLabel('ban_co_muon_xoa_san_pham_nay_khoi_gio_hang_khong'), function(){
						nhOrder.cart.removeProductInCart(productItemId, function(){
							self.reloadSidebarCart();
						});
					});					
				}
			});	

			$(document).on('click', 'body', function(e) {
				if(($(e.target).is('[nh-mini-cart="close"]') || $(e.target).is('body.dark-overlay')) && self.sidebarCartElement.hasClass('open')){
					self.toggleSidebarCart(false);
				}
			});
		},
		toggleSidebarCart: function(open = true){
			var self = this;

			self.sidebarCartElement.toggleClass('open', open);
			$('body').toggleClass('dark-overlay', open);
		},
		reloadSidebarCart: function(callback = null){
			var self = this;			
			if (typeof(callback) != 'function') {
		        callback = function () {};
		    }

		    nhMain.showLoading.block(self.sidebarCartElement);
		    nhMain.callAjax({
				url: '/cart/reload-sidebar-cart',
				dataType: 'html'
			}).done(function(response) {

				self.sidebarCartElement.find('.content-mini-cart').html(response);
				var totalQuantityCart = nhMain.utilities.parseInt(self.sidebarCartElement.find('[nh-total-quantity-cart]').attr('nh-total-quantity-cart'));
				if(self.miniCartElement.length > 0){
					self.miniCartElement.html(totalQuantityCart);
				}				

				nhMain.showLoading.remove();
				callback();
			});
		}
	},
	orderInfo: {
		formElement: null,
		updateAddressModal: null,
		init: function(){
			var self = this;
			self.formElement = $('#order-info');
			self.updateAddressModal = $('#update-address-modal');
			if(self.formElement.length == 0) return;

			nhMain.location.init({
				idWrap: ['#order-info']
			});

			nhMain.validation.phoneVn();
		  	var validator = self.formElement.validate({
				ignore: ':hidden',
				rules: {
					full_name: {
						required: true,
						minlength: 6,
						maxlength: 255
					},
					phone: {
						required: true,
						minlength: 10,
						maxlength: 11,
						phoneVN: true
					},
					email: {
						required: true,
						email: true,
						minlength: 10,
						maxlength: 255
					},
					address: {
						required: true,
					},
					city_id: {
						required: true,
					},
					district_id: {
						required: true,
					},
				},
				messages: {
					full_name: {
	                    required: nhMain.getLabel('vui_long_nhap_thong_tin'),
	                    minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan'),
	                    maxlength: nhMain.getLabel('thong_tin_nhap_qua_dai')
	                },
	                phone: {
	                	required: nhMain.getLabel('vui_long_nhap_thong_tin'),
	                    minlength: nhMain.getLabel('so_dien_thoai_khong_hop_le'),
	                    maxlength: nhMain.getLabel('so_dien_thoai_khong_hop_le')
	                },
	                email: {
	                	required: nhMain.getLabel('vui_long_nhap_thong_tin'),
	                	email: nhMain.getLabel('email_chua_dung_dinh_dang'),
	                	minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan'),
	                    maxlength: nhMain.getLabel('thong_tin_nhap_qua_dai')
	                },
	                address: {
	                    required: nhMain.getLabel('vui_long_nhap_thong_tin'),
	                },
	                city_id: {
	                    required: nhMain.getLabel('vui_long_chon_thong_tin'),
	                },
	                district_id: {
	                    required: nhMain.getLabel('vui_long_chon_thong_tin'),
	                }
	            },
	            errorPlacement: function(error, element) {

	            	if(element.hasClass('selectpicker')){
	            		var formGroup = element.closest('.form-group');
	            		formGroup.append(error.addClass('invalid-feedback'));
	            	}else{
	            		element.after(error.addClass('invalid-feedback'));
	            	}
	            },
				invalidHandler: function(event, validator) {
					validator.errorList[0].element.focus();
				},
			});

			$(document).on('click', '[nh-btn-action="create-order"]', function(e) {
				e.preventDefault();

				if (validator.form()) {
					nhMain.showLoading.page();

					var formData = self.formElement.serialize();					
					nhMain.callAjax({
						url: '/order/create',
						data: formData
					}).done(function(response) {
					   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
			        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
			        	var status = typeof(response.status) != _UNDEFINED ? response.status : null;
			        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};
			        	var orderCode = nhMain.utilities.notEmpty(data.code) ? data.code : '';

			        	var total = nhMain.utilities.notEmpty(data.total) ? nhMain.utilities.parseFloat(data.total) : 0;
						var paid = nhMain.utilities.notEmpty(data.paid) ? nhMain.utilities.parseFloat(data.paid) : 0;
						var debt = nhMain.utilities.notEmpty(data.debt) ? nhMain.utilities.parseFloat(data.debt) : 0;

			        	if(code == _ERROR && status == 511){
			        		nhMain.showAlert(_ERROR, message);
			        		setTimeout(function(){
			        			window.location.href = '/order/error';
			        		}, 2000);

			        		return false;
			        	}

			        	nhMain.showLoading.remove();
			        				        	
			        	if(code == _ERROR && status != 511){
			        		nhMain.showAlert(_ERROR, message);
			        		return false;
			        	}

			        	if(total == paid && debt == 0){			        		
			        		window.location.href = '/order/success?code=' + orderCode;
			        	}else{
			        		window.location.href = '/order/checkout?code=' + orderCode;
			        	}			        	
					});
				}
			});

			$(document).on('click', '[nh-address="list"]', function(e){
				self.updateAddressModal.modal('show');
				$('[nh-form="member-address"]').find('input[name="callback"]').val('contact');
			});

			$(document).on('click', '[nh-table="choose-row"] tbody tr', function(e){
				var addressId = $(this).attr('data-address-id');
				if(!nhMain.utilities.notEmpty(addressId)) return false;

				self.chooseAddress(addressId, function(data){
 					self.updateAddressModal.modal('hide');
				});
			});

			$(document).on('click', '[nh-order-login]', function(e){
				var loginModal = $('#login-modal');
				if(loginModal.length > 0){
					loginModal.modal('show');
					loginModal.find('input[name="redirect"]').val(window.location.href);
				}else{
					window.location.href = '/member/login';
				}
			});

			$(document).on('change', '#city_id', function(e) {
				var shippingMethodId = $('[nh-shipping-method]').attr('nh-shipping-method');
				var cityId = $('#order-info').find('select[name="city_id"]').val();

				nhOrder.shippingMethod.loadListShippingMethod(cityId, shippingMethodId);
			});
		},
		chooseAddress: function(address_id = null, callback = null){
			var self = this;

			if (typeof(callback) != 'function') {
		        callback = function () {};
		    }

			if(!nhMain.utilities.notEmpty(address_id)) return false;
			nhMain.callAjax({
				url: '/order/choose-address',
				data:{
					address_id: address_id
				}
			}).done(function(response) {
			   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
	        	
	        	var status = typeof(response.status) != _UNDEFINED ? response.status : null;
	        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};
	        	var orderCode = typeof(data.code) != _UNDEFINED ? data.code : null;

	        	if(code == _ERROR && status == 511){
	        		var message = typeof(response.message) != _UNDEFINED ? response.message : '';
	        		nhMain.showAlert(_ERROR, message);
	        		setTimeout(function(){
	        			window.location.href = '/order/error';
	        		}, 2000);

	        		return false;
	        	}

	        	if(code == _ERROR && status != 511){
	        		nhMain.showAlert(_ERROR, message);
	        		return false;
	        	}

	            if (code == _SUCCESS) {
	            	self.reload();
	            	callback(data);
	            }
			});
		},
		reload: function(viewReload = null, wrapElement = null){
			var self = this;

			if(wrapElement == null || wrapElement.length == 0) {
				wrapElement = $('[nh-order-info]');
			}

			var formData = self.formElement.serialize();
			if(viewReload != null && viewReload.length > 0){
				var firstChar = formData.length > 0 ? '&' : '';
				formData += firstChar + 'view_reload=' + viewReload;	
			}
			

			nhMain.showLoading.page();
			nhMain.callAjax({
				url: '/order/info',
				dataType: _HTML,
				data: formData
			}).done(function(response) {
			   	wrapElement.html(response);			   	
			   	nhMain.showLoading.remove();

			   	$(document).find('.selectpicker').selectpicker('refresh');
			   	nhMain.input.inputMask.init($(document).find('.number-input'), 'number');
			});
		}
	},
	checkout: {
		init: function(){
			var formElement = $('#form-checkout');

			$(document).on('click', '[nh-btn-action="checkout"]', function(e) {
				e.preventDefault();

				var paymentGateway = $('[nh-gateway-item].active').attr('nh-gateway-item');
				if(typeof(paymentGateway) == _UNDEFINED || paymentGateway.length == 0){
					nhMain.showAlert(_ERROR, nhMain.getLabel('khong_lay_duoc_ma_phuong_thuc_thanh_toan'));
					return false;
				}

				formElement.find('input[name="payment_gateway"]').val(paymentGateway);

				var formData = formElement.serialize();
				nhMain.showLoading.page();
				nhMain.callAjax({
					url: '/order/checkout/process',						
					data: formData
				}).done(function(response) {
					nhMain.showLoading.remove();
				   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
		        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
		        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};
		        	var orderCode = typeof(data.code) != _UNDEFINED ? data.code : null;
		        	var urlCheckout = typeof(data.url) != _UNDEFINED ? data.url : null;

		        	if(code != _SUCCESS || orderCode == null || orderCode.length == 0){
		        		nhMain.showAlert(_ERROR, message);
		        		return false;
		        	}

		        	if(urlCheckout != null && urlCheckout.length > 0){
	        			window.location.href = urlCheckout;
	        		}else{
	        			window.location.href = '/order/success?code=' + orderCode;
	        		}
		        	
				});
			});
		}
	},
	affiliate:{
		inputAffiliate: null,
		init: function(){
			var self = this;
			
			self.inputAffiliate = $('input#affiliate-code');
			if(self.inputAffiliate.length == 0) return;

			$(document).on('click', '[nh-btn-action="apply-affiliate"]', function(e) {
				if($('input#affiliate-code').val().length == 0){
					nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_nhap_ma_gioi_thieu'));
					return false;
				}

				var affiliateCode = $('input#affiliate-code').val();

				self.applyAffiliate(affiliateCode, function(e){
					nhOrder.orderInfo.reload('element_order_info_right', $('#order-info-right'));
				});
			});

			$(document).on('click', '[nh-btn-action="delete-affiliate"]', function(e) {
				self.deleteAffiliate(function(e){
					nhOrder.orderInfo.reload('element_order_info_right', $('#order-info-right'));;
				})
			});
		},
		applyAffiliate: function(affiliateCode = null, callback = null){
			var self = this;

			if (typeof(callback) != 'function') {
		        callback = function () {};
		    }

		    nhMain.showLoading.page();
			nhMain.callAjax({
				url: '/affiliate/apply',
				data:{
					affiliate_code: affiliateCode
				}
			}).done(function(response) {
				nhMain.showLoading.remove();

			   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
	        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';

	        	if(code == _ERROR){
	        		nhMain.showAlert(_ERROR, message);
	        		return false;
	        	}

	            if (code == _SUCCESS) {
	            	nhMain.showAlert(_SUCCESS, message);
	            	callback();
	            }
			});
		},
		deleteAffiliate: function(callback = null){
			var self = this;

			if (typeof(callback) != 'function') {
		        callback = function () {};
		    }

		    nhMain.showLoading.page();
			nhMain.callAjax({
				url: '/affiliate/delete',
			}).done(function(response) {
				nhMain.showLoading.remove();

			   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
	        	
	        	var status = typeof(response.status) != _UNDEFINED ? response.status : null;
	        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};

	        	if(code == _ERROR){
	        		var message = typeof(response.message) != _UNDEFINED ? response.message : '';
	        		nhMain.showAlert(_ERROR, message);
	        		return false;
	        	}

	            if (code == _SUCCESS) {
	            	callback();
	            }
			});
		}
	},
	coupon:{
		init: function(){
			var self = this;
			
			self.orderCoupon.init();
			self.listCoupon.init();
		},
		orderCoupon:{
			inputCoupon: null,
			coupon: null,
			init: function(){
				var self = this;
			
				self.inputCoupon = $('input#order-coupon-code');
				if(self.inputCoupon.length == 0) return;

				self.event();				
			},
			event: function(){
				var self = this;

				$(document).on('click', '[nh-btn-action="apply-coupon"]', function(e) {
					if($('input#order-coupon-code').val().length == 0){
						nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_nhap_ma_coupon'));
						return false;
					}

					var couponCode = $('input#order-coupon-code').val();

					self.checkCoupon(couponCode, function(e){
						nhOrder.orderInfo.reload('element_order_info_right', $('#order-info-right'));
					});
				});

				$(document).on('click', '[nh-btn-action="delete-coupon"]', function(e) {
					self.deleteCoupon(function(e){
						nhOrder.orderInfo.reload('element_order_info_right', $('#order-info-right'));;
					})
				});

				$(document).on('click', '[nh-btn-action="list-coupon"]', function(e){
					if(!nhOrder.coupon.listCoupon.modal.length > 0) return;
					nhOrder.coupon.listCoupon.modal.modal('show');

				});
			},
			checkCoupon: function(couponCode = null, callback = null){
				var self = this;

				if (typeof(callback) != 'function') {
			        callback = function () {};
			    }

			    nhMain.showLoading.page();
				nhMain.callAjax({
					url: '/promotion/check-coupon',
					data:{
						coupon: couponCode
					}
				}).done(function(response) {
					nhMain.showLoading.remove();

				   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
		        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
		        	var status = typeof(response.status) != _UNDEFINED ? response.status : null;
		        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};

		        	if(code == _ERROR){
		        		nhMain.showAlert(_ERROR, message);
		        		return false;
		        	}

		            if (code == _SUCCESS) {
		            	if($.isEmptyObject(data)) {
		            		nhMain.showAlert(_ERROR, message);
		            		return false;
		            	}

		            	// nhMain.showAlert(_SUCCESS, message, null, {timer: 1000});
		            	callback(data);
		            }
				});
			},
			deleteCoupon: function(callback = null){
				var self = this;

				if (typeof(callback) != 'function') {
			        callback = function () {};
			    }

			    nhMain.showLoading.page();
				nhMain.callAjax({
					url: '/promotion/delete-coupon',
				}).done(function(response) {
					nhMain.showLoading.remove();

				   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;		        	
		        	var status = typeof(response.status) != _UNDEFINED ? response.status : null;
		        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};

		        	if(code == _ERROR){
		        		var message = typeof(response.message) != _UNDEFINED ? response.message : '';
		        		nhMain.showAlert(_ERROR, message);
		        		return false;
		        	}

		            if (code == _SUCCESS) {
		            	callback(data);
		            }
				});
			}
		},
		listCoupon: {
			modal: $('#list-coupon-modal'),
			wrapElement: $('[nh-promotion]'),
			init: function() {
				var self = this;
				if(self.wrapElement.length == 0) return;

				self.event();
			},
			event: function(){
				var self = this;

				$(document).on('click', '[nh-btn-action="select-coupon"]', function(e){
					var code = $(this).attr('nh-coupon-code');

					// copy phieu giam gia
					// var input_tmp = $('<input value="' + code + '">');
					// self.wrapElement.append(input_tmp);
					// input_tmp.select();
					// document.execCommand('copy');
					// input_tmp.remove();

					// nhMain.showAlert(_SUCCESS, nhMain.getLabel('da_copy_ma_giam_gia'));

					if(nhOrder.coupon.orderCoupon.inputCoupon.length > 0) {
						nhOrder.coupon.orderCoupon.checkCoupon(code, function(e){
							self.modal.modal('hide');
							nhOrder.orderInfo.reload('element_order_info_right', $('#order-info-right'));
						});
					}
				});
			}
		}
	},
	point:{
		init: function(){
			var self = this;

			$(document).on('click', '[nh-btn-action="apply-point-promotion"]', function(e){
				if($('#point-promotion').length == 0) return false;

				var pointPromotion = $('#point-promotion').val().replace(',', '');
				if(pointPromotion.length == 0){
					nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_nhap_diem'));
					return false;
				}

				self.applyPoint(pointPromotion, _PROMOTION, function(e){
					nhOrder.orderInfo.reload();
				});
			});

			$(document).on('click', '[nh-btn-action="apply-point-promotion-all"]', function(e){
				if($('#point-promotion').length == 0) return false;

				var pointMax = $('#point-promotion').attr('nh-point-max');
				if(pointMax.length == 0){
					nhMain.showAlert(_ERROR, nhMain.getLabel('khong_lay_duoc_thong_tin_so_diem'));
					return false;
				}

				self.applyPoint(pointMax, _PROMOTION, function(e){
					nhOrder.orderInfo.reload();
				});
			});

			$(document).on('click', '[nh-btn-action="apply-wallet"]', function(e){
				if($('#wallet').length == 0) return false;

				var pointWallet = $('#wallet').val().replace(',', '');
				if(pointWallet.length == 0){
					nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_nhap_diem'));
					return false;
				}
				
				self.applyPoint(pointWallet, _WALLET, function(e){
					nhOrder.orderInfo.reload();
				});
			});

			$(document).on('click', '[nh-btn-action="apply-wallet-all"]', function(e){
				if($('#wallet').length == 0) return false;

				var pointMax = $('#wallet').attr('nh-point-max');
				if(pointMax.length == 0){
					nhMain.showAlert(_ERROR, nhMain.getLabel('khong_lay_duoc_thong_tin_so_diem'));
					return false;
				}
				
				self.applyPoint(pointMax, _WALLET, function(e){
					nhOrder.orderInfo.reload();
				});
			});

			$(document).on('keyup keypess keydown', '#point-promotion', function(e) {
				var pointToMoney = $(this).attr('nh-point-money');
				var pointMax = $(this).attr('nh-point-max');
				var point = $(this).val().replace(',', '');

				if(parseInt(pointMax) < parseInt(point)) {
					point = pointMax;
					$(this).val(pointMax);
				}

				var wrapElement = $(this).closest('.input-group');

				var labelPointToMoney = wrapElement.find('.point-to-money');

				labelPointToMoney.text(nhMain.utilities.parseNumberToTextMoney(pointToMoney * point));	
			});

			$(document).on('keyup keypess keydown', '#wallet', function(e) {
				var pointToMoney = $(this).attr('nh-point-money');
				var pointMax = $(this).attr('nh-point-max');
				var point = $(this).val().replace(',', '');

				if(parseInt(pointMax) < parseInt(point)) {
					point = pointMax;
					$(this).val(pointMax);
				}

				var wrapElement = $(this).closest('.input-group');

				var labelPointToMoney = wrapElement.find('.point-to-money');

				labelPointToMoney.text(nhMain.utilities.parseNumberToTextMoney(pointToMoney * point));	
			});

			$(document).on('click', '[nh-btn-action="delete-wallet"]', function(e) {
				self.deletePoint(_WALLET, function(e){
					nhOrder.orderInfo.reload();
				})
			});

			$(document).on('click', '[nh-btn-action="delete-point-promotion"]', function(e) {
				self.deletePoint(_PROMOTION, function(e){
					nhOrder.orderInfo.reload();
				})
			});
		},
		applyPoint: function(point = null, type = null, callback = null) {
			var self = this;

			if (typeof(callback) != 'function') {
		        callback = function () {};
		    }

		    nhMain.showLoading.page();
			nhMain.callAjax({
				url: '/customer/point/apply-order',
				data:{
					type: type,
					point: point
				}
			}).done(function(response) {
			   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
	        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
	        	var status = typeof(response.status) != _UNDEFINED ? response.status : null;
	        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};

	        	nhMain.showLoading.remove();
	        	if(code == _ERROR){
	        		nhMain.showAlert(_ERROR, message);
	        		return false;
	        	}

	            if (code == _SUCCESS) {
	            	if($.isEmptyObject(data)) {
	            		nhMain.showAlert(_ERROR, message);
	            		return false;
	            	}
	            	callback(data);
	            }
			});
		},
		deletePoint: function(type = null, callback = null){
			var self = this;

			if (typeof(callback) != 'function') {
		        callback = function () {};
		    }
		    nhMain.showLoading.page();
			nhMain.callAjax({
				url: '/customer/point/clear-in-order',
				data: {
					type: type
				}
			}).done(function(response) {
			   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
	        	
	        	var status = typeof(response.status) != _UNDEFINED ? response.status : null;
	        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};
	        	nhMain.showLoading.remove();
	        	if(code == _ERROR){
	        		var message = typeof(response.message) != _UNDEFINED ? response.message : '';
	        		nhMain.showAlert(_ERROR, message);
	        		return false;
	        	}

	            if (code == _SUCCESS) {
	            	callback(data);
	            }
			});
		}
	},
	shippingMethod: {
		wrapElement: $('[nh-wrap="shipping-method"]'),
		init: function(){
			var self = this;
			if(self.wrapElement.length == 0) return;

			self.event();
		},
		event: function(){
			var self = this;

			$(document).on('change', '[nh-shipping-method]', function(e) {
				var shippingMethodId = $(this).attr('nh-shipping-method');
				var cityId = $('#order-info').find('select[name="city_id"]').val();

				self.loadListShippingMethod(cityId, shippingMethodId);
			});

			$(document).on('change', 'form#order-info select[name="city_id"]', function(e) {
				nhOrder.orderInfo.reload('element_order_info_right', $('#order-info-right'));;
			});
		},
		loadListShippingMethod: function (city_id = null, shipping_method_id = null) {
			nhMain.showLoading.page();
			nhMain.callAjax({
				url: '/order/shipping-method/select',
				data: {
					shipping_method_id: typeof(shipping_method_id) != _UNDEFINED ? shipping_method_id : null,
					city_id: typeof(city_id) != _UNDEFINED ? city_id : null,
				}
			}).done(function(response) {
			   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
	        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
	        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};

	        	if(code != _SUCCESS){
	        		nhMain.showLoading.remove();
	        		nhMain.showAlert(_ERROR, message);
	        		return false;
	        	}else{
	        		nhOrder.orderInfo.reload('element_order_info_right', $('#order-info-right'));;
	        	}
			});
		}
	}
}

$(document).ready(function() {
	nhOrder.init();
});