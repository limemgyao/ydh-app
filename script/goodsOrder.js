$(document).ready(function() {
    GoodsOrder.successhide();
});

(function(window) { //提交订单
    window.GoodsOrder = {
        successshow: function() {
            $api.byId("success").style.display = "block";
            $api.byId("layer_success").style.display = "block";
        },

        successhide: function() {
            try {

                $api.byId("success").style.display = "none";
                $api.byId("layer_success").style.display = "none";
            } catch (e) {
                alert("请求失败,请检查网络是否正常");
            } finally {}
        },
        //查看订单
        Vieworder: function() {
            try {
                api.openFrame({
                    name: 'appordersuccess_win',
                    url: 'appordersuccess_win.html',
                    bounces: true,
                    pageParam: {
                        "orderid": $("#Hid_orderId").val().trim(),
                        "goodsid": $("#Hid_GoodsId").val().trim()
                    },
                    rect: {
                        x: 0,
                        y: 0,
                        w: 'auto',
                        h: 'auto'
                    }
                })
            } catch (e) {
                alert("请求失败,请检查网络是否正常");
            } finally {}



        },

        //检查数据
        check: function(data, payType) {
            var strMsg = "";
            try {
                var MaxSaleCount = Number($('#Hid_MaxSaleCount').val().trim() == "" ? "0" : $('#Hid_MaxSaleCount').val().trim());
                var number = Number($("#number").val().trim() == "" ? "0" : $("#number").val().trim());
                if (number > MaxSaleCount) {
                    strMsg = "此商品最大购买数量为：" + MaxSaleCount;
                } else if (payType != 1 && payType != 2) {
                    strMsg = "请选择支付方式";
                } else if (data == "" || data == undefined) {
                    strMsg = "付款商品信息异常";
                } else if (payType == 1) {
                    if (data.subject == "" || data.subject == undefined) {
                        strMsg = "商品清单不能为空";
                    } else if (data.body == "" || data.body == undefined) {
                        strMsg = "商品描述不能为空";
                    }
                    // else if (data.amount == "" || data.amount == undefined) {
                    //     strMsg = "支付金额不能为空";
                    // } else if (Number(data.amount) <= 0) {
                    //     strMsg = "支付金额必须大于0";
                    // }
                } else if (payType == 2) {
                    if (data.description == "" || data.description == undefined) {
                        strMsg = "商品名称不能为空";
                    }
                    // else if (data.totalFee == "" || data.totalFee == undefined) {
                    //     strMsg = "支付金额不能为空";
                    // } else if (Number(data.totalFee) <= 0) {
                    //     strMsg = "支付金额必须大于0";
                    // }
                }
                var username = $("#divMebName").text().trim(); //收货人
                var mobile = $("#divMobile").text().trim(); //收货人联系方式
                var address = $("#divAds").text().trim(); //地址
                if (username == '' || mobile == '' || address == '') {
                    strMsg = "请确保上方的收货信息已经填写完整!";
                }

                if (strMsg != "") {
                    alert(strMsg);
                    return false;
                } else {
                    return true;
                }
            } catch (e) {
                return false;
            }

        },
        //登录页跳转
        gologin: function() {
            api.openWin({
                name: 'login',
                url: 'login.html',
                bounces: true,
                animation: {
                    type: 'goodsOrder'
                },
                rect: {
                    x: 0,
                    y: 0,
                    w: 'auto',
                    h: 'auto'
                }
            });

        },
        //支付
        Submit: function() {
            try {
                //是否参加1元共享图书
                var gid = $api.val($api.byId('Hid_GoodsId'));
                if (gid == "435") {
                    GoodsOrder.checkAdlet(435);
                } else {
                    GoodsOrder.checkSubmit();
                }

            } catch (e) {
                alert("数据检测异常");
            } finally {

            }

        },
        checkSubmit: function() {

            if (!$api.user.islogin()) {
                GoodsOrder.gologin();
                return;
            }
            var payType = $("#Hid_payType").val();
            var GoodsName = $("#td_GoodsName").html().trim();
            if (GoodsName != "") {
                GoodsName = GoodsName.slice(0, 20) + '...';
            } else {
                GoodsName = "签名书";
            }
            var amount = $("#amount").html();
            var data = {};
            //1支付宝 2微信
            if (payType == 1) {
                if ($("#amount").html() != "" && Number($("#amount").html()) >= 0) {
                    amount = Number($("#amount").html()).toFixed(2);
                }
                data = {
                    "tradeNO": "",
                    "subject": GoodsName.toString(), //商品名称
                    "body": "购买签名书", //商品描述
                    "amount": amount.toString() //商品商额 单位元
                };
            } else if (payType == 2) {
                if ($("#amount").html() != "" && Number($("#amount").html()) >= 0) {
                    amount = Number($("#amount").html());
                    amount = (Number(amount) * 100);
                }
                data = {
                    "tradeNo": "",
                    "attach": "",
                    "description": GoodsName.toString(), //商品名称
                    "totalFee": amount.toString() //总金额 单位分
                };

            }
            //检查数据
            if (GoodsOrder.check(data, payType)) {
                //调用生成订单，并发起支付
                $api.removeCls(loading_layer, 'hide');
                $api.removeCls(loading_win, 'hide');
                GoodsOrder.order(data, payType);
            }
        },
        checkAdlet: function(adletid) {
            try {

                var mebid = $api.user.userid();
                var adlet = false;
                api.ajax({
                    url: app_apiconfig.CheckAdlet + 'adletid=' + adletid + '&mebid=' + mebid + '&mobile=',
                    method: 'get',
                }, function(json, err) {
                    if (json.Data != null && json.Data.ID > 0) {
                        alert("您已参加过【全民阅读 传阅有你】活动，不可重复下单！");
                        adlet = true;
                    }
                    if (!adlet) {
                        GoodsOrder.checkSubmit();
                    }
                });
            } catch (e) {
                return 0;
            }
        },
        //支付
        Order_pay: function(data, payType) {
            try {
                //1支付宝 2微信
                if (payType == 1) {
                    $payObject.aliPayHelper(data, GoodsOrder.alip_paycallback);
                } else if (payType == 2) {
                    $payObject.wxPayHelper(data, GoodsOrder.wx_paycallback);
                }
            } catch (e) {
                alert("请求失败,请检查网络是否正常");
            } finally {}

        },
        //微信支付成功 回调
        wx_paycallback: function(ret, err) {
            try {
                var data = paycallback.wxPay_callback(ret, err);
                $api.addCls(loading_layer, 'hide');
                $api.addCls(loading_win, 'hide');
                if (data.status == '200') {
                    GoodsOrder.successshow();
                } else {
                    alert(data.msg);
                }
            } catch (e) {
                alert("请求失败,请检查网络是否正常");
            } finally {}

        },

        //支付宝支付成功 回调
        alip_paycallback: function(res, err) {
            try {
                var data = paycallback.alipPay_callback(res, err);
                $api.addCls(loading_layer, 'hide');
                $api.addCls(loading_win, 'hide');
                if (data.status == '200') {
                    GoodsOrder.successshow();
                } else {
                    alert(data.msg);
                }
            } catch (e) {
                alert("请求失败,请检查网络是否正常");
            } finally {}

        },

        //生成订单
        order: function(PayData, payType) {
            try {
                var username = $("#divMebName").text().trim(); //收货人
                var mobile = $("#divMobile").text().trim(); //收货人联系方式
                var count = $("#number").val().trim(); //购买数量
                var maxcount = $("#Hid_MaxSaleCount").html(); //最大购买量
                var address = $("#divAds").text().trim(); //地址
                var code = ""; //验证码
                var remark = ""; //备注
                var orderid = $("#Hid_orderId").val().trim() || 0; //订单ID,新订单生成传0
                var id = $("#Hid_GoodsId").val().trim(); //商品ID
                if (!(parseInt(count) > 0)) {
                    alert("请输入正确的商品数量！");
                    $api.addCls(loading_layer, 'hide');
                    $api.addCls(loading_win, 'hide');
                    return false;
                }
                if (parseInt(maxcount) && parseInt(count) > parseInt(maxcount)) {
                    alert("商品数量超过最大购买量！");
                    $api.addCls(loading_layer, 'hide');
                    $api.addCls(loading_win, 'hide');
                    return false;
                }
                //var Regex = /^0?1[0-9]{10}$/;
                //if (!Regex.test(mobile))
                if (mobile == "") {
                    alert("收货人联系电话不能为空!");
                    $api.addCls(loading_layer, 'hide');
                    $api.addCls(loading_win, 'hide');
                    return false;
                }
                if (username == "" || username.indexOf("&") >= 0) {
                    alert("收货人信息格式不正确!");
                    $api.addCls(loading_layer, 'hide');
                    $api.addCls(loading_win, 'hide');
                    return false;
                }

                if (address == "" || address.indexOf("&") >= 0) {
                    alert("您未输入收货人地址信息，或者输入的格式不正确!");
                    $api.addCls(loading_layer, 'hide');
                    $api.addCls(loading_win, 'hide');
                    return false;
                }
                var data = {
                    'MebName': username,
                    'Mobile': mobile,
                    'Count': count,
                    'Address': address,
                    'Remark': remark,
                    'EtyCode': code,
                    'ChainID': 0,
                    'GoodID': id,
                    'MebID': $api.user.userid(),
                }
                $.ajax({
                    type: 'POST',
                    url: app_apiconfig.OrderLogic,
                    data: data,
                    dataType: 'json',
                    success: function(ret) {
                        if (ret.State == 1 && ret.Data != null) {
                            var order = ret.Data;
                            var fee = order.Rate;
                            var orderNo = order.OrderNo;
                            var attach = {
                                "type": 1,
                                "busid": order.ID,
                                "mebid": $api.user.userid(),
                                "mebtype": 1,
                                "orderno": order.OrderNo
                            }
                            if (orderNo != "" && orderNo != null && orderNo != undefined) {
                                //订单生成成功，发生支付
                                //alert("生成订单成功,订单号=" + orderNo + "价格=" + fee);
                                if (payType == 1 && Number(fee) > 0) {
                                    PayData.amount = fee.toString();
                                    PayData.tradeNO = orderNo.toString();

                                } else if (payType == 2 && Number(fee) > 0 && attach.busid != "" && attach.busid != null) {
                                    var amount = (Number(fee) * 100).toFixed(0);
                                    PayData.totalFee = amount.toString();
                                    PayData.tradeNo = orderNo.toString();
                                    PayData.attach = JSON.stringify(attach);
                                }
                                $("#Hid_orderId").val(order.ID.toString());
                                //如果订单金额为0则不需要支付
                                if (!fee || fee == "0") {
                                    GoodsOrder.successshow();
                                } else {
                                    GoodsOrder.Order_pay(PayData, payType);
                                }
                            } else {
                                $api.addCls(loading_layer, 'hide');
                                $api.addCls(loading_win, 'hide');
                                if (ret.ErrMsg != "") {
                                    alert(ret.ErrMsg);
                                } else {
                                    alert("订单请求失败,请检查网络是否正常");
                                }
                            }
                        } else {
                            $api.addCls(loading_layer, 'hide');
                            $api.addCls(loading_win, 'hide');
                            alert("订单生成失败,请检查网络是否正常");
                        }
                    }
                });









            } catch (e) {
                $api.addCls(loading_layer, 'hide');
                $api.addCls(loading_win, 'hide');
                alert("订单数据异常,请检查网络是否正常");
            } finally {}
        }

    };
})(window);
