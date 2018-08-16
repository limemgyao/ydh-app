(function(window) { //支付返回
    window.paycallback = {
        //微信支付成功 回调
        wxPay_callback: function(ret, err) {

            var msg = "";
            var data = {
                "status": "-999",
                "msg": "未知错误"
            };
            try {

                if (ret.status) {
                    data.status = "200";
                    data.msg = "微信支付成功";
                }else {
                  //错误码：
                  switch (err.code) {
                      case '-2':
                          data.status = "-2";
                          data.msg = "用户取消，发生场景：用户不支付了，点击取消，返回APP";
                          break;
                      case '-1':
                          data.status = "-1";
                          data.msg = "未知错误，可能的原因：签名错误、未注册APPID、项目设置APPID不正确、注册的APPID与设置的不匹配、其他异常等";
                          break;
                      case '1':
                          data.status = "1";
                          data.msg = "apiKey值非法";
                          break;
                      case '0':
                          data.status = "0";
                          data.msg = "参数不正确";
                          break;
                      default:
                          break;
                  }
                }

            } catch (e) {} finally {}
            return data;
        },

        ////支付宝支付成功 回调
        alipPay_callback: function(res, err) {
            var msg = "";
            var data = {
                "status": "-999",
                "msg": "未知错误"
            };
            try {
              switch (res.code) {
                  case '9000':
                      data.status = "200";
                      data.msg = "支付成功";
                      break;
                  case '4000':
                      data.status = "4000";
                      data.msg = "系统异常";
                      break;
                  case '4001':
                      data.status = "4001";
                      data.msg = "数据格式不正确";
                      break;
                  case '4003':
                      data.status = "4003";
                      data.msg = "该用户绑定的支付宝账户被冻结或不允许支付";
                      break;
                  case '4004':
                      data.status = "4004";
                      data.msg = "该用户已解除绑定";
                      break;
                  case '4005':
                      data.status = "4005";
                      data.msg = "绑定失败或没有绑定";
                      break;
                  case '4006':
                      data.status = "4006";
                      data.msg = "订单支付失败";
                      break;
                  case '4010':
                      data.status = "4010";
                      data.msg = "重新绑定账户";
                      break;
                  case '6000':
                      data.status = "6000";
                      data.msg = "支付服务正在进行升级操作";
                      break;
                  case '6001':
                      data.status = "6001";
                      data.msg = "用户中途取消支付操作";
                      break;
                  default:
                      break;
              }
            } catch (e) {} finally {}
           return data;
        }

};})(window);
