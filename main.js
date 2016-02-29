
		$('.close').on('click', function(){
			$('.open').toggle();
			$('.close').toggle(); 			
			$('nav > ul').css("display", "none"); 
		})
	
		$('.open').on('click', function(){			
			$('.close').toggle(); 
			$('.open').toggle();
			$('nav > ul').css("display", "flex"); 
		})

		$('nav > ul').on('click', function(){
			$(this).toggle();
			$('.open').toggle(); 
			$('.close').toggle(); 
		})

// var yoyo_tween = TweenMax.to('#yoyo-animation', 1, {
// 	transform: 'scale(2)',
// 	ease: Cubic.easeOut,
// 	repeat: -1,
// 	yoyo: true
// }); 

// var controller = new ScrollMagic.Controller(); 

// var scene1 = new ScrollMagic.Scene({
//   triggerElement: "#pinned-trigger1", // point of execution
//   duration: $(window).height() - 100, // pin element for the window height - 1
//   triggerHook: 0, // don't trigger until #pinned-trigger1 hits the top of the viewport
//   reverse: true // allows the effect to trigger when scrolled in the reverse direction
// })
// .setPin("#pinned-element1") // the element we want to pin


// var fadein_tween = TweenMax.to('#fadein-trigger > div', .375, {
// 	opacity: 1
// });

// var fadein_scene = new ScrollMagic.Scene({
//   triggerElement: '#fadein-trigger',
//   reverse: true,
//   duration: "50%"
// })
// .setTween(fadein_tween)


// var yoyo_scene = new ScrollMagic.Scene({
// 	triggerElement: '#yoyo-trigger'
// })
// .setTween(yoyo_tween); 

// controller.addScene([
// 	yoyo_scene,
// 	scene1,
// 	fadein_scene
// ]); 

