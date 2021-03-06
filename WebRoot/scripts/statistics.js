var baseUrl =  window.location.protocol + "//" + window.location.host+ "/QiupAdServer/";

var updateSel = function(type)
{
	
	if(type == "1")
	{
		var s = '<option value ="-1">类型选择</option>';
		s += '<option value ="0">请求</option>';
		s += '<option value ="1">展示</option>';
		s += '<option value ="2">点击</option>';
		s += '<option value ="3">下载</option>';
		s += '<option value ="4">下载成功</option>';
		s += '<option value ="5">安装</option>';
		s += '<option value ="6">激活</option>';
		
		$("#filed_sel_1").html(s);
	}
	else if(type == "2")
	{
		var data = $.ajax({
			  type: 'POST',
			  url: baseUrl+"/statistics_findAdPosition",
			  data: {},
			  async:false
			});
		data = data.responseText;
		data = eval("("+data+")");
		
		var s = '<option value ="-1">广告位选择</option>';
		for(var i=0;i<data.length;i++)
		{
			s += '<option value ="';
			s += data[i].type;
			s += '">';
			s += data[i].name;
			s += '</option>';
		}
		
		$("#filed_sel_2").html(s);
	}
	
	else if(type == "3")
	{
		var s = '<option value ="-1">offer选择</option>';
		s += '<option value ="self">self</option>';
		s += '<option value ="appNext">appNext</option>';
		s += '<option value ="avazu">avazu</option>';
		s += '<option value ="MobVista">MobVista</option>';
		
		$("#filed_sel_3").html(s);
	}
	
	else if(type == "4")
	{
		var data = $.ajax({
			  type: 'POST',
			  url: baseUrl+"/statistics_findMedia",
			  data: {},
			  async:false
			});
		data = data.responseText;
		data = eval("("+data+")");
		
		var s = '<option value ="-1">应用选择</option>';
		for(var i=0;i<data.length;i++)
		{
			s += '<option value ="';
			s += data[i].name;
			s += '">';
			s += data[i].name;
			s += '</option>';
		}
		
		$("#filed_sel_4").html(s);
	}
	
	else if(type == "5")
	{
		var data = $.ajax({
			  type: 'POST',
			  url: baseUrl+"/statistics_findSdk",
			  data: {},
			  async:false
			});
		data = data.responseText;
		data = eval("("+data+")");
		
		var s = '<option value ="-1">渠道选择</option>';
		for(var i=0;i<data.length;i++)
		{
			s += '<option value ="';
			s += data[i].channel;
			s += '">';
			s += data[i].channel;
			s += '</option>';
		}
		$("#filed_sel_5").html(s);
	}
}

updateSel("1");
updateSel("2");
updateSel("3");
updateSel("4");
updateSel("5");

var updateTable = function(from,to)
{	
	var type1 = $("#filed_sel_1").val();
	var type2 = $("#filed_sel_2").val();
	var type3 = $("#filed_sel_3").val();
	var type4 = $("#filed_sel_4").val();
	var type5 = $("#filed_sel_5").val();
	
	var data = $.ajax({
		  type: 'POST',
		  url: baseUrl+"/statistics_list2",
		  data: {"from" : from,"to":to,"type1":type1,
			  "type2":type2,"type3":type3,"type4":type4,"type5":type5},
		  async:false
		});
	data = data.responseText;
	data = eval("("+data+")");
	
	var body = $("#tbody");
	var str = "";
	for(var i=0;i<data.length;i++)
	{
		var s = "<tr>";		
		s+="<td>" + data[i].id + "</td>";
		s+="<td>" + data[i].userId + "</td>";
		s+="<td>" + data[i].statisticsType + "</td>";
		s+="<td>" + data[i].adPosition + "</td>";
		s+="<td>" + data[i].offerId + "</td>";
		s+="<td>" + data[i].appName + "</td>";
		s+="<td>" + data[i].packageName + "</td>";
		s+="<td>" + data[i].channel + "</td>";
		s+="<td>" + data[i].uploadTime2 + "</td>";
		s+= "</tr>";
			
		str += s;	
	}
	body.html(str);
	
	$("#maxNum").html("总记录数："+data.length);
};

$("#today").click(function(){
	var date = new Date();
	var from = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate() + " 00:00:00";
	var to = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()+1) + " 00:00:00";
	$("#from_date").val(from.split(" ")[0]);
	$("#to_date").val(to.split(" ")[0]);
	updateTable(from,to);
});

$("#oneWeek").click(function(){
	var date = new Date();
	date.setDate(date.getDate() - 7);
	var from = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate() + " 00:00:00";
	date.setDate(date.getDate() + 7);
	var to = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()+1) + " 00:00:00";
	$("#from_date").val(from.split(" ")[0]);
	$("#to_date").val(to.split(" ")[0]);
	updateTable(from,to);
});

$("#oneMonth").click(function(){
	var date = new Date();
	date.setDate(date.getDate() - 30);
	var from = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate() + " 00:00:00";
	date.setDate(date.getDate() + 30);
	var to = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()+1) + " 00:00:00";
	$("#from_date").val(from.split(" ")[0]);
	$("#to_date").val(to.split(" ")[0]);
	updateTable(from,to);
});

$("#find").click(function(){
	var from = $("#from_date").val() + " 00:00:00";
	var to = $("#to_date").val() + " 00:00:00";
	updateTable(from,to);
});




$("#delete").click(function()
{
	var data = $("#div_update").attr("title");
	
	var urll = baseUrl + "/statistics_deleteStatistics?data=";
	urll = urll + data;
	$.ajax({url:urll,async:false});
	$("#div_update").hide();
	location.reload();
});

$(".thUpdate").click(function(){	
	var x = $(this).offset().top; 
	var y = $(this).offset().left - 100; 
	var div = $("#div_update");
	div.css("left",y + "px"); 
	div.css("top",x + "px");
	var preall = $(this).prevAll();
	var id = preall[preall.length-1].innerHTML;
	
	div.attr("title",id);
	div.show();
});

$("html").mousedown(function(e){
	var div = $("#div_update");
	
	if(div.css('display') != "none")
	{
		var w = div.width();
		var h = div.height();
		
		var left =  div.offset().left;
		var top = div.offset().top;
		if(e.pageX <= left+w && e.pageX >= left && e.pageY >= top && e.pageY <= top + h)
		{
			return;			
		}
		else
		{
			div.hide();
		}
	}
});

var div = document.getElementById("my_div");
var a_1 = document.getElementById("a_1");
var a_2 = document.getElementById("a_2");

var resf = function()
{
var maxNum = div.title;
var maxIndex = Math.ceil(maxNum / 100)-1;
var index = location.href.split("=")[1];

if(!index || index > maxIndex)
index = 0;

if(index == 0)
{
	a_1.style.display = "none";
}
else
{
	a_1.style.display = "";
}
if(index >= maxIndex )
{
	a_2.style.display = "none";
}
else
{
	a_2.style.display = "";
}

a_1.href = "statistics_list?index=" + (parseInt(index)-1);
a_2.href = "statistics_list?index=" + (parseInt(index)+1);	
};

resf();

var resf2 = function()
{

var date = new Date();
var from = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
var to = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate()+1);
$("#from_date").val(from);
$("#to_date").val(to);
};

resf2();




//----------------------------浏览器兼容问题---------------------
var idTmr;
function  getExplorer() {
var explorer = window.navigator.userAgent ;
//ie 
if (explorer.indexOf("MSIE") >= 0) {
	return 'ie';
}
//firefox 
else if (explorer.indexOf("Firefox") >= 0) {
	return 'Firefox';
}
//Chrome       
else if(explorer.indexOf("Chrome") >= 0){
	return 'Chrome';
}
//Opera
else if(explorer.indexOf("Opera") >= 0){
	return 'Opera';
}
//Safari
else if(explorer.indexOf("Safari") >= 0){
	return 'Safari';
}}
$("#out").click(function(){
if(getExplorer()=='ie')
{
	var curTbl = document.getElementById("tableList");
	var oXL = new ActiveXObject("Excel.Application");
	//创建AX对象excel 
	var oWB = oXL.Workbooks.Add();
	//获取workbook对象 
	var xlsheet = oWB.Worksheets(1);
	//激活当前sheet 
	var sel = document.body.createTextRange();
	sel.moveToElementText(curTbl);
	//把表格中的内容移到TextRange中 
	sel.select();
	//全选TextRange中内容 
	sel.execCommand("Copy");
	//复制TextRange中内容  
	xlsheet.Paste();
	//粘贴到活动的EXCEL中       
	oXL.Visible = true;
	//设置excel可见属性
	try {
		var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
	} catch (e) {
		print("Nested catch caught " + e);
	} finally {
		oWB.SaveAs(fname);
		oWB.Close(savechanges = false);
		oXL.Quit();
		oXL = null;
		//结束excel进程，退出完成
		idTmr = window.setInterval("Cleanup();", 1);
		}
	}else
	{
		tableToExcel("tableList");
	}
});
function Cleanup() {
 window.clearInterval(idTmr);
 CollectGarbage();
}

var tableToExcel = (function(){
	var uri = 'data:application/vnd.ms-excel;base64,',
	template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
	base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
	format = function(s, c) {
	return s.replace(/{(\w+)}/g,
	function(m, p) { return c[p]; }) }
	return function(table, name) {
	if (!table.nodeType) table = document.getElementById(table);
	var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
	window.location.href = uri + base64(format(template, ctx))
	}
})()

