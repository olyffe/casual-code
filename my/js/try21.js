(function(){
	var tgQue = [];
	
	$('#tagInput').keyup(function(event){
		var tags = $('#tagInput').val();
		var zz = /[,，;；、\s\n]+/;
		if(event.keyCode === 13 || zz.test(tags) ){
			
			var tagTemp = spiltInput(trim(tags));
			var tagIn = tagTemp[0];
			if(tagIn.length){
				if(tgQue.indexOf(tagIn) == -1){
					tgQue.push(tagIn);
					if(tgQue.length>=10){
						tgQue.shift();
					}					
				}
			}else{
				return;
			}
			render(tgQue);

			$('#tagInput').val('');
		}
	});

function render(que){
	
	var tagShow = que.map(function(item){
		return '<div class="item">' + item + '</div>';
	});
	$('.item').click(function(event){
		console.log('1');
		
	});	
	$('.text-center').html(tagShow.join(""));	
}
function trim(str){
	var regx1 = /^\s*/;
	var regx2 = /\s*$/;
	return (str.replace(regx1,'')).replace(regx2,'');
}	
function spiltInput(text){
	var zz1 = /[,，;；、\s\n]+/;
	return text.split(zz1);
}



})()