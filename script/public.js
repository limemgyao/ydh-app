(function(window) { //系统配置
    window.public = {};
    //转时间
    public.convert_date = function(data_value, fmt) {
            var date = null;
            date = new Date(parseInt(data_value.replace(/[^\d\-]/g, "")));
            if (fmt == undefined) fmt = "yyyy-MM-dd"; //如果没有格式，默认格式
            var o = {
                "M+": date.getMonth() + 1, //月份
                "d+": date.getDate(), //日
                "h+": date.getHours(), //小时
                "m+": date.getMinutes(), //分
                "s+": date.getSeconds(), //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;

        }
        //验证身份证
    public.check_id = function(value) {
        var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; //加权因子
        var arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2]; //校验码
        if (/^\d{17}\d|x$/i.test(value)) {
            var sum = 0,
                idx;
            for (var i = 0; i < value.length - 1; i++) {
                // 对前17位数字与权值乘积求和
                sum += parseInt(value.substr(i, 1), 10) * arrExp[i];
            }
            // 计算模（固定算法）
            idx = sum % 11;
            // 检验第18为是否与校验码相等
            return arrValid[idx] == value.substr(17, 1).toUpperCase();
        } else {
            return false;
        }
    }
})(window);
