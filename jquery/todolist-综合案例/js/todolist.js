$(function() {
    load();
    $("#title").on("keydown", function(event) {
        if (event.keyCode === 13) {
           if ($(this).val() === "") {
               alert("请输入您要的操作");
           } else {
                // 先读取本地存储原来的数据
                var local = getData();
                // console.log(local);
                // 把local数组进行更新数据 把最新的数据追加给local数组
                local.push({title: $(this).val(), done: "false"});
                // 把数组存储给本地存储
                saveData(local);
                // 把本地存储数据渲染加载到页面
                load();
                $(this).val("");
            }
        }
    });

    // 删除操作
    $("ol").on("click", "a", function() {
        // alert(11);
        // 先获取本地存储
        var data = getData();
        // console.log(data);

        // 修改数据
        var index = $(this).attr("id");
        // console.log(index);
        data.splice(index, 1);
        // 保存到本地存储
        saveData(data);
        // 重新渲染页面
        load();
    })

    // 正在进行和已完成选项操作
    $("ol, ul").on("click", "input", function() {
        // alert(11);
        var data = getData();
        var index = $(this).siblings("a").attr("id");
        // console.log(index);
        data[index].done = $(this).prop("checked");
        // console.log(data);
        saveData(data);
        load();
    })

    // 读取本地存储的数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data != null) {
            // 将获取的字符串格式转换为对象格式
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    // 保存本地存储数据
    function saveData(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    // 渲染加载数据
    function load() {
        // 读取本地存储的数据
        var data = getData();
        // console.log(data);
        // 遍历前清空ol里面的元素内容，然后在遍历
        $("ol, ul").empty();
        // 正在进行的个数
        var todoCount = 0;
        // 已经完成的个数
        var doneCount = 0;
        // 遍历这个数据
        $.each(data, function(i, n){
            // console.log(n);
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked'> <p>"+ n.title +"</p> <a href='javascript:;' id="+ i +"></a></li>");
                doneCount ++;
            } else {
                $("ol").prepend("<li><input type='checkbox' > <p>"+ n.title +"</p> <a href='javascript:;' id="+ i +"></a></li>");
                todoCount ++;
            }
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
})