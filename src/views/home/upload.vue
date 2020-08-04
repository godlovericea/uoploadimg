<template>
    <div class="homeWrapper">
        <div class="headerBox">
            <h1 class="title">人脸照片上传</h1>
            <p class="subTitle">保证光线充足，五官完整清晰</p>
        </div>
        <div class="formBox" v-if="!sucFlag">
            <!-- <van-uploader v-model="fileList" :max-count="1" :max-size="10000 * 1024" @oversize="onOversize" capture='camera' accept="image/*"
                :before-read="beforeRead" :after-read="afterRead"/> -->
                <van-uploader v-model="fileList" :max-count="1" :max-size="10000 * 1024" @oversize="onOversize" capture='camera' accept="image/*"
                :before-read="beforeRead" :after-read="afterRead" class="uploadClass">
                    <div class="uploadBtnClass">
                        <img src="@/assets/up.png" alt="" class="upimg">
                        <p class="uptitle">上传</p>
                    </div>
                </van-uploader>
        </div>
        <div class="imgBox" v-if="sucFlag">
            <div>
                <van-uploader v-model="fileList" :max-count="1" :max-size="10000 * 1024" @oversize="onOversize" capture='camera' accept="image/*"
                    :before-read="beforeRead" :after-read="afterRead" class="uploadClass">
                </van-uploader>
            </div>
            <van-uploader v-if="resetFlag" v-model="imgList" :max-count="1" :max-size="10000 * 1024" @oversize="onOversize" capture='camera' accept="image/*"
                :before-read="beforeRead" :after-read="resetAfterRead" class="uploadClass resetUploadClass">
                <div class="uploadBtnClass">
                    <img src="@/assets/up.png" alt="" class="upimg">
                    <p class="uptitle">重新上传</p>
                </div>
            </van-uploader>
        </div>
        <div class="btnGroups">
            <van-button color="#3381F1" v-throttle size="large" @click="handleUpload">点击刷新提取状态：{{status}}</van-button>
        </div>
    </div>
</template>

<script>
import { listFile, login } from '@/api/sell'
import { Toast } from 'vant'
import axios from 'axios'
export default {
    data () {
        return {
            fileList: [],
            sucFlag: false,
            resetFlag: true,
            imgList: [],
            uid: this.$route.query.uid,
            // uid: '22222222',
            status: '预处理中',
            domain: 'http://39.105.178.59:8182/zjglj/File/imageFile?imageName='
        }
    },
    mounted () {
        this.getInitAvatar()
        // this.getAvatar()
    },
    methods: {
        handleUpload () {
            // console.log('refresh')
            this.getInitAvatar()
        },
        getAvatar () {
            const myData = {
                psIdY: this.uid
            }
            listFile(myData)
                .then((res) => {
                    // console.log(res)
                })
        },
        getInitAvatar () {
            const myData = {
                loginId: this.uid
            }
            login(myData)
                .then((res) => {
                    if (res.status === 200) {
                        // console.log(res.data)
                        this.status = res.data[0].tqType
                        this.fileList = []
                        if (res.data.length > 0) {
                            this.sucFlag = true
                            this.resetFlag = true
                            this.imgList = []
                            res.data.forEach((el) => {
                                this.fileList.push({
                                    url: this.domain + el.fileName
                                })
                            })
                        } else {
                            this.sucFlag = false
                        }
                    } else {
                        Toast(res.msg)
                        this.$router.push({
                            path: '/'
                        })
                    }
                })
        },
        onOversize (file) {
            // console.log(file)
            // Toast('文件大小不能超过 500kb')
        },
        beforeRead (file) {
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                Toast('请上传 jpg或者png 格式图片')
                // console.log(file)
                return false
            }
            return true
        },
        afterRead (file) {
            // 此时可以自行将文件上传至服务器
            // console.log(file)
            if (file.content) {
                this.sucFlag = true
                var formData = new FormData()
                formData.append('file', file.file)
                formData.append('psIdY', this.uid)
                axios.post('http://39.105.178.59:8182/zjglj/File/uploadFile', formData)
                    .then((res) => {
                        // console.log(res)
                    })
            }
        },
        resetAfterRead (file) {
            // console.log(file)
            if (file.content) {
                this.sucFlag = true
                this.fileList = []
                var formData = new FormData()
                formData.append('file', file.file)
                formData.append('psIdY', this.uid)
                axios.post('http://39.105.178.59:8182/zjglj/File/uploadFile', formData)
                    .then((res) => {
                        // console.log(res)
                        this.getInitAvatar()
                        this.resetFlag = false
                    })
            }
        },
        resetUpload () {
            // console.log('123')
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
            margin: 0;
            // color: #ffffff;
        }
        .subTitle{
            color: #888888;
            margin: 0.3rem 0;
            font-size: 0.28rem;
        }
    }
    .formBox{
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 0.5rem;
    }
    .imgBox{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
