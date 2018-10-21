
var scPos; //브라우저 스크롤 위치 변수


var scrollFunc = function(){
	$(window).scroll(function(){
		scPos = window.pageYOffset;
		var bgTop01 = $("#bg01").offset().top; // 백그라운드 이미지1 오프셋 탑
		var bgTop02 = $("#bg02").offset().top; // 백그라운드 이미지2 오프셋 탑

		console.log(scPos > bgTop01 -800);
		console.log(scPos > bgTop02 -800);
		//console.log(scPos);
		
		if(scPos >= 120) bleed();
		
		if(scPos >= 700){
			topBtnShow();
		}else{
			topBtnHide();
		};

		if(scPos <= 1000){
			$(".main_section").css({opacity : scPos / 1000});
		}else{
			$(".main_section").css({opacity : 1})
		};

		if(scPos >= bgTop01 -800){
			$("#bg01").animate({bottom:0},2000);
			handShow();
		}
		if(scPos >= bgTop02 -800){
			$("#bg02").animate({bottom:0},2500);
		}		
	});
}

var topBtnShow = function(){
	$("#top_btn").css({opacity:1});
}
var topBtnHide = function(){
	$("#top_btn").css({opacity:0});
}

var topBtn = function(){
	$("#top_btn").click(function(e){
		e.preventDefault();
		$("html,body").animate({scrollTop : 0},1200,"easeOutCubic");
	});
}

var init = function(){
	$(".hello_e").animate({opacity:1},800,"easeInElastic",function(){
		$("h1#e").addClass("on");
	});				
	$(".ween").delay(2000).animate({opacity:1},1000,"easeInSine")
};

var bleed = function(){
	$(".drop01").animate({marginTop:0},3200);
	$(".drop02").animate({marginTop:0},2000);
	$(".drop03").animate({marginTop:0},1600);
	$(".drop04").animate({marginTop:-7},1000);
	$(".drop05").animate({marginTop:-5},1900);
	$(".drop06").animate({marginTop:2},2000);
	$(".drop07").animate({marginTop:2},3500);
};


var handShow = function(){
	$(".hand").delay(800).animate({
			top:"140px",
			left:"400px"
		},1600,"easeInElastic", function(){
			$(".hand").addClass("active");
	})
}
