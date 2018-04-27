$(function() {
    var contentH=window.innerHeight-($('#head').height()+$('#banner').height()+$('#foot').height());
    $('#content').css('height',contentH);
    $('#banner ul li').eq(2).css('background-image','url("/static/images/current_page.png")')
    var editRow=undefined;
    var ifupdated=false,ifinserted=false;
    obj = {
     /*查询*/
        search:function(){
            $('#box').datagrid('load',{
                key: $.trim($('input[name="key"]').val())
            })
        },
        /*添加*/
        add : function() {
            ifinserted=true;
            $('#save,#redo').show();
            if (editRow == undefined) {//阻止多次添加空白对象
                $('#box').datagrid('insertRow', {
                    index : 0,
                    row : { }
                });
            }
            $('#box').datagrid('beginEdit', 0);
            editRow = 0;
        },
        /*保存*/
        save : function() {
            overEdit()
        },
        /*取消编辑*/
        redo : function() {
            ifupdated=false;
            ifinserted=false;
            $('#save,#redo').hide();
            editRow = undefined;
            $('#box').datagrid('rejectChanges');
        },
        /*按钮编辑*/
        edit : function() {
            var rows = $('#box').datagrid('getSelections');
            if (rows.length == 1) {
                ifupdated=true;
                if (editRow != undefined) {
                    overEdit();
                }
                if (editRow == undefined) {
                    $('#save,#redo').show();
                    var index = $('#box').datagrid('getRowIndex', rows[0]);
                    $('#box').datagrid('beginEdit', index);
                    $('#box').datagrid('unselectRow', index);
                    editRow = index;
                }
            } else {
                $.messager.alert('警告', '请选择编辑对象并只能选择一行！', 'warning')
            }
        },
        /*删除*/
        remove : function() {
            var rows = $('#box').datagrid('getSelections');
            if (rows.length > 0) {
                $.messager.confirm('确定操作', '确定要删除所选择的记录吗？', function(flag) {
                    if (flag) {
                        var ids = [];
                        for (var i = 0; i < rows.length; i++) {
                            ids.push(rows[i].uid);
                        }
                        /*提交至后台*/
                        $.ajax({
                            url : '',
                            type : 'post',
                            cache:false,
                            traditional:true,
                            data : {
                                ids : JSON.stringify(ids)
                            },
                            beforeSend : function() {
                                $('#box').datagrid('loading');
                            },
                            success : function(data) {
                                loadData();
                                if (data.code==1) {
                                    $.messager.show({
                                        title : '提示',
                                        msg : data.data + '个记录被删除'
                                    })
                                }else{
                                    $.messager.show({
                                        title : '提示',
                                        msg : data.error
                                    })
                                }
                            },
                            error : function() {
                                $.messager.alert('异常', '服务器异常请重试！', 'info')
                            }
                        })
                    }
                })
            } else {
                $.messager.alert('提示', '请选择要删除的记录！', 'info')
            }
        }
    };
    function overEdit(){
        /*提交之后台*/
        var textinput=$('.datagrid-editable-input');
        var selectinput=$('input[type=hidden]');
        var updated = $('#box').datagrid('getRows')[editRow];

        var uname=textinput.eq(0).val(),
            aid=selectinput.eq(0).val(),
            pid=selectinput.eq(1).val(),
            uid=updated.uid;
        if($('#filebox_file_id').val().indexOf('.jpg')<0){
            $.messager.alert('异常', '图片不正确！(.jpg)','info');
            return false;
        }
        $('#save,#redo').hide();
        $('#box').datagrid('loading');

        /*新增*/
        if (ifinserted==true) {
            $.ajaxFileUpload({
                url: "/parent/add?uname="+pname+"&aid="+aid+"&pid="+ pid,
                type: "POST",
                async: true,
                dataType:"text",
                fileElementId: ['filebox_file_id'],
                success: function (data) {
                    loadData();
                    inserted=false;
                    if(data == 1){
                        $.messager.show({
                            title:'提示',
                            msg:'成功添加1个记录'
                        })
                    }else{
                       $.messager.alert('异常', '添加失败请重试!','info');
                    }
                },
                error: function () {
                    if(!!window.ActiveXObject || "ActiveXObject" in window){
                        loadData();
                        inserted=false;
                    }else{
                        $.messager.alert('异常', '服务器异常请重试!','info');
                    }
                }
            });
        }
        /*修改*/
        if (ifupdated==true) {
            $.ajaxFileUpload({
                url: "/parent/update?uname="+pname+"&aid="+aid+"&pid="+ pid+"&uid="+uid,
                type: "POST",
                async: true,
                dataType:"text",
                fileElementId: ['filebox_file_id'],
                success: function (data) {
                    loadData();
                    updated=false;
                    if(data == 1){
                        $.messager.show({
                            title:'提示',
                            msg:'成功修改1个记录'
                        })
                    }else{
                         $.messager.alert('异常', '修改失败请重试!','info');
                    }
                },
                error: function () {
                    if(!!window.ActiveXObject || "ActiveXObject" in window){
                        loadData();
                        inserted=false;
                    }else{
                        $.messager.alert('异常', '服务器异常请重试!','info');
                    }
                }
            });
        }
        editRow = undefined;
    }

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
            url :'/static/json/members.json',
            title : '员工信息',
            method:'get',
            columns : [ [ {
                "field" : "uid",
                checkbox : true
            }, {
                "field" : "uname",
                "title" : "姓名",
                width : "20%",
                editor : {
                    type : 'text',
                    options : {
                        required : true
                    }
                }

            },  {
                    field:"pname",
                    title:"所属部门",
                    width:"20%",
                    editor:{
                        type:'combobox',
                        options:{
                            editable:false,
                            required:true,
                            valueField:'pid',
                            textField:'pname',
                            method:'get',
                            url:'/static/json/department.json'
                        }
                    },
                    formatter : function(value, row, index) {
                        if(value!=undefined){
                            if(value.indexOf('+')>=0){
                                var arr=value.split('+');
                                return arr[1];
                            }
                        }
                        return value;
                    }
                }, {
                    field:"addr",
                    title:"所在地址",
                    width:"20%",
                    editor:{
                        type:'combobox',
                        options:{
                            editable:false,
                            required:true,
                            valueField:'aid',
                            textField:'addr',
                            method:'get',
                            url:'/static/json/addr.json'
                        }
                    },
                    formatter : function(value, row, index) {
                        if(value!=undefined){
                            if(value.indexOf('+')>=0){
                                var arr=value.split('+');
                                return arr[1];
                            }
                        }
                        return value;
                    }
                },
                {
                    field:"rule",
                    title:"考勤规则",
                    width:"20%",
                    editor:{
                        type:'combobox',
                        options:{
                            editable:false,
                            required:true,
                            valueField:'aid',
                            textField:'addr',
                            method:'get',
                            url:'/static/json/addr.json'
                        }
                    },
                    formatter : function(value, row, index) {
                        if(value!=undefined){
                            if(value.indexOf('+')>=0){
                                var arr=value.split('+');
                                return arr[1];
                            }
                        }
                        return value;
                    }
                },{
                "field" : "photo",
                "title" : "照片",
                width : "19%",
                editor : {
                    type : 'filebox',
                    options : {
                        required : true
                    }
                },
                formatter : function(value, row, index) {
                    return '<img src="'+value+'" onclick="bgImg(this)" data-src-wide="'+value+'" width=30 height=30/>';
                }
            }]],
            striped : true,
            rownumbers : true,
            pagination : true,
            pageSize : 20,
            pageList : [ 10, 20, 30 ],
            /*双击编辑*/
            onDblClickRow : function(rowIndex, rowData) {
                ifupdated=true;
                if (editRow != undefined) {
                    overEdit();
                    $('#box').datagrid('endEdit', editRow);
                }
                if (editRow == undefined) {
                    $('#save,#redo').show();
                    $('#box').datagrid('beginEdit', rowIndex);
                    editRow = rowIndex;
                }
            },
            onRowContextMenu : function(e, rowIndex, rowData) {
                e.preventDefault();
                $('#menu').menu('show', {
                    left : e.pageX,
                    top : e.pageY
                })
            }
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