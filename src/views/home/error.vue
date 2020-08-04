<template>
    <div class="notFound">
        <div class="title">
            请在微信内打开
        </div>
        <div class="tips">
            <p>校园内部项目，非工作人员禁止调试</p>
            <p>如果因为您的恶意调试致使数据出现错误，我们将依法追究你的法律责任！</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Redirect'
}
</script>
<style lang="less" scoped>
.notFound{
    background-image: linear-gradient(to bottom,#0550a4,#2d9af9);
    background-size: 100% 100%;
    height: 100%;
    .title{
        height: 60%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.6rem;
        color: #ffffff;
    }
    .tips{
        padding: 0 0.2rem;
        text-align: center;
        font-size: 0.3rem;
        color: #ffffff;
    }
}
</style>
