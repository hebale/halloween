
var scPos; //브라우저 스크롤 위치 변수
var lightningSt //lightnig event

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

		var bg01Top = $("#bg01").offset().top; // background image01 offset Top
		var bg02Top = $("#bg02").offset().top; // background image02 offset Top
		var pumpkin = $(".pumpkin_fixed").offset().top; // 고정호박 offset Top
		var topBtn =  $("#top_btn").offset().top;

		if(pumpkin <= topBtn){ // // pumpkin head Topbutton
			showPumpkin();
		}else{
			hidePumpkin();
		};

		if(scPos < 100){ // skeleton scroll 애니메이션 fade in&out
			$("#mouse_wheel").stop().fadeIn(200);
		}else{
			$("#mouse_wheel").stop().fadeOut(200);
		};

		if(scPos >= 120) bleed(); // halloween 피 흐르는 애니메이션
				
		if(scPos <= 1000){	// top ---> main_section 까지의 배경 변화 함수 
			$(".top_section").css({opacity : scPos / 1000});
		}else{
			$(".top_section").css({opacity : 1})
		};

		if(scPos < 400){ //  400 < scPos <= 600 사이에서 lightning 실행
			clearInterval(lightningSt);
		}else if(scPos <= 600){
			clearInterval(lightningSt);
			lightning();
		};

		if(scPos >= bg01Top - 600){
		 	handShow();
		};
	});
}
function topBtn(){ // pumpkin head Topbutton 이벤트
	$("#top_btn").click(function(e){
		e.preventDefault();
		$("html,body").animate({scrollTop : 0},1200,"easeOutCubic");
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
	$(".hand").delay(800).animate({
			top:"16%",
			left:"20%"
		},2000,"easeInElastic", function(){
			$(".hand").addClass("active");
	})
}
function boneHand(){ // skeleton scroll 애니메이션
	$("#mouse_wheel").delay(3500).animate({opacity:1},800);
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

function showPumpkin(){
	$(".pumpkin_fixed").stop().animate({opacity:0},100)
	$("#top_btn").stop().animate({opacity:1},100)
}

function hidePumpkin(){
	$(".pumpkin_fixed").stop().animate({opacity:1},100)
	$("#top_btn").stop().animate({opacity:0},100)
}

function pumpkinLight(){
	setInterval(function(){
		$(".pumpkin_fixed>div").animate({opacity:0.8},1000,"easeOutBounce");
		$(".pumpkin_fixed>div").animate({opacity:0},1000);
	},2000)
}


//---------------------------- D-day counter start----------------------------
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
//---------------------------- D-day counter end----------------------------
