//获取元素对象
 function g(clsname){
	return document.getElementsByClassName(clsname);
}

function m(id){
	return document.getElementById(id);
}

// 自动居中-登录浮层(el = element)
function autoCenter(el){
	var bodyW = document.documentElement.clientWidth;
	var bodyH = document.documentElement.clientHeight;

	var elW = el.offsetWidth;
	var elH = el.offsetheight;

	el.style.left = (bodyW - elW) / 2 + 'px';
	el.style.top = (bodyH - elH) / 2 + 'px';
}

// 自动全屏-遮罩层
function fillToBody(el){
	el.style.width = document.documentElement.clientWidth + 'px';
	el.style.height = document.documentElement.clientHeight + 'px';
}


//状态选择栏出现和隐藏
var index = 1;
var x, y;
m('trigger').onclick = function(event){
	var k = g('stateselect')[0].style.display;
	event.stopPropagation();
	x = index++;
	y = x % 2;
	console.log(x, y)
	g('stateselect')[0].style.display = 'block';
	if (y==0 ) {
	g('stateselect')[0].style.display = 'none';
	}

}

document.onclick = function(){
	g('stateselect')[0].style.display = 'none';
}

//窗口随鼠标随意拖放

var mouseOffsetX = 0;  //偏移
var mouseOffsetY = 0;

var isDraging = false;

//鼠标事件1 - 在标题栏上按下（要计算鼠标相对拖拽元素的左上角的坐标，并且标记元素为可拖动）
m('login').addEventListener('mousedown',function(e){
	var e = e || window.event;
	mouseOffsetX = e.clientX - m('login').offsetLeft;
	mouseOffsetY = e.clientY - m('login').offsetTop;
	isDraging = true;
},false)

//鼠标事件2 - 鼠标移动时（检测元素是否可被标记为可拖动，如果是，则更新元素位置，到当前鼠标的位置【ps：要减去第一步中获得偏移】）
document.onmouseover = function(e){
	var e = e || window.event;

	var mouseX = e.clientX   //鼠标的当前位置
	var mouseY = e.clientY

	var moveX = 0;           //浮层的新位置
	var moveY = 0;

	if ( isDraging === true){
		moveX = mouseX - mouseOffsetX;
		moveY = mouseY - mouseOffsetY;

		//范围限定， moveX > 0并且moveX < (页面最大宽度 - 浮层的宽度)
		//           moveY > 0    moveY < （页面最大高度 - 浮层的高度）

		var maxW = document.documentElement.clientWidth - m('login').offsetWidth;
		var maxH = document.documentElement.clientHeight - m('login').offsetHeight;

		moveX = Math.min( maxW, Math.max(0, moveX));
		moveY = Math.min( maxH, Math.max(0, moveY));


		m('login').style.left = moveX + 'px';
		m('login').style.top = moveY + 'px';
	}
	
}

//鼠标事件3 - 鼠标松开时候（标记元素为不可拖动即可）
document.onmouseup = function(){
	isDraging = false;
}

//关闭登录界面
function hideLogin(){
	m('login').style.display = 'none';
}


