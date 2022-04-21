function checkPwd() {
    var password = document.querySelector("#pwd").value;
    var Pattern_password = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{4,10}$/g;
    var password_massage = document.querySelector("#pwd_prompt");

    console.log(password);
    console.log(Pattern_password.test(password));

    if (Pattern_password.test(password))
    {
        password_massage.innerHTML = " ";
    }
    else
    {
        password_massage.innerHTML = "密码是4-10位的字符,必须包含字母数字！";
    }
}

function showPwd() {

}
