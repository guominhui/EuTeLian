var winWidth = $(window).width();
if(winWidth < 750) { location.href = 'mIndex.html'}

jQuery(function($) {
	var self = null;
	var winHeight = $(window).height();
	var winWidth = $(window).width();
	var timestamp = new Date().getTime();
	var gxbIndex = {
		init: function(){
			self = this;
			new WOW().init();
			smoothScroll.init();
			slider.init();
			//self.getCode();
			//self.getMerchantDetail();
			self.bind();
			$('.banner-panel').css("height" , winHeight)
		},

		bind: function() {
			$(document)
				.on("click", "#submit", function(){
					self.toValidate()
				})
				.on("click", "#code-img", function(){
					timestamp = new Date().getTime();
					self.getCode()
				})
				.on("click", "#apply-btn-ban, #point-btn-ban", function() {
					location.assign('https://blog.csdn.net/kaitiren/article/details/79848068')
				})
				// .on("click", ".navbar-login-btn", function() {
				// 	location.href = $(this).data("#downLoad");
				// })
				.on("mouseover", ".product_point .item", function() {
					$(".product_point .item").removeClass("active");
					$(this).addClass("active");
					$(".detail").html($(this).data("info"))
				})
		},
		getMerchantDetail: function(){
			$.ajax({
				type: 'post',
				url: '/platform/merchant/getMerchantDetail',
				dataType: 'json',
				success: function(data) {
					// if(data.retCode == 1) {
					// 	$('.navbar-login-btn').text('我的应用').data("href", '#downLoad');
					// }
				}
			});
		},
		getCode: function() {
			$("#code-img").attr("src", "/platform/gen-vcode?vtype=1&vkey=" + timestamp)
		},
		toValidate: function (){
			$(".error_tip").fadeOut();
			var val = new validate({
				rules:{
					industry: "notEmpty",
					company_name: "notEmpty",
					user_name:"notEmpty",
					phone:"mobile",
					mail:"email",
					code: "notEmpty"
				},
				submitFun:function(){
					$("#submit").prop('disabled', true).text("申请中...");
					$.ajax({
						type: 'post',
						url: '/platform/merchant/apply',
						data: {
							companyName: $("#company_name").val(),
							industryType: $("#industry").val(),
							contactName: $("#user_name").val(),
							telephone: $("#phone").val(),
							vkey: timestamp,
							vcode: $("#code").val(),
							vtype: 1,
							mailBox: $("#mail").val()
						},
						dataType: 'json',
						success: function(data) {
							if(data.retCode == 1) {
								$("#submit").text("已申请");
								swal({
									title: "恭喜您，申请成功！",
									text: "请保持电话畅通，我们工作人员将尽快与您联系",
									type: "success",
									showCancelButton: false,
									confirmButtonText: "确定",
									closeOnConfirm: false
								});
								$('#myModalLabel').html("");

							}else {
								$("#submit").prop('disabled', false).text("提交");
								timestamp = new Date().getTime();
								self.getCode();
								$(".error_tip").fadeIn().text("* " + data.retMsg);
							}
						}
					})
				}
			})
		},

		toSubmit: function (){


		}

	}

	gxbIndex.init()


	particlesJS('particles-js', {
		particles: {
			color: '#92f5f8',
			shape: 'circle',
			// "circle", "edge" or "triangle"
			opacity: .4,
			size: 4,
			size_random: true,
			nb: 200,
			line_linked: {
				enable_auto: true,
				distance: 100,
				color: '#256b59',
				opacity: 0.6,
				width: 1,
				condensed_mode: {
					enable: false,
					rotateX: 600,
					rotateY: 600
				}
			},
			anim: {
				enable: true,
				speed: 1
			}
		},
		interactivity: {
			enable: true,
			mouse: {
				distance: 300
			},
			detect_on: 'canvas',
			// "canvas" or "window"
			mode: 'grab',
			line_linked: {
				opacity: .5
			},
			events: {
				onclick: {
					enable: true,
					mode: 'push',
					// "push" or "remove"
					nb: 4
				}
			}
		},
		/* Retina Display Support */
		retina_detect: true
	});

	//Scroll Menu
	$(window).on('scroll', function(){
		if( $(window).scrollTop() > 0 ){
			$('.main-nav').addClass('navbar-fixed-top');
		} else {
			$('.main-nav').removeClass('navbar-fixed-top');
		}
	});

	// Navigation Scroll
	$(window).scroll(function(event) {
		Scroll();
	});

	$('.navbar-collapse ul li a').on('click', function() {
		$('html, body').animate({scrollTop: $(this.hash).offset().top -99}, 500);
		return false;
	});

	// User define function
	function Scroll() {
		var contentTop      =   [];
		var contentBottom   =   [];
		var winTop      =   $(window).scrollTop();
		var rangeTop    =   20;
		var rangeBottom =   10;
		$('.navbar-collapse').find('.scroll a').each(function(){
			contentTop.push( $($(this).attr('href')).offset().top);
			contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height());
		})
		$.each( contentTop, function(i){
			if ( winTop + 99 > contentTop[i] - rangeTop ){
				$('.navbar-collapse li.scroll')
					.removeClass('active')
					.eq(i).addClass('active');
			}
		})
	};


	$('.container .col-sm-4').on('click', function(event) {
		event.preventDefault();
		$("#tem-content-text").text($(this).data('info')).css('background' , $(this).data('color'))
	})


});

