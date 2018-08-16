(function(window) {
    var s_s_h = {};
    var dialogBox;

    s_s_h.beginshare = function(func) {
        dialogBox = api.require('dialogBox');
        dialogBox.actionMenu({
            rect: {
                h: 150
            },
            texts: {
                cancel: '取消'
            },
            items: [{
                text: '微信朋友圈',
                icon: 'widget://image/share/wxcircle.png'
            }, {
                text: '微信朋友',
                icon: 'widget://image/share/wx.png'
            }],
            styles: {
                bg: '#FFF',
                column: 3,
                itemText: {
                    color: '#000',
                    size: 12,
                    marginT: 8
                },
                itemIcon: {
                    size: 48
                },
                cancel: {
                    bg: '',
                    color: '#000',
                    h: 44,
                    size: 14
                }
            }
        }, function(ret) {
            if (func)
                func(ret);
            dialogBox.close({
                dialogName: 'actionMenu'
            });
        });

    }



    s_s_h.sharefun2 = function(func) {
        dialogBox = api.require('dialogBox');
        dialogBox.share({
            rect: {
                w: 300,
                h: 300
            },
            items: [{
                text: '微信朋友圈',
                icon: 'widget://image/share/wxcircle.png'
            }, {
                text: '微信朋友',
                icon: 'widget://image/share/wx.png'
            }],
            styles: {
                bg: '#FFF',
                column: 3,
                horizontalSpace: 15,
                verticalSpace: 30,
                itemText: {
                    color: '#000',
                    size: 15,
                    marginT: 10
                },
                itemIcon: {
                    size: 80
                }
            }
        }, function(ret) {
            if (func)
                func(ret);
            dialogBox.close({
                dialogName: 'share'
            });
        });

    }




    //  thumb: 'widget://image/sharewx.png',
    s_s_h.pushtowx = function(data) {
        //打开方式
        var scene = 'timeline';
        if (data.type == 2) scene = 'session';
        var wx = api.require('wx');
        wx.shareWebpage({
            apiKey: 'wx93a4a0149e95cd8e',
            scene: scene,
            title: data.title,
            description: data.description,
            thumb: data.thumb,
            contentUrl: data.contentUrl
        }, function(ret, err) {
            if (ret.status) {
                alert('分享成功');
            } else {
                alert(err.code);
            }
        });

    }

    window.$share = s_s_h;
})(window);
