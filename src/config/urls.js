const yHost = "https://request.gzjunkaiing.com/xcx";
const mHost = "https://api.gzjunkaiing.com";
const qHost = "https://request.hao-a.com/quanzi";
/* eslint-disable */
export const Apis = {
  yHost: yHost,
  mHost: mHost,
  //公共
  URL_LOG_SAVE : mHost + '/log/save',// 错误日志
  URL_USERAPP_AUTHEN : mHost + '/userapp/authen',//验证
  URL_UPLOAD_IMG : mHost + '/file/img',//图片上传
  URL_UPLOAD_FILE : mHost + '/file/uploadwximg',//文件上传
  URL_AREA_PROVINCE : mHost+'/area/province',//获取省 URL_PROVINCE_LIST
  URL_AREA_CITY : mHost+'/area/city',//获取市 URL_CITY_LIST
  URL_AREA_DISTRICT : mHost+'/area/district',//获取区 URL_AREA_LIST

  URL_USERTEMPLATEPAGE_INFO: mHost+'/usertemplatepage/info',
  URL_CUSTOMERPAGE_INFO: mHost+'/customerpage/info',

  //用户
  URL_USER_LOGIN : yHost + '/user/login',//登入
  URL_USER_INFO : yHost + '/user/info',//信息
  URL_USER_MEMBERSHIP : yHost + '/user/membership',//会员信息
  URL_USER_BIND : yHost + '/user/bind',//用户信息保存
  URL_USER_AUTHEN : yHost + '/user/authen',//用户授权信息保存

  // 用户反馈
  //URL_FEEDBACK_SAVE: yHost + '/feedback/save',

  //收藏
  URL_USER_FAVORITEDELETE:yHost+'/user/favoritedelete',
  //URL_USER_FAVORITELIST:yHost+'/user/favoritelist',
  //URL_USER_FAVORITESAVE:yHost+'/user/favoritesave',

  //消息
  URL_MESSAGE_LIST: yHost + '/usermessage/list',   // 列表 ok
  URL_MESSAGE_INFO: yHost + '/usermessage/info',   // 详情 ok
  URL_MESSAGE_DELETE: yHost + '/usermessage/delete',   // 删除 ok

  //表单
  URL_FORM_SAVE: yHost + '/form/save',   // 保存 ok

  //店铺
  //URL_STORE_LIST : yHost + '/store/list',   //列表
  URL_STORE_HOME : yHost + '/store/home', // 首页门店信息
  //URL_STORE_INFO: yHost + '/store/info', //详情
  URL_STORE_USER: yHost + '/store/user', // 用户门店

  //分类
  URL_CATEGORY_LIST: yHost + '/category/list',//列表
  URL_CATEGORY_GETCHILD: yHost + '/category/getchild',//子分类

  //商品
  URL_PRODUCT_INDEX: yHost + '/product/index',//首页商品
  URL_PRODUCT_LIST: yHost + '/product/list',//列表
  URL_PRODUCT_INFO: yHost + '/product/info',//详情
  URL_PRODUCT_COMMENTLIST: yHost + '/product/commentlist',
  URL_GROUPON_PRODUCT_LIST: yHost + '/product/list',//拼团列表
  URL_PRODUCT_GROUPON_INFO: yHost + '/product/info',//拼团详情

  //秒杀
  URL_PROMOTION_LIST: yHost + '/promotion/list',//商品列表
  URL_PROMOTION_INFO:yHost + '/promotion/info',//商品详情

  //买单
  URL_BILL_LIST : yHost + '/bill/list', // 列表
  URL_BILL_INFO : yHost + '/bill/info', // 详情
  URL_BILL_CALCULATE : yHost + '/bill/calculate', // 计算
  URL_BILL_SAVE : yHost + '/bill/save', // 创建

  //购物车
  URL_CART_SAVE: yHost + '/cart/save',
  URL_CART_LIST: yHost + '/cart/list',
  URL_CART_UPDATE: yHost + '/cart/update',
  URL_CART_DELETE: yHost + '/cart/delete',
  URL_CART_TOTAL: yHost + '/cart/total',

  //订单
  URL_ORDER_LIST: yHost + '/order/list',//订单列表
  URL_ORDER_INFO: yHost + '/order/info',//订单详情
  URL_ORDER_CANCEL: yHost + '/order/cancel',//订单取消
  URL_ORDER_CREATE: yHost + '/order/create',//创建支付订单
  URL_ORDER_PAY: yHost + '/pay/order',//订单号直接支付
  URL_ORDER_CONFIRM: yHost + '/order/confirmreceiving',//订单确认
  URL_ORDER_PRODUCTINFO: yHost + '/order/productinfo',//订单商品信息

  URL_GROUPON_ORDER_LIST: yHost + '/order/list',//订单列表
  URL_GROUPON_ORDER_INFO: yHost + '/order/info',//订单详情
  URL_GROUPON_ORDER_CANCEL: yHost + '/order/cancel',//订单详情
  URL_GROUPON_ORDER_SAVE: yHost + '/order/save',//添加订单
  URL_GROUPON_PAY_ORDER: yHost + '/pay/order',//订单号直接支付
  URL_GROUPON_ORDER_CONFIRM: yHost + '/order/confirmreceiving',

  URL_ORDER_PROMOTION_CREATE: yHost + '/order/addpromotionorder',//创建秒杀订单

  URL_GROUPON_INFO: yHost + '/groupon/info',//拼团详情

  //分销
  URL_DISTRIBUTOR_INFO: yHost + '/distributor/info',//分销商详情
  URL_DISTRIBUTOR_ORDER: yHost + '/distributor/orderlist',//分销商订单
  URL_DISTRIBUTOR_WITHDRAWAL: yHost + '/withdrawal/list',//提现列表
  URL_DISTRIBUTOR_WITHDRAWAL_SAVE: yHost + '/withdrawal/save',//提现申请
  URL_DISTRIBUTOR_FAMILY: yHost + '/distributor/family',//分销商发展下线
  URL_DISTRIBUTOR_SAVE: yHost + '/distributor/save',//申请分销商
  URL_DISTRIBUTOR_RANKING: yHost + '/distributor/ranking',//分销排名

  //优惠券
  URL_COUPON_LIST : yHost + '/coupon/list', // 列表
  URL_COUPON_USER : yHost + '/coupon/user', // 用户优惠券
  URL_COUPON_RECEIVE : yHost + '/coupon/receive', // 领取
  URL_COUPON_MUTIRECEIVE: yHost + '/coupon/mutireceive', // 批量领取

  //积分
  URL_CREDIT_LIST : yHost + '/credit/list',   // 列表

  //会员充值
  URL_RECHARGEORDER_SAVE: yHost + '/rechargeorder/save',
  URL_FINANCE_LIST: yHost + '/finance/list', //充值消费记录
  URL_AMOUNT_LIST: yHost + '/amount/list', //充值金额列表

  //短信验证码 1
  URL_PHONEAUTHONECODE_SEND : yHost + '/phoneauthencode/send', //发送

  //用户地址
  URL_USERADDRESS_LIST: yHost + '/useraddress/list',//列表
  URL_USERADDRESS_SAVE: yHost + '/useraddress/save',//添加
  URL_USERADDRESS_WXSAVE: yHost + '/useraddress/wxsave',//微信添加
  URL_USERADDRESS_UPDATE: yHost + '/useraddress/update',//修改
  URL_USERADDRESS_DELETE: yHost + '/useraddress/delete',//删除

  //  评论
  URL_COMMENT_SAVE: yHost + '/comment/save',//添加
  URL_COMMENT_LIST: yHost + '/comment/list',//列表
  // 多个评价
  //URL_COMMENT_ADD: yHost + '/comment/add',

  //资讯
  URL_NEWS_LIST: yHost + '/news/list',   // 列表 ok
  URL_NEWS_INFO: yHost + '/news/info',   // 详情 ok

  //案例
  URL_CASES_LIST: yHost + '/cases/list',   // 列表 ok
  URL_CASES_INFO: yHost + '/cases/info',   // 详情 ok

  URL_QUESTION_LIST : yHost+'/question/list',//常见问题列表
  URL_QUESTION_INFO : yHost+'/question/info',//常见问题详情

  //其他
  URL_SYS_SETTING_INFO: yHost + '/syssetting/info',

  //幻灯片
  URL_SLIDE_LIST: yHost + '/slide/list',

  //推广计划
  URL_PROMOTE_QRCODE: yHost + '/promote/qrcode',
  URL_PROMOTE_LIST: yHost + '/promote/list',
  URL_PROMOTE_INFO: yHost + '/promote/info',
  URL_PROMOTE_RECORD: yHost + '/promoterecord/list',

  // 用户反馈
  URL_FEEDBACK_SAVE: yHost + '/feedback/save',

  // 收藏列表
  URL_USER_FAVORITELIST: yHost + '/user/favoritelist',

  // 商品收藏
  URL_USER_FAVORITESAVE: yHost + '/user/favoritesave',

  //推广计划
  // URL_PROMOTE_QRCODE: yHost + '/promote/qrcode',
  // URL_PROMOTE_LIST: yHost + '/promote/list',
  // URL_PROMOTE_INFO: yHost + '/promote/info',
  // URL_PROMOTE_RECORD: yHost + '/promoterecord/list',

  //积分兑换商品
  URL_CONVERT_LIST: yHost + '/convert/list',//记录
  URL_CONVERT_SAVE: yHost + '/convert/save',//积分兑换

  // 代言
  URL_ENDORSEMENT_INFO: yHost + '/endorsement/info',
  URL_ENDORSEMENT_SAVE: yHost + '/endorsement/save',

  // 多个评价
  URL_COMMENT_ADD: yHost + '/comment/add',

  // 快递查询
  //URL_ORDER_EXPRESS: yHost + '/order/express',

  //礼品
  URL_GIFT_LIST: yHost + '/gift/list',

  // 退款
  URL_ORDER_REFUNDAPPLY: yHost + '/order/refundapply',
  URL_ORDER_RETURNAPPLY: yHost + '/order/returnapply',
  URL_ORDER_RETURNDELIVERY: yHost + '/order/returndelivery',

  // 快递查询
  URL_ORDER_EXPRESS: yHost + '/order/express',

  // 圈子接口
  URL_LIKE_SAVE: qHost + '/like/save',//社群点赞评论/取消 喜欢帖子/取消
  URL_INFO_LIST: qHost + '/info/list',//社群帖子列表-搜索
  URL_INFO_DETAIL: qHost + '/info/detail',//社群帖子的详情带十条评论
  URL_COMMENT_DEL: qHost + '/comment/del',//社群帖子评论删除
  URL_QZ_COMMENT_ADD: qHost + '/comment/add',//社群帖子评论添加
  URL_QZ_COMMENT_LIST: qHost + '/comment/list',//社群帖子评论列表
  URL_INFO_ADD: qHost + '/info/add',//社群帖子创建
  URL_INFOSET_DETAIL: qHost + '/infoset/detail',//社群圈子详情-包含圈子的10个帖子
  URL_INFOSET_LIST: qHost + '/infoset/list',//社群圈子列表
  URL_FOLLOW_SAVE: qHost + '/follow/save',//社群圈子关注/取消关注
  URL_INFOSET_ADD: qHost + '/infoset/add',//社群圈子创建

  URL_UPLOAD_IMGE: qHost + '/upload/img',//图片上传

  URL_INFO_DEL: qHost + '/info/del',
  URL_FOLLOW_LIST: qHost + '/follow/list',//我关注的

  // 砍价
  URL_BARGAIN_LIST: yHost + '/bargain/list',//砍价活动列表
  URL_BARGAIN_INFO: yHost + '/bargain/info',//砍价活动详情
  URL_BARGAINPARTAKE_LIST: yHost + '/bargainpartake/list',//我的参与砍价活动
  URL_BARGAINPARTAKE_CREATE: yHost + '/bargainpartake/create',//参与砍价
  URL_BARGAINRECORD_EXECUTE: yHost + '/bargainrecord/execute',//砍价
  URL_ORDER_ADDBARGAINORDER: yHost + '/order/addbargainorder',//创建砍价订单
  URL_BARGAINRECORD_LIST: yHost + '/bargainrecord/list',

  // 秒杀
  URL_PROMOTIONPRODUCT_LIST: yHost + '/promotionproduct/list',//秒杀商品列表
  URL_PROMOTIONPRODUCT_INFO: yHost + '/promotionproduct/info',//秒杀商品详情

  //自定义弹窗
  URL_POPUP_CLICK: yHost + '/popup/click',   // 点击
  URL_POPUP_INFO: yHost + '/popup/info',   // 详情

//  拆红包
  URL_REDPACKETRECORD_ADD: yHost + '/redpacketrecord/add',
  URL_REDPACKETRECORD_SAVE: yHost + '/redpacketrecord/save',
  URL_REDPACKETRECORD_DETAIL: yHost + '/redpacketrecord/detail',
  URL_REDPACKETR_DETAIL: yHost + '/redpacket/detail',

  // 用户会员等级列表
  URL_LEVELCONFIG_LIST: yHost + '/levelconfig/list',

//  快消品
  URL_PROD_FRESHINDEX: yHost + '/product/freshindex',

  // 品牌
  URL_BRAND_LIST: yHost + '/brand/list',
  URL_BRAND_ALL: yHost + '/brand/all',
  URL_BRAND_DETAIL: yHost + '/brand/detail',

  // 搜索标签
  URL_PRODUCTTAG_LIST: yHost + '/producttag/list',

  URL_WECHAT_CRYPT: yHost + '/wechat/crypt',

  // 供应商
  URL_STORE_SAVE: yHost + '/store/save',
  URL_STORE_LIST: yHost + '/store/list',
  URL_STORE_INFO: yHost + '/store/info',

  // 围观支持
  URL_SURROUND_INFO: yHost + '/surround/info',
  URL_SURROUND_JOIN_LIST: yHost + '/surround_join/list',
  URL_SURROUND_JOIN_INFO: yHost + '/surround_join/info',
  URL_SURROUND_JOIN_SAVE: yHost + '/surround_join/save',
  URL_SURROUND_SUPPORT_LIST: yHost + '/surround_support/list',
  URL_SURROUND_SUPPORT_SAVE: yHost + '/surround_support/save',

  //自定义海报
  URL_POSTER_LIST: yHost + '/poster/list',   // 列表 ok

  //自定义表单
  URL_DIYFORM_INFO: yHost + '/diyform/info',
  URL_DIYFORM_RECORD_INFO: yHost + '/diyform_record/info',
  URL_DIYFORM_RECORD_SAVE: yHost + '/diyform_record/save',
}
/* eslint-enable */
