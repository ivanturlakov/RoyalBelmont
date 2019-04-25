$(document).ready(function () {
	
	
	var s = skrollr.init();

	
	//Chat
	var chatToggle = $(".chat-toggle");
	chatToggle.click(function(){
		$(".chat-overlay").fadeToggle("fast");
		return false;
	});
	
	//Chat - Email
	var emailToggle = $(".email-toggle");
	emailToggle.click(function(){
		$(".email-box").fadeToggle("fast");
		return false;
	});
	
	//Menu Magic Line
	var $el, leftPos, newWidth,
        $mainNav = $(".top-nav");
    
    $mainNav.append("<div id='magic-line'></div>");
    var $magicLine = $("#magic-line");
    

    
    $magicLine
        .width($(".nav-active").width())
        .css("left", $(".nav-active > a").position().left)
        .data("origLeft", $magicLine.position().left)
        .data("origWidth", $magicLine.width());
        
    $(".top-nav > li > a").hover(function() {
        $el = $(this);
        leftPos = $el.position().left;
        newWidth = $el.parent().width();
        $magicLine.stop().animate({
            left: leftPos,
            width: newWidth
        });
        
        
    }, function() {
        $magicLine.stop().animate({
            left: $magicLine.data("origLeft"),
            width: $magicLine.data("origWidth")
        });    
    });

        
    
    $('.top-nav > li:not(".nav-active")').hover(
        function(){ $('#magic-line').addClass('hover'); },
       function(){ $('#magic-line').removeClass('hover'); }
    );
	
	
	//Scroll To Top
	$('.scroll-top').click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});
	
	

      

		


});