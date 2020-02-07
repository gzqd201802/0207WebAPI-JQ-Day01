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
            // onclick="update(${index},false)"  => 点击复选框的时候改成未完成状态 
            doneHTMLStr += `
            <li>
                <input type="checkbox" onclick="update(${index},false)" checked>
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
                <input type="checkbox" onclick="update(${index},true)">
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


// 更新本地存储的索引值对应数据的状态
function update(index, status){
    // 1. 获取本地存储数据
    let data = getData('todo');
    // 2. 根据数组的索引值修改对应的数据
    data[index].done = status;
    // 3. 把数据重新保存到本地存储中
    saveData('todo',data);
    // 4. 页面列表需要更新
    renderList();
}

// update(1, true);     // 这个是测试用的代码，真正调用时点击时候调用


// 根据索引值删除数据
function delData(index){
    // 1. 获取本地存储数据
    let data = getData('todo');
    // 2. 根据索引值删除掉数组的某条数据
    data.splice(index,1);
    // 3. 重新把数组保存到本地存储
    saveData('todo',data);
    // 4. 页面列表需要更新
    renderList();
}

// delData(0);  // 这个是测试用的代码，真正调用是在页面的行内事件调用