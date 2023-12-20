'use strict';

var nhMember = {
	init: function(){
		var self = this;

		nhMain.location.init({
			idWrap: ['#member-address', '#member-register']
		});

		self.login.init();
		self.register.init();
		self.profile.init();
		self.avatar.init();
		self.saveAddress.init();
		self.changePassword.init();
		self.orderManager.init();
		self.cancelOrder.init();
		self.forgotPassword.init();
		self.verifyForgotPassword.init();
		self.verifyEmail.init();
		self.attendance.init();
		self.wallet.init();
		self.otp.init({
			wrap: ['[nh-form="verify-email"]', '[nh-form="verify-forgot-password"]' ,'[nh-form="change-phone"]', '[nh-form="change-email"]', '[nh-form="give-point"]', '[nh-form="process-active"]']
		});
		self.changeEmail.init();
		self.changePhone.init();
		self.affiliate.init();
		self.associateBank.init();
	},
	login: {
		modalLogin: null,
		init: function(){
			var self = this;

			var formElement = $('form[nh-form="member-login"]');
			if(formElement == null || formElement == _UNDEFINED || formElement.length == 0){
				return false;
			}

			self.modalLogin = $('#login-modal');
			
			self.event();

			// load info member after logged
			var memberInfo = nhMain.utilities.notEmpty(nhMain.dataInit.member) ? nhMain.dataInit.member : {};
			if(!$.isEmptyObject(memberInfo) && $('[nh-mini-member]').length > 0){
				self.reloadMiniMember();;
			}
		},
		event: function(){
			var self = this;

			$('form[nh-form="member-login"]').each(function(index) {
				var formElement = $(this);

			  	var validator = formElement.validate({
					ignore: ':hidden',
					rules: {
						username: {
							required: true
						},
						password: {
							required: true,
						},				
					},
					messages: {
						username: {
		                    required: nhMain.getLabel('vui_long_nhap_tai_khoan'),
		                },
		                password: {
		                    required: nhMain.getLabel('vui_long_nhap_mat_khau'),
		                }
		            },
		            errorPlacement: function(error, element) {
		                var group = element.closest('.input-group');
		                if (group.length) {
		                    group.after(error.addClass('invalid-feedback'));
		                }else{                	
		                    element.after(error.addClass('invalid-feedback'));
		                }
		            },
					invalidHandler: function(event, validator) {
						validator.errorList[0].element.focus();
					},
				});

				formElement.on('keydown', 'input', function(e){
			  		if(e.keyCode == 13){
			  			formElement.find('[nh-btn-action="submit"]').trigger('click');
			  			return false;
			  		}			  		
				});

			  	formElement.on('click', '[nh-btn-action="submit"]', function(e){
			  		e.preventDefault();
			  		if (!validator.form()) return false;

		  			nhMain.reCaptcha.check(function(token){
		  				var formData = formElement.serialize();
						if(token != null){
		  					formData = formData + '&'+ _TOKEN_RECAPTCHA +'=' + token;
		  				}
						nhMain.callAjax({
							url: formElement.attr('action'),
							data: formData
						}).done(function(response) {
						   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
				        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
				        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};
				        	
				            if (code == _SUCCESS) {
				            	if(nhMain.utilities.notEmpty(data.wait_active)) {
				            		nhMain.showAlert(_INFO, nhMain.getLabel('ban_chua_kich_hoat_tai_khoan_vui_long_truy_cap') + '<a href="/member/verify-email"><span>' + nhMain.getLabel('duong_dan') + '</span></a>' + nhMain.getLabel('nay_de_kich_hoat_tai_khoan'), null, {
				            			'html': true
				            		});

				            		return false;
				            	}

				            	nhMain.showAlert(_SUCCESS, message);
				            	if(nhMain.utilities.notEmpty(data.redirect)){
				            		window.location.href = data.redirect;
				            	} else {
				            		window.location.href = '/member/dashboard';
				            	}
				            } else {
				            	nhMain.showAlert(_ERROR, message);
				            }
						});
		  			});					
				});
			});

			$(document).on('click', '[nh-btn-login-social="facebook"]', function(e){
				if(typeof(FB) == _UNDEFINED || typeof(FB.login) == _UNDEFINED && typeof(FB.login) != 'function'){
					nhMain.showLog('Chưa khai báo thư viện SDK Facebook');
					return false;
				}

				var formElement = $(this).closest('form[nh-form="member-login"]');
				if(formElement.length == 0) return false;

				FB.login(function(response) {
				    if (response.authResponse) {
				     	FB.api('/me', function(response) {
				     		var picture = typeof(response.picture) != _UNDEFINED && typeof(response.picture.data) != _UNDEFINED ? response.picture.data : null;
				     		var redirect = formElement.find(['input[name="redirect"]']).val();
				     		var data = {
				     			social_id: typeof(response.id) != _UNDEFINED ? response.id : null,
				     			type: 'facebook',
				     			full_name: typeof(response.name) != _UNDEFINED ? response.name : null,
				     			email: typeof(response.email) != _UNDEFINED ? response.email : null,
				     			picture: typeof(picture.url) != _UNDEFINED ? picture.url : null,
				     			redirect: nhMain.utilities.notEmpty(redirect) ? redirect : null
				     		};

				     		self.socialLogin(data);
				     	},
				     	{
				     		fields: 'email, name, picture.width(2048)'
				     	});
				    } 
				});
			});

			$(document).on('click', '[nh-btn-login-social="google"]', function(e){
				if(typeof(auth2) == _UNDEFINED || typeof(auth2.signIn) == _UNDEFINED && typeof(auth2.signIn) != 'function'){
					nhMain.showLog('Chưa khai báo thư viện Google');
					return false;
				}

				var formElement = $(this).closest('form[nh-form="member-login"]');
				if(formElement.length == 0) return false;

				auth2.signIn({
	                scope: 'profile email'
	            }).then(function (response) {
	            	var profile = response.getBasicProfile();

	            	var picture = nhMain.utilities.notEmpty(profile.getImageUrl()) != _UNDEFINED ? profile.getImageUrl().replace('s96-c', 's1024-c', true) : null;
	            	var redirect = formElement.find(['input[name="redirect"]']).val();
	            	var data = {};

	                var data = {
	                    social_id: profile.getId(),
	                    type: 'google',
	                    full_name: profile.getName(),
	                    email: profile.getEmail(),
	                    picture: picture,
	                    redirect: nhMain.utilities.notEmpty(redirect) ? redirect : null
	                }

	                self.socialLogin(data);
	            });
			});
		},
		socialLogin: function(data = {}, callback = null){
			var self = this;

			if (typeof(callback) != 'function') {
		        callback = function () {};
		    }

		    nhMain.showLoading.page();
			nhMain.callAjax({
				url: '/member/social-login',
				data: data
			}).done(function(response) {
			   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
	        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
	        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};

	        	nhMain.showLoading.remove();
	        	
	            if (code == _SUCCESS) {
	            	nhMain.showAlert(_SUCCESS, message);
	            	var action = nhMain.utilities.notEmpty(response.action) ? response.action : null;

	            	if(action == 'add'){
	            		window.location.href = '/member/profile';
	            	}

	            	if(nhMain.utilities.notEmpty(data.redirect)){
	            		window.location.href = data.redirect;
	            	} else {
	            		window.location.href = '/member/dashboard';
	            	}

	            	if(self.modalLogin != null){
		     			self.modalLogin.modal('hide');
		     		}
	            } else {
	            	nhMain.showAlert(_ERROR, message);
	            }


			});
		},
		reloadMiniMember: function(){
			var self = this;

			nhMain.callAjax({
				async: false,
				url: '/member/reload-mini-member',
				dataType: 'html'
			}).done(function(response) {
				$('[nh-mini-member]').html(response);
			});
		}
	},
	register: {
		init: function(){
			var self = this;

			var formElement = $('form[nh-form="member-register"]');
			if(formElement == null || formElement == _UNDEFINED || formElement.length == 0){
				return false;
			}
			
			nhMain.validation.phoneVn();

			$.validator.addMethod('regexUser', function(username, element) {
				return username.match(/^[a-zA-Z0-9]+$/);
			}, nhMain.getLabel('tai_khoan_khong_duoc_chua_ky_tu_dac_biet'));

			$('form[nh-form="member-register"]').each(function(index) {
				var formElement = $(this);

			  	var validator = formElement.validate({
					ignore: ':hidden',
					rules: {
						username: {
							required: true,
							minlength: 6,
							maxlength: 255,
							regexUser: true
						},
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

						password: {
							minlength: 6,
							required: true,
						},

						verify_password: {
		                    equalTo: '#password-register'
		                },

		                city_id: {
							required: true
						},

						district_id: {
							required: true
						},		

						address: {
							required: true
						}
					},
					messages: {
						username: {
		                    required: nhMain.getLabel('vui_long_nhap_tai_khoan'),
		                    minlength: nhMain.getLabel('tai_khoan_nhap_qua_ngan'),
		                    maxlength: nhMain.getLabel('tai_khoan_nhap_qua_dai')
		                },

		                phone: {
		                	required: nhMain.getLabel('vui_long_nhap_so_dien_thoai'),
		                    minlength: nhMain.getLabel('so_dien_thoai_khong_hop_le'),
		                    maxlength: nhMain.getLabel('so_dien_thoai_khong_hop_le')
		                },

		                full_name: {
		                    required: nhMain.getLabel('vui_long_nhap_ho_va_ten'),
		                    minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan'),
		                    maxlength: nhMain.getLabel('thong_tin_nhap_qua_dai')
		                },
		                
		                email: {
		                	required: nhMain.getLabel('vui_long_nhap_email'),
		                	email: nhMain.getLabel('email_chua_dung_dinh_dang'),
		                	minlength: nhMain.getLabel('email_nhap_qua_ngan'),
		                    maxlength: nhMain.getLabel('email_nhap_qua_dai')
		                },

		                password: {
		                    required: nhMain.getLabel('vui_long_nhap_mat_khau'),
		                    minlength: nhMain.getLabel('mat_khau_nhap_qua_ngan')
		                },

		                verify_password: {
		                    equalTo: nhMain.getLabel('xac_nhan_mat_khau_chua_chinh_xac')
		                },

		                city_id: {
		                	required: nhMain.getLabel('vui_long_nhap_thong_tin')
		                },

		                district_id: {
		                	required: nhMain.getLabel('vui_long_nhap_thong_tin')
		                },

		                address: {
		                	required: nhMain.getLabel('vui_long_nhap_thong_tin')
		                }
		            },
		            errorPlacement: function(error, element) {
		                var group = element.closest('.input-group');
		                var bootstrap_select = element.closest('.bootstrap-select');
		                if (group.length) {
		                    group.after(error.addClass('invalid-feedback'));
		                }else if (bootstrap_select.length) {
		                    bootstrap_select.after(error.addClass('invalid-feedback'));
		                }else{
		                    element.after(error.addClass('invalid-feedback'));
		                }
		            },
					invalidHandler: function(event, validator) {
						validator.errorList[0].element.focus();
					},
				});

				formElement.on('keydown', 'input', function(e){
			  		if(e.keyCode == 13){
			  			formElement.find('[nh-btn-action="submit"]').trigger('click');
			  			return false;
			  		}			  		
				});

			  	formElement.on('click', '[nh-btn-action="submit"]', function(e){
			  		e.preventDefault();

			  		if (!validator.form()) return false;			  		
					nhMain.reCaptcha.check(function(token){
		  				var formData = formElement.serialize();
						if(token != null){
		  					formData = formData + '&'+ _TOKEN_RECAPTCHA +'=' + token;
		  				}
		  				nhMain.showLoading.page();
		  				nhMain.callAjax({
							url: formElement.attr('action'),
							data: formData
						}).done(function(response) {
						   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
				        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
				        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};
				        	nhMain.showLoading.remove();
				            if (code == _SUCCESS) {
			            		if(nhMain.utilities.notEmpty(data.waiting_confirm)){
			            			nhMain.showAlert(_SUCCESS, message);
			            			window.location.href = '/member/success?email=' + data.email;
			            		} else {
			            			window.location.href = '/member/dashboard';
			            		}
				            } else {
				            	nhMain.showAlert(_ERROR, message);
				            }
						});
		  			});
				});
			});		
		}
	},
	orderManager: {
		formElement: null,
		page: 1,
		init: function(){
			var self = this;
			self.formElement = $('form[nh-form="list-order"]');
			if(self.formElement == null || self.formElement == _UNDEFINED || self.formElement.length == 0){
				return false;
			}

			$(document).on('click', '[nh-btn-action="order-search"]', function(e){
				self.page = 1;
				self.search();
				return false;
			});

			$(document).on('click', '.pagination .page-item:not(.disabled , .active) a', function(e){
				e.preventDefault();

				self.page = parseInt($(this).attr('nh-page-redirect'));
				self.search();
				return false;
			});
		},
		search: function(){
			var self = this;

			nhMain.showLoading.page();
			var formData = self.formElement.serialize();
			formData = formData + '&page=' + self.page;
			nhMain.callAjax({
				url: self.formElement.attr('action'),
				data: formData,
				dataType: 'html'
			}).done(function(response) {
				nhMain.showLoading.remove();
				self.formElement.find('[nh-form="table-order"]').html(response);
			});
		}
	},
	saveAddress: {
		modal : null,
		init: function(){
			var self = this;

			var formElement = $('form[nh-form="member-address"]');
			if(formElement == null || formElement == _UNDEFINED || formElement.length == 0){
				return false;
			}

			self.modal = $('#change-address-modal');

			nhMain.validation.phoneVn();
			var formElement = $('#member-address');
		  	var validator = formElement.validate({
				ignore: ':hidden',
				rules: {
					name: {
						required: true,
						minlength: 6,
						maxlength: 255,
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

					city_id: {
						required: true
					},

					district_id: {
						required: true
					},

					address: {
						required: true
					}
				},
				messages: {
					name: {
	                    required: nhMain.getLabel('vui_long_nhap_ten_dia_chi'),
	                    minlength: nhMain.getLabel('ten_dia_chi_nhap_qua_ngan'),
	                    maxlength: nhMain.getLabel('ten_dia_chi_nhap_qua_dai')
	                },

	                phone: {
	                	required: nhMain.getLabel('vui_long_nhap_so_dien_thoai'),
	                    minlength: nhMain.getLabel('so_dien_thoai_khong_hop_le'),
	                    maxlength: nhMain.getLabel('so_dien_thoai_khong_hop_le')
	                },

	                email: {
	                	required: nhMain.getLabel('vui_long_nhap_thong_tin'),
	                	email: nhMain.getLabel('email_chua_dung_dinh_dang'),
	                	minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan'),
	                    maxlength: nhMain.getLabel('thong_tin_nhap_qua_dai')
	                },

	                city_id: {
	                	required: nhMain.getLabel('vui_long_nhap_thong_tin')
	                },

	                district_id: {
	                	required: nhMain.getLabel('vui_long_nhap_thong_tin')
	                },

	                address: {
	                	required: nhMain.getLabel('vui_long_nhap_thong_tin')
	                }
	            },
	            errorPlacement: function(error, element) {
	            	var group = element.closest('.input-group');
	                var bootstrap_select = element.closest('.bootstrap-select');
	                if (group.length) {
	                    group.after(error.addClass('invalid-feedback'));
	                }else if (bootstrap_select.length) {
	                    bootstrap_select.after(error.addClass('invalid-feedback'));
	                }else{
	                    element.after(error.addClass('invalid-feedback'));
	                }
	            },
				invalidHandler: function(event, validator) {
					validator.errorList[0].element.focus();
				},
			});

			formElement.on('keydown', 'input', function(e){
		  		if(e.keyCode == 13){
		  			formElement.find('[nh-btn-action="submit"]').trigger('click');
		  			return false;
		  		}			  		
			});

		  	formElement.on('click', '[nh-btn-action="submit"]', function(e){
		  		e.preventDefault();
		  		if (!validator.form()) return false;

	  			nhMain.reCaptcha.check(function(token){
	  				var formData = formElement.serialize();

	  				if(token != null){
	  					formData = formData + '&'+ _TOKEN_RECAPTCHA +'=' + token;
	  				}

					nhMain.callAjax({
						url: formElement.attr('action'),
						data: formData
					}).done(function(response) {
					   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
			        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
			        	var status = typeof(response.status) != _UNDEFINED ? response.status : {};
			        	if(status == 403){
			        		nhMain.showAlert(_ERROR, message);
			        		location.reload();
			        	}
			            if (code == _SUCCESS) {
			            	nhMain.showAlert(_SUCCESS, message);
			            	location.reload();
			            } else {
			            	nhMain.showAlert(_ERROR, message);
			            }
			            $('#change-address-modal').modal('hide');
					});
	  			});
			});

			$(document).on('click', '[nh-address="default"]', function(e){
				var _id = $(this).attr('data-id');

				if(_id == null || _id == _UNDEFINED || _id.length == 0){
					return false;
				}

				nhMain.callAjax({
					url: '/member/address/is-default',
					data: {
						id: _id
					}
				}).done(function(response) {
				   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
		        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
		        	var status = typeof(response.status) != _UNDEFINED ? response.status : {};
		        	if(status == 403){
		        		nhMain.showAlert(_ERROR, message);
		        		location.reload();
		        	}
		            if (code == _SUCCESS) {
		            	nhMain.showAlert(_SUCCESS, message);
		            	location.reload();
		            } else {
		            	nhMain.showAlert(_ERROR, message);
		            }
				});
			});

			$(document).on('click', '[nh-address="delete"]', function(e){
				var _id = $(this).attr('data-id');
				var _btn_delete = $(this);

				if(_id == null || _id == _UNDEFINED || _id.length == 0){
					return false;
				}
				
				nhMain.showAlert(_WARNING, nhMain.getLabel('ban_co_muon_xoa_dia_chi_nay'), function(){
					nhMain.callAjax({
						url: '/member/address/delete',
						data: {
							id: _id
						}
					}).done(function(response) {
					   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
			        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
			        	var status = typeof(response.status) != _UNDEFINED ? response.status : {};
			        	if(status == 403){
			        		nhMain.showAlert(_ERROR, message);
			        		location.reload();
			        	}
			            if (code == _SUCCESS) {
			            	nhMain.showAlert(_SUCCESS, message);
			            	location.reload();
			            } else {
			            	nhMain.showAlert(_ERROR, message);
			            }
					});
				});
			});

			$(document).on('click', '[nh-address="add"]', function(e){
				self.clearInputAddressModal();
				self.modal.modal('show');
			});

			$(document).on('click', '[nh-address="edit"]', function(e){
				self.clearInputAddressModal();
				var addressInfo = $(this).data('address');		
				self.loadInfoAddressModal(addressInfo);
				self.modal.modal('show');
			});
		},
		clearInputAddressModal: function() {
			var self = this;
			
			self.modal.find('input').val('');

			var citySelect = self.modal.find('select#city_id');
			var districtSelect = self.modal.find('select#district_id');
			var wardSelect = self.modal.find('select#ward_id');

			citySelect.selectpicker('destroy');
			citySelect.val('');
			citySelect.selectpicker('render');
			

			districtSelect.find('option:not([value=""])').remove();
			districtSelect.selectpicker('refresh');

			wardSelect.find('option:not([value=""])').remove();
			wardSelect.selectpicker('refresh');
		},
		loadInfoAddressModal: function(addressInfo = {}){
			var self = this;

		    if(addressInfo.customer_id == null || addressInfo.customer_id == _UNDEFINED || addressInfo.customer_id.length == 0){
				return false;
			}

			self.modal.find('input[name="address_id"]').val(typeof(addressInfo.id) != _UNDEFINED ? addressInfo.id : '');
			self.modal.find('input[name="name"]').val(typeof(addressInfo.address_name) != _UNDEFINED ? addressInfo.address_name : '');
			self.modal.find('input[name="phone"]').val(typeof(addressInfo.phone) != _UNDEFINED ? addressInfo.phone : '');
			self.modal.find('input[name="zip_code"]').val(typeof(addressInfo.zip_code) != _UNDEFINED ? addressInfo.zip_code : '');
			self.modal.find('input[name="address"]').val(typeof(addressInfo.address) != _UNDEFINED ? addressInfo.address : '');

			self.modal.find('select#city_id').val(typeof(addressInfo.city_id) != _UNDEFINED ? addressInfo.city_id : '');
			self.modal.find('select#city_id').selectpicker('render');

			var city_id = typeof(addressInfo.city_id) != _UNDEFINED ? nhMain.utilities.parseInt(addressInfo.city_id) : null;
			var district_id = typeof(addressInfo.district_id) != _UNDEFINED ? nhMain.utilities.parseInt(addressInfo.district_id) : null;
			
			if(city_id > 0){
				var _data = {};
				_data[_PAGINATION] = {};
				_data[_PAGINATION][_PERPAGE] = 200;

				nhMain.callAjax({
		    		async: false,
					url: '/location/district/json/' + city_id,
					data: _data,
				}).done(function(response) {
					var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
		        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
		        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};
		        	if (code == _SUCCESS) {
		            	// append option
	                    if (!$.isEmptyObject(data)) {
	                    	var listOption = '';
					        $.each(data, function (key, item) {
					            listOption += '<option value="' + item.id + '">' + item.name + '</option>';
					        });
					        self.modal.find('select#district_id').append(listOption);
					        self.modal.find('select#district_id').selectpicker('destroy');
	                    }		                    
		            } else {
		            	nhMain.showLog(message);
		            }
				});
			}

			if(district_id > 0){
				var _data = {};
				_data[_PAGINATION] = {};
				_data[_PAGINATION][_PERPAGE] = 200;

				nhMain.callAjax({
		    		async: false,
					url: '/location/ward/json/' + district_id,
					data: _data,
				}).done(function(response) {
					var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
		        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
		        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};
		        	if (code == _SUCCESS) {
		            	// append option
	                    if (!$.isEmptyObject(data)) {
	                    	var listOption = '';
					        $.each(data, function (key, item) {
					            listOption += '<option value="' + item.id + '">' + item.name + '</option>';
					        });
					        self.modal.find('select#ward_id').append(listOption);
					        self.modal.find('select#ward_id').selectpicker('destroy');
	                    }		                    
		            } else {
		            	nhMain.showLog(message);
		            }
				});
			}

			self.modal.find('select#district_id').val(typeof(addressInfo.district_id) != _UNDEFINED ? addressInfo.district_id : '');
			self.modal.find('select#district_id').selectpicker('render');

			self.modal.find('select#ward_id').val(typeof(addressInfo.ward_id) != _UNDEFINED ? addressInfo.ward_id : '');
			self.modal.find('select#ward_id').selectpicker('render');
		}
	},
	avatar: {
	    wrapAvatar: null,
		btnDeleteAvatar: null,
		btnUploadAvatar: null,
		showAvatar: null,
		deleteAvatarElement: '<span nh-delete-avatar class="avatar-clear-image icon-close"><i class="iconsax isax-add"></i></span>',

		init: function(){
			var self = this;

			self.wrapAvatar = $('.avatar-upload');
			self.btnDeleteAvatar = '[nh-delete-avatar]';
			self.btnUploadAvatar = '[nh-avatar-upload]';
			self.showAvatar = '[nh-avatar]';

			if(self.wrapAvatar == null || self.wrapAvatar == _UNDEFINED || self.wrapAvatar.length == 0){
				return false;
			}

			$(document).on('change', self.btnUploadAvatar, function(e){
				$.each(this.files, function(index, file) {
					var fileReader = new FileReader();
					fileReader.readAsDataURL(file);
					fileReader.onload = function(e) {
				       	self.wrapAvatar.find(self.showAvatar).css('background-image', 'url("'+ fileReader.result +'")').addClass('loading');
				    }			

				    var formData = new FormData();
					formData.append('file', file);
					formData.append('path', _CUSTOMER);

					self.uploadAvatar(formData, function(){
						self.wrapAvatar.append(self.deleteAvatarElement);
						self.wrapAvatar.find(self.showAvatar).removeClass('loading');
					});
				});
				
			});

			$(document).on('click', self.btnDeleteAvatar, function(e){
				nhMain.callAjax({
		    		async: true,
					url: '/member/delete-avatar'
				}).done(function(response) {

					var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
		        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
		        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};

		        	if (code == _ERROR){
		        		nhMain.showAlert(_ERROR, message);
		        	}

		        	if (code == _SUCCESS) {
		        		var wrap = $(self.btnDeleteAvatar).closest('.avatar-upload');
						wrap.find(self.showAvatar).css('background-image', '');
						$(self.btnDeleteAvatar).remove();
		            }
				})
				
			})
		},

		uploadAvatar: function(formData = {}, callback = null) {
			var self = this;

			if (typeof(callback) != 'function') {
		        callback = function () {};
		    }

		    nhMain.callAjax({
	    		async: true,
				url: '/member/upload-avatar',
				data: formData,
				contentType: false,
				processData: false,
			}).done(function(response) {

				var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
	        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
	        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};

	        	if (code == _ERROR){
	        		nhMain.showAlert(_ERROR, message);
	        	}

	        	if (code == _SUCCESS && !$.isEmptyObject(data)) {
	        		callback(data);
	            }
			}).fail(function(jqXHR, textStatus, errorThrown){
		    	nhMain.showLog(errorThrown);
			});
		}
	},
	profile: {
		init: function(){
			var self = this;

			var formElement = $('form[nh-form="member-profile"]');
			if(formElement == null || formElement == _UNDEFINED || formElement.length == 0){
				return false;
			}

		  	var validator = formElement.validate({
				ignore: ':hidden',
				rules: {
					full_name: {
						required: true,
						minlength: 6,
						maxlength: 255
					},
					email: {
						required: true,
						email: true,
						minlength: 10,
						maxlength: 255
					}
				},
				messages: {
					full_name: {
	                    required: nhMain.getLabel('vui_long_nhap_ho_va_ten'),
	                    minlength: nhMain.getLabel('ho_va_ten_nhap_qua_ngan'),
	                    maxlength: nhMain.getLabel('ho_va_ten_nhap_qua_dai')
	                },
	                email: {
	                	required: nhMain.getLabel('vui_long_nhap_email'),
	                	email: nhMain.getLabel('email_chua_dung_dinh_dang'),
	                	minlength: nhMain.getLabel('email_nhap_qua_ngan'),
	                    maxlength: nhMain.getLabel('email_nhap_qua_dai')
	                }
	            },
	            errorPlacement: function(error, element) {
	                var group = element.closest('.input-group');
	                var bootstrap_select = element.closest('.bootstrap-select');
	                if (group.length) {
	                    group.after(error.addClass('invalid-feedback'));
	                }else if (bootstrap_select.length) {
	                    bootstrap_select.after(error.addClass('invalid-feedback'));
	                }else{
	                    element.after(error.addClass('invalid-feedback'));
	                }
	            },
				invalidHandler: function(event, validator) {
					validator.errorList[0].element.focus();
				},
			});

			formElement.on('keydown', 'input', function(e){
		  		if(e.keyCode == 13){
		  			formElement.find('[nh-btn-action="submit"]').trigger('click');
		  			return false;
		  		}			  		
			});

		  	formElement.on('click', '[nh-btn-action="submit"]', function(e){
		  		e.preventDefault();

		  		if (!validator.form()) return false;
		  		nhMain.reCaptcha.check(function(token){
		  			var formData = formElement.serialize();
		  			if(token != null){
	  					formData = formData + '&'+ _TOKEN_RECAPTCHA +'=' + token;
	  				}

					nhMain.callAjax({
						url: formElement.attr('action'),
						data: formData
					}).done(function(response) {
					   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
			        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
			        	var status = typeof(response.status) != _UNDEFINED ? response.status : {};
			        	if(status == 403){
			        		nhMain.showAlert(_ERROR, message);
			        		location.reload();
			        	}
			            if (code == _SUCCESS) {
			            	nhMain.showAlert(_SUCCESS, message);
			            	location.reload();
			            } else {
			            	nhMain.showAlert(_ERROR, message);
			            }
					});
		  		});
			});
		},
	},
	changePassword: {
		init: function(){
			var self = this;

			var formElement = $('form[nh-form="change-password"]');
			if(formElement == null || formElement == _UNDEFINED || formElement.length == 0){
				return false;
			}

		  	var validator = formElement.validate({
				ignore: ':hidden',
				rules: {
					old_password: {
						minlength: 6,
						maxlength: 255,
						required: true,
					},
					new_password: {
						minlength: 6,
						maxlength: 255,
						required: true,
					},
					re_password: {
	                    equalTo: '#new_password'
	                }
				},
				messages: {
	                old_password: {
	                    required: nhMain.getLabel('vui_long_nhap_mat_khau'),
	                    minlength: nhMain.getLabel('mat_khau_nhap_qua_ngan'),
	                    maxlength: nhMain.getLabel('mat_khau_nhap_qua_dai')
	                },

	                new_password: {
	                    required: nhMain.getLabel('vui_long_nhap_mat_khau_moi'),
	                    minlength: nhMain.getLabel('mat_khau_nhap_qua_ngan'),
	                    maxlength: nhMain.getLabel('mat_khau_nhap_qua_dai')
	                },

	                re_password: {
	                    equalTo: nhMain.getLabel('xac_nhan_mat_khau_chua_chinh_xac')
	                }
	            },
	            errorPlacement: function(error, element) {
	                var group = element.closest('.input-group');
	                var bootstrap_select = element.closest('.bootstrap-select');
	                if (group.length) {
	                    group.after(error.addClass('invalid-feedback'));
	                }else if (bootstrap_select.length) {
	                    bootstrap_select.after(error.addClass('invalid-feedback'));
	                }else{
	                    element.after(error.addClass('invalid-feedback'));
	                }
	            },
				invalidHandler: function(event, validator) {
					validator.errorList[0].element.focus();
				},
			});

			formElement.on('keydown', 'input', function(e){
		  		if(e.keyCode == 13){
		  			formElement.find('[nh-btn-action="submit"]').trigger('click');
		  			return false;
		  		}			  		
			});

		  	formElement.on('click', '[nh-btn-action="submit"]', function(e){
		  		e.preventDefault();
		  		if (!validator.form()) return false;

		  		nhMain.reCaptcha.check(function(token){
		  			var formData = formElement.serialize();
		  			if(token != null){
	  					formData = formData + '&'+ _TOKEN_RECAPTCHA +'=' + token;
	  				}

					nhMain.callAjax({
						url: formElement.attr('action'),
						data: formData
					}).done(function(response) {
					   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
			        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
			        	var status = typeof(response.status) != _UNDEFINED ? response.status : {};
			        	if(status == 403){
			        		nhMain.showAlert(_ERROR, message);
			        		location.reload();
			        	}
			            if (code == _SUCCESS) {
			            	formElement.find('input').val('');
			            	nhMain.showAlert(_SUCCESS, message);
			            } else {
			            	nhMain.showAlert(_ERROR, message);
			            }
					});
		  		});		  		
			});

		}
	},
	cancelOrder: {
		init: function(){
			var _modal = $('#cancel-order-modal');
			if(_modal == null || _modal == _UNDEFINED || _modal.length == 0){
				return false;
			}
			
			$(document).on('click', '[nh-order-btn="cancel"]', function(e){
				var orderId = $(this).data('id');

				_modal.find('input').val('');
				_modal.find('textarea').val('');

				_modal.find('input[name="order_id"]').val(orderId);
				_modal.modal('show');
			});

			_modal.on('click', '[nh-confirm]', function(e){
				var note = _modal.find('textarea[name="note"]').val();
				var order_id = _modal.find('input[name="order_id"]').val();

				nhMain.callAjax({
					url: '/member/order/cancel',
					data: {
						customer_order_id: order_id,
						customer_cancel: 1,
						customer_note_cancel: note
					}
				}).done(function(response) {
					var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
		        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
		        	var status = typeof(response.status) != _UNDEFINED ? response.status : {};
		        	if(status == 403){
		        		nhMain.showAlert(_ERROR, message);
		        		location.reload();
		        	}

		            if (code == _SUCCESS) {
		            	nhMain.showAlert(_SUCCESS, message);
		            } else {
		            	nhMain.showAlert(_ERROR, message);
		            }
		            location.reload();
		            _modal.modal('hide');
				});
			});
		}
	},
	forgotPassword: {
		init: function(){
			var self = this;

			var formElement = $('form[nh-form="forgot-password"');
			if(formElement == null || formElement == _UNDEFINED || formElement.length == 0){
				return false;
			}

		  	var validator = formElement.validate({
				ignore: ':hidden',
				rules: {
					email: {
						required: true,
						email: true,
						minlength: 10,
						maxlength: 255
					}
				},
				messages: {
	                email: {
	                	required: nhMain.getLabel('vui_long_nhap_email'),
	                	email: nhMain.getLabel('email_chua_dung_dinh_dang'),
	                	minlength: nhMain.getLabel('email_nhap_qua_ngan'),
	                    maxlength: nhMain.getLabel('email_nhap_qua_dai')
	                }
	            },
	            errorPlacement: function(error, element) {
	                var group = element.closest('.input-group');
	                var bootstrap_select = element.closest('.bootstrap-select');
	                if (group.length) {
	                    group.after(error.addClass('invalid-feedback'));
	                }else if (bootstrap_select.length) {
	                    bootstrap_select.after(error.addClass('invalid-feedback'));
	                }else{
	                    element.after(error.addClass('invalid-feedback'));
	                }
	            },
				invalidHandler: function(event, validator) {
					validator.errorList[0].element.focus();
				},
			});

			formElement.on('keydown', 'input', function(e){
		  		if(e.keyCode == 13){
		  			formElement.find('[nh-btn-action="submit"]').trigger('click');
		  			return false;
		  		}			  		
			});

		  	formElement.on('click', '[nh-btn-action="submit"]', function(e){
		  		e.preventDefault();
		  		
				if (!validator.form()) return false;	

				nhMain.reCaptcha.check(function(token){
	  				var formData = formElement.serialize();
					if(token != null){
	  					formData = formData + '&'+ _TOKEN_RECAPTCHA +'=' + token;
	  				}

	  				nhMain.showLoading.page();
	  				nhMain.callAjax({
						url: formElement.attr('action'),
						data: formData
					}).done(function(response) {
					   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
			        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
			        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};
			        	nhMain.showLoading.remove();
			            if (code == _SUCCESS) {
			            	if(nhMain.utilities.notEmpty(data.email)){
		            			window.location.href = '/member/verify-forgot-password?email=' + data.email;
		            		}
			            } else {
			            	nhMain.showAlert(_ERROR, message);
			            }
					});
	  			});
		  		
			});

		}
	},
	verifyForgotPassword: {
		init: function(){
			var self = this;

			var formElement = $('form[nh-form="verify-forgot-password"]');
			if(formElement == null || formElement == _UNDEFINED || formElement.length == 0){
				return false;
			}
			
		  	var validator = formElement.validate({
				ignore: ':hidden',
				rules: {
					email: {
						required: true,
						email: true,
						minlength: 10,
						maxlength: 255
					}
				},
				messages: {
	                email: {
	                	required: nhMain.getLabel('vui_long_nhap_email'),
	                	email: nhMain.getLabel('email_chua_dung_dinh_dang'),
	                	minlength: nhMain.getLabel('email_nhap_qua_ngan'),
	                    maxlength: nhMain.getLabel('email_nhap_qua_dai')
	                },

	                new_password: {
	                    required: nhMain.getLabel('vui_long_nhap_mat_khau_moi'),
	                    minlength: nhMain.getLabel('mat_khau_nhap_qua_ngan'),
	                    maxlength: nhMain.getLabel('mat_khau_nhap_qua_dai')
	                },

	                re_password: {
	                    equalTo: nhMain.getLabel('xac_nhan_mat_khau_chua_chinh_xac')
	                }
	            },
	            errorPlacement: function(error, element) {
	                var group = element.closest('.input-group');
	                var bootstrap_select = element.closest('.bootstrap-select');
	                if (group.length) {
	                    group.after(error.addClass('invalid-feedback'));
	                }else if (bootstrap_select.length) {
	                    bootstrap_select.after(error.addClass('invalid-feedback'));
	                }else{
	                    element.after(error.addClass('invalid-feedback'));
	                }
	            },
				invalidHandler: function(event, validator) {
					validator.errorList[0].element.focus();
				},
			});

			formElement.on('keydown', 'input', function(e){
		  		if(e.keyCode == 13){
		  			formElement.find('[nh-btn-action="submit"]').trigger('click');
		  			return false;
		  		}			  		
			});

		  	formElement.on('click', '[nh-btn-action="submit"]', function(e){
		  		e.preventDefault();

	  			if(formElement.find('[name="code"]').val().length == 0) {
		  			nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_nhap_ma_xac_nhan'));
		  		}

		  		formElement.find('[name="new_password"]').rules('add', {
	  				minlength: 6,
					maxlength: 255,
					required: true,
	  			});

		  		formElement.find('[name="re_password"]').rules('add', {
	  				equalTo: '#new_password'
	  			});

		  		if (!validator.form()) return false;	

				nhMain.reCaptcha.check(function(token){
	  				var formData = formElement.serialize();
					if(token != null){
	  					formData = formData + '&'+ _TOKEN_RECAPTCHA +'=' + token;
	  				}

	  				nhMain.showLoading.page();
	  				nhMain.callAjax({
						url: formElement.attr('action'),
						data: formData
					}).done(function(response) {
					   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
			        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
			        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};
			        	nhMain.showLoading.remove();
			            if (code == _SUCCESS) {
		            		nhMain.showAlert(_SUCCESS, message);
		            		window.location.href = '/member/login';
			            } else {
			            	nhMain.showAlert(_ERROR, message);
			            }
					});
	  			});
			});

			formElement.on('click', '[nh-btn-action="resend-verify"]', function(e){
		  		e.preventDefault();

		  		formElement.find('[name="new_password"]').rules('remove');
		  		formElement.find('[name="re_password"]').rules('remove');

		  		if (!validator.form()) return false;

				nhMain.reCaptcha.check(function(token){

	  				var formData = {
	  					email: formElement.find('[name="email"]').val(),
	  					generate_token: 'forgot_password'
	  				}

	  				if(token != null){
	  					formData[_TOKEN_RECAPTCHA] = token;
	  				}

	  				nhMain.showLoading.page();
	  				nhMain.callAjax({
						url: '/member/resend-verify-code',
						data: formData
					}).done(function(response) {

						var countDownElement = $('[nh-countdown]');
						if(countDownElement == null || countDownElement == _UNDEFINED || countDownElement.length == 0){
							return false;
						}

						nhMember.countDown.init(60,
		  					function(sec){
		  						countDownElement.text(nhMain.getLabel('gui_lai_sau') + ' ('+sec+')');
		  						$('[nh-btn-action="resend-verify"]').addClass('disable');
		  					},
		  					function(){
		  						countDownElement.text('');
		  						$('[nh-btn-action="resend-verify"]').removeClass('disable');
		  					}
		  				);

					   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
			        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
			        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};
			        	nhMain.showLoading.remove();
			            if (code == _SUCCESS) {
		            		nhMain.showAlert(_SUCCESS, message);
			            } else {
			            	nhMain.showAlert(_ERROR, message);
			            }
					});
	  			});
			});
		}
	},
	verifyEmail: {
		init: function(){
			var self = this;

			var formElement = $('form[nh-form="verify-email"]');
			if(formElement == null || formElement == _UNDEFINED || formElement.length == 0){
				return false;
			}
			
		  	var validator = formElement.validate({
				ignore: ':hidden',
				rules: {
					email: {
						required: true,
						email: true,
						minlength: 10,
						maxlength: 255
					}
				},
				messages: {		           
	                email: {
	                	required: nhMain.getLabel('vui_long_nhap_email'),
	                	email: nhMain.getLabel('email_chua_dung_dinh_dang'),
	                	minlength: nhMain.getLabel('email_nhap_qua_ngan'),
	                    maxlength: nhMain.getLabel('email_nhap_qua_dai')
	                }
	            },
	            errorPlacement: function(error, element) {
	                var group = element.closest('.input-group');
	                var bootstrap_select = element.closest('.bootstrap-select');
	                if (group.length) {
	                    group.after(error.addClass('invalid-feedback'));
	                }else if (bootstrap_select.length) {
	                    bootstrap_select.after(error.addClass('invalid-feedback'));
	                }else{
	                    element.after(error.addClass('invalid-feedback'));
	                }
	            },
				invalidHandler: function(event, validator) {
					validator.errorList[0].element.focus();
				},
			});

			formElement.on('keydown', 'input', function(e){
		  		if(e.keyCode == 13){
		  			formElement.find('[nh-btn-action="submit"]').trigger('click');
		  			return false;
		  		}			  		
			});

		  	formElement.on('click', '[nh-btn-action="submit"]', function(e){
		  		e.preventDefault();

		  		if(formElement.find('[name="code"]').val().length == 0) {
		  			nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_nhap_ma_xac_nhan'));
		  		}

		  		if (!validator.form()) return false;			  		
				nhMain.reCaptcha.check(function(token){
	  				var formData = formElement.serialize();
					if(token != null){
	  					formData = formData + '&'+ _TOKEN_RECAPTCHA +'=' + token;
	  				}

	  				nhMain.showLoading.page();
	  				nhMain.callAjax({
						url: formElement.attr('action'),
						data: formData
					}).done(function(response) {
					   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
			        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
			        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};
			        	nhMain.showLoading.remove();
			            if (code == _SUCCESS) {
		            		nhMain.showAlert(_SUCCESS, message);
		            		window.location.href = '/member/login';
			            } else {
			            	nhMain.showAlert(_ERROR, message);
			            }
					});
	  			});
			});

			formElement.on('click', '[nh-btn-action="resend-verify"]', function(e){
		  		e.preventDefault();

		  		if (!validator.form()) return false;

				nhMain.reCaptcha.check(function(token){

	  				var formData = {
	  					email: formElement.find('[name="email"]').val(),
	  					generate_token: 'active_account'
	  				}

	  				if(token != null){
	  					formData[_TOKEN_RECAPTCHA] = token;
	  				}

	  				nhMain.showLoading.page();
	  				nhMain.callAjax({
						url: '/member/resend-verify-code',
						data: formData
					}).done(function(response) {

						var countDownElement = $('[nh-countdown]');
						if(countDownElement == null || countDownElement == _UNDEFINED || countDownElement.length == 0){
							return false;
						}

						nhMember.countDown.init(60,
		  					function(sec){
		  						countDownElement.text(nhMain.getLabel('gui_lai_sau') + ' ('+sec+')');
		  						$('[nh-btn-action="resend-verify"]').addClass('disable');
		  					},
		  					function(){
		  						countDownElement.text('');
		  						$('[nh-btn-action="resend-verify"]').removeClass('disable');
		  					}
		  				);

					   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
			        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
			        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};
			        	nhMain.showLoading.remove();
			            if (code == _SUCCESS) {
		            		nhMain.showAlert(_SUCCESS, message);
			            } else {
			            	nhMain.showAlert(_ERROR, message);
			            }
					});
	  			});
			});
		},
	},
	countDown: {
		timer: null,
		init: function(seconds = 60, callBackDuring = null, callBackEnd = null) {
			var self = this;

			if (typeof(callBackDuring) != 'function') {
		        callBackDuring = function () {};
		    }

		    if (typeof(callBackEnd) != 'function') {
		        callBackEnd = function () {};
		    }

		    seconds = typeof(seconds) != _UNDEFINED ? seconds : null;

		    clearTimeout(self.timer);
			(function decrementCounter(){
			    if (--seconds < 0) {
			    	callBackEnd();
			    	return false;
			    }
			    self.timer = setTimeout(function(){
			        callBackDuring(seconds);
			        decrementCounter();
			    }, 1000);
			})();
		}
	},
	attendance: {
		wrap_attendance: $('[nh-attendance]'),
		init: function(){
			var self = this;

			if(self.wrap_attendance == null || self.wrap_attendance == _UNDEFINED || self.wrap_attendance.length == 0){
				return false;
			}
			
			self.event();
		},
		event: function(){
			var self = this;

			self.wrap_attendance.on('click', '[attendance-tick="true"]', function(e) {
				var _this = $(this);
				var day = _this.data('day');
				var date = _this.data('date');
				var point = _this.data('point');
				var point_promotion = $('.number_point_promition').html();

				nhMain.callAjax({
					url: '/member/attendance-tick',
					data: {
						day: day,
						date: date,
						point: point
					}
				}).done(function(response) {
					var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
		        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';

					if (code == _SUCCESS) {
						_this.removeAttr("attendance-tick");
						_this.attr("checked", "true");

						$(this).addClass('123123');
						$('#modal-attendance-success').modal('show');
						$('#modal-attendance-success .number-point').html('+'+point);
						$('#modal-attendance-success .point').html(point);
						$('.number_point_promition').html(parseInt(point_promotion) + parseInt(point));
					} else {
						$('#modal-attendance-error').modal('show');
					}
					$('p.message').html(message);
				});
			});
		}
	},
	wallet: {
		init: function(){
			var self = this;

			self.givePoint.init();
			self.buyPoint.init();
			self.managerPoint.init();
		},
		givePoint: {
			formElement: $('form#give-point'),
			validator: null,
			init: function(){
				var self = this;

				if(self.formElement.length == 0) return;
				self.event();
			},
			event: function(){
				var self = this;

				self.validator = self.formElement.validate({
					ignore: ':hidden',
					rules: {
						customer_code: {
							required: true
						},
						point:{
							required: true	
						}
					},
					messages: {
		                customer_code: {
		                	required: nhMain.getLabel('vui_long_nhap_thong_tin'),
		                },
		                point: {
		                    required: nhMain.getLabel('vui_long_nhap_thong_tin'),
		                }
		            },
		            errorPlacement: function(error, element) {
		                var group = element.closest('.input-group');
		                var bootstrap_select = element.closest('.bootstrap-select');
		                if (group.length) {
		                    group.after(error.addClass('invalid-feedback'));
		                }else if (bootstrap_select.length) {
		                    bootstrap_select.after(error.addClass('invalid-feedback'));
		                }else{
		                    element.after(error.addClass('invalid-feedback'));
		                }
		            },
					invalidHandler: function(event, validator) {
						validator.errorList[0].element.focus();
					},
				});

				self.formElement.on('keydown', 'input', function(e){
			  		if(e.keyCode == 13){
			  			self.formElement.find('[nh-btn-action="submit"]').trigger('click');
			  			return false;
			  		}			  		
				});

			  	self.formElement.on('click', '[nh-btn-action="submit"]', function(e){
			  		if(self.formElement.find('[name="code"]').val().length == 0) {
			  			nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_nhap_ma_xac_nhan'));
			  		}

			  		if (self.validator == null || !self.validator.form()) return false;

					var formData = self.formElement.serialize();

	  				nhMain.showLoading.page();
			  		nhMain.callAjax({
			    		async: false,
						url: '/member/wallet/ajax-give-point',
						data: formData,
					}).done(function(response) {
						var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
			        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
			        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};
			        	nhMain.showLoading.remove();

			        	if (code == _SUCCESS) {
		                    nhMain.showAlert(_SUCCESS, message);
		                    location.reload();
			            } else {
			            	nhMain.showAlert(_ERROR, message);
			            }
					});
				});

				self.formElement.on('keyup keypess keydown', 'input[name="point"]', function(e) {
					var pointMax = $(this).attr('nh-point-max');
					var point = $(this).val().replace(',', '');

					if(parseInt(pointMax) < parseInt(point)) {
						point = pointMax;
						$(this).val(pointMax);
					}	
				});

				self.formElement.on('click', '[nh-btn-action="get-verify"]', function(e){
					e.preventDefault();
					nhMain.reCaptcha.check(function(token){
						var formData = {
		  					type_verify: self.formElement.find('[name="type_verify"]:checked').val(),
		  					type_token: 'give_point'
		  				}

		  				if(token != null){
		  					formData[_TOKEN_RECAPTCHA] = token;
		  				}

		  				nhMain.showLoading.page();
		  				nhMain.callAjax({
							url: '/member/get-verify-code',
							data: formData
						}).done(function(response) {

							var countDownElement = $('[nh-countdown]');
							if(countDownElement == null || countDownElement == _UNDEFINED || countDownElement.length == 0){
								return false;
							}

							nhMember.countDown.init(60,
			  					function(sec){
			  						countDownElement.text(nhMain.getLabel('gui_lai_sau') + ' ('+sec+')');
			  						$('[nh-btn-action="get-verify"]').addClass('disable');
			  					},
			  					function(){
			  						countDownElement.text('');
			  						$('[nh-btn-action="get-verify"]').removeClass('disable');
			  					}
			  				);

						   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
				        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
				        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};
				        	nhMain.showLoading.remove();
				            if (code == _SUCCESS) {
			            		nhMain.showAlert(_SUCCESS, message);
				            } else {
				            	nhMain.showAlert(_ERROR, message);
				            }
						});
					});
				});
			}
		},
		buyPoint:{
			formElement: $('form#buy-point'),
			init: function(){
				var self = this;
				
				if(self.formElement.length == 0) return;
				self.event();
			},
			event: function(){
				var self = this;

				self.formElement.on('keydown', 'input', function(e){
			  		if(e.keyCode == 13){
			  			self.formElement.find('[nh-btn-action="submit"]').trigger('click');
			  			return false;
			  		}			  		
				});

			  	self.formElement.on('click', '[nh-btn-action="submit"]', function(e){		
					var inputPoint = self.formElement.find('input[name="point"]:checked').val();
					var payment_gateway = self.formElement.find('input[name="payment_gateway"]');

			  		if(inputPoint == null || inputPoint == _UNDEFINED || inputPoint.length == 0){
			  			nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_chon_so_tien_nap'));
			  			return false;
			  		}

			  		if(typeof(payment_gateway) == _UNDEFINED || payment_gateway.length == 0 || payment_gateway.val().length == 0){
			  			nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_chon_cong_thanh_toan'));
			  			return false;
			  		}

					var formData = self.formElement.serialize();

	  				nhMain.showLoading.page();
			  		nhMain.callAjax({
			    		async: false,
						url: '/member/wallet/ajax-buy-point',
						data: formData,
					}).done(function(response) {
						nhMain.showLoading.remove();

						var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
			        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
			        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};

			        	var orderCode = typeof(data.code) != _UNDEFINED ? data.code : null;
		        		var urlCheckout = typeof(data.url) != _UNDEFINED ? data.url : null;			        	

		        		if(code != _SUCCESS){
			        		nhMain.showAlert(_ERROR, message);
			        		return false;
			        	}

		        		if(urlCheckout != null && urlCheckout.length > 0){
		        			window.location.href = urlCheckout;
		        		}

			        	if (code == _SUCCESS) {
		                    nhMain.showAlert(_SUCCESS, message);
			            }
					});
				});

				self.formElement.on('click', '[choose-payments]', function(e){		  		
			  		var code = $(this).attr('code');
			  		var payment_gateway = self.formElement.find('input[name="payment_gateway"]');

			  		if(typeof(code) == _UNDEFINED || code == ''){
			  			nhMain.showAlert(_ERROR, nhMain.getLabel('khong_lay_duoc_ma_phuong_thuc_thanh_toan'));
			  			return false;
			  		}

			  		if(typeof(payment_gateway) == _UNDEFINED || payment_gateway.length == 0){
			  			nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_chon_cong_thanh_toan'));
			  			return false;
			  		}
			  		$('[choose-payments]').removeClass('active bg-orange');
			  		$(this).addClass('active bg-orange');
			  		payment_gateway.val(code);
				});
			}
		},
		managerPoint: {
			wrap: null,
			action: null,
			page: 1,
			init: function(){
				var self = this;
				self.wrap = $('#transaction_history');
				if(self.wrap == null || self.wrap == _UNDEFINED || self.wrap.length == 0){
					return false;
				}

				$(document).on('click', '[nh-wallet-redirect]', function(e){
					self.action = $(this).attr('nh-wallet-redirect');
					self.page = 1;
					self.tabs();
					return false;
				});

				$(document).on('click', '.pagination .page-item:not(.disabled , .active) a', function(e){
					e.preventDefault();

					self.page = parseInt($(this).attr('nh-page-redirect'));
					self.tabs();
					return false;
				});
			},
			tabs: function(){
				var self = this;

				nhMain.showLoading.page();
				nhMain.callAjax({
					url: '/member/ajax-history-point',
					data: {
						page: self.page,
						action: self.action
					},
					dataType: 'html'
				}).done(function(response) {
					nhMain.showLoading.remove();
					self.wrap.html(response);
				});
			}
		}
	},
	otp: {
		wrapElement: null,
		inputOtp: null,
		inputVerification: null,
		init: function(params = {}) {
			var self = this;

			self.wrapElement = typeof(params.wrap) != _UNDEFINED ? params.wrap : [];	

			if(self.wrapElement == null || self.wrapElement == _UNDEFINED || self.wrapElement.length == 0){
				return;
			}

			$.each(self.wrapElement, function(index, wrapElement) {
				var inputOtp = '[nh-otp="input"]';
				var inputVerification = '[nh-otp="verification"]';

				if($(wrapElement).length == 0 || $(wrapElement).find(inputOtp).length == 0 || $(wrapElement).find(inputVerification).length == 0){
					return;
				}

				self.inputOtp = inputOtp;
				self.inputVerification = inputVerification;

				self.event();
			});
		},
		event: function() {
			var self = this;

			$(document).on('keypress', self.inputOtp, function(e){
				if (e.which != 8 && e.which != 46 && e.which != 37 && e.which != 39 && e.which != 9 && (e.which < 48 || e.which > 57)) return false;	
			});

			$(document).on('keyup', self.inputOtp, function(e){
				var value = $(this).val();

				if(value.length > 0 && e.which != 46 && e.which != 8 && e.which != 37 && e.which != 39 && e.which != 9) {
					if (!isNaN(parseInt(e.key))) {
						$(this).val(e.key);
				    }	
					$(this).next().focus();
				} else {
					$(this).val(value);
				}

			    var codeOtp = [];
			    $(self.inputOtp).each(function(i) {
					codeOtp[i] = $(self.inputOtp)[i].value;					
				});

			    $(self.inputVerification).val(codeOtp.join(''));
			});

			$(document).on('keydown', self.inputOtp, function(e){
				switch(e.keyCode) {
					case 8://backspace
			        	if($(this).val().length > 0){
			        		$(this).val('');
			        	} else {
			        		$(this).prev().focus();
			        	}

			         	break;
			        case 46://del
			        	if($(this).val().length > 0){
			        		$(this).val('');
			        	} else {
			        		$(this).next().focus();
			        	}
			        	
			        	break;

			        case 37://key left
			        	$(this).prev().focus();
			        	
			        	break;

			        case 39://key right
			        	$(this).next().focus();
			        	
			        	break;
				}
			});

			$(document).on('paste', self.inputOtp, function(e){
				var pastedData = e.originalEvent.clipboardData.getData('text');
				var inputLength = $(self.inputOtp).length;
				
    			for (var i = 0; i < pastedData.length; i++) {
    				if (isNaN(parseInt(pastedData[i]))) {
				        nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_nhap_so'));
				        return false;
				    }	

    				if(i < inputLength){
    					$(self.inputOtp)[i].value = pastedData[i];
    				}
    				if(i == (inputLength - 1)){
    					$(self.inputOtp)[i - 1].focus();
    				}	
    			}
			});
		}
	},
	changeEmail: {
		init: function(){
			var self = this;

			var formElement = $('form[nh-form="change-email"]');
			if(formElement == null || formElement == _UNDEFINED || formElement.length == 0){
				return false;
			}
			nhMain.validation.phoneVn();
		  	var validator = formElement.validate({
				ignore: ':hidden',
				rules: {
					new_email: {
						required: true,
						email: true,
						minlength: 10,
						maxlength: 255
					},
				},
				messages: {		           
	                new_email: {
	                	required: nhMain.getLabel('vui_long_nhap_thong_tin'),
	                	email: nhMain.getLabel('email_chua_dung_dinh_dang'),
	                	minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan'),
	                    maxlength: nhMain.getLabel('thong_tin_nhap_qua_dai')
	                }
	            },
	            errorPlacement: function(error, element) {
	                var group = element.closest('.input-group');
	                var bootstrap_select = element.closest('.bootstrap-select');
	                if (group.length) {
	                    group.after(error.addClass('invalid-feedback'));
	                }else if (bootstrap_select.length) {
	                    bootstrap_select.after(error.addClass('invalid-feedback'));
	                }else{
	                    element.after(error.addClass('invalid-feedback'));
	                }
	            },
				invalidHandler: function(event, validator) {
					validator.errorList[0].element.focus();
				},
			});

			formElement.on('keydown', 'input', function(e){
		  		if(e.keyCode == 13){
		  			formElement.find('[nh-btn-action="submit"]').trigger('click');
		  			return false;
		  		}			  		
			});

		  	formElement.on('click', '[nh-btn-action="submit"]', function(e){
		  		e.preventDefault();

		  		if(formElement.find('[name="code"]').val().length == 0) {
		  			nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_nhap_ma_xac_nhan'));
		  		}

		  		if (!validator.form()) return false;			  		
				nhMain.reCaptcha.check(function(token){
	  				var formData = formElement.serialize();
					if(token != null){
	  					formData = formData + '&'+ _TOKEN_RECAPTCHA +'=' + token;
	  				}

	  				nhMain.showLoading.page();
	  				nhMain.callAjax({
						url: formElement.attr('action'),
						data: formData
					}).done(function(response) {
					   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
			        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
			        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};
			        	nhMain.showLoading.remove();
			            if (code == _SUCCESS) {
		            		nhMain.showAlert(_SUCCESS, message);
		            		window.location.href = '/member/dashboard';
			            } else {
			            	nhMain.showAlert(_ERROR, message);
			            }
					});
	  			});
			});

			formElement.on('click', '[nh-btn-action="get-verify"]', function(e){
				e.preventDefault();
				nhMain.reCaptcha.check(function(token){
					var formData = {
	  					type_verify: formElement.find('[name="type_verify"]:checked').val(),
	  					type_token: 'verify_change_email'
	  				}

	  				if(token != null){
	  					formData[_TOKEN_RECAPTCHA] = token;
	  				}

	  				nhMain.showLoading.page();
	  				nhMain.callAjax({
						url: '/member/get-verify-code',
						data: formData
					}).done(function(response) {

						var countDownElement = $('[nh-countdown]');
						if(countDownElement == null || countDownElement == _UNDEFINED || countDownElement.length == 0){
							return false;
						}

						nhMember.countDown.init(60,
		  					function(sec){
		  						countDownElement.text(nhMain.getLabel('gui_lai_sau') + ' ('+sec+')');
		  						$('[nh-btn-action="get-verify"]').addClass('disable');
		  					},
		  					function(){
		  						countDownElement.text('');
		  						$('[nh-btn-action="get-verify"]').removeClass('disable');
		  					}
		  				);

					   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
			        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
			        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};
			        	nhMain.showLoading.remove();
			            if (code == _SUCCESS) {
		            		nhMain.showAlert(_SUCCESS, message);
			            } else {
			            	nhMain.showAlert(_ERROR, message);
			            }
					});
				});
			});
		}
	},
	changePhone: {
		init: function(){
			var self = this;

			var formElement = $('form[nh-form="change-phone"]');
			if(formElement == null || formElement == _UNDEFINED || formElement.length == 0){
				return false;
			}
			nhMain.validation.phoneVn();
		  	var validator = formElement.validate({
				ignore: ':hidden',
				rules: {
					new_phone: {
						required: true,
						minlength: 10,
						maxlength: 11,
						phoneVN: true
					}
				},
				messages: {		           
	                new_phone: {
	                	required: nhMain.getLabel('vui_long_nhap_so_dien_thoai'),
	                    minlength: nhMain.getLabel('so_dien_thoai_khong_hop_le'),
	                    maxlength: nhMain.getLabel('so_dien_thoai_khong_hop_le')
	                }
	            },
	            errorPlacement: function(error, element) {
	                var group = element.closest('.input-group');
	                var bootstrap_select = element.closest('.bootstrap-select');
	                if (group.length) {
	                    group.after(error.addClass('invalid-feedback'));
	                }else if (bootstrap_select.length) {
	                    bootstrap_select.after(error.addClass('invalid-feedback'));
	                }else{
	                    element.after(error.addClass('invalid-feedback'));
	                }
	            },
				invalidHandler: function(event, validator) {
					validator.errorList[0].element.focus();
				},
			});

			formElement.on('keydown', 'input', function(e){
		  		if(e.keyCode == 13){
		  			formElement.find('[nh-btn-action="submit"]').trigger('click');
		  			return false;
		  		}			  		
			});

		  	formElement.on('click', '[nh-btn-action="submit"]', function(e){
		  		e.preventDefault();

		  		if(formElement.find('[name="code"]').val().length == 0) {
		  			nhMain.showAlert(_ERROR, nhMain.getLabel('vui_long_nhap_ma_xac_nhan'));
		  		}
		  		
		  		if (!validator.form()) return false;			  		
				nhMain.reCaptcha.check(function(token){
	  				var formData = formElement.serialize();
					if(token != null){
	  					formData = formData + '&'+ _TOKEN_RECAPTCHA +'=' + token;
	  				}

	  				nhMain.showLoading.page();
	  				nhMain.callAjax({
						url: formElement.attr('action'),
						data: formData
					}).done(function(response) {
					   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
			        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
			        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};
			        	nhMain.showLoading.remove();
			            if (code == _SUCCESS) {
		            		nhMain.showAlert(_SUCCESS, message);
		            		window.location.href = '/member/dashboard';
			            } else {
			            	nhMain.showAlert(_ERROR, message);
			            }
					});
	  			});
			});

			formElement.on('click', '[nh-btn-action="get-verify"]', function(e){
				e.preventDefault();
				nhMain.reCaptcha.check(function(token){
					var formData = {
	  					type_verify: formElement.find('[name="type_verify"]:checked').val(),
	  					type_token: 'verify_change_phone'
	  				}

	  				if(token != null){
	  					formData[_TOKEN_RECAPTCHA] = token;
	  				}

	  				nhMain.showLoading.page();
	  				nhMain.callAjax({
						url: '/member/get-verify-code',
						data: formData
					}).done(function(response) {

						var countDownElement = $('[nh-countdown]');
						if(countDownElement == null || countDownElement == _UNDEFINED || countDownElement.length == 0){
							return false;
						}

						nhMember.countDown.init(60,
		  					function(sec){
		  						countDownElement.text(nhMain.getLabel('gui_lai_sau') + ' ('+sec+')');
		  						$('[nh-btn-action="get-verify"]').addClass('disable');
		  					},
		  					function(){
		  						countDownElement.text('');
		  						$('[nh-btn-action="get-verify"]').removeClass('disable');
		  					}
		  				);

					   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
			        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
			        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};
			        	nhMain.showLoading.remove();
			            if (code == _SUCCESS) {
		            		nhMain.showAlert(_SUCCESS, message);
			            } else {
			            	nhMain.showAlert(_ERROR, message);
			            }
					});
				});
			});
		}
	},
	associateBank: {
		modal : null,
		init: function(){
			var self = this;

			var formElement = $('form[nh-form="associate-bank"]');
			if(formElement == null || formElement == _UNDEFINED || formElement.length == 0){
				return false;
			}

			self.modal = $('#change-associate-bank-modal');

		  	var validator = formElement.validate({
				ignore: ':hidden',
				rules: {
					bank_key: {
						required: true
					},
					bank_branch: {
						required: true,
						minlength: 6
					},
					account_holder: {
						required: true,
						minlength: 6
					},
					account_number: {
						required: true,
						minlength: 6,
						number: true
					}
				},
				messages: {
					bank_key: {
	                    required: nhMain.getLabel('vui_long_nhap_thong_tin'),
	                    minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan')
	                },

	                bank_branch: {
	                    required: nhMain.getLabel('vui_long_nhap_thong_tin'),
	                    minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan')
	                },

	                account_holder: {
	                    required: nhMain.getLabel('vui_long_nhap_thong_tin'),
	                    minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan')
	                },

	                account_number: {
						required: nhMain.getLabel('vui_long_nhap_thong_tin'),
	                    minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan'),
	                    number: nhMain.getLabel('so_tai_khoan_chua_dung_dinh_dang')
					}
	            },
	            errorPlacement: function(error, element) {
	            	var group = element.closest('.input-group');
	                var bootstrap_select = element.closest('.bootstrap-select');
	                if (group.length) {
	                    group.after(error.addClass('invalid-feedback'));
	                }else if (bootstrap_select.length) {
	                    bootstrap_select.after(error.addClass('invalid-feedback'));
	                }else{
	                    element.after(error.addClass('invalid-feedback'));
	                }
	            },
				invalidHandler: function(event, validator) {
					validator.errorList[0].element.focus();
				},
			});

			formElement.on('keydown', 'input', function(e){
		  		if(e.keyCode == 13){
		  			formElement.find('[nh-btn-action="submit"]').trigger('click');
		  			return false;
		  		}			  		
			});

		  	formElement.on('click', '[nh-btn-action="submit"]', function(e){
		  		e.preventDefault();
		  		if (!validator.form()) return false;

	  			nhMain.reCaptcha.check(function(token){
	  				var formData = formElement.serialize();

	  				if(token != null){
	  					formData = formData + '&'+ _TOKEN_RECAPTCHA +'=' + token;
	  				}

	  				nhMain.showLoading.page();
					nhMain.callAjax({
						url: formElement.attr('action'),
						data: formData
					}).done(function(response) {
					   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
			        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
			        	var status = typeof(response.status) != _UNDEFINED ? response.status : {};

			        	nhMain.showLoading.remove();
			            if (code == _SUCCESS) {
			            	nhMain.showAlert(_SUCCESS, message);
			            	location.reload();
			            } else {
			            	nhMain.showAlert(_ERROR, message);
			            }
			            $('#change-associate-bank-modal').modal('hide');
					});
	  			});
			});

			$(document).on('click', '[nh-affiliate="delete-bank"]', function(e){
				var _id = $(this).attr('data-id');
				var _btn_delete = $(this);

				if(_id == null || _id == _UNDEFINED || _id.length == 0){
					return false;
				}
				
				nhMain.showAlert(_WARNING, nhMain.getLabel('ban_co_muon_xoa_lien_ket_ngan_hang_nay'), function(){

					nhMain.showLoading.page();
					nhMain.callAjax({
						url: '/member/bank/delete',
						data: {
							bank_id: _id
						}
					}).done(function(response) {
					   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
			        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
			        	var status = typeof(response.status) != _UNDEFINED ? response.status : {};

			        	nhMain.showLoading.remove();
			            if (code == _SUCCESS) {
			            	nhMain.showAlert(_SUCCESS, message);
			            	location.reload();
			            } else {
			            	nhMain.showAlert(_ERROR, message);
			            }
					});
				});
			});

			$(document).on('click', '[nh-affiliate="add"]', function(e){
				self.clearInputAffiliateModal();
				self.modal.modal('show');
			});

			$(document).on('click', '[nh-affiliate="edit"]', function(e){
				self.clearInputAffiliateModal();
				var affiliateInfo = $(this).data('affiliate');		
				self.loadAffiliateModal(affiliateInfo);
				self.modal.modal('show');
			});
		},
		clearInputAffiliateModal: function() {
			var self = this;
			
			self.modal.find('input').val('');

			var bankKeySelect = self.modal.find('select#ward_id');
			bankKeySelect.selectpicker('destroy');
			bankKeySelect.val('');
			bankKeySelect.selectpicker('render');
		},
		loadAffiliateModal: function(affiliateInfo = {}){
			var self = this;

		    if(affiliateInfo.customer_id == null || affiliateInfo.customer_id == _UNDEFINED || affiliateInfo.customer_id.length == 0){
				return false;
			}

			self.modal.find('input[name="bank_id"]').val(typeof(affiliateInfo.id) != _UNDEFINED ? affiliateInfo.id : '');
			self.modal.find('input[name="bank_branch"]').val(typeof(affiliateInfo.bank_branch) != _UNDEFINED ? affiliateInfo.bank_branch : '');
			self.modal.find('input[name="account_holder"]').val(typeof(affiliateInfo.account_holder) != _UNDEFINED ? affiliateInfo.account_holder : '');
			self.modal.find('input[name="account_number"]').val(typeof(affiliateInfo.account_number) != _UNDEFINED ? affiliateInfo.account_number : '');
			self.modal.find('input[name="bank_key"]').selectpicker('render');

			self.modal.find('select#bank_key').val(typeof(affiliateInfo.bank_key) != _UNDEFINED ? affiliateInfo.bank_key : '');
			self.modal.find('select#bank_key').selectpicker('render');
		}
	},
	affiliate: {
		init: function() {
			var self = this;

			self.statistics.init();
			self.chart.init();
			self.activeAccount.init();			
			self.pointTomoney.init();
		},
		statistics: {
            wrapElement: null,
            init: function(){
                var self = this;

                self.wrapElement = $('#wrap-dashboard-statistic-element');
                if(self.wrapElement == null || self.wrapElement == _UNDEFINED || self.wrapElement.length == 0){
					return false;
				}

                self.event();
            },
            event: function(){
                var self = this;

                $(document).on('click', '[filter-month]', function(e) {
                    var month = typeof($(this).attr('filter-month')) != _UNDEFINED ? $(this).attr('filter-month') : null;
                    var monthText = $(this).text();
                    $(this).closest('.dropdown').find('.dropdown-toggle').text(monthText);
                    self.loadStatisticMonth(month);
                });
            },
            loadStatisticMonth: function(month = null){
                var self = this;

                nhMain.showLoading.page();
                nhMain.callAjax({
                    url: '/member/affiliate/load-statistic-month',
                    dataType: 'html',
                    data: {
                        month: month
                    }                    
                }).done(function(response) {
                    self.wrapElement.html(response);
                    nhMain.showLoading.remove();
                    return false
                });
            },
        },
        chart: {
            wrapElement: null,
            chartElement: null,
            chartData: null,
            init: function(){
                var self = this;

                self.wrapElement = $('#wrap-load-chart-profit');
                if(self.wrapElement == null || self.wrapElement == _UNDEFINED || self.wrapElement.length == 0){
					return false;
				}

                self.initChart();

                $(document).on('click', '[chart-month]', function(e) {
                    var month = typeof($(this).attr('chart-month')) != _UNDEFINED ? $(this).attr('chart-month') : null;
                    var monthText = $(this).text();
                    $(this).closest('.dropdown').find('.dropdown-toggle').text(monthText);
                    self.loadChart(month);
                });
            },
            loadChart: function(month){
                var self = this;

                nhMain.showLoading.page();
                nhMain.callAjax({
                    url: '/member/affiliate/load-chart-profit',
                    dataType: 'html',
                    data: {
                    	month: month
                    }
                }).done(function(response) {
                    self.wrapElement.html(response);
                    nhMain.showLoading.remove();

                    self.initChart();
                });
            },
            initChart: function(){
                var self = this;

                self.chartElement = self.wrapElement.find('#chart-profit');
                if (self.chartElement.length == 0) return false;

                var inputData = $('#data-chart-profit');
                if (inputData.length == 0) return false;

                self.chartData = nhMain.utilities.parseJsonToObject(inputData.val());
                if($.isEmptyObject(self.chartData)) return false;

                var labelText = $.trim($('#dropdown-month-chart-profit .dropdown-toggle').text());                
                var color = Chart.helpers.color;
                var barChartData = {
                    labels: typeof(self.chartData.labels) != _UNDEFINED ? self.chartData.labels : [],
                    datasets : [
                        {
                            fill: true,
                            label: labelText,
                            backgroundColor: 'rgba(93, 120, 255, 0.6)',
                            borderColor : 'rgba(93, 120, 255, 0)',                         
                            pointHoverRadius: 4,
                            pointHoverBorderWidth: 12,
                            pointBackgroundColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
                            pointBorderColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
                            pointHoverBackgroundColor: 'rgba(93, 120, 255, 1)',
                            pointHoverBorderColor: Chart.helpers.color('#000000').alpha(0.1).rgbString(),

                            data: typeof(self.chartData.money_data) != _UNDEFINED ? self.chartData.money_data : []
                        }
                    ]
                };

                var ctx = self.chartElement[0].getContext('2d');
                var chart = new Chart(ctx, {
                    type: 'line',
                    data: barChartData,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: {
                            display: true,
                            position: 'bottom'
                        },
                        scales: {
                            x: {
                                categoryPercentage: 0.35,
                                barPercentage: 0.70,
                                display: true,
                                gridLines: false,
                                ticks: {
                                    display: true,
                                    beginAtZero: true,
                                    fontColor: 'rgba(175, 180, 212, 1)',
                                    fontSize: 13,
                                    padding: 10
                                }
                            },
                            y: {
                                categoryPercentage: 0.35,
                                barPercentage: 0.70,
                                display: true,
                                gridLines: {
                                    color: 'rgba(217, 223, 250, 1)',
                                    drawBorder: false,
                                    offsetGridLines: false,
                                    drawTicks: false,
                                    borderDash: [3, 4],
                                    zeroLineWidth: 1,
                                    zeroLineColor: 'rgba(217, 223, 250, 1)',
                                    zeroLineBorderDash: [3, 4]
                                },
                                ticks: {
                                    display: true,
                                    beginAtZero: true,
                                    fontColor: 'rgba(175, 180, 212, 1)',
                                    fontSize: 13,
                                    padding: 10,
                                    callback: function(value, index, values) {
                                        return nhMain.utilities.parseNumberToTextMoney(value);
                                    }
                                }
                            }
                        },
                        title: {
                            display: true
                        },
                        hover: {
                            mode: 'index'
                        },
                        tooltips: {
                            enabled: true,
                            intersect: false,
                            mode: 'nearest',
                            bodySpacing: 5,
                            yPadding: 10,
                            xPadding: 10, 
                            caretPadding: 0,
                            displayColors: false,
                            backgroundColor: 'rgba(93, 120, 255, 1)',
                            titleFontColor: '#ffffff', 
                            cornerRadius: 4,
                            footerSpacing: 0,
                            titleSpacing: 0,
                            callbacks: {
                                label: function(context) {
                                    var label = '';

                                    if (nhMain.utilities.notEmpty(context.value)) {
                                        label = nhMain.utilities.parseNumberToTextMoney(parseFloat(context.value));
                                    }
                                    return label;
                                }
                            }
                        },
                        layout: {
                            padding: {
                                left: 0,
                                right: 0,
                                top: 5,
                                bottom: 5
                            }
                        }
                    }
                });
            }
        },
		activeAccount: {
			init: function() {
				var self = this;

				var formElement = $('form[nh-form="process-active"]');
				if(formElement == null || formElement == _UNDEFINED || formElement.length == 0){
					return false;
				}

				var validator = formElement.validate({
					ignore: ':hidden',
					rules: {
						identity_card_id:{
							required: true,
							number: true
						},
						identity_card_date:{
							required: true
						},
						identity_card_name:{
							required: true
						},
						bank_key: {
							required: true
						},
						bank_branch: {
							required: true,
							minlength: 6
						},
						account_holder: {
							required: true,
							minlength: 6
						},
						account_number: {
							required: true,
							minlength: 6,
							number: true
						}
					},
					messages: {
						identity_card_id: {
		                    required: nhMain.getLabel('vui_long_nhap_thong_tin'),
		                    number: nhMain.getLabel('cmnd_cccd_chua_dung_dinh_dang')
		                },

		                identity_card_date: {
		                    required: nhMain.getLabel('vui_long_nhap_thong_tin')
		                },

		                identity_card_name: {
		                    required: nhMain.getLabel('vui_long_nhap_thong_tin')
		                },

						bank_key: {
		                    required: nhMain.getLabel('vui_long_nhap_thong_tin')
		                },

		                bank_branch: {
		                    required: nhMain.getLabel('vui_long_nhap_thong_tin'),
		                    minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan')
		                },

		                account_holder: {
		                    required: nhMain.getLabel('vui_long_nhap_thong_tin'),
		                    minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan')
		                },

		                account_number: {
							required: nhMain.getLabel('vui_long_nhap_thong_tin'),
		                    minlength: nhMain.getLabel('thong_tin_nhap_qua_ngan'),
		                    number: nhMain.getLabel('so_tai_khoan_chua_dung_dinh_dang')
						}
		            },
		            errorPlacement: function(error, element) {
		            	var group = element.closest('.input-group');
		                var bootstrap_select = element.closest('.bootstrap-select');
		                if (group.length) {
		                    group.after(error.addClass('invalid-feedback'));
		                }else if (bootstrap_select.length) {
		                    bootstrap_select.after(error.addClass('invalid-feedback'));
		                }else{
		                    element.after(error.addClass('invalid-feedback'));
		                }
		            },
					invalidHandler: function(event, validator) {
						validator.errorList[0].element.focus();
					},
				});

				formElement.on('keydown', 'input', function(e){
			  		if(e.keyCode == 13){
			  			formElement.find('[nh-btn-action="submit"]').trigger('click');
			  			return false;
			  		}			  		
				});

			  	formElement.on('click', '[nh-btn-action="submit"]', function(e){
			  		e.preventDefault();
			  		if (!validator.form()) return false;

			  		nhMain.showAlert(_WARNING, nhMain.getLabel('ban_co_muon_khoi_tao_tai_khoan_doi_tac'), function(){		  	

			  			nhMain.reCaptcha.check(function(token){
			  				var formData = formElement.serialize();

			  				if(token != null){
			  					formData = formData + '&'+ _TOKEN_RECAPTCHA +'=' + token;
			  				}

			  				nhMain.showLoading.page();
							nhMain.callAjax({
								url: formElement.attr('action'),
								data: formData
							}).done(function(response) {
							   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
					        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
					        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};

					        	nhMain.showLoading.remove();
					        	
					        	if (code == _SUCCESS) {
					            	if(nhMain.utilities.notEmpty(data.wait_active)) {
					            		nhMain.showAlert(_ERROR, message);
					            		return false;
					            	}

					            	nhMain.showAlert(_SUCCESS, message);
					            	if(nhMain.utilities.notEmpty(data.redirect)){
					            		window.location.href = data.redirect;
					            	} else {
					            		window.location.href = '/member/affiliate/active';
					            	}
					            } else {
					            	nhMain.showAlert(_ERROR, message);
					            }
							});
			  			});
		  			});
				});

				formElement.on('click', '[nh-btn-action="get-verify"]', function(e){
					e.preventDefault();
					nhMain.reCaptcha.check(function(token){
						var formData = {
		  					type_verify: formElement.find('[name="type_verify"]:checked').val(),
		  					type_token: _AFFILIATE
		  				}

		  				if(token != null){
		  					formData[_TOKEN_RECAPTCHA] = token;
		  				}

		  				nhMain.showLoading.page();
		  				nhMain.callAjax({
							url: '/member/get-verify-code',
							data: formData
						}).done(function(response) {

							var countDownElement = $('[nh-countdown]');
							if(countDownElement == null || countDownElement == _UNDEFINED || countDownElement.length == 0){
								return false;
							}

							nhMember.countDown.init(60,
			  					function(sec){
			  						countDownElement.text(nhMain.getLabel('gui_lai_sau') + ' ('+sec+')');
			  						$('[nh-btn-action="get-verify"]').addClass('disable');
			  					},
			  					function(){
			  						countDownElement.text('');
			  						$('[nh-btn-action="get-verify"]').removeClass('disable');
			  					}
			  				);

						   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
				        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
				        	var data = typeof(response.data) != _UNDEFINED ? response.data : {};
				        	nhMain.showLoading.remove();
				            if (code == _SUCCESS) {
			            		nhMain.showAlert(_SUCCESS, message);
				            } else {
				            	nhMain.showAlert(_ERROR, message);
				            }
						});
					});
				});
			}
		},
		pointTomoney: {
			init: function() {
				var self = this;

				var formElement = $('form[nh-form="point-tomoney"]');
				if(formElement == null || formElement == _UNDEFINED || formElement.length == 0){
					return false;
				}

				self.modal = $('#point-tomoney-modal');

				var validator = formElement.validate({
					ignore: ':hidden',
					rules: {
						bank_id: {
							required: true
						},
						point: {
							required: true
						}
					},
					messages: {
						bank_id: {
		                    required: nhMain.getLabel('vui_long_chon_ngan_hang')
		                },

		                point: {
		                    required: nhMain.getLabel('so_diem_khong_du_dieu_kien_de_rut')
		                }
		            },
		            errorPlacement: function(error, element) {
		            	var group = element.closest('.input-group');
		                var bootstrap_select = element.closest('.bootstrap-select');
		                if (group.length) {
		                    group.after(error.addClass('invalid-feedback'));
		                }else if (bootstrap_select.length) {
		                    bootstrap_select.after(error.addClass('invalid-feedback'));
		                }else{
		                    element.after(error.addClass('invalid-feedback'));
		                }
		            },
					invalidHandler: function(event, validator) {
						validator.errorList[0].element.focus();
					},
				});

				formElement.on('keydown', 'input', function(e){
			  		if(e.keyCode == 13){
			  			formElement.find('[nh-btn-action="submit"]').trigger('click');
			  			return false;
			  		}			  		
				});

			  	formElement.on('click', '[nh-btn-action="submit"]', function(e){
			  		e.preventDefault();
			  		if (!validator.form()) return false;

		  			nhMain.reCaptcha.check(function(token){
		  				var formData = formElement.serialize();

		  				if(token != null){
		  					formData = formData + '&'+ _TOKEN_RECAPTCHA +'=' + token;
		  				}

						nhMain.callAjax({
							url: formElement.attr('action'),
							data: formData
						}).done(function(response) {
						   	var code = typeof(response.code) != _UNDEFINED ? response.code : _ERROR;
				        	var message = typeof(response.message) != _UNDEFINED ? response.message : '';
				        	var status = typeof(response.status) != _UNDEFINED ? response.status : {};
				            if (code == _SUCCESS) {
				            	nhMain.showAlert(_SUCCESS, message);
				            	location.reload();
				            } else {
				            	nhMain.showAlert(_ERROR, message);
				            }
				            self.modal.modal('hide');
						});
		  			});
				});

				$(document).on('click', '[nh-affiliate="point-tomoney"]', function(e){
					self.clearInputPointTomoney();
					self.modal.modal('show');
				});

				$(document).on('keyup keypess keydown', '#point', function(e) {
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
			},
			clearInputPointTomoney: function() {
				var self = this;
				
				self.modal.find('input').val('');

				var bankSelect = self.modal.find('select#bank_id');
				self.modal.find('.point-to-money').text(0);

				bankSelect.selectpicker('destroy');
				bankSelect.val('');
				bankSelect.selectpicker('render');
			}
		}
	}
}	

$(document).ready(function() {
	nhMember.init();
});