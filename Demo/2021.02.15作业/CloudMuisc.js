//D:\JSONServer>npm run JSONServer_MPS
var banners_move = 0;
var banners_json;
var song_list;

function set_display_none() {
    document.querySelector("#srch-text").style.display = "none";
    document.querySelector(".search").focus();
}

function set_display() {
    document.querySelector("#srch-text").style.display = "block";
}

function choseTab(id, id_start, id_end, before_color, after_color) {
    document.getElementById(id).style.background = after_color;
    // console.log(id, before_color, after_color);
    for (var i = id_start; i <= id_end; i++) {
        if (i != id) {
            // console.log(i);
            document.getElementById(i).style.background = before_color;
        }
    }
}

window.onload = function () {
    choseTab(7, 7, 12, '#242424', '#000')
    choseTab(1, 1, 6, '#C20C0C', '#9B0909');
    load_banners(0);
    setInterval(banners_right, 3000);
    // setInterval(function () {
    //     for (var i = 0; i < 10; i++) {
    //         load_list(i);
    //     }
    // }, 1000);
    for (var i = 0; i < 9; i++) {
        load_list(i);
    }
}

function banners_right() {
    banners_move--;
    if (banners_move<0) {
        banners_move = banners_json.length - 1;
    }
    load_banners(banners_move);
}

function banners_left() {
    banners_move++;
    if (banners_move > banners_json.length - 1) {
        banners_move = 0;
    }
    load_banners(banners_move);
}

function load_banners(site) {
    var xml_http;
    if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xml_http = new XMLHttpRequest();
    } else {
        // IE6, IE5 浏览器执行代码
        xml_http = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xml_http.onreadystatechange = function () {
        if (xml_http.readyState == 4 && xml_http.status == 200) {
            banners_json = JSON.parse(xml_http.responseText);
            console.log(site);
            document.querySelector(".image img").src = banners_json[site].imageUrl;
            var back_image = document.querySelector(".image-box");
            back_image.style = "background-image:url(" + banners_json[site].imageUrl + "); ";
            var beforeStyle = window.getComputedStyle(back_image, ":before");
            console.log(beforeStyle.background); // 100px
            // document.styleSheets[0].addRule('.image-box::before', "background-image:url(" + banners_json[site].imageUrl + "); ");
            // document.styleSheets[0].insertRule(`.image-box::before { background-image:url(${banners_json[site].imageUrl}); }`, 0);
            $("<style>.image-box::before {content: ''; width: 100 % ; height: 285 px; position: absolute; background - image: url(" + banners_json[site].imageUrl + ");background-size: 10000px; background-position: center center; filter: blur(7px); -webkit-filter: blur(9px);} </style>").appendTo("head");
            document.querySelector(".image img").alt = banners_json[site].typeTitle;
        }
    }
    xml_http.open("GET", " http://localhost:3000/banners", true);
    xml_http.send();
}

function load_list(site) {
    var xml_http;
    if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xml_http = new XMLHttpRequest();
    } else {
        // IE6, IE5 浏览器执行代码
        xml_http = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xml_http.onreadystatechange = function () {
        if (xml_http.readyState == 4 && xml_http.status == 200) {
            song_list = JSON.parse(xml_http.responseText);
            console.log(document.querySelector(".AAAA").innerHTML);
            document.querySelector(".AAAA").innerHTML = `${document.querySelector(".AAAA").innerHTML}<li><div><img src="${song_list[site].picUrl}" alt="${song_list[site].copywriter}"><p>${song_list[site].name}</p></div></li>`;
        }
    }
    xml_http.open("GET", " http://localhost:3000/recommend", true);
    xml_http.send();
}
