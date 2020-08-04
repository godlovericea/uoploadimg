/**
 * 存储localStorage可设置有效时间
 * name: 存储名称
 * value: 存储数据支持{String, Object, Array}
 * expires: 存储有效时间
 * @param {*} params
 */
export function setStorage (params) {
    try {
        /**
         * name 存储名
         * value 存储值
         * expires 失效时间
         * startTime 记录存储时间
         */
        var obj = {
            name: '',
            value: '',
            expires: '',
            startTime: new Date().getTime()
        }

        var options = {}

        // 将obj和传进来的params合并
        Object.assign(options, obj, params)

        if (options.expires) {
            // 如果options.expires设置了的话
            // 以options.name为key, options为值放进去
            localStorage.setItem(options.name, JSON.stringify(options))
        } else {
            // 如果options.expires没有设置, 就判断一下value的类型
            var type = Object.prototype.toString.call(options.value)

            // 如果value值是对象或者数组对象的类型, 就先用JSON.stringify转一下, 在存进去
            if (type === '[object Object]' || type === '[object Array]') {
                options.value = JSON.stringify(options.value)
            }

            localStorage.setItem(options.name, options.value)
        }
    } catch (error) {
        return error
    }
}

// 读取缓存
export function getStorage (name) {
    let item = localStorage.getItem(name)

    if (!item) {
        return item
    }

    try {
        item = JSON.parse(item)
    } catch (error) {
        // 如果不行就不是json的字符串, 就直接返回
        return item
    }

    // 如果有startTime的值, 就说明设置了失效时间
    if (item.startTime) {
        var date = new Date().getTime()

        // 何时将值取出减去刚存入的时间, 与item.expires比较, 如果大于就是过期了, 如果小于或等于就还没过期
        if ((date - item.startTime) > item.expires) {
            // 缓存过期, 清除缓存, 返回false
            localStorage.removeItem(name)
            return false
        }

        // 缓存未过期, 返回缓存数据
        return item.value
    }

    // 如果没有设置失效时间, 直接返回值
    return item
}

// 移除缓存
export function removeStorage (name) {
    localStorage.removeItem(name)
}

// 移除全部
export function clearStorage () {
    localStorage.clear()
}

// 默认导出全量方法
export default {
    setStorage,
    getStorage,
    removeStorage,
    clearStorage
}
