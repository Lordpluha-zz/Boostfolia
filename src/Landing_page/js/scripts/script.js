jQuery(document).ready(function($) {
	
	// console.clear();

	// Content upploading effect
	var AnimItems = $('._anim-elem');

	function offset(el) {
		var rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft};
	}

	function animOnScroll () {
		for (var index = 0; index < AnimItems.length; index++) {
			var AnimItem = AnimItems[index];
			var AnimItemHeight = AnimItem.offsetHeight;
			var AnimItemOffset = offset(AnimItem).top;
			var animStart = 4;

			var animItemPoint = window.innerHeight - AnimItemHeight / animStart;
			if (AnimItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((window.pageYOffset > AnimItemOffset - animItemPoint) && window.pageYOffset < (AnimItemOffset + AnimItemHeight)) {
				AnimItem.classList.add('_active__fx');
			}
		}
	}

	$(window).scroll(animOnScroll);

	setTimeout(animOnScroll, 300);

	// Navigation
	$('nav #content button.nav__burger').click(function(event) {

		if (event.object.hasClass('active')) {
			event.object.removeClass('active');
			event.object.addClass('passive');
		} else {
			event.object.removeClass('passive');
			event.object.addClass('active');
		}

		// $('nav #content button.nav__burger, nav .nav__burger-nav').removeClass('passive');
		// $('nav #content button.nav__burger, nav .nav__burger-nav').addClass('active');
	});

	// $('nav #content button.nav__burger.active').click(function(event) {
	// 	$('nav #content button.nav__burger, nav .nav__burger-nav').removeClass('active');
	// 	$('nav #content button.nav__burger, nav .nav__burger-nav').addClass('passive');
	// });


	// Header slider
	var mrg1 = -100;

	function setML1(mrg_) {
		$('header .header__slider .slider__tape').css({
			'margin-left': mrg_+'%'
		});
	}
	setML1(mrg1);

	$('header .header__slider .slider__ctrl .slider__ctrl_to_slide button.left').click(function() {
		mrg1 += 100;
		
		if (mrg1 > 0) {
			mrg1 = -200;
			setML1(mrg1);
		} else {
			setML1(mrg1);
		}
	});

	$('header .header__slider .slider__ctrl .slider__ctrl_to_slide button.right').click(function() {
		mrg1 -= 100;

		if (mrg1 < -200) {
			mrg1 = 0;
			setML1(mrg1);
		} else {
			setML1(mrg1);
		}
	});

	// Nav fx
	window.onscroll = function scrollFunction() {
		if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
			$('nav #content').css({
				'padding': '10px 30px'
			});
		} else {
			$('nav #content').css({
				'padding': '30px'
			});
		}
	};

	console.log($('section.our_works #content .our_works__nav button'));

	// Article__our_works slider
	for (var i = 1; i <= $('section.our_works #content .our_works__nav button').length; i++) {
		$(`section.our_works #content .our_works__nav button.l${i}`).click(
			function() {
				$('section.our_works #content .our_works__nav button.active').removeClass('active');
				$(`section.our_works #content .our_works__nav button.l${i}`).addClass('active');
				
				$('section.our_works .our_works__slider .layer.active').removeClass('active');
				$(`section.our_works .our_works__slider .layer${i}`).addClass('active');
			}
		);
	}


	// Article__clients slider
	var mrg2 = -100;

	function setML2(mrg_) {
		$('article section.clients .clients__slider .slider__tape').css({
			'margin-left': mrg_+'%'
		});
	}
	setML2(mrg2);

	$('article section.clients .clients__slider .slider__controls button.left').click(function() {
		mrg2 += 100;
		
		if (mrg2 > 0) {
			mrg2 = -200;
			setML2(mrg2);
		} else {
			setML2(mrg2);
		}
	});
.
	$('article section.clients .clients__slider .slider__controls button.right').click(function() {
		mrg2 -= 100;

		if (mrg2 < -200) {
			mrg2 = 0;
			setML2(mrg2);
		} else {
			setML2(mrg2);
		}
	});



	// Article.Members

	var slides = $('article .who_we_are #content .members_and_skills .members_and_skills__skills .skills__slider_tape').children('skills__member_skills');
	console.log('Привет Владос');
	console.log(slides);

	// for (var a = 1; a <= slides.lenght; a++) {
	// 	var skills_bar_legends = $(`article .who_we_are #content .members_and_skills .members_and_skills__skills .skills__slider_tape .skills__member_skills:nth-child(${a}) .member_skills__skills_bar`).children(`.legend`);
		
	// 	for (var b = 1; b <= skills_bar_legends.lenght; b++) {
	// 		var value = $(`article .who_we_are #content .members_and_skills .members_and_skills__skills .skills__slider_tape .skills__member_skills:nth-child(${a}) .member_skills__skills_bar`).children(`progress.progress.str${b}`).value;
			
	// 		$(`article .who_we_are #content .members_and_skills .members_and_skills__skills .skills__slider_tape .skills__member_skills:nth-child(${a}) .member_skills__skills_bar`).children(`p.skills_bar__perc_value.str${b}`).text(value+'%');
	// 	}
		
	// }
});