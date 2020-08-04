<template>
    <div class="notFound">
        <div class="title">
            您访问的页面不存在
        </div>
        <div class="btn">
            <van-button plain type="primary" round @touchstart="goBack">返回主页</van-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Redirect',
    methods: {
        goBack () {
            this.$router.push('/home')
        }
    }
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
    .btn{
        text-align: center;
    }
}
</style>
