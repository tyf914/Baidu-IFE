/**
 * Created by yifei.tang on 2017/7/11.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city=document.getElementById('aqi-city-input').value.replace(/\s+/g,"");
    var value=document.getElementById('aqi-value-input').value.replace(/\s+/g,"");

    if(city=="" || value==""){
        alert("两项输入都不能为空");
    }else if (!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
        alert("城市名必须为中英文字符！");
    }else if(!value.match(/^\d+$/)) {
        alert("空气质量指数必须为整数！");
    }else if(aqiData.hasOwnProperty(city)){
        alert("请不要重复输入相同的城市名称！");
    }else{
        aqiData[city]=value;
    }

}
/**
 * 渲染aqi-table表格
 */
var table=document.getElementById('aqi-table');
table.setAttribute('border','1');

function renderAqiList() {
    //这里是为了判断aqiData是否为空
    var flag=false;
    for (var prop in aqiData){
        flag = true;
        break;
    }
    if(flag){
        var tableRows="";
        tableRows+=
            "<tr>"+
            "<th>城市</th>"+
            "<th>空气质量</th>"+
            "<th>操作</th>"+
            "</tr>";
        for(var city in aqiData){
            tableRows+=
                "<tr>"+
                "<td>"+city+"</td>"+
                "<td>"+aqiData[city]+"</td>"+
                "<td><button>删除</button></td>"+
                "</tr>"
        }
        table.innerHTML=tableRows;
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
    // do sth.
    var tr=this.parentNode.parentNode;
    city=tr.firstChild.innerHTML;
    delete aqiData[city];
    var flag=false;
    for(var city in aqiData){
        flag=true;
        break;
    }
    if(flag){
        tr.parentNode.removeChild(tr);
    }else{
        table.removeChild(table.firstChild);
    }
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var addBtn=document.getElementById('add-btn');
    addBtn.addEventListener('click',addBtnHandle);

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    table.addEventListener('click',function (e) {
        if(e.target.tagName.toLowerCase()=='button'){
            e.target.addEventListener('click',delBtnHandle);
            e.target.click();
        }
    });
}

init();