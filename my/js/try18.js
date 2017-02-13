//绑定事件
function addEvent(ele,event,handler){
	if(ele.addEventListener){
		ele.addEventListener(event,handler,false);
	}
}
window.onload = function() {
	var buttonList = document.getElementsByTagName("input");
	var container = document.getElementById("container");
	var str;
	var queue = {
			
			leftPush: function(value){
				this.str.unshift(value);
				this.
			},
			rightPush: function(value){
				this.str.pop(value);
			},
			leftPop: function(){
				
			},
			rightPop: function(){
				
			},			
	}
	addEvent(buttonList[1],click,function(){
		var value = buttonList[0].value;
		if(!value.match(/^[0-9]+$/)){
			alert("请输入中文");
		}else{
			queue.leftPush(value);
		}
		
	});
	addEvent(buttonList[1],click,function(){
		var value = buttonList[0].value;
		if(!value.match(/^[0-9]+$/)){
			alert("请输入中文");
		}else{
			queue.rightPush(value);
		}
		
	});	
	addEvent(buttonList[3], "click", function(){queue.leftPop()});
    addEvent(buttonList[4], "click", function(){queue.rightPop()});
}