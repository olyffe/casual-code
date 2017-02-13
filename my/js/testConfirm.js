/**
 * Created by zhangxu on 2017/2/13.
 */
window.confirm = function (msg) {
	var temp = window.showModalDialog("modalDialog.html",msg,"dialogWidth=800px;dialogHeight=300px;")
	return temp;
}