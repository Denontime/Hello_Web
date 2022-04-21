function Display() {
    document.querySelector(".post").style.display = "block";
}

function MassagePost() {
    var massage_state = false;
    var massage_title = document.querySelector(".title").value;
    var select_array = document.querySelector("select").options;
    var select_index = document.querySelector("select").selectedIndex;
    var massage_itemize = select_array[select_index].text;
    var massage_text = document.querySelector(".content").value;

    // console.log(massage_text.length);

    if (massage_title == "") //判断是否输入标题
    {
        alert("请输入文章的标题.");
    } else {
        if (!select_index) {
            alert("请选择文章所属的分类.");
        } else {
            if (massage_text.length < 5) {
                alert("正文字数不少于5字符.");
            } else {
                massage_state = true;
            }
        }
    }

    if (massage_state) {
        document.querySelector(".post").style.display = "none"; //隐藏发帖界面

        var node = document.createElement("li"); //创建帖子

        var HandImage = document.createElement("div"); //创建头像容器
        node.appendChild(HandImage);

        var image = document.createElement("img"); //创建头像
        var src = document.createAttribute("src");
        src.value = "images/tou01.jpg";
        image.setAttributeNode(src);
        HandImage.appendChild(image);

        var title = document.createElement("h1"); //创建标题
        var title_text = document.createTextNode(massage_title);
        title.appendChild(title_text);
        node.appendChild(title);

        var massage = document.createElement("p"); //创建文章信息容器
        node.appendChild(massage);


        var massage_sort = document.createElement("span");
        var sort = document.createTextNode("板块：" + massage_itemize);
        massage_sort.appendChild(sort);
        massage.appendChild(massage_sort);

        var massage_time = document.createElement("span");
        var time = document.createTextNode("发表时间：" + Get_time());
        massage_time.appendChild(time);
        massage.appendChild(massage_time);

        document.querySelector("section>ul").appendChild(node); //添加帖子

        Refresh_massage();
    }
}

function Refresh_massage() {
    document.querySelector(".title").value = "";
    document.querySelector("select").selectedIndex = 0;
    document.querySelector(".content").value = "";
}

function Get_time() {
    var date = new Date();
    return (date.getFullYear() + "-" + date.getMonth() + 1 + "-" + date.getDate() + " " +
        date.getHours() + ":" +
        date.getMinutes());
}

function Text_length() {
    var massage_text = document.querySelector(".content").value;
    var text_len = document.querySelector(".text_count");
    text_len.innerText = "总计" + massage_text.length + "字";
}
