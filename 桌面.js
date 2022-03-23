window.addEventListener('load', function () {
    //桌面部分
    var Desk = document.querySelectorAll('.Desk');
    var calculator = document.getElementById('calculator');
    var calcuClose = document.querySelector('#calcu-close');
    var head = document.querySelector('#head');
    for (var i = 0; i < Desk.length; i++) {
        Desk[i].addEventListener('mouseover', function () {
            this.style.backgroundColor = 'rgba(235,235,235,0.8)';
        })
        Desk[i].addEventListener('mouseout', function () {
            this.style.backgroundColor = '';
        })
        Desk[i].addEventListener('click', function () {
            for (var j = 0; j < Desk.length; j++) {
                Desk[j].style.borderColor = 'transparent';
            }
            this.style.borderColor = 'grey';
            this.style.backgroundColor = 'rgba(225,225,225,0.8)';
        })
    }
    Desk[0].addEventListener('dblclick', function () {
        this.style.borderColor = 'transparent';
        calculator.style.display = 'block';
    })
    Desk[1].addEventListener('dblclick', function () {
        this.style.borderColor = 'transparent';
        wechatBody.style.display = 'block';
        chat.scrollTop = chat.scrollHeight - chat.offsetHeight;
    })
    //计算器部分
    var menu = document.querySelector('#menu');
    var menuIcon = document.querySelector('#menu-icon');
    var result = document.querySelector('#result');
    var process = document.querySelector('#process');
    calcuClose.addEventListener('click', function (e) {
        calculator.style.display = 'none';
        e.stopPropagation();
    })
    head.addEventListener('mousedown', function (e) {
        var x, y;
        function fn(e) {
            calculator.style.left = e.pageX - x + 'px';
            calculator.style.top = e.pageY - y + 'px';
        }
        x = e.pageX - calculator.offsetLeft;
        y = e.pageY - calculator.offsetTop;
        document.addEventListener('mousemove', fn);
        document.addEventListener('mouseup', function () {
            document.removeEventListener('mousemove', fn);
        })
    });
    var strs = '';
    var num = 0;
    var flag1 = 1;//用于监听menu的开闭
    var flag2 = 1;//用于监听是否使用等号
    function move(obj, position, fn) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var step = (position - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == position) {
                clearInterval(obj.timer);
                fn && fn();
            }
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 8);
    }
    menuIcon.addEventListener('click', function (e) {
        if (flag1 == 0) {
            move(menu, -menu.offsetWidth);
            flag1 = 1;
        } else {
            menu.style.left = -menu.offsetWidth + 'px';
            menu.style.top = 3 - menu.offsetHeight + 'px';
            move(menu, 0);
            flag1 = 0;
        }
        e.stopPropagation();
    });
    menu.addEventListener('click', function (e) {
        e.stopPropagation();
    });
    calculator.addEventListener('click', function () {
        if (flag1 == 0) {
            move(menu, -menu.offsetWidth);
            flag1 = 1;
        }
    });
    function printStrs(strs) {
        while (strs.indexOf('*') != -1 || strs.indexOf('/') != -1) {
            strs = strs.replace('*', '×');
            strs = strs.replace('/', '÷');
        }
        return strs;
    }
    this.onClick = function (obj) {
        var str = obj.innerText;
        if (str == '=') {
            if (strs == '') {
                return -1;
            }
            num = eval(strs);
            strs += ' ' + str + ' ';
            process.innerHTML = printStrs(strs);
            result.innerHTML = Number(num).toLocaleString();
            strs = num.toString();
            flag2 = 0;
        }
        else if (str == 'C') {
            strs = '';
            str = 0;
            num = 0;
            process.innerHTML = printStrs(strs);
            result.innerText = num;
        }
        else if (str == '+' || str == '-') {
            flag2 = 1;
            if (strs != '') {
                if (strs.indexOf('+') != -1 || strs.indexOf('-') != -1 || strs.indexOf('*') != -1 || strs.indexOf('/') != -1) {
                    num = eval(strs);
                    strs = num + ' ' + str + ' ';
                    process.innerHTML = printStrs(strs);
                    result.innerHTML = Number(num).toLocaleString();
                } else {
                    strs += ' ' + str + ' ';
                    process.innerHTML = printStrs(strs);
                }
            }
            else {
                strs += '0';
                strs += ' ' + str + ' ';
                process.innerHTML = printStrs(strs);
            }
        }
        else if (str == '×') {
            flag2 = 1;
            if (strs != '') {
                if (strs.indexOf('+') != -1 || strs.indexOf('-') != -1 || strs.indexOf('*') != -1 || strs.indexOf('/') != -1) {
                    num = eval(strs);
                    strs += ' * ';
                    process.innerHTML = printStrs(strs);
                    result.innerHTML = Number(num).toLocaleString();
                    strs = num.toString();
                }
                strs += ' * ';
                process.innerHTML = printStrs(strs);
            }
            else {
                strs += '0';
                strs += ' * ';
                process.innerHTML = printStrs(strs);
            }
        }
        else if (str == '÷') {
            flag2 = 1;
            if (strs != '') {
                if (strs.indexOf('+') != -1 || strs.indexOf('-') != -1 || strs.indexOf('*') != -1 || strs.indexOf('/') != -1) {
                    num = eval(strs);
                    strs += ' / ';
                    process.innerHTML = printStrs(strs);
                    result.innerHTML = Number(num).toLocaleString();
                    strs = num.toString();
                }
                strs += ' / ';
                process.innerHTML = printStrs(strs);
            }
            else {
                strs += '0';
                strs += ' / ';
                process.innerHTML = printStrs(strs);
            }

        }
        else {
            if (flag2 == 0) {
                //如果使用了等号 再输入数字就要初始化
                strs = '';
                num = 0;
                process.innerHTML = printStrs(strs);
                result.innerText = num;
                flag2 = 1;
            }
            var index1 = strs.lastIndexOf('-');
            var index2 = strs.lastIndexOf('+');
            var index3 = strs.lastIndexOf('*');
            var index4 = strs.lastIndexOf('/');
            var indexAll = index1 + index2 + index3 + index4;
            strs += str;
            console.log(strs);
            if (indexAll != -4) {
                result.innerHTML = '';
                for (var i = Math.max(index1, index2, index3, index4) + 2; i < strs.length; i++) {
                    //从最后一个字符开始读取数字
                    result.innerHTML += strs[i];
                }
                result.innerHTML = Number(result.innerHTML).toLocaleString();
            }
            else {
                result.innerHTML = Number(strs).toLocaleString();
            }

        }
    }

    //微信部分
    var wechatClose = document.querySelector('#wechat-close');
    var chat = document.querySelector('#chat');
    var send = document.querySelector('#send');
    var wechatBody = document.querySelector('#wechat-body');
    var inputText = document.querySelector('#input-text');
    var rtBox = document.querySelector('.rt-box');
    wechatClose.addEventListener('click', function (e) {
        wechatBody.style.display = 'none';
        e.stopPropagation();
    })
    rtBox.addEventListener('mousedown', function (e) {
        var x, y;
        function fn(event) {
            wechatBody.style.left = event.pageX - x + 'px';
            wechatBody.style.top = event.pageY - y + 'px';
        }
        x = e.pageX - wechatBody.offsetLeft;
        y = e.pageY - wechatBody.offsetTop;
        document.addEventListener('mousemove', fn);
        document.addEventListener('mouseup', function () {
            document.removeEventListener('mousemove', fn);
        })

    });
    inputText.addEventListener('keydown', function (event) {
        if (event.ctrlKey && event.key === 'Enter') {
            inputText.value += '\n';
        } else if (event.key === 'Enter') {
            event.preventDefault();
            send.click();
        }
    });
    function countTime() {
        var _now = new Date();
        var hour = _now.getHours();
        hour = hour >= 10 ? hour : '0' + hour;
        var min = _now.getMinutes();
        min = min >= 10 ? min : '0' + min;
        return hour + ':' + min;
    }
    var alert1 = document.getElementById('alert1');
    var alert2 = document.getElementById('alert2');
    var alert3 = document.getElementById('alert3');
    function alertOpenAll() {
        alert1.style.display = 'block';
        alert2.style.display = 'block';
        alert3.style.display = 'block';
    }
    function alertCloseAll() {
        alert1.style.display = 'none';
        alert2.style.display = 'none';
        alert3.style.display = 'none';
    }
    send.onclick = function () {
        var newDiv = document.createElement('div');
        newDiv.className = "float-right chat-box";
        var comstrs = inputText.value.replaceAll('\n', '</br>');
        newDiv.innerHTML = '<img src="images/微信头像1.jpg" height="35" class="float-right user-select"><div class="triangle-me float-right"></div><div class="dialogue-me float-right" data-time="' + (+new Date()) + '">' + comstrs + '</div>';
        var _newDiv = document.createElement('div');
        _newDiv.className = "float-left time-box";
        _newDiv.innerHTML = '<span class="chat-time user-select">' + countTime() + '</span>';
        if (inputText.value.trim() == '') {
            alertOpenAll();
            setTimeout(alertCloseAll, 3000);
        }
        else {
            if (newDiv.children[newDiv.children.length - 1].dataset.time - chat.children[chat.children.length - 1].children[chat.children[chat.children.length - 1].children.length - 1].dataset.time > 120000) {
                chat.appendChild(_newDiv);
            }
            chat.appendChild(newDiv);
        }
        chat.scrollTop = chat.scrollHeight - chat.offsetHeight;
        inputText.value = '';
    }
})