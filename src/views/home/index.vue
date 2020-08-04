<template>
    <div class="homeWrapper">
        <van-uploader :after-read="onRead" accept="image/*">
            <!-- <img src="./icon_input_add.png" /> -->
        </van-uploader>
    </div>
</template>

<script>
import { getHomeCurrencys, sign, market } from '@/api/buy'
export default {
    data () {
        return {
            files: {
                name: '',
                type: ''
            },
            headerImage: null,
            picValue: null,
            upImgUrl: ''
        }
    },
    // created () {
    //     window.postParamsToHome = this.postParamsToHome
    // },
    mounted () {
        this.checkButtonToBottom()
        this.getCurrencyList()
        this.getPrice()
    },
    methods: {
        async onRead(file) {
            // console.log(file);
            // console.log(file.file);
            this.files.name = file.file.name; // 获取文件名
            this.files.type = file.file.type; // 获取类型
            this.picValue = file.file; // 文件流
            this.imgPreview(this.picValue);
        },
        // 处理图片
        imgPreview(file) {
            let self = this;
            let Orientation;
            //去获取拍照时的信息，解决拍出来的照片旋转问题
            Exif.getData(file, function () {
                Orientation = Exif.getTag(this, "Orientation");
            });
            // 看支持不支持FileReader
            if (!file || !window.FileReader) return;
            if (/^image/.test(file.type)) {
                // 创建一个reader
                let reader = new FileReader();
                // 将图片2将转成 base64 格式
                reader.readAsDataURL(file);
                // 读取成功后的回调
                reader.onloadend = function () {
                // console.log(this.result);
                let result = this.result;
                let img = new Image();
                img.src = result;
                //判断图片是否大于500K,是就直接上传，反之压缩图片
                if (this.result.length <= 500 * 1024) {
                    self.headerImage = this.result;
                    self.postImg();
                } else {
                    img.onload = function () {
                    let data = self.compress(img, Orientation);
                    self.headerImage = data;
                    self.postImg();
                    };
                }
                };
            }
        },
        // 压缩图片
        compress(img, Orientation) {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            //瓦片canvas
            let tCanvas = document.createElement("canvas");
            let tctx = tCanvas.getContext("2d");
            // let initSize = img.src.length;
            let width = img.width;
            let height = img.height;
            //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
            let ratio;
            if ((ratio = (width * height) / 4000000) > 1) {
                // console.log("大于400万像素");
                ratio = Math.sqrt(ratio);
                width /= ratio;
                height /= ratio;
            } else {
                ratio = 1;
            }
            canvas.width = width;
            canvas.height = height;
            //    铺底色
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            //如果图片像素大于100万则使用瓦片绘制
            let count;
            if ((count = (width * height) / 1000000) > 1) {
                // console.log("超过100W像素");
                count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
                //      计算每块瓦片的宽和高
                let nw = ~~(width / count);
                let nh = ~~(height / count);
                tCanvas.width = nw;
                tCanvas.height = nh;
                for (let i = 0; i < count; i++) {
                    for (let j = 0; j < count; j++) {
                        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                    }
                }
            } else {
                ctx.drawImage(img, 0, 0, width, height);
            }
            let ndata = canvas.toDataURL("image/jpeg", 0.1);
            tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
            return ndata;
            }
        },
        //将base64转换为文件
        dataURLtoFile(dataurl) {
            var arr = dataurl.split(","),
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], this.files.name, {
                type: this.files.type
            });
        },
        async postImg() {
            let file = this.dataURLtoFile(this.headerImage);
            let formData = new window.FormData();
            formData.append("file", file);
            toast_loding(this, "图片上传中···");
            try {
                let res = await util.ajax.post(this.upImgUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
                });
            } catch (e) {
                console.log(e);
            }
        }
    }
</script>

<style lang="less" scoped>
.homeWrapper {
    // overflow-x: hidden;
    height: 100%;
    // background-image: linear-gradient(to bottom,#0550a4,#2d9af9);
    background-size: 100% 100%;
    position: relative;
    .headerBox {
        // margin-top: 1rem;
        margin-left: 0.4rem;
        .logoimg {
            height: 0.39rem;
        }
    }
    .divider {
        height: 0.5rem;
    }
    .upper {
        display: flex;
        justify-content: flex-start;
        width: 7.5rem;
        .buyContent {
            margin: 0 auto;
            // padding-top: 5%;
            width: 7.5rem;
            .biyaUp{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .biyaName{
                    height: 0.7rem;
                }
                .subTitle{
                    font-size: 0.28rem;
                    color: #a0a0a0;
                }
            }
            .title {
                 width: 7.5rem;
                text-align: center;
                font-size: 0.44rem;
                margin: 0;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
            }
            .lowerTitle {
                padding-top: 0.4rem;
                font-size: 0.24rem;
                margin: 0;
                color: rgba(255, 255, 255, 0.4);
                text-align: center;
            }
            .content {
                // margin-top: 0.6rem;
                // background:rgb(255,255,255);
                // opacity: 0.4;
                // border-radius: 0.36rem;
                .buyinfo {
                    font-size: 0.36rem;
                    font-weight: bold;
                    color: rgba(72, 123, 237, 1);
                    margin: 0;
                }
                .inputBox {
                    width: 6rem;
                    margin: 0 auto;
                    .amountBox{
                        display: flex;
                        align-items: center;
                        .cnyPo{
                            position: absolute;
                            right: 1rem;
                            color: #1677E8;
                            margin: 0;
                            font-size: 0.3rem;
                            font-weight: bold;
                        }
                    }
                }
                .computedBox {
                    width: 6rem;
                    margin: 0.2rem auto;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 0.36rem;
                    padding: 0.3rem;
                    .computedItems {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        height: 0.2rem;
                        font-size: 0.28rem;
                        padding: 0.2rem;
                        .itemTitle {
                            color: rgba(255, 255, 255, 0.6);
                        }
                        .count {
                            color: rgba(255, 255, 255, 1);
                        }
                    }
                }
                .payType {
                    margin-top: 0.6rem;
                    background: url("https://financial.nanshuangbeilao.com/f3e5c42ad8bb4e42973dace40636c96b.png");
                    background-size: 100% 100%;
                    .payTypeTitle {
                        color: rgba(255, 255, 255, 0.6);
                        font-size: 0.28rem;
                        text-align: center;
                    }
                    .payTypeGroups {
                        margin-top: 0.6rem;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
            }
        }
    }
    .footerBar {
        position: absolute;
        bottom: 0;
        display: flex;
        flex-direction: column;
        width: 100%;
        .footerPng {
            width: 100%;
        }
    }
    .buy{
        margin-top: 0.4rem;
        height: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .checkBtn{
            margin-top: 0.4rem;
        }
        .payTypeClass{
            width: 4rem;
            background-color: #ffffff;
            color: #459FEF;
            font-weight: bold;
        }
    }
    .buyOver{
        margin-top: 1.3rem;
        height: 3rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .payTypeClass{
            background-color: #1677E8;
            color: #ffffff;
            width: 100%;
        }
    }
    .buy{
        height: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .payTypeClass{
            background-color: #1677E8;
            color: #ffffff;
            width: 100%;
        }
    }
}
</style>
