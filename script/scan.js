(function(window) {
    var sf_can = {};
    var FNScanner;
    sf_can.sanfphoto = function(data,callbaksfp) {
      var FNScanner = api.require('FNScanner');
      FNScanner.openView({
          autorotation: true,
          rect: {
              x: data.rect_x,
              y: data.rect_y,
              w: data.rect_W,
              h: data.rect_H
          }
      }, function(ret, err) {
        try {
            if (ret) {
                var id = JSON.stringify(ret.content);
                var eventType = JSON.stringify(ret.eventType);
                if (eventType == '"success"') {
                    //成功查询接口是否返回正确数据
                    if(id){
                      id =id.replace("\"", "").replace("\"", "");
                    }

                    try {
                        api.ajax({
                            url: app_apiconfig.AchieveInfo + 'bnno=' + id,
                            method: 'get',
                        }, function(json, err) {
                            if (json) {
                                if (json.Data != null) {
                                    //数据查验成功
                                    callbaksfp(id, eventType);
                                } else {
                                    callbaksfp("", eventType);
                                }
                            } else {
                                callbaksfp("", eventType);
                            }
                        });
                    } catch (e) {
                        callbaksfp("", "");
                    }
                }
                //用户取消扫码
                else if (eventType == '"cancel"') {
                    //uploadBookManual("");
                    callbaksfp("", eventType);
                }
                //扫码识别失败,一般出现在选择图片二维情况下
                else if (eventType == '"fail"') {
                    //uploadBookManual("扫码识别失败,");
                    callbaksfp("", eventType);
                }
                //用户从系统相册选取二维码图片
                else if (eventType == '"selectImage"') {
                    //不处理，如果成功会返回success
                }
            }else {
              callbaksfp("", "");
            }
        } catch (e) {
            callbaksfp("", "");
        }
      });
    };


    window.$ScanObject = sf_can;
})(window);
