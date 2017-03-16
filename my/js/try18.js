//绑定事件
function addEvent(ele,event,handler){
	if(ele.addEventListener){
		ele.addEventListener(event,handler,false);
	}else if(ele.attachEvent) {
		ele.attachEvent("on"+event,handler);
	}else {
		ele["on"+event] = handler;
	}
}
//手写each
function each(arr,index) {

}
(function() {
	var num = document.getElementById("num-input");
	var buttonList = document.getElementsByTagName("button");
	var container = document.getElementById("container");
	var queue = {
			str:[],
			leftPush: function(value){
				this.str.unshift(value);
				this.paint();
			},
			rightPush: function(value){
				this.str.push(value);
				this.paint();
			},
			leftPop: function(value){
				this.str.shift(value);
				this.paint();
			},
			rightPop: function(value){
				this.str.pop(value);
				this.paint();
			},
			paint: function () {
				var _html = "";
				var _html = this.str.map(function (item,index,array) {
					return item = '<div class="inDiv" style="height: ' + item*30 + '">' + item +'</div>';
				});
				container.innerHTML = _html.join("");
			}
	}
	addEvent(buttonList[0],'click',function(){
		var value = num.value;
		if(!value.match(/^[0-9]+$/)){
			alert("请输入数字");
		}else{
			queue.leftPush(value);
		}
		
	});
	addEvent(buttonList[1],'click',function(){
		var value = num.value;
		if(!value.match(/^[0-9]+$/)){
			alert("请输入数组");
		}else{
			queue.rightPush(value);
		}

	});
	addEvent(buttonList[2], "click", function(){queue.leftPop()});
	addEvent(buttonList[3], "click", function(){queue.rightPop()});
})();