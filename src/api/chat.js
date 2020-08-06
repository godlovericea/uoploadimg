import request from '@/utils/request'
import qs from 'qs'

export function getAccessToken (data) {
    return request({
        url: '/wx/getAccessToken',
        method: 'post',
        data
    })
}
export function getUserId (data) {
    return request({
        url: '/wx/getUserId',
        method: 'post',
        data: qs.stringify(data)
    })
}
