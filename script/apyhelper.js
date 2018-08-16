/*
支付方式，用于调用APP端的支付宝支付和阿里支付
*/
// 支付宝支付
// 支付显示的标题
// title
// fee 支付金额
//orderno 支付订单编号

if (api === 'undefined') {
    alert('api is not supped!')
}

(function(window) {
    var p = {};
    var alpay;
    var issucced = false;
    var callbakcfuc = 'undefined';
    var wxPay;
    alpay = api.require('aliPay'); //需要引用aliPay支付模块
    wxPay = api.require('wxPay');

    // subject: '支付标题信息',
    // body: '显示支付内容信息',
    // amount: 非小数点，固定数值,
    // tradeNO: '订单信息'
    p.payAliy = function(data, callback) {
        if (!data) {
            if (callback)
                callback({
                    'state': false,
                    'msg': '参数不能为空'
                });
        }
        alpay.config({
            partner: '2088121185851943',
            seller: '2088121185851943',
            rsaPriKey: 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKoOjm5FsXH02EJqt8KvJg3iP3EF94vT5XW74IuQzqk3hI3OsvDXyrDb2OP8tivouUthSJ+1bdp47+gxYVmHhaLUbaBQNsJoqo5owcECdlxosPxCfI1Yfih5GnI223pgrhDdJyV0AuxzhNW2945iH5Jvjr20E/q61nLe0UgqlKChAgMBAAECgYAseQAQoJNGPQTtYaFK/akTCm8S7L+PRswEXSzc8vLI2CcHOt4bFCQC2ou/G9C8bPFAYGGwuq7O6r+61mciFcoBnS3413H6BsUmhRRyaCVTkEl+JnKS1YGOwnpplXQQAmw2hm0VsN5/4aS0uuhjVkXqmwL1RtffCHfJyFe2Ns0qQQJBANN0xYddfudY/zyrIC2VoHr0VgXhl+F5PTmvBEWUqIKafIgeYg/yFNVA07aOnabM6Pa+6VkI0iFEj338qTZ98TkCQQDN4T1JLCuUkcC6jhl/CmlslBb3ASL1/X3OWKcyZBa7u9O+ax6f+Vm+nBlPAUp9y3yaaTXKaMxvd0wRTNpdLXKpAkEApytC2fBFWlpWdj0HVGJdG7c8pquhagRyLb86TlPnIFFHsEjs15RXefwlI8b9xZdreV6WlefOT7SnCEAN+mF4qQJABXqI9vmF714xksVVSFwukgUe11PgaktknakeSej/8d79s4OGPRuVl8zvn3qZUN+pYTKLi+deCVlTXOJ+rRwYgQJAPiw5h4YJnJm0dKQNqu17FwcCMYWgfgyNExFSTJe1PHBStG5FebpTxROc97csNOBBXjV4IBreRDk4DGQ+I9xRkw==',
            rsaPubKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCnxj/9qwVfgoUh/y2W89L6BkRAFljhNhgPdyPuBV64bfQNN1PjbCzkIM6qRdKBoLPXmKKMiFYnkd6rAoprih3/PrQEB/VsW8OoM8fxn67UDYuyBTqA23MML9q1+ilIZwBC2AQ2UBVOrFXfFl75p6/B5KsiNG9zpgmLCUYuLkxpLQIDAQAB',
            notifyURL: 'http://m.youduhui.com/WxPay/Ali_Notify.aspx'
        }, function(ret, err) {
            //初始化使用成功
            if (ret.status) {
                alpay.pay({
                    subject: data.subject,
                    body: data.body,
                    amount: data.amount,
                    tradeNO: data.tradeNO
                }, function(ret, err) {
                    callback && callback(ret, err)
                });
            } else {
                callback && callback(ret, err)
            }
        });
    };


    //微信支付
    // description: 商品或支付订单简要描述
    // attach: （可选项）附加数据，在查询 API 和支付通知中原样返回，该字段主要用于商户携带订单的自定义数据,
    // totalFee: 订单总金额，只能为整数，单位：分（￥）,
    // tradeNo: 商户系统内部的订单号，32个字符以内，可包含字母，其他说明见商户订单号,
    // timeStart: 描述：（可选项）订单生成时间，格式为 yyyyMMddHHmmss
    // callbakcfuc 回调函数
    p.payWxing = function(data, callbakcfuc) {

            if (!data) {
                if (callbakcfuc)
                    callbakcfuc({
                        'state': false,
                        'msg': '参数不能为空'
                    });
            }

            wxPay.config({
                apiKey: 'wx93a4a0149e95cd8e',
                mchId: '1280663801',
                partnerKey: 'fd0536a982cbda79e3229f180b06b102',
                notifyUrl: 'http://m.youduhui.com/WxPay/Notify.aspx'
            }, function(ret, err) {
                if (ret.status) {
                    wxPay.pay({
                        description: '',
                        totalFee: data.totalFee,//变成分
                        tradeNo: data.tradeNo,
                        attach: data.attach,
                    }, function(ret, err) {
                        if (ret.status) {
                            alert(ret.result);
                        } else {
                            alert(err.code);
                        }

                    });
                } else {
                    sysAlert(err.msg);
                }
            });

        }
        // 支付对象
    window.$pay = p;
})(window);
