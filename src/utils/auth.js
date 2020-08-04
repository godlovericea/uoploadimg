import { getStorage, setStorage, removeStorage } from '@/utils/storage'

const TokenKey = 'Token'

export function getToken () {
    return getStorage(TokenKey)
}

export function setToken (token) {
    return setStorage({
        name: TokenKey,
        value: token,
        expires: 3600
    })
}

export function removeToken () {
    return removeStorage(TokenKey)
}
