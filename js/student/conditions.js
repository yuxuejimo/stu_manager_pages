var log = function(message){
    console.log(message);
}

$(document).ready(function(){
    var html = template('condition');
    $('#conditions').html(html);
});

//点击隐藏或展开car-body
function show_hide(e){
    var card_class = "fa fa-angle-up fa-lg";
    if($(e).attr("class")==card_class){
        $(e).parent().next("div").hide();
        $(e).attr("class","fa fa-angle-down fa-lg");
    }else{
        $(e).parent().next("div").show();
        $(e).attr("class","fa fa-angle-up fa-lg");
    }
    
}

//获取所有查询条件
function get_conditions(){
    var conditions = [];
    var conditions_list = $("#conditions").children();
    $.each(conditions_list,function(index,element){
        var input_list = $(element).children();
        //前3个是要提交的元素
        $.each(input_list,function(i,item){
            if(i<=2){
                var input_val = $(item).val();
                conditions.push(input_val);
            }else{
                return false;
            }
        })
    })
    return conditions;
}

//检查筛选条件是否为空
function check_conditions(){
    var flag = true;
    var c_list = get_conditions();
    $.each(c_list, function(index, element){
        if(!element){
            alert("筛选条件不能为空！");
            flag = false;
            return flag;
        }
    });
    return flag;
}

//筛选查询
function query(){
    var query_json = JSON.stringify(get_conditions());
    if(check_conditions()){
        $.ajax({
            url:"",
            data:query_json,
            success:function(res){
            
            }
        })
    }
    
}

//筛选条件总数
function count_condictions(){
    var conditions_length = $("#conditions").children().length;
    return conditions_length;
}

//增加筛选条件
function add_conditions(con){
    //最多3个条件
    if(count_condictions()<3){
        var html = template('condition');
        $('#conditions').append(html);
    }
}

//删除筛选条件
function del_conditions(con){
   if(count_condictions()>1){
       var div = $(con).closest("div");
       div.remove();
   }
}