$(document).ready(function(){
    
});

var log = function(m){
    console.log(m);
}

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

//表数据导出为excel
$("#export-excel").click(function(){
    var json_data = $('#table').bootstrapTable('getData');
    var type = 'xlsx';
    json2excel(json_data, type);
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
    var stu_len = stu.length;
    if(stu_len<1){
       alert("请选择至少一条学生信息进行！");
       return false;
    }else{
       for(var i=0;i<stu_len;i++){
           console.log(stu[i]);
       }
    }
});

//导出为excel
function json2excel(data,type){
    var json = data;
    var tmpDown; //导出的二进制对象

    var tmpdata = json[0];
    json.unshift({});
    var keyMap = []; //获取keys
    //keyMap =Object.keys(json[0]);
    for (var k in tmpdata) {
        keyMap.push(k);
        json[0][k] = k;
    };
    var tmpdata = [];//用来保存转换好的json 
    json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
        v: v[k],
        position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
    }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
        v: v.v
    });
    var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
    var tmpWB = {
        SheetNames: ['mySheet'], //保存的表标题
        Sheets: {
            'mySheet': Object.assign({},
                tmpdata, //内容
                {
                    '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
                })
        }
    };
    tmpDown = new Blob([s2ab(XLSX.write(tmpWB, 
        {bookType: (type == undefined ? 'xlsx':type),bookSST: false, type: 'binary'}//这里的数据是用来定义导出的格式类型
        ))], {
        type: ""
    }); //创建二进制对象写入转换好的字节流
    var href = URL.createObjectURL(tmpDown); //创建对象超链接
    $("#hf").attr("href",href);
     //绑定a标签
    //$("#hf").trigger("click");
    document.getElementById("hf").click(); //模拟点击实现下载
    setTimeout(function() { //延时释放
        URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
    }, 100);


    function s2ab(s) { //字符串转字符流
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
     // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
    function getCharCol(n) {
        let temCol = '',
        s = '',
        m = 0
        while (n > 0) {
            m = n % 26 + 1
            s = String.fromCharCode(m + 64) + s
            n = (n - m) / 26
        }
        return s
    }
}