import request from '@/utils/request'

export function chatRecord (data) {
    return request({
        url: '/chat/message',
        method: 'post',
        data
    })
}
