
var scPos; //브라우저 스크롤 위치 변수
var lightningSt //lightnig event
var winW = $(window).width();
var winH = $(window).height();

$("body").css("width",winW);

$(function(){
	scrollFunc();
	init();
	gogo();
	topBtn();
	boneHand();
	dDayCounter();
	pumpkinLight();

	//console.log(winH);
	//console.log($(document).height());

	$(window).resize(function(){
		winW = $(window).width();
		winH = $(window).height();
	});

	$("#nav>li").click(function(){
		var ind = $(this).index();

		$("#nav>li").removeClass("on");
		$(this).addClass("on");
		if(ind == 0){
			$(".navigator").css({marginLeft:-250,width:200});
			$(".line_up").animate({opacity:0},function(){
				$(".line_up").css("display","none");
				$(".halloween_is").css("display","block");
				$(".halloween_is").stop().animate({opacity:1});
			})
		}else{
			$(".navigator").css({marginLeft:90,width:120});
			$(".halloween_is").animate({opacity:0},function(){
				$(".halloween_is").css("display","none");
				$(".line_up").css("display","block");
				$(".line_up").stop().animate({opacity:1});
			})
		};
	})

	findOn();

	$(document).on("click",'.next',function(){
		var ulPos = $("div.line_up>div:nth-of-type(1)>ul");
		var firstLi = ulPos.find("li").eq(0).html();
		var name = $(this).find("img").attr("alt");
		$(".line_up>div:nth-of-type(2)>div").css("display","none");
		$(".line_up>div:nth-of-type(2)").find("."+name).css("display","block");

		ulPos.find("li").removeClass();
		$(this).addClass("on");
		
		ulPos.stop().animate({left: -480},function(){
			ulPos.append("<li>" + firstLi +"</li>");
			ulPos.find("li").eq(0).remove();
			ulPos.css("left",-240);

			findOn();
		});		
	});

	$(document).on("click",'.prev',function(){
		var ulPos = $("div.line_up>div:nth-of-type(1)>ul");
		var lastLi = ulPos.find("li").eq(ulPos.find("li").length - 1).html();
		var name = $(this).find("img").attr("alt");
		$(".line_up>div:nth-of-type(2)>div").css("display","none");
		$(".line_up>div:nth-of-type(2)").find("."+name).css("display","block");
		

		ulPos.find("li").removeClass();
		$(this).addClass("on");

		ulPos.stop().animate({left: 0},function(){
			ulPos.prepend("<li>" + lastLi +"</li>");
			ulPos.find("li").eq(ulPos.find("li").length - 1).remove();
			ulPos.css("left",-240);

			findOn();
		});				
	});

	$(document).mousemove(function(e){
		var x = e.clientX * 100 / $(window).width() + "%";
		var y = e.clientY * 100 / $(window).height() + "%";
		
		//console.log(x);
		//console.log(y);

		for(var i=0; i<2; i++){
			$(".ball").eq(i).css("left","calc("+ x +" + 25%)");
			$(".ball").eq(i).css("top",y);
			$(".ball").eq(i).css("transform","translate(-"+x+",-"+y+")");
		}
		$(".ball").eq(2).css("left","calc("+ x +" - 18%)");
		$(".ball").eq(2).css("top",y);
		$(".ball").eq(2).css("transform","translate(-"+x+",-"+y+")");
	});
});

function gogo(){
	$("#btn").click(function(){
		$(".witch").animate({
			"right":"100%",
			"bottom":"35%",
			"width":"7%"
		},4200, function(){
			$(".witch").css({width:"10%", bottom:"25%", right:"0%"})
		});
	})
}


var scrollFunc = function(){
	$(window).scroll(function(){
		scPos = window.pageYOffset;
		
		//console.log(scPos);

		var pumpkin = $(".pumpkin_fixed").offset().top; // 고정호박 offset Top
		// var topBtn =  $("#top_btn").offset().top;

		if(scPos < 100){ // skeleton scroll 애니메이션 fade in&out
			$("#mouse_wheel").stop().fadeIn(200);
		}else{
			$("#mouse_wheel").stop().fadeOut(200);
		};

		if(scPos >= 120) bleed(); // halloween 피 흐르는 애니메이션
				
		if(scPos <= winH*2){	// top ---> main_section 까지의 배경 변화 함수 
			$(".top_section").css({opacity : scPos / (winH*2)});
		}else{
			$(".top_section").css({opacity : 1})
		};

		if(scPos < 400){ //  400 < scPos <= 600 사이에서 lightning 실행
			clearInterval(lightningSt);
		}else if(scPos <= 600){
			clearInterval(lightningSt);
			lightning();
		};

		if(scPos >= winH*1.5) handShow();
		if(scPos <= winH*1.7) bgMove();
		if(scPos >= winH*3.34){
			var docH = $(document).height();
			var spiderB = (scPos - winH*3.34) / ((docH - winH*4.34)/50);
			$("#top_btn").css("bottom",50 - spiderB +"%");

			if(scPos == docH - winH) $("#top_btn>div").stop().animate({opacity:1});
			if(scPos < docH - winH) $("#top_btn>div").stop().animate({opacity:0});
		}
	});
}
function findOn(){
	var liOn = $(".line_up>div:nth-of-type(1)>ul").find(".on");
	liOn.prev().addClass("prev");
	liOn.next().addClass("next");
}

function bgMove(){
	var moveX = (scPos - winH * 1.5) / ((winH / 2)/ 15);
	//console.log(moveX); 
	$('#bg_images>div:nth-of-type(1)').css({left:moveX - 5 + "%"});	
	$('#bg_images>div:nth-of-type(2)').css({right:moveX - 5 + "%"});
}

function topBtn(){ // pumpkin head Topbutton 이벤트
	$("#top_btn").click(function(e){
		e.preventDefault();
		$("html,body").animate({scrollTop : winH*2},1200,"easeOutCubic");
	});
}
function init(){ // hello -> halloween 변화 애니메이션
	$(".hello_e").animate({opacity:1},800,"easeInElastic",function(){
		$("h1#e").addClass("on");
	});				
	$(".ween").delay(2000).animate({opacity:1},1000,"easeInSine")
};
function bleed(){ // halloween 피 흐르는 애니메이션
	$(".drop01").animate({marginTop:0},3200);
	$(".drop02").animate({marginTop:0},2000);
	$(".drop03").animate({marginTop:0},1600);
	$(".drop04").animate({marginTop:-7},1000);
	$(".drop05").animate({marginTop:-5},1900);
	$(".drop06").animate({marginTop:2},2000);
	$(".drop07").animate({marginTop:2},3500);
};
function handShow(){ // zombie hand 출현 애니메이션
	$(".hand").animate({bottom:"58%",left:"31%"},2000,"easeInElastic",
		function(){
			$(".hand").addClass("active");
	})
	$(".hand02").delay(700).animate({bottom:"59%",left:"11%"},1800,"easeInElastic",
		function(){
			$(".hand02").addClass("active");
	})
}
function boneHand(){ // skeleton scroll 애니메이션
	$("#mouse_wheel").delay(500).animate({opacity:1},600);
}

//---------------------- 181023 추가된사항 ----------------------

function lightning(){	
	var light = $("#lightning");
	lightningSt = setInterval( function(){
		light.animate({opacity:1},800,"easeOutBounce");
		light.animate({opacity:0},300,"easeOutCubic");
		light.delay(1200).animate({opacity:1},500,"easeOutQuint");
		light.animate({opacity:0},400);
	},6000)
}

function pumpkinLight(){
	setInterval(function(){
		$(".pumpkin_fixed>div").animate({opacity:1},1000,"easeOutBounce");
		$(".pumpkin_fixed>div").animate({opacity:0},1000);
	},2000)
}

//----------------------------------------------------------------------------
//---------------------------- D-day counter start----------------------------
//----------------------------------------------------------------------------

function dDayCounter(){
	var year = 2018;   //디데이 초기 년도값
	var halloweenDay = new Date("oct 31,"+year).getTime(); //매년 할료윈데이 날짜값
	var dDay,hTimer,mTimer,sTimer,timer,day; // 			

	setInterval(function(){
		var today = new Date().getTime();
		var occasion = halloweenDay - today;

		if(occasion > 0){

			dDay = Math.floor(occasion/(1000*60*60*24));
			hTimer = Math.floor((occasion/(1000*60*60))%24);
			mTimer = Math.floor((occasion/(1000*60))%60);
			sTimer = Math.floor((occasion/1000)%60);

			if(hTimer < 10) hTimer = "0" + hTimer;
			if(mTimer < 10) mTimer = "0" + mTimer;
			if(sTimer < 10) sTimer = "0" + sTimer;

			timer = hTimer + ":" + mTimer + ":" + sTimer;
			day = "D-" + dDay;

		}else if(occasion > -86400000){

			day = "D-Day";			
			timer = "It's coming";

		}else{
			year++;						
			halloweenDay = new Date("oct 31,"+year).getTime();
			occasion = halloweenDay - today;
			dDay = Math.floor(occasion/(1000*60*60*24));
			hTimer = Math.floor((occasion/(1000*60*60))%24);
			mTimer = Math.floor((occasion/(1000*60))%60);
			sTimer = Math.floor((occasion/1000)%60);

			if(hTimer < 10) hTimer = "0" + hTimer;
			if(mTimer < 10) mTimer = "0" + mTimer;
			if(sTimer < 10) sTimer = "0" + sTimer;

			timer = hTimer + ":" + mTimer + ":" + sTimer;
			day = "D-" + dDay;
		}
		document.getElementById("date").innerHTML = day;
		document.getElementById("timer").innerHTML = timer;
	},500);
};
//----------------------------------------------------------------------------
//----------------------------- D-day counter end-----------------------------
//----------------------------------------------------------------------------