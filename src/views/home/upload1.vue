<template>
    <div class="homeWrapper">
        <div class="headerBox">
            <h1 class="title">人脸照片上传</h1>
        </div>
        <div class="formBox" v-if="!sucFlag">
            <video class="videoClass" controls></video>
            <div>
                <button id="capture">拍照</button>
            </div>
            <canvas id="canvas" width="480" height="640"></canvas>
        </div>
        <div class="imgBox" v-if="sucFlag">
            <div>
                <van-uploader v-model="fileList" :max-count="1" :max-size="10000 * 1024" @oversize="onOversize" capture='camera' accept="image/*"
                    :before-read="beforeRead" :after-read="afterRead" class="uploadClass">
                </van-uploader>
            </div>
            <van-uploader v-if="resetFlag" v-model="imgList" :max-count="1" :max-size="10000 * 1024" @oversize="onOversize" capture='camera' accept="image/*"
                :before-read="beforeRead" :after-read="resetAfterRead" class="uploadClass">
                <van-button type="info">重新上传</van-button>
            </van-uploader>
        </div>
        <div class="btnGroups">
            <van-button type="info" v-throttle size="large" @click="handleUpload">刷新提取状态：{{status}}</van-button>
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
            status: '未提取',
            video: '',
            uid: '22222222',
            domain: 'http://39.105.178.59:8182/zjglj/File/imageFile?imageName='
        }
    },
    mounted () {
        // this.getInitAvatar()
        this.getAvatar()
        // this.initFun()
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
        },
        getUserMedia (constraints, success, error) {
            if (navigator.mediaDevices.getUserMedia) {
                // 最新的标准API
                navigator.mediaDevices
                    .getUserMedia(constraints)
                    .then(success)
                    .catch(error)
            } else if (navigator.webkitGetUserMedia) {
                // webkit核心浏览器
                navigator.webkitGetUserMedia(constraints, this.success, this.error)
            } else if (navigator.mozGetUserMedia) {
                // firfox浏览器
                navigator.mozGetUserMedia(constraints, this.success, this.error)
            } else if (navigator.getUserMedia) {
                // 旧版API
                navigator.getUserMedia(constraints, this.success, this.error)
            }
        },
        success (stream) {
            // 兼容webkit核心浏览器
            // let CompatibleURL = window.URL || window.webkitURL
            // 将视频流设置为video元素的源
            console.log(stream)

            // video.src = CompatibleURL.createObjectURL(stream);
            this.video.srcObject = stream
            this.video.play()
        },
        error (error) {
            console.log(`访问用户媒体设备失败${error.name}, ${error.message}`)
        },
        initFun () {
            this.video = document.getElementById('video')
            const canvas = document.getElementById('canvas')
            const context = canvas.getContext('2d')
            if (
                navigator.mediaDevices.getUserMedia ||
                navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia
            ) {
                // 调用用户媒体设备, 访问摄像头
                this.getUserMedia({ video: { width: 480, height: 640 } }, this.success, this.error)
            } else {
                // alert('不支持访问用户媒体')
            }

            document.getElementById('capture').addEventListener('click', () => {
                context.drawImage(this.video, 0, 0, 480, 640)
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
        padding-top: 0.3rem;
        .title{
            font-size: 0.6rem;
            margin: 0.1rem 0;
            // color: #ffffff;
        }
    }
    .formBox{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 1rem;
        .videoClass{
            width: 4rem;
            height: 6rem;
        }
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
