
$(function(){
    var contentH=window.innerHeight-($('#head').height()+$('#banner').height()+$('#foot').height());
    $('#content').css('height',contentH);
    $('#banner ul li').eq(1).css('background-image','url("/static/images/current_page.png")')
    obj={
        editRow:undefined,
        /*查询*/
        search:function(){
          $('#box').datagrid('load',{
              name: $.trim($(input[name="name"]).val()),
              date_from:$.trim($(input[name="date_from"]).val()),
              date_to:$.trim($(input[name="date_to"]).val())
          })
        },
        /*添加*/
        add:function(){
            $('#save,#redo').show();
            if(this.editRow==undefined){
                $('#box').datagrid('insertRow',{
                    index:0,
                    row:{ }
                });
            }
            $('#box').datagrid('beginEdit',0);
            this.editRow=0;
        },
        /*保存*/
        save: function () {
            /*结束编辑即为编辑完成*/
            $('#box').datagrid('endEdit',this.editRow);
        },
        /*取消编辑*/
        redo: function () {
            $('#save,#redo').hide();
            this.editRow=undefined;
            $('#box').datagrid('rejectChanges');
        },
        /*按钮编辑*/
        edit: function () {
            var rows=$('#box').datagrid('getSelections');
            if(rows.length==1){
                if(this.editRow!=undefined){
                    $('#box').datagrid('endEdit',this.editRow);
                }
                if(this.editRow==undefined){
                    var index=$('#box').datagrid('getRowIndex',rows[0]);
                    $('#save,#redo').show();
                    $('#box').datagrid('beginEdit',index);
                    this.editRow=index;
                    $('#box').datagrid('unselectRow',index);
                }
            }else{
                $.messager.alert('警告','请选择编辑对象并只能选择一行！','warning')
            }
        },
        /*删除*/
        remove:function(){
            var rows=$('#box').datagrid('getSelections');
            if(rows.length>0){
                $.messager.confirm('确定操作','确定要删除所选择的记录吗？',function(flag){
                    if(flag){
                        var ids=[];
                        for(var i=0;i<rows.length;i++){
                            ids.push(rows[i].pid);
                        }
                        /*提交之后台*/
                        $ajax({
                            url:'delete.php',
                            type:'POST',
                            data:{
                                ids:JSON.stringfy(ids)
                            },
                            beforeSend:function(){
                                $('#box').datagrid('loading');
                            },
                            success:function(data){
                                if(data){
                                    $('#box').datagrid('loaded');
                                    $('#box').datagrid('load');
                                    $('#box').datagrid('unselectAll');
                                    /*右下角弹窗*/
                                    $.messager.show({
                                        title:'提示',
                                        msg:data+'个记录被删除'
                                    })
                                }
                            },
                            error:function(){
                                $.messager.alert('异常','服务器异常请重试！','info')
                            }
                        })
                    }
                })
            }else{
                $.messager.alert('提示','请选择要删除的记录！','info')
            }
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
         url :'/static/json/department.json',
            title : '部门信息',
            method:'get',
            columns : [ [ {
                field : "pid",
                checkbox : true
            }, {
                field : "pname",
                title : "部门名称",
                width : "98%",
                editor : {
                    type : 'text',
                    options : {
                        required : true
                    }
                }
            }
            ]],
            striped : true,
            rownumbers : true,
            pagination : true,
            pageSize : 10,
            pageList : [ 10, 20, 30 ],
             onDblClickRow:function(rowIndex,rowData){
                if(obj.editRow!=undefined){
                    $('#box').datagrid('endEdit',obj.editRow);
                }
                if(obj.editRow==undefined){
                    $('#save,#redo').show();
                    $('#box').datagrid('beginEdit',rowIndex);
                    obj.editRow=rowIndex;
                }
            },
            /*编辑完成触发(新增、修改)*/
            onAfterEdit:function(rowIndex,rowData,changes){
                $('#save,#redo').hide();
                /*提交之后台*/
                var inserted=$('#box').datagrid('getChanges','inserted');
                var updated=$('#box').datagrid('getChanges','updated');
                /*新增*/
                if(inserted.length>0){
                    $.ajax({
                        url:'',
                        type:'POST',
                        data:{
                            rule:JSON.stringfy(inserted[0])
                        },
                        beforeSend:function(){
                            $('#box').datagrid('loading');
                        },
                        success:function(data){
                            loadData();
                            if(data=='1'){
                                /*右下角弹窗*/
                                $.messager.show({
                                    title:'提示',
                                    msg:'成功添加1个记录'
                                })
                            }else{
                                 $.messager.alert('异常','添加失败请重试！','info')
                            }
                        },
                        error:function(){
                            $.messager.alert('异常','服务器异常请重试！','info')
                        }
                    })
                }
                /*修改*/
                if(updated.length>0){
                    $.ajax({
                        url:'',
                        type:'POST',
                        data:{
                            row:JSON.stringfy(updated[0])
                        },
                        beforeSend:function(){
                            $('#box').datagrid('loading');
                        },
                        success:function(data){
                            loadData();
                            if(data=='1'){
                                $.messager.show({
                                    title:'提示',
                                    msg:'修改成功！'
                                })
                            }else{
                                $.messager.alert('异常','修改失败请重试！','info')
                            }
                        },
                        error:function(){
                            $.messager.alert('异常','服务器异常请重试！','info')
                        }
                    })
                }
                 obj.editRow=undefined;
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

