jQuery(document).ready(function($) {
	
	// Header slider
	var mrg = -100;

	function setML(mrg_) {
		$('header .header__slider .slider__tape').css({
			'margin-left': mrg_+'%'
		});
	}
	setML(mrg);

	$('header .header__slider .slider__ctrl .slider__ctrl_to_slide button.left').click(function(event) {
		mrg += 100;
		
		if (mrg > 0) {
			mrg = -200;
			setML(mrg);
		} else {
			setML(mrg);
		}
	});

	$('header .header__slider .slider__ctrl .slider__ctrl_to_slide button.right').click(function(event) {
		mrg -= 100;

		if (mrg < -200) {
			mrg = 0;
			setML(mrg);
		} else {
			setML(mrg);
		}
	});

	// Nav effx

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
	}

	// Article__clients slider
	var mrg = -100;

	function setML(mrg_) {
		$('article section.clients .clients__slider .slider__tape').css({
			'margin-left': mrg_+'%'
		});
	}
	setML(mrg);

	$('article section.clients .clients__slider .slider__controls button.left').click(function(event) {
		mrg += 100;
		
		if (mrg > 0) {
			mrg = -200;
			setML(mrg);
		} else {
			setML(mrg);
		}
	});

	$('article section.clients .clients__slider .slider__controls button.right').click(function(event) {
		mrg -= 100;

		if (mrg < -200) {
			mrg = 0;
			setML(mrg);
		} else {
			setML(mrg);
		}
	});
});