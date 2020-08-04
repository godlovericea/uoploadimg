# OTC优化版本规则说明

## 目录结构

```
- src
  - api         接口文件
  - assets      静态文件（图片、css、js）
  - components  组件文件
  - filters     vue filter
  - icons       icon图标
    - svg       图片文件
  - router      路由
  - store       vue router
  - utils       公共文件
  - views       模板文件
```

## 编码格式

文件编码格式UTF-8

## 开发规范（以下格式必须严格遵守提交后会有审核人员进行审核, 如未通过则被驳回重写）

#### 缓存规范

1、将能在前台进行缓存数据全部进行缓存

#### 目录规范

1、每个页面在views中创建一个文件夹

2、文件夹中有index.vue文件和components文件夹

3、所有页面效果都在components中进行书写在index.vue进行组装

4、禁止在任何vue中调用api中接口, 所有接口放入到store, 防止组件互传将代码污染

#### 书写规范

1、每行缩进4位空格

2、字符串必须使用单引号

3、每个文件最后空白一格

4、方法体使用规范：() => {}

5、使用花括号的时候第一个花括号不允许换行

6、派生类的构造函数必须调用super()。非派生类的构造函数不得调用super()。如果没有遵守，JavaScript 引擎会引发运行时错误。

7、所有花括号必须书写 比如 以前可以写成这样 if (1 == 1) alert(123) 现在必须写成这样 if (1 == 1) { alert(123) }

8、不能定义任何未使用的变量或方法，定义变量或方法时不能定义undefined

9、禁止使用eval函数，如果不理解此函数用法查看[网址](https://www.zhihu.com/question/20591877)

10、箭头函数必须使用小括号 错误的：x => {} 正确的：(x) => {}

#### 打包线上版本规范

1、禁止代码中有任何console.log语句

2、禁止代码中有任何alert语句

## 资源下载

1、[页面所有图标使用SVG图标下载](https://www.iconfont.cn/collections)

## filter方法

1、千分位格式化(不保留小数位): toThousandFilter(金额(number))

2、将时间戳转换时间: parseTime(时间(int), 格式方法(string))

## 二维码生成使用

<vue-qr
    :text="欲编码的内容"
    correctLevel="容错级别 0-3"
    :size="尺寸, 长宽一致, 包含外边距"
    :margin="二维码图像的外边距, 默认 20px"
    colorDark="实点的颜色"
    colorLight="空白区的颜色"
    :bgSrc="欲嵌入的背景图地址"
    :gifBgSrc="欲嵌入的背景图 gif 地址,设置后普通的背景图将失效。设置此选项会影响性能"
    backgroundColor="背景色"
    backgroundDimming="叠加在背景图上的颜色, 在解码有难度的时有一定帮助"
    :logoSrc="嵌入至二维码中心的 LOGO 地址"
    :logoScale="用于计算 LOGO 大小的值, 过大将导致解码失败, LOGO 尺寸计算公式 `logoScale*(size-2*margin)`, 默认 0.2"
    logoMargin="LOGO 标识周围的空白边框, 默认为0"
    logoBackgroundColor="Logo 背景色,需要设置 logoMargin"
    logoCornerRadius="LOGO 标识及其边框的圆角半径, 默认为0"
    whiteMargin="若设为 true, 背景图外将绘制白色边框"
    :dotScale="数据区域点缩小比例,默认为0.35"
    autoColor="若为 true, 背景图的主要颜色将作为实点的颜色, 即 colorDark,默认 true"
    binarize="若为 true, 图像将被二值化处理, 未指定阈值则使用默认值"
    binarizeThreshold="生成的二维码 Data URI 可以在回调中取得,第一个参数为二维码 data URL, 第二个参数为 props 传过来的 qid(因为二维码生成是异步的,所以加个 id 用于排序)"
    bindElement="指定是否需要自动将生成的二维码绑定到HTML上, 默认是TRUE"
>
</vue-qr>

import vueQr from 'vue-qr'

exprot default {
    components: {
        vueQr
    }
}

## LocalStorage使用

import { setStorage, getStorage, removeSotrage, clearStorage } from '@/utils/storage'

setStorage({
    name: '存储名称',
    value: '存储数据支持{String, Object, Array}',
    expires: '过期时间设置{秒}'
})

getStorage('存储名称')

removeStorage('存储名称')

clearStorage()
