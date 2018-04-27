
$(function() {

    var contentH=window.innerHeight-($('#head').height()+$('#banner').height()+$('#foot').height());
    $('#content').css('height',contentH);
    $('#banner ul li').eq(5).css('background-image','url("/static/images/current_page.png")')

    /*默认月份*/
    var yer_mon = new Date();
    var mon = $('#datebox').val();
    if( mon == ''|| mon == null ){
        var yer = yer_mon.getFullYear();
        var monthh = (yer_mon.getMonth() + 1).toString();
        if(monthh.length == 1){
            monthh = '0'+monthh
        }
        mon = yer +'-'+monthh;
        $('#makedate').datebox('setValue', mon);
    }

    obj = {
        /*查询*/
        search:function(){
            $('#box').datagrid('load',{
                month:$.trim( $('input[name="makedate"]').val() )
            })
        },
        print:function(){
            bdhtml=window.document.body.innerHTML;
            sprnstr="<!--startprint-->";
            eprnstr="<!--endprint-->";
            prnhtml=bdhtml.substr(bdhtml.indexOf(sprnstr)+17);
            prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr));
            window.document.body.innerHTML=prnhtml;
            window.print();
        }
    };

    /*IE刷新*/
    function loadData(){
        var url = $('#box').datagrid('options').url;
        if (url.indexOf("_t=") > 0) {
            url = url.replace(/_t=\d+/, "_t=" + new Date().getTime());
            $('#box').datagrid({
                url:url,
                queryParams:{
                    id:'001',
                    state:'ok'
                }
            });

        } else {
            url = url.indexOf("?") > 0
                ? url + "&_t=" + new Date().getTime()
                : url + "?_t=" + new Date().getTime();

            $('#box').datagrid({
                url:url,
                queryParams:{
                    id:'001',
                    state:'ok'
                }
            });
        }
    }

    /*表格渲染*/
    $('#box').datagrid(
        {
            url : '/static/json/report.json',
            queryParams: {
                month:$.trim( $('input[name="makedate"]').val() )
             },
            title : '考勤月报',
            method:'get',
            columns : [ [
                {
                    "field" : "uname",
                    "title" : "姓名",
                    "width" : "5%"
                },
                {
                    "field" : "pname",
                    "title" : "所属部门",
                    "width" : "5%"
                },
                {
                    "field" : "addr",
                    "title" : "所在地址",
                    "width" : "10%"
                },
                 {
                     "field" : "r01",
                     "title" : "01",
                     "width" : "2.5%",
                     formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                     "field" : "r02",
                     "title" : "02",
                     "width" : "2.5%",
                     formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                     "field" : "r03",
                     "title" : "03",
                     "width" : "2.5%",
                     formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                     "field" : "r04",
                     "title" : "04",
                     "width" : "2.5%",
                     formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                     "field" : "r05",
                     "title" : "05",
                     "width" : "2.5%",
                     formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                     "field" : "r06",
                     "title" : "06",
                     "width" : "2.5%",
                     formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                     "field" : "r07",
                     "title" : "07",
                     "width" : "2.5%",
                     formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                     "field" : "r08",
                     "title" : "08",
                     "width" : "2.5%",
                     formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                     "field" : "r09",
                     "title" : "09",
                     "width" : "2.5%",
                     formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                     "field" : "r10",
                     "title" : "10",
                     "width" : "2.5%",
                     formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                    "field" : "r11",
                    "title" : "11",
                    "width" : "2.5%",
                    formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                    "field" : "r12",
                    "title" : "12",
                    "width" : "2.5%",
                    formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                    "field" : "r12",
                    "title" : "12",
                    "width" : "2.5%",
                    formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                    "field" : "r13",
                    "title" : "13",
                    "width" : "2.5%",
                    formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                    "field" : "r14",
                    "title" : "14",
                    "width" : "2.5%",
                    formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                    "field" : "r15",
                    "title" : "15",
                    "width" : "2.5%",
                    formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                    "field" : "r16",
                    "title" : "16",
                    "width" : "2.5%",
                    formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                    "field" : "r17",
                    "title" : "17",
                    "width" : "2.5%",
                    formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                    "field" : "r18",
                    "title" : "18",
                    "width" : "2.5%",
                    formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                    "field" : "r19",
                    "title" : "19",
                    "width" : "2.5%",
                    formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                    "field" : "r20",
                    "title" : "20",
                    "width" : "2.5%",
                    formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                    "field" : "r21",
                    "title" : "21",
                    "width" : "2.5%",
                    formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                    "field" : "r22",
                    "title" : "22",
                    "width" : "2.5%",
                    formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                    "field" : "r23",
                    "title" : "23",
                    "width" : "2.5%",
                    formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                    "field" : "r24",
                    "title" : "24",
                    "width" : "2.5%",
                    formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                    "field" : "r25",
                    "title" : "25",
                    "width" : "2.5%",
                    formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                    "field" : "r26",
                    "title" : "26",
                    "width" : "2.5%",
                    formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                    "field" : "r27",
                    "title" : "27",
                    "width" : "2.5%",
                    formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                    "field" : "r28",
                    "title" : "28",
                    "width" : "2.5%",
                    formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                    "field" : "r29",
                    "title" : "29",
                    "width" : "2.5%",
                    formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                    "field" : "r30",
                    "title" : "30",
                    "width" : "2.5%",
                    formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                },
                {
                    "field" : "r31",
                    "title" : "31",
                    "width" : "2.5%",
                    formatter : function(value, row, index) {
                         if(!isNaN(value)){
                            return '<img src="/static/images/status_'+value+'.png ">';
                        }else {
                            return "";
                        }
                    }
                }
            ] ],
            striped : true,
            rownumbers : true,
            pagination : true,
            singleSelect:true,
            pageSize : 20,
            pageList : [ 10, 20, 30 ]
        });
    loadData();
});

 /*月份下拉框*/
 $('#makedate').datebox({
    onShowPanel: function () {//显示日趋选择对象后再触发弹出月份层的事件，初始化时没有生成月份层
        span.trigger('click'); //触发click事件弹出月份层
        if (!tds)
            setTimeout(function () {//延时触发获取月份对象，因为上面的事件触发和对象生成有时间间隔
                tds = p.find('div.calendar-menu-month-inner td');
                tds.click(function (e) {
                    e.stopPropagation(); //禁止冒泡执行easyui给月份绑定的事件
                    var year = /\d{4}/.exec(span.html())[0]//得到年份
                    , month = parseInt($(this).attr('abbr'), 10); //月份，这里不需要+1
                    $('#makedate').datebox('hidePanel')//隐藏日期对象
                    .datebox('setValue', year + '-' + month); //设置日期的值
                });
             }, 0);
        yearIpt.unbind();//解绑年份输入框中任何事件
    },
    parser: function (s) {
        if (!s) return new Date();
        var arr = s.split('-');
        return new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, 1);
    },
    formatter: function (d) {
    var a = parseInt(d.getMonth())<parseInt('9')?'0'+parseInt(d.getMonth()+ 1):d.getMonth() + 1;
    return d.getFullYear() + '-' +a; }
});
    var p = $('#makedate').datebox('panel'), //日期选择对象
    tds = false, //日期选择对象中月份
    yearIpt = p.find('input.calendar-menu-year'),//年份输入框
    span = p.find('span.calendar-text'); //显示月份层的触发控件