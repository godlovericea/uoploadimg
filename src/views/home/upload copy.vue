<template>
    <div class="homeWrapper">
        <div class="headerBox">
            <h1 class="title">人脸照片上传</h1>
        </div>
        <div class="formBox" v-if="!sucFlag">
            <van-uploader v-model="fileList" :max-count="1" :max-size="10000 * 1024" @oversize="onOversize" capture='camera' accept="image/*"
            :before-read="beforeRead" :after-read="afterRead"/>
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
            <van-button type="info" size="large" @click="handleUpload">刷新提取状态：{{status}}</van-button>
        </div>
    </div>
</template>

<script>
import { listFile, login } from '@/api/sell'
import axios from 'axios'
export default {
    data () {
        return {
            fileList: [],
            sucFlag: false,
            resetFlag: true,
            imgList: [],
            status: '未提取',
            domain: 'http://39.105.178.59:8182/zjglj/File/imageFile?imageName=',
            width: 0,
            height: 0
        }
    },
    mounted () {
        this.getInitAvatar()
        this.getSize()
        // this.getAvatar()
    },
    methods: {
        handleUpload () {
            // console.log('refresh')
            this.getInitAvatar()
        },
        getAvatar () {
            const myData = {
                psIdY: this.$route.query.uid
            }
            listFile(myData)
                .then((res) => {
                    // console.log(res)
                })
        },
        getInitAvatar () {
            const myData = {
                loginId: this.$route.query.uid
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
                    }
                })
        },
        onOversize (file) {
            // console.log(file)
            // Toast('文件大小不能超过 500kb')
        },
        beforeRead (file) {
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                // Toast('请上传 jpg 格式图片')
                // console.log(file)
                return false
            }
            return true
        },
        afterRead (file) {
            // 此时可以自行将文件上传至服务器
            console.log(file)
            if (file.content) {
                this.sucFlag = true
                var formData = new FormData()
                formData.append('file', file.file)
                formData.append('psIdY', this.$route.query.uid)
                axios.post('http://39.105.178.59:8182/zjglj/File/uploadFile', formData)
                    .then((res) => {
                        // console.log(res)
                    })
            }
        },
        resetAfterRead (file) {
            console.log(file)
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
            const img = new Image()
            console.log(img)
            img.src = file.content
            console.log(context)
            img.onload = () => {
                canvas.width = this.width
                canvas.height = this.height
                context.drawImage(img, 0, 0, this.width, this.height)
                file.content = canvas.toDataURL(file.file.type, 0.5)
                let files = this.dataURLtoFile(file.content)
            }
            if (file.content) {
                this.sucFlag = true
                this.fileList = []
                var formData = new FormData()
                formData.append('file', file.file)
                formData.append('psIdY', this.$route.query.uid)
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
        compressImg (file) {
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
            const img = new Image()
            console.log(img)
            img.src = file.content
            console.log(context)
            img.onload = () => {
                canvas.width = this.width
                canvas.height = this.height
                context.drawImage(img, 0, 0, this.width, this.height)
                file.content = canvas.toDataURL(file.file.type, 0.5)
                let files = this.dataURLtoFile(file.content, file.file.name)
            }
        },
        getSize () {
            this.width = document.body.clientWidth || document.documentElement.clientWidth
            this.height = document.body.clientWidth || document.documentElement.clientWidth
        },
        dataURLtoFile (dataurl, filename) {
            var arr = dataurl.split(',')
            var bstr = atob(arr[1])
            var n = bstr.length
            var u8arr = new Uint8Array(n)
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n)
            }
            return new File([u8arr], filename, {
                type: this.files.type
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
        justify-content: center;
        align-items: center;
        padding-top: 1rem;
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
