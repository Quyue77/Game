$(function() {
	var play = $(".play");
	var stop = $(".stop");
	var mute = $(".mute");
	var music = $(".music");
	var eva = $("#eva");
	var evb = $("#evb");
	var evc = $("#evc");
	var tool = $("#tool div");
	var p = $(".header p");
	var pig = $("#pighead");
	var gameTime;
	var keys = 39;
	var zte = 1;
	var booleans = false;
	//gameTime函数
	function gameMian() {
		//获取随机数
		var LeftRandom = Math.floor(Math.random() * (925 + 1));
		var TopRandom = Math.floor(Math.random() * (525 + 1));
		//获取偏移属性
		var positions = pig.position();
		//获取猪头的left
		var left = positions.left;
		//获取猪头的top
		var top = positions.top;
		//移动猪头
		if(keys == 39) {
			var Newleft = left + zte;
			pig.css({
				left: Newleft + "px"
			});
		} else if(keys == 37) {
			var Newleft = left - zte;
			pig.css({
				left: Newleft + "px"
			});

		} else if(keys == 40) {
			var Newtop = top + zte;
			pig.css({
				top: Newtop + "px"
			});

		} else if(keys == 38) {
			var Newtop = top - zte;
			pig.css({
				top: Newtop + "px"
			});
		}
		//边界判断
		if(left + pig.width() / 2 < 0 || left + pig.width() / 2 > 950 || top + pig.height() / 2 < 0 || top+pig.height()/2 > 550) {
			//音效
			evc.get(0).play();
			//清理定时器停止游戏
			clearInterval(gameTime);
			//弹出结束
			alert("你失去了爱");
			//重置贪吃猪位置
			pig.css({
				left: LeftRandom + "px",
				top: TopRandom + "px"
			});
			$("#xin").css({
				left: "450px",
				top: "300px"
			})
			//重置贪吃猪大小
			pig.width(25);
			pig.height(25);
			//play样式初始化
			zte = 1;
			p.text(0);
		}
		//猪头移动速度递增
		zte = zte * 1.0001;
		//猪头移动速度顶峰
		if(zte > 7) {
			zte == 7;
		};
		//爱心被碰撞时改变位置
		if(booleans) {
			$("#xin").css({
				left: LeftRandom + "px",
				top: TopRandom + "px"
			});
			//音效
			evb.get(0).play();
			//停止位置变化
			booleans = false;
			//分数加一
			p.text(p.text() * 1 + 1);
			//猪头变大
			pig.width(pig.width() * 1.1);
			pig.height(pig.height() * 1.1);

		}
		//进食判定
		var xin = $("#xin").position();
		if(left + pig.width() / 2 > xin.left - 10 && left + pig.width() / 2 < xin.left + 10) {
			if(top + pig.height() / 2 > xin.top - 10 && top + pig.height() / 2 < xin.top + 10) {
				booleans = true;
			};
		};
	};
	//控制按钮点击后样式
	tool.click(function() {
		$(this).toggleClass("btnclick").siblings($(this).index()).removeClass("btnclick");
	});
	//静音按钮
	mute.click(function() {
		eva.get(0).pause();
	});
	//音乐按钮
	music.click(function() {
		eva.get(0).play();
	});
	//键盘点击事件
	window.onkeydown = function(e) {
		var eve = window.event || e;
		var Code = eve.keyCode;
		if(Code == 37 || Code == 38 || Code == 39 || Code == 40) {
			keys = eve.keyCode;
		}
	};
	//开始按钮
	play.click(function() {
		//清理gameTime定时器
		clearInterval(gameTime);
		//设置定时器
		gameTime = setInterval(gameMian, 10);
	});
	//暂停按钮
	stop.click(function() {
		//清理定时器
		clearInterval(gameTime);
	});
});