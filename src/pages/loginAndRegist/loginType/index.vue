<template>
<div>
<view class='topLineV'></view>
<view class="login">

    <view class='titleView'>
      <text class='titleWelcomeTxt'>欢迎来到自由健</text>
    </view>
  <view class='bodyView'>
    <form>
      <button class='btn' open-type="getUserInfo" @getuserinfo="bindgetuserinfo">
        <image :src="iconWxUrl"></image>
        <text>微信登录</text>
      </button>
      <button class='btn' @click="phoneLoginTap">
        <image :src="iconPhoneUrl"></image>
        <text>手机登录</text>
      </button>
    </form>
  </view>
  </view>
</div>

  
</template>

<script>



export default {

            
  data () {
    return {
      //图片数组
       iconWxUrl:'/static/images/login_wx.png',
       iconPhoneUrl:'/static/images/login_phone.png'
    }
  },

//方法都要写在这里面
  methods: {
   phoneLoginTap(){
     const url = '../phoneLogin/main'
     mpvue.navigateTo({ url })
   },

   /////////////////////////////////////
   //微信授权 获取信息
  bindgetuserinfo: function (e) {
    
    var encryptedData = e.mp.detail;
    if (encryptedData) {
            debugger
            var data = this.$utils.getSystemInfo();
            if (!data) {
                data = {};
            }
            data.encryptedData = encryptedData;
            data.sessionKey = this.$utils.getCurrentSession().session_key;
            data.iv = encryptedData.iv;
            data.loginTag = '6';
            this.$http.get('/cust-information/custbaseinfo/registOrLoginByWxPhone', data, false, 'POST').then(function(rest) {
                //openid，检查第三方登录账户
                debugger
                if (rest.code == this.$global.reponeSucessCode) {
                    this.$utils.saveUserInfo({
                        info: rest.data
                    });
                    wx.setStorageSync("openDeviceForLoginFlag", "1");
                    wx.setStorageSync('accountLogout', '');
                   var logoutFlag = wx.getStorageSync("LOGOUT_405");
                   wx.navigateBack({
                            delta: 1
                      })
                    // if (that.data.shareKey && that.data.shareKey == '1') {
                    //       wx.switchTab({
			              //      url: '/pages/index/index'
			              //   })
                    // } else if (logoutFlag && logoutFlag == 1) {
                    //    wx.reLaunch({
                    //     url: '/pages/mine/index/index'
                    //   })
                    // } else {
                    //     wx.navigateBack({
                    //         delta: 1
                    //     })
                    // }
                } else {
                    wx.showToast({
                        title: rest.message ? rest.message : "网络异常，请稍候重试！",
                        icon: 'none',
                        duration: 2000
                    })
                }
            });
        } else {
            this.registOrLoginByPhone();
        }
  },
  },

  //初始化
  created () {
    var that = this;
    // that.$utils.wxLogin(this);


//     wx.login({
//     success(res) {
//     if (res.code) {
//       // 发起网络请求
//       wx.request({
//         url: 'https://test.com/onLogin',
//         data: {
//           code: res.code
//         }
//       })
//     } else {
//       console.log('登录失败！' + res.errMsg)
//     }
//   }
// })
    
  },
}
</script>

<style scoped>
.topLineV{
  width: 100%;
  height: 1px;
  background: linear-gradient(rgba(229,226,238,0.1), #fff);
}
.login{
    background-color: #F5F9FA;
    margin-top: 1px;
}

.titleView{
  margin-top: 135rpx;
  height: 42rpx;
  display: flex;
  align-items: center;
}

.titleWelcomeTxt{
  font-size:44rpx;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(51,51,51,1);
  margin-left: 6%;
}

.bodyView{
  margin-top: 120rpx;
}

.btn{
    margin-left: 6%;
    width: 88%;
    margin-bottom: 40rpx;
    display: flex;
    align-items: center;
    border-radius: 5rpx;
    height: 98rpx;
    background-color: #81D8CFFF;
}
.btn image{
    width: 48rpx;
    height: 48rpx;
    /* margin: 20rpx 20rpx 0 200rpx; */
    margin-left: 200rpx;
}
.btn text{
   margin-left: 20rpx;
    font-size:30rpx;
    font-family:PingFangSC-Regular;
    font-weight:bold;
    color:rgba(255,255,255,1);
}
</style>
