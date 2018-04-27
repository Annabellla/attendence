$(function() {

    var contentH=window.innerHeight-($('#head').height()+$('#banner').height()+$('#foot').height());
    $('#content').css('height',contentH);
    $('#banner ul li').eq(4).css('background-image','url("/static/images/current_page.png")')
    var aidarr=window.location.href.split('?aid=');
    var aid = aidarr[1];
    obj = {
        /*查询*/
        search:function(){
            $('#box').datagrid('load',{
                key: $.trim($('input[name="key"]').val()),
                begin:$.trim($('input[name="begin"]').val()),
                end:$.trim($('input[name="end"]').val())
            })
        },
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
            url : '/static/json/record.json',
            title : '考勤记录',
            method:'get',
            columns : [ [
                {
                    "field" : "rid",
                    "hidden":true
                },
                {
                    "field" : "uname",
                    "title" : "姓名",
                    width : "20%"
                },
                {
                    "field" : "pname",
                    "title" : "所属部门",
                    width : "20%"
                },
                 {
                    "field" : "addr",
                    "title" : "所在地点",
                    width : "20%"
                },
                {
                    "field" : "rtime",
                    "title" : "打卡时间",
                    width : "20%"
                },
                {
                    "field" : "pic",
                    "title" : "打卡照片",
                    "width" : "19%",
                    formatter : function(value, row, index) {
                        var imgarr=value.split('+');
                        return '<img src="'+imgarr[0]+'" onclick="bgImg(this)" data-src-wide="'+imgarr[1]+'" width=30 height=30/>';
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

/*查看大图调用*/
var carrousel = $( ".carrousel" );
function bgImg(bg){
    var src = $(bg).attr( "data-src-wide" );
    carrousel.find("img").attr( "src", src );
    carrousel.fadeIn( 200 );
}
carrousel.click( function(e){
    carrousel.find( "img" ).attr( "src", '' );
    carrousel.fadeOut( 200 );
});