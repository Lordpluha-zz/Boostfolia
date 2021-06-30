jQuery(document).ready(function($) {
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
});