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



// 查找待办的ul
const todolist = document.querySelector('#todolist');
// 查找已完成ul
const donelist = document.querySelector('#donelist');
// 待办的数量
const todocount = document.querySelector('#todocount');
// 已完成的数量
const donecount = document.querySelector('#donecount');

// 渲染列表
function renderList(){
    // 获取本地存储数据
    let data = getData('todo');

    // 数量数量准备
    let todoCountNum = 0;
    let doneCountNum = 0;

    // 列表的HTML结构准备
    let todoHTMLStr = '';
    let doneHTMLStr = '';

    // forEach 遍历数组，这里不用 map，因为 map 只返回一个数组，这里需要区别已完成和未完成
    data.forEach((item,index)=>{
        // 如果 done 的值为 true，就是拼接到完成的列表中
        if(item.done){
            // 根据数组的数据 - 拼接成一个个的 li 节点
            // 拼接完成的列表
            doneHTMLStr += `
            <li>
                <input type="checkbox" onchange="update(${index},false)" checked>
                <p id="p-${index}" onclick="editData(${index})">${item.title}</p>
                <a href="javascript:delData(${index})">-</a>
            </li>
            `;
            // 已完成数量增加
            doneCountNum++;
        }else{
            // 拼接未完成的列表
            todoHTMLStr += `
            <li>
                <input type="checkbox" onchange="update(${index},true)">
                <p id="p-${index}" onclick="editData(${index})">${item.title}</p>
                <a href="javascript:delData(${index})">-</a>
            </li>
            `;
            // 未完成数量增加
            todoCountNum++;
        }
    });

    

    // 把拼接的字符串写入到页面的列表中
    todolist.innerHTML = todoHTMLStr;
    donelist.innerHTML = doneHTMLStr;
    // 把数量更新到页面中
    todocount.innerHTML = todoCountNum;
    donecount.innerHTML = doneCountNum;
}

// 浏览器加载完毕的时候主动调用一下 renderList 列表渲染
window.addEventListener('load', renderList);


