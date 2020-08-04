<template>
    <div id="app">
        <router-view/>
        <request-loding/>
    </div>
</template>

<script>
import RequestLoding from '@/components/RequestLoad'

export default {
    components: {
        RequestLoding
    }
}
</script>

<style lang="stylus">
body {
    margin 0px
    padding 0px
    // 为导航栏+状态栏的高度 88px
    padding-top: constant(safe-area-inset-top)
    // 为导航栏+状态栏的高度 88px
    padding-top: env(safe-area-inset-top)
    // 如果未竖屏时为0
    padding-left: constant(safe-area-inset-left)
    // 如果未竖屏时为0
    padding-left: env(safe-area-inset-left)
    // 如果未竖屏时为0
    padding-right: constant(safe-area-inset-right)
    // 如果未竖屏时为0
    padding-right: env(safe-area-inset-right)
    // 为底下圆弧的高度 34px
    padding-bottom: constant(safe-area-inset-bottom)
    // 为底下圆弧的高度 34px
    padding-bottom: env(safe-area-inset-bottom)
}
</style>
