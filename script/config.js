(function(window) { //系统配置
    var server_path_context = 'http://175.102.18.104';
    //var server_path_context = 'http://m.youduhui.com';
    window.appconfig = {};
    //api config
    window.app_apiconfig = {
        'requstServer': server_path_context,
        'imageServer': server_path_context,
        'singnbkAPI': server_path_context + ':8001/api/getShoppingGoods?', //作家签名书
        'singnbkdetailAPI': server_path_context + ':8001/api/getGoods?', //作家签名书详情 server_path_context + '/Logics/GoodsLogic.ashx?'
        'foundAPI': server_path_context + ':8001/api/getShoppingGoods?', //作家签名书 server_path_context + '/logics/shoplistlogic.ashx?'
        'LoginAPI': server_path_context + ':8001/api/login?', //用户登入 server_path_context + '/logics/LoginLogic.ashx?
        //'Logout': server_path_context + '/logics/LogoutLogic.ashx', //用户退出清接口缓存
        //'SendCode': server_path_context + '/logics/SendCodeLogic.ashx', //用户登入：发送验证码
        'SendCode': server_path_context + ':8001/api/sendCode', //用户登入：发送验证码
        'Travel': server_path_context + ':8001/api/getTravel?', //游读活动列表 server_path_context + '/Logics/TravelListLogic.ashx?
        'OrderList': server_path_context + ':8001/api/getOrderList?', //获取订单 server_path_context + '/logics/OrderListLogic.ashx?
        'CancelOrder': server_path_context + ':8001/api/cancelOrder?', //取消订单 server_path_context + ':8001/api/cancelOrder?
        'StuffInfo': server_path_context + ':8001/api/getMember?', //获取会员信息
        'Register': server_path_context + ':8001/api/registerMeb', //注册 /logics/Register
        'GetOrder': server_path_context + ':8001/api/signOrder?', //签收 server_path_context + '/logics/GetOrderLogic.ashx?
        'TravelList': server_path_context + ':8001/api/getTravelInfo?', // server_path_context + '/logics/TravelListLogic.ashx?
        "OrderLogic": server_path_context + ':8001/api/addOrderFromMeb', //签名书-订单生成 server_path_context + '/logics/OrderLogic.ashx
        'Apply': server_path_context + ':8001/api/addTravel', //游读报名 server_path_context + '/logics/ApplyLogic.ashx?
        'CancelApply': server_path_context + ':8001/api/cancelApply?', //取消游读报名 server_path_context + '/logics/CancelApplyLogic.ashx?
        'ApplyList': server_path_context + ':8001/api/getApplyList?', //游读报名列表 server_path_context + '/logics/ApplyListLogic.ashx?
        'QueryOrderLogic': server_path_context + ':8001/api/queryOrder?', //查询单个订单  server_path_context + '/logics/QueryOrderLogic.ashx?
        'AchieveInfo': server_path_context + ':8001/api/AchieveInfo?', //扫书籍条形码查询书籍信息
        'UploadBooks': server_path_context + ':8001/api/UploadBooks', //上传图书
        'GetUserBooks': server_path_context + ':8001/api/getUserBooks', //获取我的书架列表
        'TravelHotList': server_path_context + ':8001/api/getTravelHot', //获取首页8条热门游读
        'delBooks':server_path_context+':8001/api/delBooks',//删除我上传的书籍
        'getMember':server_path_context+':8001/api/getMember',//获取会员信息
        'modifyMebInfo':server_path_context+':8001/api/modifyMebInfo',//保存会员信息
        'checkSendCode':server_path_context+':8001/api/checkSendCode',//验证验证码
        'CheckAdlet':server_path_context+':8001/api/getOrderCheckAdlet?',//验证是否参加过1元共享图书活动
        'addUserShopcart':server_path_context+':8001/api/addUserShopcart',//添加商品到购物车
        'getUserShopcart':server_path_context+':8001/api/getUserShopcart',//获取我的购物车商品
        'updateUserShopcart':server_path_context+':8001/api/updateUserShopcart',//修改购物车
        'ScAddOrder':server_path_context+':8001/api/ScAddOrder',//购物车结算-订单生成
        'getScOrder':server_path_context+':8001/api/getScOrder',//购物车结算-订单信息获取
        'MebContact': {
            'querylistbymebid': server_path_context + ':8001/api/getContactList', //收货管理查询
            'addmebcontact': server_path_context + ':8001/api/addContact', //收货管理查询 增加
            'modifycontact': server_path_context + ':8001/api/modifyContact', //收货管理查询 修改
            'querycontectbyid': server_path_context + ':8001/api/getContact', //收货管理查询
            'querymasterbymebid': server_path_context + ':8001/api/getMasterContact',
            'setMaster': server_path_context + ':8001/api/setMasterContact', //设置默认收货
            'delContact': server_path_context + ':8001/api/delContact' //删除收货地址
        },
        'shareurl':server_path_context+ ':8001/api/getShareImage?',
        'UploadBooksNew':server_path_context+ ':8001/api/UploadBooksNew',//上传图书-new
        'addBooksTemp':server_path_context+ ':8001/api/addBooksTemp',//添加图书临时信息
        'getBooksTemp':server_path_context+ ':8001/api/getBooksTemp',//查询图书临时信息
        'addBooksAds':server_path_context+ ':8001/api/addBooksAds',//寄书地址添加
        'getBooksNew':server_path_context+ ':8001/api/getBooksNew',//获取自上传书籍信息
        'GetRead':server_path_context+ ':8001/api/GetRead'//获取阅读数
    };
})(window);
