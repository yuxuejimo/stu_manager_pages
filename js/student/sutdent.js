$(document).ready(function(){
    
});
//初始化table数据
$('#table').bootstrapTable({
    url:'/data/herolist.json',
    columns: [{
        checkbox: true
    }, {
        field: 'ename',
        title: '英雄ID',
        sortable: true
    }, {
        field: 'cname',
        title: '真实名称'
    }, {
        field: 'title',
        title: '江湖名称'
    }],
    pagination:true,
    pageList:[10, 15, 20],
    striped:true,
    clickToSelect:true
});

//导出为excel
$("#export-excel").click(function(){
   //后台处理
    
});

//修改学生信息
$("#stu-update").click(function(){
    var stu = $('#table').bootstrapTable('getSelections');
    if(stu.length!=1){
        alert("请选择1项进行修改！");
        return false;
    }else{
        $('#stu-model').modal('show');
        $("#recipient-name").val(stu[0]['cname']);
        $("#message-text").val(stu[0]['title']);
    }
});

//添加学生信息
$("#stu-add").click(function(){
    $('#stu-model').modal('show');
    
});

//删除
$("#stu-del").click(function(){
     var stu = $('#table').bootstrapTable('getSelections');
    var stu_len = stu.length
    if(stu_len<1){
       alert("请选择至少一条学生信息进行！");
       return false;
    }else{
       for(var i=0;i<stu_len;i++){
           console.log(stu[i]);
       }
    }
});