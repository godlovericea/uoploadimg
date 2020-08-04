/**
 * 千分位格式化
 * 10000 => "10,000"
 * @param {*} num
 */
export function toThousandFilter (num) {
    return (+num || 0).toString().replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * 将时间戳格式化时间
 * 1587537923, '{y}-{m}-{d} {h}:{i}:{s}' => 2020-04-22 14:45:23
 * @param {*} time        时间
 * @param {*} cFormat  格式方式
 */
export function parseTime (time, cFormat) {
    if (arguments.length === 0) {
        return null
    }

    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date

    if (typeof time === 'object') {
        date = time
    } else {
        if (('' + time).length === 10) {
            time = parseInt(time) * 1000
        }

        date = new Date(time)
    }

    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }

    return format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
}
