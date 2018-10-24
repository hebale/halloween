
var scPos; //브라우저 스크롤 위치 변수

var scrollFunc = function(){
	$(window).scroll(function(){
		scPos = window.pageYOffset;
		var bgTop01 = $("#bg01").offset().top; // 백그라운드 이미지1 오프셋 탑
		var bgTop02 = $("#bg02").offset().top; // 백그라운드 이미지2 오프셋 탑
		var pumpkin = $(".pumpkin_fixed").offset().top; // 고정호박 오프셋 탑
		var topBtn =  $("#top_btn").offset().top;

		//console.log(pumpkin);
		//console.log(topBtn);

		if(pumpkin <= topBtn){
			showPumpkin();
		}else{
			hidePumpkin();
		}


		if(scPos == 0){
			$("#mouse_wheel").stop().fadeIn(200);
			//clearInterval(lightning());
		}

		if(scPos > 0){
			$("#mouse_wheel").stop().fadeOut(200);
			//lightning();
		}

		if(scPos >= 120) bleed();
				
		if(scPos <= 1000){
			$(".top_section").css({opacity : scPos / 1000});
		}else{
			$(".top_section").css({opacity : 1})
		};

		if(scPos >= bgTop01 - 800){
		// 	$("#bg01").animate({bottom:0},2000);
		 	handShow();
		}
		// if(scPos >= bgTop02 -800){
		// 	$("#bg02").animate({bottom:0},2500);
		// }		
	});
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
			top:"16%",
			left:"20%"
		},2000,"easeInElastic", function(){
			$(".hand").addClass("active");
	})
}

var boneHand = function(){
	$("#mouse_wheel").delay(3500).animate({opacity:1},800);
}

//-----------181023 추가된사항-----------

var lightning = function(){
	$(window).one("scroll",function(){
		var light = $("#lightning");

		if(scPos >= 0){
			setInterval( function(){
				light.animate({opacity:1},800,"easeOutBounce");
				light.animate({opacity:0},300,"easeOutCubic");
				light.delay(1200).animate({opacity:1},500,"easeOutQuint");
				light.animate({opacity:0},400);
			},7000)
		}
	});
}

var showPumpkin = function(){
	$(".pumpkin_fixed").stop().animate({opacity:0},100)
	$("#top_btn").stop().animate({opacity:1},100)
}

var hidePumpkin = function(){
	$(".pumpkin_fixed").stop().animate({opacity:1},100)
	$("#top_btn").stop().animate({opacity:0},100)
}

var pumpkinLight = function(){
	setInterval(function(){
		$(".pumpkin_fixed>div").animate({opacity:0.8},1000,"easeOutBounce");
		$(".pumpkin_fixed>div").animate({opacity:0},1000);
	},2000)
}

//---------------------------- D-day counter ----------------------------

var dDayCounter = function(){
	var year = 2018;   //디데이 초기 년도값
	var halloweenDay = new Date("oct 31,"+year).getTime();
	var dDay,hTimer,mTimer,sTimer,timer,day;			

	setInterval(function(){
		var today = new Date().getTime();
		var occasion = halloweenDay - today;
					
		if(occasion > 0){

			dDay = Math.floor(occasion/(1000*60*60*24));
			hTimer = Math.floor((occasion/(1000*60*60))%24);
			mTimer = Math.floor((occasion/(1000*60))%60);
			sTimer = Math.floor((occasion/1000)%60);

			timer = hTimer + ":" + mTimer + ":" + sTimer;
			day = "D - " + dDay;

		}else if(occasion > -86400000){

			day = "D - Day";			
			timer = "It's coming";

		}else{
			year++;
						
			halloweenDay = new Date("oct 31,"+year).getTime();
			occasion = halloweenDay - today;

			dDay = Math.floor(occasion/(1000*60*60*24));
			hTimer = Math.floor((occasion/(1000*60*60))%24);
			mTimer = Math.floor((occasion/(1000*60))%60);
			sTimer = Math.floor((occasion/1000)%60);
			
			timer = hTimer + ":" + mTimer + ":" + sTimer;
			day = "D - " + dDay;
		}

		document.getElementById("date").innerHTML = day;
		document.getElementById("timer").innerHTML = timer;

	},500);
};
