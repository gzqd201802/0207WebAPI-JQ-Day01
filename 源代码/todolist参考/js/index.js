// 清除本地存储
function clear() {
    localStorage.clear();
    load();
}

// 存储格式
// [{title:xxx, done:false},{title:xxx, done:true}]

// 设置本地存储
function saveDate(data) {
    localStorage.setItem('todo', JSON.stringify(data));
}

// 获取本地存储
function loadData() {
    return JSON.parse(localStorage.getItem('todo')) || [];
}

// 提交数据事件
function postaction() {
    let title = document.querySelector('#title');
    let titleStr = title.value.trim();
    if (titleStr === '') {
        alert('内容不能为空');
    } else {
        let data = loadData();
        data.push({
            title: titleStr,
            done: false
        });
        // 保存到本地存储
        saveDate(data);
        title.value = '';
        load();
    }
}


// 删除项
function remove(index) {
    let data = loadData();
    // 根据索引值删除一项 并 获取到删除项
    data.splice(index, 1);
    saveDate(data);
    load();
}

// remove(0);

// 更新项
function update(index, key, value) {
    let data = loadData();
    // 根据索引值删除一项 并 获取到删除项
    let todo = data.splice(index, 1)[0];
    todo[key] = value;
    // 新增内容
    data.splice(index, 0, todo);
    // 保存本地存储
    saveDate(data);
    load();
}

// update(0,'title','666');


// 编辑项
function edit(index) {
    load();
    let p = this;
    title = p.innerHTML;
    p.innerHTML = `<input id="input-${index}" value="${title}" />`;
    let input = document.querySelector(`#input-${index}`);
    // 获取焦点
    input.focus();
    // 失去焦点更新数据
    input.onblur = function () {
        if (input.value.trim() === '') {
            p.innerHTML = title;
            alert('内容不能为空');
        } else {
            update(index, 'title', input.value);
        }
    }
}

function load() {
    let todolist = document.querySelector("#todolist");
    let donelist = document.querySelector("#donelist");
    // 获取本地存储数据
    let collection = localStorage.getItem("todo");

    if (collection != null) {
        let data = JSON.parse(collection);
        // 个数
        let todoCount = 0;
        let doneCount = 0;
        // 列表HTML字符串
        let todoHTMLString = "";
        let doneHTMLString = "";

        data.forEach((item, index) => {
            if (item.done) {
                doneHTMLString += `<li>
                    <input type="checkbox" checked onchange="update(${index},'done',false)">
                    <p id="p-${index}" onclick="edit(${index})">${item.title}</p>
                    <a href="javascript:remove(${index})">-</a>
                </li>`;
                doneCount++
            } else {
                todoHTMLString += `<li>
                    <input type="checkbox" onchange="update(${index},'done',true)">
                    <p id="p-${index}" onclick="edit(${index})">${item.title}</p>
                    <a href="javascript:remove(${index})">-</a>
                </li>`;
                todoCount++;
            }
        })

        todocount.innerHTML = todoCount;
        todolist.innerHTML = todoHTMLString;
        donecount.innerHTML = doneCount;
        donelist.innerHTML = doneHTMLString;

    } else {
        // 初始化
        todocount.innerHTML = 0;
        todolist.innerHTML = "";
        donecount.innerHTML = 0;
        donelist.innerHTML = "";
    }

}

// load();
window.addEventListener("load", load);


