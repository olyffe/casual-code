var speed = 1000; // +1S

// 查找元素
$ = function(ele) {
    return document.querySelector(ele);
}
// 兼容的事件方法
function addEvent(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent('on' + event, hanlder);
    } else {
        ele['on' + event] = hanlder;
    }
}
function visitTreeNode(node) {
	node.style.backgroundColor = 'grey';
	setTimeout(function(){
		node.style.backgroundColor = '#fff';
	},speed);
	
}

function getFnTraverse(value) {
    var stack = [];
    var func;
    if (value === '0') {
    	func = function fn(root){
        	if(!root) return;
        	stack.push(function(){
            	visitTreeNode(root);
        	});
        	fn(root.firstElementChild);
        	fn(root.lastElementChild);
    	}

    } else if (value === '1') {
    } else if (value === '2') {
    }
    return function(root) {
    	
    }
}
window.onload = function() {
	addEvent($('#btnStart'), 'click', function(e) {
	    var select = $('#selectMode');
	    var value = select[select.selectedIndex].value;
	    getFnTraverse(value)($('#tree'));
	});
}