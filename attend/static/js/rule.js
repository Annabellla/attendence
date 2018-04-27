var date_box = null;
$(function(){
    var contentH=window.innerHeight-($('#head').height()+$('#banner').height()+$('#foot').height());
    $('#content').css('height',contentH);
    $('#banner ul li').eq(3).css('background-image','url("/static/images/current_page.png")');
    obj={
        editRow:undefined,
        /*查询*/
       search:function(){
            $('#box').datagrid('load',{
                key: $.trim($('input[name="key"]').val())
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
                            ids.push(rows[i].gid);
                        }

                        /*提交之后台*/
                        $ajax({
                            url:'',
                            type:'POST',
                            data:{
                                ids:JSON.stringify(ids)
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
            url : '/static/json/rule.json',
            title : '单位信息',
            method:'get',
            columns : [ [
                {
                    field : "gid",
                    hidden : true,
                },
                {
                    field : "gname",
                    title : "考勤规则名称",
                    width : "10%",
                    editor : {
                        type : 'text',
                        options : {
                            required : true
                        }
                    }
                },
                {
                    field:"on_hour",
                    title:"上班小时",
                    width:"5%",
                    editor:{type:'combobox', options:{valueField:'value',textField:'display', method:'get', url:'/static/json/hour.json',options:{ required:true }}}
                },
                {
                    field:"on_minu",
                    title:"上班分钟",
                    width:"5%",
                    editor:{type:'combobox', options:{valueField:'value',textField:'display', method:'get', url:'/static/json/minute.json',options:{ required:true }}}
                },
                {
                    field:"off_hour",
                    title:"下班小时",
                    width:"5%",
                    editor:{type:'combobox', options:{valueField:'value',textField:'display', method:'get', url:'/static/json/hour.json',options:{ required:true }}}
                },
                {
                    field:"off_minu",
                    title:"下班分钟",
                    width:"5%",
                    editor:{type:'combobox', options:{valueField:'value',textField:'display', method:'get', url:'/static/json/minute.json',options:{ required:true }}}
                },
                {
                    field:"mode",
                    title:"考勤机制",
                    width:"6%",
                    editor:{type:'combobox', options:{valueField:'value',textField:'display', method:'get', url:'/static/json/mode.json',options:{ required:true }}},
                     formatter : function(value, row, index) {
                        if(value == 0){
                            return "排班制";
                        }else{
                            return "周末排班制";
                        }
                    }
                },
                 {
                    field:"vacation_day",
                    title:"工作日放假",
                    width:"18%"
                },
                 {
                    field:"working_day",
                    title:"休息日照常上班",
                    width:"18%"
                },
                 {
                    field:"rest",
                    title:"休息日期",
                    width:"28%"
                }
            ]],
            striped : true,
            rownumbers : true,
            pagination : true,
            pageSize : 10,
            pageList : [ 10, 20, 30 ],
            /*双击编辑*/
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
             onClickCell:function(index,field,value){
                 date_box = null;
                 if(obj.editRow == index){
                        if(field == 'vacation_day' || field == 'working_day'|| field == 'rest'){
                            date_box = field;
                            $('.mask').css({'display': 'block'});
                            center($('.mess'));
                            check($(this).parent(),$('.btn1'), $('.btn2'),$('#p3'));
                            $('#dateV').val(value)

                            /*窗口取消滚动*/
                            $(document.body).css({
                                "overflow-x":"hidden",
                                "overflow-y":"hidden"
                            });
                        }
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
                            rule:JSON.stringify(inserted[0])
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
                            row:JSON.stringify(updated[0])
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

$.extend($.fn.datagrid.defaults.editors, {
    datebox: {
        init: function (container, options) {
            var input = $('<input type="text">').appendTo(container);
            input.datebox(options);
            return input;
        },
        destroy: function (target) {
            $(target).datebox('destroy');
        },
        getValue: function (target) {
            return $(target).datebox('getValue');//获得旧值
        },
        setValue: function (target, value) {
            $(target).datebox('setValue', value);//设置新值的日期格式
        },
        resize: function (target, width) {
            $(target).datebox('resize', width);
        }
    }
});

$.extend($.fn.datagrid.methods, {
    getEditingRowIndexs: function(jq) {
        var rows = $.data(jq[0], "datagrid").panel.find('.datagrid-row-editing');
        var indexs = [];
        rows.each(function(i, row) {
            var index = row.sectionRowIndex;
            if (indexs.indexOf(index) == -1) {
                indexs.push(index);
            }
        });
        return indexs;
    }
});


// 居中
    function center(obj) {
        var screenWidth = $(window).width(), screenHeight = $(window).height(); //当前浏览器窗口的 宽高
        var scrolltop = $(document).scrollTop();//获取当前窗口距离页面顶部高度
        var objLeft = (screenWidth - obj.width())/2 ;
        var objTop = (screenHeight - obj.height())/2 + scrolltop;
        obj.css({left: objLeft + 'px', top: objTop + 'px','display': 'block'});
        //浏览器窗口大小改变时
        $(window).resize(function() {
            screenWidth = $(window).width();
            screenHeight = $(window).height();
            scrolltop = $(document).scrollTop();
            objLeft = (screenWidth - obj.width())/2 ;
            objTop = (screenHeight - obj.height())/2 + scrolltop;
            obj.css({left: objLeft + 'px', top: objTop + 'px','display': 'block'});
        });
        //浏览器有滚动条时的操作、
        $(window).scroll(function() {
            screenWidth = $(window).width();
            screenHeight = $(widow).height();
            scrolltop = $(document).scrollTop();
            objLeft = (screenWidth - obj.width())/2 ;
            objTop = (screenHeight - obj.height())/2 + scrolltop;
            obj.css({left: objLeft + 'px', top: objTop + 'px','display': 'block'});
        });
    }
    //确定取消的操作
    function check(obj4, obj1, obj2,obj3) {
        obj2.click(function() {
             $("#dateV").val('');
             if(date_box == 'vacation_day'){
                    $('#box').datagrid('updateRow', {
                    index: obj.editRow,
                    row: {
                        vacation_day: null
                        }
                    });
               }

              if(date_box == 'working_day'){
                    $('#box').datagrid('updateRow', {
                    index: obj.editRow,
                    row: {
                        working_day: null
                        }
                    });
              }

              if(date_box == 'rest'){
                    $('#box').datagrid('updateRow', {
                    index: obj.editRow,
                    row: {
                        rest: null
                        }
                    });
              }
        }) ;
        obj3.click(function() {
            $('#box').datagrid('beginEdit',obj.editRow);
            closed($('.mask'), $('.mess'));
        }) ;
         obj1.click(function() {
            $('#box').datagrid('beginEdit',obj.editRow);
            closed($('.mask'), $('.mess'));
        }) ;
    }
    // 隐藏 的操作
    function closed(obj1, obj2,obj3) {
        /*窗口取消滚动*/
        $(document.body).css({
            "overflow-x":"auto",
            "overflow-y":"auto"
        });
        obj1.hide();
        obj2.hide();
    }


    $("#chooseDate").calendare({
            callback: function dateV(value) {
                var date1 = $("#dateV").val();
                var date2;
                if(date1 == ''){
                    date2 = $("#chooseDate").val();
                }else{
                    date2 = $("#dateV").val()+','+$("#chooseDate").val();
                }
                $("#dateV").val(date2)

                if(date_box == 'vacation_day'){
                    $('#box').datagrid('updateRow', {
                    index: obj.editRow,
                    row: {
                        vacation_day: date2
                        }
                    });
                }

                 if(date_box == 'working_day'){
                    $('#box').datagrid('updateRow', {
                    index: obj.editRow,
                    row: {
                        working_day: date2
                        }
                    });
                }

                if(date_box == 'rest'){
                    $('#box').datagrid('updateRow', {
                    index: obj.editRow,
                    row: {
                        rest: date2
                        }
                    });
                }

            }

        });
