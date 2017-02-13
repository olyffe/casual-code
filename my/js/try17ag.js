/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

var colors = ['#16324a', '#24385e', '#393f65', '#4e4a67', '#5a4563', '#b38e95',
              '#edae9e', '#c1b9c2', '#bec3cb', '#9ea7bb', '#99b4ce', '#d7f0f8'];


// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
	var innerHTML ='';
	var i = 0;
	var wrap = document.getElementById('aqi-chart-wrap');
	var data = chartData[pageState.nowGraTime][pageState.nowSelectCity];
	var len = Object.getOwnPropertyNames(data).length;
	var width = wrap.clientWidth;
	var posObj = getWidth(width, len);
	for(var dataSingle in data){
		innerHTML += '<div class="aqi-bar" style="height:' + data[dataSingle] +  ';width:'+ posObj.width +';left:' + (posObj.left*(i++) + posObj.offsetLeft) + 'px;background-color:' + colors[Math.floor(Math.random()*11)] + '"></div>';
	}
	wrap.innerHTML = innerHTML;
}
function getWidth(width, len) {
    var posObj = {};
    posObj.width = Math.floor(width / (len*2));
    posObj.left = Math.floor(width / len);
    posObj.offsetLeft = (width - posObj.left * (len - 1) - posObj.width) / 2;
    return posObj;
}
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(ele) {
  // 确定是否选项发生了变化 
	var value = ele.value;
	var spans = document.getElementsByTagName('span');
	for(var j = 0; j<spans.length; j++){
		spans[j].className = '';
	}
	ele.previousElementSibling.className = 'selected';
	if(value !== pageState.nowGraTime){
		 // 设置对应数据
		pageState.nowGraTime = value;
		// 调用图表渲染函数
		renderChart();
	}
 

  
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    var city = this.value;
    if (city !== pageState.nowSelectCity) {
        // 设置对应数据
        pageState.nowSelectCity = city;
        // 调用图表渲染函数
        renderChart();
    }
}


/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	var radio = document.getElementsByTagName('input');
	for(var i = 0; i < radio.length; i++){
		(function(m){
			addEvent(radio[m], 'click', function(){
				graTimeChange(radio[m]);
			});
		})(i);
	}

}
function addEvent(ele, event, handler){
	if(ele.addEventListener){
		ele.addEventListener(event, handler, false);
	}else if(ele.attachEvent){
		ele.attachEvent('on' + event, handler);
	}else{
		ele['on'+event] = handler;
	}
	
}
/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
	var selectCity = document.getElementById('city-select');
	var cityArr = Object.keys(aqiSourceData);
	var htmlArr = cityArr.map(function(item){
		return '<option>' + item + '</option>';
	});
	selectCity.innerHTML = htmlArr.join("");
	pageState.nowSelectCity = cityArr[0];
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
	addEvent(selectCity, 'change', citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
	var singleWeek = {}, week = {}, weekCount = 0;
	var singleMonth = {}, month = {}, monthCount = 0;
	for(var tempCity in aqiSourceData){
		//数据定义
		var tempCityData = aqiSourceData[tempCity];
		var tempDate = Object.getOwnPropertyNames(tempCityData);
		var weekInit = 4;
		var weekDays = 0;
		var tempMonth = tempDate.slice(5,7);
		for(var b = 0; b<tempDate.length; b++, weekInit++){
			weekDays++;
			weekCount += tempCityData[tempDate[b]];
			monthCount += tempCityData[tempDate[b]];
			if((weekInit + 1) % 7 == 0 || b == tempDate.length-1 || tempDate[b+1].slice(5,7) !== tempMonth){
				var tempWeekName = tempDate[b].slice(0,7) + '月第' + (Math.floor(weekInit/7)+1) + '周';
				singleWeek[tempWeekName] = Math.floor(weekCount/weekDays);
				if(b !== tempDate.length-1 && tempDate[b+1].slice(5,7) !== tempMonth){
					weekInit = weekDays % 7;
				}
				weekDays = 0;
				weekCount = 0;
				if(b == tempDate.length-1 || tempDate[b+1].slice(5,7) !== tempMonth){
					tempMonth = (b == tempDate.length - 1) ? tempDate[b].slice(5, 7) : tempDate[b+1].slice(5, 7);
					var tempMonthName = tempDate[b].slice(0,7);
					var monthDays = tempDate[b].slice(8);
					singleMonth[tempMonthName] = Math.floor(monthCount/monthDays);
					monthCount = 0;
				}
				
				
			}//end if
			
		}//end for tempDate
		week[tempCity] = singleWeek;
		month[tempCity] = singleMonth;
        singleWeek = {};
        singleMonth = {};		
	}//end for aqiSourceData
	  // 处理好的数据存到 chartData 中
	chartData.day = aqiSourceData;
    chartData.week = week;
    chartData.month = month;	
    renderChart();

}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();