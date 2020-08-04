<template>
    <div class="homeWrapper">
        <div class="headerBox">
            <h1 class="title">南京邮电大学</h1>
            <h1 class="title">人脸入校照片上传</h1>
        </div>
        <div class="formBox">
            <van-cell-group>
                <van-field v-model="username" size="large" required label="工号" type="digit" placeholder="请输入工号"/>
            </van-cell-group>
        </div>
        <div class="btnGroups">
            <van-button color="#3381F1" size="large" @click="handleLogin">去上传照片</van-button>
        </div>
        {{hhh}}
    </div>
</template>

<script>
import { login } from '@/api/sell'
import { Toast } from 'vant'
export default {
    data () {
        return {
            form: {},
            username: '22222222',
            pwd: '',
            hhh: ''
        }
    },
    created () {
        if (/MicroMessenger/i.test(navigator.userAgent)) {
            // alert('你真正使用微信访问')
        } else {
            // alert('拒绝其他浏览器访问')
        }
    },
    mounted () {
        this.hhh = window.location.href
    },
    methods: {
        handleLogin () {
            if (this.username === '') {
                Toast('请输入工号')
                return false
            }
            const myData = {
                loginId: this.username
            }
            login(myData)
                .then((res) => {
                    if (res.status === 200) {
                        this.$router.push({
                            path: '/upload',
                            query: {
                                uid: this.username
                            }
                        })
                    } else {
                        Toast.fail(res.msg)
                        this.notExist = true
                        this.$router.push({
                            path: '/'
                        })
                    }
                })
        }
    }
}
</script>

<style lang="less" scoped>
.homeWrapper{
    // height: 100%;
    // background-image: linear-gradient(to bottom, #0550a4, #2d9af9);
    // background-size: 100% 100%;
    .headerBox{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 1rem;
        .title{
            font-size: 0.36rem;
            // margin: 0;
            margin: 0.1rem 0;
            // color: #ffffff;
        }
    }
    .formBox{
        padding-top: 1rem;
    }
    .btnGroups{
        position: absolute;
        bottom: 1rem;
        // padding-top: 1rem;
        width: 100%;
    }
}
</style>
