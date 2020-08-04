<template>
    <div class="chatBox">
        <div class="chatContentBox">
            <div class="chatHeader">
                <div class="left">
                    <div class="leftInfo">
                        <div class="upline">
                            <p>{{sellUserInfo.name}}<i v-if="sellUserInfo.identity === 22" class="iconfont icon-huangguan1 level"></i></p>
                        </div>
                        <div class="lowerline">
                            <p>总订单{{sellUserInfo.mOrderNumber}} | 完成率{{sellUserInfo.praise}}%</p>
                        </div>
                    </div>
                </div>
                <div class="right" @click="exchangePhone">
                    <i class="iconfont icon-dianhua iconexchangePhone"></i>
                </div>
            </div>
            <div class="chatContent">
                <div class="msgRecord" v-for="(item,index) in msgList" :key="index">
                    <p class="time">{{item.time}}</p>
                    <div class="notMyMsg" v-if="item.sender_id !== userId">
                        <img  class="myavatar" src="@/assets/chat/sell.png" alt="">
                        <p class="msgItems" v-if="item.type === 1">{{item.message}}</p>
                        <p v-if="item.type === 2" >
                            <el-image style="width: 100px; height: 100px" :src="item.message"  :preview-src-list="srcList"></el-image>
                        </p>
                    </div>
                    <div class="myMsg" v-if="item.sender_id === userId">
                        <p class="msgItems" v-if="item.type === 1">{{item.message}}</p>
                        <p v-if="item.type === 2" >
                            <el-image style="width: 100px; height: 100px" :src="item.message"  :preview-src-list="srcList"></el-image>
                        </p>
                        <img class="myavatar" src="@/assets/chat/buy.png" alt="">
                    </div>
                </div>
            </div>
            <div class="chatContent"  v-if="orderType === 'sell'">
                <div class="msgRecord" v-for="(item,index) in msgList" :key="index">
                    <p class="time">{{item.time}}</p>
                    <div class="notMyMsg" v-if="item.sender_id === userId">
                        <img class="myavatar" src="@/assets/chat/buy.png" alt="">
                        <p class="msgItems" v-if="item.type === 1">{{item.message}}</p>
                        <p v-if="item.type === 2" >
                            <el-image style="width: 100px; height: 100px" :src="item.message"  :preview-src-list="srcList"></el-image>
                        </p>
                    </div>
                    <div class="myMsg" v-if="item.sender_id !== userId">
                        <p class="msgItems" v-if="item.type === 1">{{item.message}}</p>
                        <p v-if="item.type === 2" >
                            <el-image style="width: 100px; height: 100px" :src="item.message"  :preview-src-list="srcList"></el-image>
                        </p>
                        <img class="myavatar" src="@/assets/chat/sell.png" alt="">
                    </div>
                </div>
            </div>
            <div class="divider"></div>
            <div class="myInput">
                <el-upload
                    action="https://upload-z1.qiniup.com"
                    :data="uploadData"
                    name="file"
                    :before-upload="beforeAvatarUpload"
                    :on-success="handleSuccess"
                    :show-file-list="false"
                    :limit="1">
                    <i class="iconfont icon-tupian"></i>
                </el-upload>
                <el-input v-model="msg" placeholder="在这里开始聊天" class="chatInput"></el-input>
                <div @click="pushTextMsg(1)" class="pushMsgClass">
                    发送
                </div>
            </div>
        </div>
        <el-dialog  :visible.sync="showDialog" width="355px" title="联系对方" :show-close="false" custom-class="vandialog" center :before-close="beforeClose">
            <div v-if="showPhoneFlag" class="dialogBox">
                <p class="dialogTips">请输入您的联系方式，系统会加密处理</p>
                <el-input v-model="mobile" placeholder="请输入手机号码"></el-input>
                <p class="dialogTips">*您的手机号码会加密为隐私号码显示给对方，请放心提交</p>
                <div class="divider"></div>
                <div class="vandialogfooter">
                    <el-button size="small" type="text" @click="showDialog = false">取 消</el-button>
                    <el-button size="small" round type="primary" @click="getVirtualNum">下一步</el-button>
                </div>
            </div>
            <div v-if="!showPhoneFlag" class="nextBox">
                <p class="dialogTips">请用您提交的手机{{mobile}}拨打</p>
                <p class="phone">{{middleMobile}}</p>
                <p class="dialogTips">*双方的号码已被加密，请放心拨打</p>
                <p class="dialogTips">点击确定拨打电话</p>
                <div class="divider"></div>
                <div class="vandialogfooter sureBtnBox">
                    <!-- <el-button size="small" type="text" @click="surePushMsg">取 消</el-button>
                    <el-button size="small" type="primary" @click="surePushMsg">确 定</el-button> -->
                    <a :href="callMobile" @click.prevent="surePushMsg" class="sureBtn">确 定</a>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { qiniutoken, orderDetail, contact } from '@/api/buy'
import { orderinfosell } from '@/api/sell'
import { chatRecord } from '@/api/chat'
import moment from 'moment'
import io from 'socket.io-client'
export default {
    data () {
        return {
            msg: '',
            dialogFormVisible: false,
            phoneVisible: false,
            msgList: [],
            userId: '',
            uploadData: {
                token: '',
                key: ''
            },
            qiniuDomain: '',
            imageUri: '',
            showDialog: false,
            orderInfo: {},
            sellUserInfo: {},
            showNotMyMsg: false,
            showMyMsg: false,
            showPhoneFlag: true,
            mobile: '',
            middleMobile: '',
            callMobile: '',
            callFlag: true,
            chatParams: {
                buy_object: '',
                buyid: 1,
                id: 1,
                ordertype: '',
                sell_object: '',
                sellid: 1
            },
            orderType: '',
            srcList: []
        }
    },
    mounted () {
        this.getOrderData()
        this.getQiniuToken()
    },
    updated () {
        this.handleSroll()
    },
    methods: {
        initWebsocket () {
            const wsUrl = 'ws://47.56.101.171:9090/'
            // const wsUrl = 'wss://socket.biya88.com'
            this.socket = io(wsUrl)
            const roomId = this.orderInfo.id // 页面商品ID
            const userName = this.sellUserInfo.name // 当前用户昵称
            this.socket.on('connect', () => {
                this.socket.emit('join', roomId, 0, userName)
            })
            this.socket.on('msgTxt', (userName, msg) => {
                // console.log(userName)
                // console.log(msg)
                this.getHistory()
            })
            this.socket.on('sys', (sysMsg, users) => {
                // console.log(sysMsg)
                // console.log(users)
            })
            this.socket.on('msgImg', (userName, img) => {
                // console.log(userName)
                // console.log(img)
            })
        },
        getHistory () {
            const myData = {
                page: 1,
                count: 100,
                room: this.orderInfo.id
            }
            this.msgList = []
            this.srcList = []
            chatRecord(myData)
                .then((res) => {
                    res.data.data.forEach((l) => {
                        l.time = moment(l.create_time * 1000).format('YYYY-MM-DD HH:mm:ss')
                        this.msgList.push(l)
                        if (l.type === 2) {
                            this.srcList.push(l.message)
                        }
                    })
                    this.msgList = res.data.data.reverse()
                })
        },
        getQiniuToken () {
            const myData = {
                id: this.$route.query.orderNum,
                identity: this.$route.query.userIdentity
            }
            qiniutoken(myData)
                .then((res) => {
                    this.uploadData.token = res.data.token
                    this.qiniuDomain = res.data.domain
                })
        },
        getOrderData () {
            this.orderType = this.$route.query.orderType
            const myData = {
                orderNum: this.$route.query.orderNum,
                firmIdentity: this.$route.query.firmIdentity,
                name: this.$route.query.name,
                userIdentity: this.$route.query.userIdentity,
                amount: this.$route.query.amount,
                number: this.$route.query.number,
                token: this.$route.query.token,
                legal: this.$route.query.legal,
                bt: this.$route.query.bt,
                sign: this.$route.query.sign,
                id: this.$route.query.id
            }
            if (this.orderType === 'buy') {
                orderDetail(myData)
                    .then((res) => {
                        if (res.code === 0) {
                            this.orderInfo = res.data.orderInfo
                            this.sellUserInfo = res.data.user
                            this.userId = this.sellUserInfo.id
                            this.callFlag = false
                            this.initWebsocket()
                            this.getHistory()
                        } else {
                            this.$message.error(res.msg)
                            this.callFlag = true
                        }
                    })
            } else {
                orderinfosell(myData)
                    .then((res) => {
                        if (res.code === 0) {
                            this.orderInfo = res.data.orderInfo
                            this.sellUserInfo = res.data.user
                            this.userId = this.sellUserInfo.id
                            this.callFlag = false
                            this.initWebsocket()
                        } else {
                            this.$message.error(res.msg)
                            this.callFlag = true
                        }
                    })
            }
        },
        // 发送文本消息
        pushTextMsg (type) {
            if (this.msg === '') {
                this.$message.error('消息不能为空')
                return false
            }
            const jsonData = JSON.stringify({
                msg: this.msg, // 消息内容
                sellId: this.sellUserInfo.id, // 对方id
                type: type // 消息类型。1是文本，2是图片
            })
            this.socket.send(jsonData)
            this.msg = ''
        },
        exchangePhone () {
            this.showDialog = true
        },
        report () {
            this.dialogFormVisible = true
        },
        beforeClose (done) {
            done()
        },
        beforeAvatarUpload (file) {
            // console.log(file)
            const appendName = (file.type).replace('image/', '')
            const id = this.sellUserInfo.id
            const date = moment().format('YYYYMMDDHHmmss')
            // this.uploadData.key = `${this.qiniuDomain}/${id}|${date}.${appendName}`
            this.uploadData.key = `${id}|${date}.${appendName}`
            // console.log(this.uploadData.key)
            const isJPG = file.type === 'image/jpeg'
            const isPNG = file.type === 'image/png'
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isLt2M) {
                this.$message.error('图片大小限制在2M以内')
                return false
            }
            if (!isJPG && !isPNG) {
                this.$message.error('上传图片只能是 JPG 或者 PNG 格式!')
                return false
            }
            return isLt2M && (!isJPG || !isPNG)
        },
        handleSuccess (res, file, fileList) {
            if (file.status === 'success') {
                this.msg = `${this.qiniuDomain}/${this.uploadData.key}`
                this.pushTextMsg(2)
            } else {
                this.$message.error('服务器开小差了，请稍后再试')
            }
        },
        showPopupNotMyMsg () {
            this.showNotMyMsg = true
        },
        showPopupMyMsg () {
            this.showMyMsg = true
        },
        // 获取虚拟号码
        getVirtualNum () {
            // this.showPhoneFlag = false
            const myData = {
                orderNum: this.$route.query.orderNum,
                firmIdentity: this.$route.query.firmIdentity,
                name: this.$route.query.name,
                userIdentity: this.$route.query.userIdentity,
                amount: this.$route.query.amount,
                token: this.$route.query.token,
                legal: this.$route.query.legal,
                bt: this.$route.query.bt,
                sign: this.$route.query.sign,
                id: this.$route.query.id,
                mobile: this.mobile
            }
            contact(myData)
                .then((res) => {
                    if (res.code === 0) {
                        this.showPhoneFlag = false
                        this.middleMobile = res.data.telX
                    } else {
                        this.$notify({ type: 'danger', message: res.data.msg })
                    }
                })
        },
        surePushMsg () {
            this.msg = `我的手机号码是：${this.middleMobile},请注意接听`
            this.pushTextMsg(1)
            this.showDialog = false
            this.callMobile = `tel:${this.middleMobile}`
        },
        handleSroll () {
            this.$nextTick(() => {
                const container = this.$el.querySelector('.chatContent')
                container.scrollTop = container.scrollHeight
            })
        },
        showPopupImG (url) {
            // console.log(url)
            this.srcList[0] = url
            // console.log(this.srcList)
        }
    }
}
</script>

<style lang="less" scoped>
.chatBox{
    position: relative;
    width: 400px;
    .chatContentBox{
        margin: 10px 20px;
        border: 1px solid #DEDEDE;
        border-radius: 10px;
    }
    .chatHeader{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(228,228,228,1);
        height: 90px;
        border-radius: 18px 18px 0 0;
        .left{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-left: 10px;
            .leftInfo{
                margin-left: 10px;
                .upline{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    p{
                        margin: 5px;
                        font-size:16px;
                        color:rgba(120,120,120,1);
                    }
                    .level{
                        color: #FFBB15;
                        font-size: 15px;
                    }
                    .warning{
                        margin-left: 10px;
                        color: #ECECEC;
                    }
                }
                .lowerline{
                    p{
                        margin: 5px;
                        font-size:14px;
                        color:rgba(200,200,200,1);
                    }
                }
            }
        }
        .right{
            margin-right: 20px;
            height: 44px;
            width: 44px;
            background-color: #1677E8;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            .iconexchangePhone{
                color: #ffffff;
                font-size: 30px;
            }
        }
    }
    .btnGroups{
        padding: 20px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(228,228,228,1);
    }
    .chatContent{
        position: relative;
        height: 440px;
        overflow: auto;
        // border-right: 1px solid #A5BFCF;
        // border-left: 1px solid #A5BFCF;
        .msgRecord{
            .time{
                font-size: 12px;
                text-align: center;
                color: #A5BFCF;
            }
            .notMyMsg{
                margin: 5px 0;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                p{
                    margin: 0;
                    background:#F5F5F5;
                    padding: 5px;
                    font-size: 14px;
                    border-radius: 5px;
                }
            }
            .myMsg{
                margin: 5px 0;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                p{
                    margin: 0;
                    background:#A5BFCF;
                    padding: 5px;
                    font-size: 14px;
                    border-radius: 5px;
                }
            }
        }
        .myavatar{
            height: 30px;
            width: 30px;
            border-radius: 50%;
        }
        .messageImg{
            max-width: 200px;
            max-height: 200px;
        }
        .popupMessageImg{
            max-width: 100%;
        }
    }
    .divider{
        // border:1px solid rgba(199,215,250,1);
        height: 1px;
        background-color: rgb(199,215,250);
    }
    .myInput{
        height: 50px;
        display: flex;
        align-items: center;
        .uploadImg{
            width: 10%;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            i{
                font-size: 25px;
                color: #C7D7FA;
            }
        }
        .pushMsgClass{
            width: 15%;
            height: 50px;
            color: #4C7FEE;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            margin-right: 20px;
        }
    }
}
</style>
