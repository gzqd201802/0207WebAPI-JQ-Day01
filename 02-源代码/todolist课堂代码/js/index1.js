// 清空数据
function clearData() {
    localStorage.clear();
}

// 保存数据
function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// 获取数据
function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// 查找表单
const form = document.querySelector('#form');
// 查找输入框
const title = document.querySelector('#title');


// 给表单绑定提交事件，当提交表单的时候触发
form.addEventListener('submit',function(e){
    // 阻止表单默认的跳转行为
    e.preventDefault();
    // 获取输入框的值
    let titleStr = title.value.trim();
    // 如果为空提示
    if(titleStr === ''){
        alert('请输入内容');
    }
    // 不为空就把数据添加到本地存储中
    else{
        // 获取本地存储数据
        let data = getData('todo');
        // 添加数据
        data.unshift({
            // 代表实现的内容
            title:titleStr,
            // 默认完成状态为 false
            done: false
        });
        // 保存到本地存储
        saveData('todo',data);
        // 最后把输入框的内容清空
        title.value = '';
    }
});


