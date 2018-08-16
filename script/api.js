/*
 * APICloud JavaScript Library
 * Copyright (c) 2014 apicloud.com
 */
(function(window) {
        var u = {};
        var isAndroid = (/android/gi).test(navigator.appVersion);
        var uzStorage = function() {
            var ls = window.localStorage;
            if (isAndroid) {
                ls = os.localStorage();
            }
            return ls;
        };

        function parseArguments(url, data, fnSuc, dataType) {
            if (typeof(data) == 'function') {
                dataType = fnSuc;
                fnSuc = data;
                data = undefined;
            }
            if (typeof(fnSuc) != 'function') {
                dataType = fnSuc;
                fnSuc = undefined;
            }
            return {
                url: url,
                data: data,
                fnSuc: fnSuc,
                dataType: dataType
            };
        }
        u.trim = function(str) {
            if (String.prototype.trim) {
                return str == null ? "" : String.prototype.trim.call(str);
            } else {
                return str.replace(/(^\s*)|(\s*$)/g, "");
            }
        };
        u.trimAll = function(str) {
            return str.replace(/\s*/g, '');
        };
        u.isElement = function(obj) {
            return !!(obj && obj.nodeType == 1);
        };
        u.isArray = function(obj) {
            if (Array.isArray) {
                return Array.isArray(obj);
            } else {
                return obj instanceof Array;
            }
        };
        u.isEmptyObject = function(obj) {
            if (JSON.stringify(obj) === '{}') {
                return true;
            }
            return false;
        };
        u.addEvt = function(el, name, fn, useCapture) {
            if (!u.isElement(el)) {
                console.warn('$api.addEvt Function need el param, el param must be DOM Element');
                return;
            }
            useCapture = useCapture || false;
            if (el.addEventListener) {
                el.addEventListener(name, fn, useCapture);
            }
        };
        u.rmEvt = function(el, name, fn, useCapture) {
            if (!u.isElement(el)) {
                console.warn('$api.rmEvt Function need el param, el param must be DOM Element');
                return;
            }
            useCapture = useCapture || false;
            if (el.removeEventListener) {
                el.removeEventListener(name, fn, useCapture);
            }
        };
        u.one = function(el, name, fn, useCapture) {
            if (!u.isElement(el)) {
                console.warn('$api.one Function need el param, el param must be DOM Element');
                return;
            }
            useCapture = useCapture || false;
            var that = this;
            var cb = function() {
                fn && fn();
                that.rmEvt(el, name, cb, useCapture);
            };
            that.addEvt(el, name, cb, useCapture);
        };
        u.dom = function(el, selector) {
            if (arguments.length === 1 && typeof arguments[0] == 'string') {
                if (document.querySelector) {
                    return document.querySelector(arguments[0]);
                }
            } else if (arguments.length === 2) {
                if (el.querySelector) {
                    return el.querySelector(selector);
                }
            }
        };
        u.domAll = function(el, selector) {
            if (arguments.length === 1 && typeof arguments[0] == 'string') {
                if (document.querySelectorAll) {
                    return document.querySelectorAll(arguments[0]);
                }
            } else if (arguments.length === 2) {
                if (el.querySelectorAll) {
                    return el.querySelectorAll(selector);
                }
            }
        };
        u.byId = function(id) {
            return document.getElementById(id);
        };
        u.first = function(el, selector) {
            if (arguments.length === 1) {
                if (!u.isElement(el)) {
                    console.warn('$api.first Function need el param, el param must be DOM Element');
                    return;
                }
                return el.children[0];
            }
            if (arguments.length === 2) {
                return this.dom(el, selector + ':first-child');
            }
        };
        u.last = function(el, selector) {
            if (arguments.length === 1) {
                if (!u.isElement(el)) {
                    console.warn('$api.last Function need el param, el param must be DOM Element');
                    return;
                }
                var children = el.children;
                return children[children.length - 1];
            }
            if (arguments.length === 2) {
                return this.dom(el, selector + ':last-child');
            }
        };
        u.eq = function(el, index) {
            return this.dom(el, ':nth-child(' + index + ')');
        };
        u.not = function(el, selector) {
            return this.domAll(el, ':not(' + selector + ')');
        };
        u.prev = function(el) {
            if (!u.isElement(el)) {
                console.warn('$api.prev Function need el param, el param must be DOM Element');
                return;
            }
            var node = el.previousSibling;
            if (node.nodeType && node.nodeType === 3) {
                node = node.previousSibling;
                return node;
            }
        };
        u.next = function(el) {
            if (!u.isElement(el)) {
                console.warn('$api.next Function need el param, el param must be DOM Element');
                return;
            }
            var node = el.nextSibling;
            if (node.nodeType && node.nodeType === 3) {
                node = node.nextSibling;
                return node;
            }
        };
        u.closest = function(el, selector) {
            if (!u.isElement(el)) {
                console.warn('$api.closest Function need el param, el param must be DOM Element');
                return;
            }
            var doms, targetDom;
            var isSame = function(doms, el) {
                var i = 0,
                    len = doms.length;
                for (i; i < len; i++) {
                    if (doms[i].isEqualNode(el)) {
                        return doms[i];
                    }
                }
                return false;
            };
            var traversal = function(el, selector) {
                doms = u.domAll(el.parentNode, selector);
                targetDom = isSame(doms, el);
                while (!targetDom) {
                    el = el.parentNode;
                    if (el != null && el.nodeType == el.DOCUMENT_NODE) {
                        return false;
                    }
                    traversal(el, selector);
                }

                return targetDom;
            };

            return traversal(el, selector);
        };
        u.contains = function(parent, el) {
            var mark = false;
            if (el === parent) {
                mark = true;
                return mark;
            } else {
                do {
                    el = el.parentNode;
                    if (el === parent) {
                        mark = true;
                        return mark;
                    }
                } while (el === document.body || el === document.documentElement);

                return mark;
            }

        };
        u.remove = function(el) {
            if (el && el.parentNode) {
                el.parentNode.removeChild(el);
            }
        };
        u.attr = function(el, name, value) {
            if (!u.isElement(el)) {
                console.warn('$api.attr Function need el param, el param must be DOM Element');
                return;
            }
            if (arguments.length == 2) {
                return el.getAttribute(name);
            } else if (arguments.length == 3) {
                el.setAttribute(name, value);
                return el;
            }
        };
        u.removeAttr = function(el, name) {
            if (!u.isElement(el)) {
                console.warn('$api.removeAttr Function need el param, el param must be DOM Element');
                return;
            }
            if (arguments.length === 2) {
                el.removeAttribute(name);
            }
        };
        u.hasCls = function(el, cls) {
            if (!u.isElement(el)) {
                console.warn('$api.hasCls Function need el param, el param must be DOM Element');
                return;
            }
            if (el.className.indexOf(cls) > -1) {
                return true;
            } else {
                return false;
            }
        };
        u.addCls = function(el, cls) {
            if (!u.isElement(el)) {
                console.warn('$api.addCls Function need el param, el param must be DOM Element');
                return;
            }
            if ('classList' in el) {
                el.classList.add(cls);
            } else {
                var preCls = el.className;
                var newCls = preCls + ' ' + cls;
                el.className = newCls;
            }
            return el;
        };
        u.removeCls = function(el, cls) {
            if (!u.isElement(el)) {
                console.warn('$api.removeCls Function need el param, el param must be DOM Element');
                return;
            }
            if ('classList' in el) {
                el.classList.remove(cls);
            } else {
                var preCls = el.className;
                var newCls = preCls.replace(cls, '');
                el.className = newCls;
            }
            return el;
        };
        u.toggleCls = function(el, cls) {
            if (!u.isElement(el)) {
                console.warn('$api.toggleCls Function need el param, el param must be DOM Element');
                return;
            }
            if ('classList' in el) {
                el.classList.toggle(cls);
            } else {
                if (u.hasCls(el, cls)) {
                    u.removeCls(el, cls);
                } else {
                    u.addCls(el, cls);
                }
            }
            return el;
        };
        u.val = function(el, val) {
            if (!u.isElement(el)) {
                console.warn('$api.val Function need el param, el param must be DOM Element');
                return;
            }
            if (arguments.length === 1) {
                switch (el.tagName) {
                    case 'SELECT':
                        var value = el.options[el.selectedIndex].value;
                        return value;
                        break;
                    case 'INPUT':
                        return el.value;
                        break;
                    case 'TEXTAREA':
                        return el.value;
                        break;
                }
            }
            if (arguments.length === 2) {
                switch (el.tagName) {
                    case 'SELECT':
                        el.options[el.selectedIndex].value = val;
                        return el;
                        break;
                    case 'INPUT':
                        el.value = val;
                        return el;
                        break;
                    case 'TEXTAREA':
                        el.value = val;
                        return el;
                        break;
                }
            }

        };
        u.prepend = function(el, html) {
            if (!u.isElement(el)) {
                console.warn('$api.prepend Function need el param, el param must be DOM Element');
                return;
            }
            el.insertAdjacentHTML('afterbegin', html);
            return el;
        };
        u.append = function(el, html) {
            if (!u.isElement(el)) {
                console.warn('$api.append Function need el param, el param must be DOM Element');
                return;
            }
            el.insertAdjacentHTML('beforeend', html);
            return el;
        };
        u.before = function(el, html) {
            if (!u.isElement(el)) {
                console.warn('$api.before Function need el param, el param must be DOM Element');
                return;
            }
            el.insertAdjacentHTML('beforebegin', html);
            return el;
        };
        u.after = function(el, html) {
            if (!u.isElement(el)) {
                console.warn('$api.after Function need el param, el param must be DOM Element');
                return;
            }
            el.insertAdjacentHTML('afterend', html);
            return el;
        };
        u.html = function(el, html) {
            if (!u.isElement(el)) {
                console.warn('$api.html Function need el param, el param must be DOM Element');
                return;
            }
            if (arguments.length === 1) {
                return el.innerHTML;
            } else if (arguments.length === 2) {
                el.innerHTML = html;
                return el;
            }
        };
        u.text = function(el, txt) {
            if (!u.isElement(el)) {
                console.warn('$api.text Function need el param, el param must be DOM Element');
                return;
            }
            if (arguments.length === 1) {
                return el.textContent;
            } else if (arguments.length === 2) {
                el.textContent = txt;
                return el;
            }
        };
        u.offset = function(el) {
            if (!u.isElement(el)) {
                console.warn('$api.offset Function need el param, el param must be DOM Element');
                return;
            }
            var sl = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
            var st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

            var rect = el.getBoundingClientRect();
            return {
                l: rect.left + sl,
                t: rect.top + st,
                w: el.offsetWidth,
                h: el.offsetHeight
            };
        };
        u.css = function(el, css) {
            if (!u.isElement(el)) {
                console.warn('$api.css Function need el param, el param must be DOM Element');
                return;
            }
            if (typeof css == 'string' && css.indexOf(':') > 0) {
                el.style && (el.style.cssText += ';' + css);
            }
        };
        u.cssVal = function(el, prop) {
            if (!u.isElement(el)) {
                console.warn('$api.cssVal Function need el param, el param must be DOM Element');
                return;
            }
            if (arguments.length === 2) {
                var computedStyle = window.getComputedStyle(el, null);
                return computedStyle.getPropertyValue(prop);
            }
        };
        u.jsonToStr = function(json) {
            if (typeof json === 'object') {
                return JSON && JSON.stringify(json);
            }
        };
        u.strToJson = function(str) {
            if (typeof str === 'string') {
                return JSON && JSON.parse(str);
            }
        };
        u.setStorage = function(key, value) {
            if (arguments.length === 2) {
                var v = value;
                if (typeof v == 'object') {
                    v = JSON.stringify(v);
                    v = 'obj-' + v;
                } else {
                    v = 'str-' + v;
                }
                var ls = uzStorage();
                if (ls) {
                    ls.setItem(key, v);
                }
            }
        };
        u.getStorage = function(key) {
            var ls = uzStorage();
            if (ls) {
                var v = ls.getItem(key);
                if (!v) {
                    return;
                }
                if (v.indexOf('obj-') === 0) {
                    v = v.slice(4);
                    return JSON.parse(v);
                } else if (v.indexOf('str-') === 0) {
                    return v.slice(4);
                }
            }
        };
        u.rmStorage = function(key) {
            var ls = uzStorage();
            if (ls && key) {
                ls.removeItem(key);
            }
        };
        u.clearStorage = function() {
            var ls = uzStorage();
            if (ls) {
                ls.clear();
            }
        };


        /*by king*/
        u.fixIos7Bar = function(el) {
            if (!u.isElement(el)) {
                console.warn('$api.fixIos7Bar Function need el param, el param must be DOM Element');
                return;
            }
            var strDM = api.systemType;
            if (strDM == 'ios') {
                var strSV = api.systemVersion;
                var numSV = parseInt(strSV, 10);
                var fullScreen = api.fullScreen;
                var iOS7StatusBarAppearance = api.iOS7StatusBarAppearance;
                if (numSV >= 7 && !fullScreen && iOS7StatusBarAppearance) {
                    el.style.paddingTop = '20px';
                }
            }
        };
        u.fixStatusBar = function(el) {
            if (!u.isElement(el)) {
                console.warn('$api.fixStatusBar Function need el param, el param must be DOM Element');
                return;
            }
            var sysType = api.systemType;
            if (sysType == 'ios') {
                u.fixIos7Bar(el);
            } else if (sysType == 'android') {
                var ver = api.systemVersion;
                ver = parseFloat(ver);
                if (ver >= 4.4) {
                    el.style.paddingTop = '25px';
                }
            }
        };
        u.toast = function(title, text, time) {
            var opts = {};
            var show = function(opts, time) {
                api.showProgress(opts);
                setTimeout(function() {
                    api.hideProgress();
                }, time);
            };
            if (arguments.length === 1) {
                var time = time || 500;
                if (typeof title === 'number') {
                    time = title;
                } else {
                    opts.title = title + '';
                }
                show(opts, time);
            } else if (arguments.length === 2) {
                var time = time || 500;
                var text = text;
                if (typeof text === "number") {
                    var tmp = text;
                    time = tmp;
                    text = null;
                }
                if (title) {
                    opts.title = title;
                }
                if (text) {
                    opts.text = text;
                }
                show(opts, time);
            }
            if (title) {
                opts.title = title;
            }
            if (text) {
                opts.text = text;
            }
            time = time || 500;
            show(opts, time);
        };
        u.post = function( /*url,data,fnSuc,dataType*/ ) {
            var argsToJson = parseArguments.apply(null, arguments);
            var json = {};
            var fnSuc = argsToJson.fnSuc;
            argsToJson.url && (json.url = argsToJson.url);
            argsToJson.data && (json.data = argsToJson.data);
            if (argsToJson.dataType) {
                var type = argsToJson.dataType.toLowerCase();
                if (type == 'text' || type == 'json') {
                    json.dataType = type;
                }
            } else {
                json.dataType = 'json';
            }
            json.method = 'post';
            api.ajax(json,
                function(ret, err) {
                    if (ret) {
                        fnSuc && fnSuc(ret);
                    }
                }
            );
        };
        u.get = function( /*url,fnSuc,dataType*/ ) {
            var argsToJson = parseArguments.apply(null, arguments);
            var json = {};
            var fnSuc = argsToJson.fnSuc;
            argsToJson.url && (json.url = argsToJson.url);
            //argsToJson.data && (json.data = argsToJson.data);
            if (argsToJson.dataType) {
                var type = argsToJson.dataType.toLowerCase();
                if (type == 'text' || type == 'json') {
                    json.dataType = type;
                }
            } else {
                json.dataType = 'text';
            }
            json.method = 'get';
            api.ajax(json,
                function(ret, err) {
                    if (ret) {
                        fnSuc && fnSuc(ret);
                    }
                }
            );
        };
        //==============操作用户缓存==================================

        u.user = {};
        u.user.islogin = function() {
            var usr = u.getStorage("user");
            if (!(typeof(usr) == "undefined" || usr == undefined || usr == null) && usr.hasOwnProperty('user_login')) {
                  return usr.user_login;
        }
        return false;
    };
    // 用户ID
    u.user.userid = function() {
        var usr = u.getStorage("user");
        if (usr && usr.hasOwnProperty('user_id'))
            return usr.user_id;

        return 0;
    }
    //用户姓名
    u.user.username = function() {
        var usr = u.getStorage("user");
        if (usr && usr.hasOwnProperty('user_name'))
            return usr.user_name;
        return "";
    }
    // 用户手机号
    u.user.mobile = function() {
        var usr = u.getStorage("user");
        if (usr && usr.hasOwnProperty('user_mobile'))
            return usr.user_mobile;
        return "";
    }

    //用户对象
    u.user.info = function() {
        return u.getStorage("user");
    }

    // 用户存储
    // 此方法仅从登陆成功， 注册成功时候调用
    u.user.setInfo = function(data) {
        var _user = data;
        if (!(typeof(_user) == "undefined" || _user == undefined || _user == null)) {
            if (!_user.hasOwnProperty('user_mobile'))
                _user.prototype.user_mobile = "";

            if (!_user.hasOwnProperty('user_id'))
                _user.prototype.user_id = "";

            if (!_user.hasOwnProperty('user_name'))
                _user.prototype.user_name = "";

        } else {
            _user = {
                "user_mobile": "",
                "user_id": 0,
                "user_name": "",
                "user_login": false
            };
        }
        u.setStorage("user",_user);
    };




    u.set_User_Storage = function(data) {
        u.setStorage("User", data);
        u.setStorage("user_login", "true");
        u.setStorage("user_name", data.MebName);
        u.setStorage("user_id", data.ID);
        u.setStorage("user_mobile", data.Mobile);
    }
    u.rm_User_Storage = function() {
        u.rmStorage("user_login");
        u.rmStorage("User");
        u.rmStorage("user_name");
        u.rmStorage("user_mobile");
        u.rmStorage("user_id");
    }
    u.get_User_Storage = function(valtype) {
        switch (valtype) {
            case 'User':
                return u.getStorage("User");
                break;
            case 'user_login':
                return u.getStorage("user_login");
                break;
            case 'user_name':
                return u.getStorage("user_name");
                break;
            case 'user_id':
                return u.getStorage("user_id");
                break;
            case 'user_mobile':
                return u.getStorage("user_mobile");
                break;
            default:
                break;
        }
    }

    //==============END==================================

    //t 只能是ord 或者 trl
    //用于图书等活动分享
    u.set_shareinfo = function(t,v) {
        u.setStorage("sharetype", t);
        u.setStorage("sharekey", v);
    }






    Date.prototype.Format = function(fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;

    };
    /*end*/


    window.$api = u;

})(window);
