(function(window) {
    var s_p = {};
    var alipays;
    var wxPay;
    var istest = true;  //是否是测试
    var al_notifyUrl = 'http://175.102.18.104:8002/Ali_Notify.aspx'; //测试阿里支付回调
    var wx_notifyUrl = 'http://175.102.18.104:8002/Wx_Notify.aspx'; //测试微信支付回调

    s_p.aliPayHelper = function(data, callbakcfuc) {
        alipays = api.require("aliPay");
        try {
            alipays.config({
                partner: '2088121185851943',
                seller: '2088121185851943',
                rsaPriKey: 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAKoOjm5FsXH02EJqt8KvJg3iP3EF94vT5XW74IuQzqk3hI3OsvDXyrDb2OP8tivouUthSJ+1bdp47+gxYVmHhaLUbaBQNsJoqo5owcECdlxosPxCfI1Yfih5GnI223pgrhDdJyV0AuxzhNW2945iH5Jvjr20E/q61nLe0UgqlKChAgMBAAECgYAseQAQoJNGPQTtYaFK/akTCm8S7L+PRswEXSzc8vLI2CcHOt4bFCQC2ou/G9C8bPFAYGGwuq7O6r+61mciFcoBnS3413H6BsUmhRRyaCVTkEl+JnKS1YGOwnpplXQQAmw2hm0VsN5/4aS0uuhjVkXqmwL1RtffCHfJyFe2Ns0qQQJBANN0xYddfudY/zyrIC2VoHr0VgXhl+F5PTmvBEWUqIKafIgeYg/yFNVA07aOnabM6Pa+6VkI0iFEj338qTZ98TkCQQDN4T1JLCuUkcC6jhl/CmlslBb3ASL1/X3OWKcyZBa7u9O+ax6f+Vm+nBlPAUp9y3yaaTXKaMxvd0wRTNpdLXKpAkEApytC2fBFWlpWdj0HVGJdG7c8pquhagRyLb86TlPnIFFHsEjs15RXefwlI8b9xZdreV6WlefOT7SnCEAN+mF4qQJABXqI9vmF714xksVVSFwukgUe11PgaktknakeSej/8d79s4OGPRuVl8zvn3qZUN+pYTKLi+deCVlTXOJ+rRwYgQJAPiw5h4YJnJm0dKQNqu17FwcCMYWgfgyNExFSTJe1PHBStG5FebpTxROc97csNOBBXjV4IBreRDk4DGQ+I9xRkw==',
                rsaPubKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCnxj/9qwVfgoUh/y2W89L6BkRAFljhNhgPdyPuBV64bfQNN1PjbCzkIM6qRdKBoLPXmKKMiFYnkd6rAoprih3/PrQEB/VsW8OoM8fxn67UDYuyBTqA23MML9q1+ilIZwBC2AQ2UBVOrFXfFl75p6/B5KsiNG9zpgmLCUYuLkxpLQIDAQAB',
                notifyURL: istest ? al_notifyUrl : 'http://m.youduhui.com:8002/Ali_Notify.aspx'
            }, function(ret, err) {
                ///如果支付成功了
                try {
                    if (ret.status) {
                        alipays.pay({
                            subject: data.subject,
                            body: data.body,
                            amount: data.amount,
                            tradeNO: data.tradeNO
                        }, function(ret, err) {
                            callbakcfuc(ret, err);
                        });
                    } else {
                        alert(err);
                    }
                } catch (e) {}
            });
        } catch (e) {}
    };
    s_p.wxPayHelper = function(data, callbakcfuc) {
        wxPay = api.require('wxPay');
        try {
            wxPay.config({
                apiKey: 'wx93a4a0149e95cd8e',
                mchId: '1280663801',
                partnerKey: 'fd0536a982cbda79e3229f180b06b102',
                notifyUrl: istest ? wx_notifyUrl : 'http://m.youduhui.com:8002/Wx_Notify.aspx'
            }, function(ret, err) {
                try {

                    if (ret.status) {
                        wxPay.pay({
                            description: data.description,
                            totalFee: data.totalFee, //
                            tradeNo: data.tradeNo,
                            attach: data.attach
                        }, function(ret, err) {
                            try {
                                callbakcfuc(ret, err);
                            } catch (e) {}
                        });
                    } else {
                        alert(err.msg);
                    }
                } catch (e) {}
            });
        } catch (e) {}
    };


    window.$payObject = s_p;
})(window);
