import request from '@/utils/request'
// import qs from 'qs'

// 第一步：验证签名并获取Token单价
export function goValidator (data) {
    return request({
        url: '/validator',
        method: 'post',
        data
    })
}

// 第一步：获取单价（根据支付方式）
export function validatorPay (data) {
    return request({
        url: '/validatorPay',
        method: 'post',
        data
    })
}

// 第san步：下单
export function goBuy (data) {
    return request({
        url: '/buy',
        method: 'post',
        data
    })
}
// 第二步：完成支付
export function payDone (data) {
    return request({
        url: '/pay/done',
        method: 'post',
        data
    })
}
// 第二步：取消订单
export function cancelOrder (data) {
    return request({
        url: '/cancel',
        method: 'post',
        data
    })
}
// 轮询订单状态
export function orderstate (data) {
    return request({
        url: '/order/state',
        method: 'post',
        data
    })
}

// 订单详情
export function orderDetail (data) {
    return request({
        url: '/order/info',
        method: 'post',
        data
    })
}

// 获取七牛上传凭证
export function qiniutoken (data) {
    return request({
        url: '/photo/qiniu/token',
        method: 'post',
        data
    })
}

// 申诉
export function complain (data) {
    return request({
        url: '/complain',
        method: 'post',
        data
    })
}

// 获取联系方式（虚拟中间号）
export function contact (data) {
    return request({
        url: '/get/contact',
        method: 'post',
        data
    })
}

// 签名
export function sign (data) {
    return request({
        url: '/sign',
        method: 'post',
        data
    })
}

// 获取有广告的虚拟币
export function getHomeCurrencys (data) {
    return request({
        url: '/currency/getHomeCurrencys',
        method: 'post',
        data
    })
}

// 申诉取消
export function cancelcomplain (data) {
    return request({
        url: '/complain/cancel',
        method: 'post',
        data
    })
}
// 申诉详情
export function complaininfo (data) {
    return request({
        url: '/complain/info',
        method: 'post',
        data
    })
}
// 获取市场价
export function market (data) {
    return request({
        url: '/advertising/market',
        method: 'post',
        data
    })
}
