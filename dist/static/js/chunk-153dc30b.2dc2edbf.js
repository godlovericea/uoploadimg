(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-153dc30b"],{"066c":function(t,e,n){},7328:function(t,e,n){"use strict";var a=n("066c");n.n(a).a},"77b8":function(t,e,n){"use strict";n.r(e);var a=n("7fcf"),r=n("3089"),s={data:function(){return{form:{},username:"22222222",pwd:"",hhh:""}},created:function(){/MicroMessenger/i.test(navigator.userAgent)},mounted:function(){this.hhh=window.location.href},methods:{handleLogin:function(){var t=this;if(""===this.username)return Object(r.Toast)("请输入工号"),!1;var e={loginId:this.username};Object(a.b)(e).then((function(e){200===e.status?t.$router.push({path:"/upload",query:{uid:t.username}}):(r.Toast.fail(e.msg),t.notExist=!0,t.$router.push({path:"/"}))}))}}},i=(n("7328"),n("9ca4")),o=Object(i.a)(s,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"homeWrapper"},[t._m(0),n("div",{staticClass:"formBox"},[n("van-cell-group",[n("van-field",{attrs:{size:"large",required:"",label:"工号",type:"digit",placeholder:"请输入工号"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}})],1)],1),n("div",{staticClass:"btnGroups"},[n("van-button",{attrs:{color:"#3381F1",size:"large"},on:{click:t.handleLogin}},[t._v("去上传照片")])],1),t._v(" "+t._s(t.hhh)+" ")])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"headerBox"},[e("h1",{staticClass:"title"},[this._v("南京邮电大学")]),e("h1",{staticClass:"title"},[this._v("人脸入校照片上传")])])}],!1,null,"e03b03c8",null);e.default=o.exports},"7fcf":function(t,e,n){"use strict";n.d(e,"a",(function(){return l})),n.d(e,"b",(function(){return d})),n("e18c");var a=n("cebe"),r=n.n(a),s=n("4360"),i=r.a.create({baseURL:"http://39.105.178.59:8182/zjglj",timeout:"10000",withCredentials:!0});i.interceptors.request.use((function(t){return"/buy/order"===window.location.pathname||"/sell/order"===window.location.pathname?s.a.dispatch("app/setLoading",0):s.a.dispatch("app/setLoading",!0),t}),(function(t){return s.a.dispatch("app/setLoading",0),Promise.reject(t)})),i.interceptors.response.use((function(t){var e=t.data;return s.a.dispatch("app/setLoading",!1),e}),(function(t){return s.a.dispatch("app/setLoading",!1),Promise.reject(t)}));var o=i,c=n("fed1"),u=n.n(c);function l(t){return o({url:"/File/listFile",method:"post",data:t})}function d(t){return o({url:"/user/login",method:"post",data:u.a.stringify(t)})}}}]);