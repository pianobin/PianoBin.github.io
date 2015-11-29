/// Scroll fade in when 100px from the top 
$(window).scroll(function() {
  if ($(this).scrollTop()> 100) {
    $('.scrolltop').fadeIn();
   } else {
    $('.scrolltop').fadeOut();
   }
});

$(function(){
	
	$('a[href^="#"]').click(function(e){
		
		var target = $(this).attr('href');
		var strip = target.slice(1);
		var anchor = $("a[name='" + strip +"']");
		
		
		e.preventDefault();
		
		$('html, body').animate({
			
			scrollTop: anchor.offset().top
			
		}, 'slow');
	});
});