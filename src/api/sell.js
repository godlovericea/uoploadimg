import request from '@/utils/request'
import qs from 'qs'

// 文件上传
export function uploadFile (data) {
    return request({
        url: '/File/uploadFile',
        method: 'post',
        data
    })
}

// 文件删除
export function removeFile (data) {
    return request({
        url: '/File/removeFile',
        method: 'post',
        data
    })
}

// 批量文件查询ByTestId
export function listFile (data) {
    return request({
        url: '/File/listFile',
        method: 'post',
        data
    })
}

// 图片查看
export function imageFile () {
    return request({
        url: '/File/imageFile',
        method: 'get'
    })
}
// 登录
export function login (data) {
    return request({
        url: '/user/login',
        method: 'post',
        data: qs.stringify(data)
    })
}
