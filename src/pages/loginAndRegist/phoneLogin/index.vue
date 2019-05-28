<template>
<div>
<view class='topLineV'></view>

<view class="register bg">

    <view class='titleView'>
      <text class='titleWelcomeTxt'>手机号登录</text>
    </view>

    <form bindsubmit='regist'>
        <view class='row'>
            <input name="phoneNumber" type="number" maxlength="11"   placeholder="请输入手机号" v-model="phoneNumber" @input='tipPhoneNumber' @blur='phoneBlur' @focus="bindKeyFocus" />
            <view class='userlogindelete_View' @click="clearPhoneNumAction">
              <image class='userlogindelete_icon' :src='iconDeleteUrl'  :hidden='is_clear_icon'  ></image>
            </view>
           
        </view>
        <view class='row'>
            <input name="validCode"  type="number" maxlength="4" @input='tipValidCode'  placeholder="请输入验证码" />
            <button class="btn_code"  :disabled="disabled" @click="getValidCode" >{{validBtnText}}</button>
        </view>
        <view class='tips'>
            
        </view>
        <view class='btn_box'>
              <button @click="registOrLogin"  class="btn">
                <text>登录</text>
              </button>
        </view>
    </form>
</view>

</div>

  
</template>

<script>



export default {

            
  data () {
    return {
      //图片数组
       iconDeleteUrl:'/static/images/userlogin_delete.png',
       is_clear_icon:true,
       disabled:false,
       validBtnText:'获取验证码',
       isClear:false,
       phoneNumber: "",
       interval:null,
       logindisabled: false,
       code: '',
    }
  },


//方法都要写在这里面
  methods: {
    //输入的变化  相比原生小程序 取值都会多一个mpd对象
    tipPhoneNumber: function(e){
      this.phoneNumber = e.mp.detail.value
      if(this.isClear == false){
        let inputLength = this.phoneNumber.length;
        inputLength == 0 ? (this.is_clear_icon = true) : (this.is_clear_icon = false);
      }else{
        this.isClear = false;
      }
    },

    //如果丢失焦点 就不显示
    phoneBlur: function(e){
      this.is_clear_icon = true;
    },

    // 清空输入框的内容
    // 聚焦函数:如果字符串长度为0，则不显示清空图标，否则显示清空图标。
    bindKeyFocus: function (e) {
      let inputLength = e.mp.detail.value.length;
      inputLength == 0 ? (this.is_clear_icon = true) : (this.is_clear_icon = false)
    },

    // 点击图标清空
    clearPhoneNumAction: function (e) {
      this.phoneNumber = '';
      this.isClear = true;
    },

    tipValidCode: function(e){
      this.code = e.mp.detail.value;
    },


    //获取验证码
    getValidCode: function(e) {
      this.disabled = true;
      let checkPhone = this.$utils.checkPhoneNumber(this.phoneNumber);
      if (checkPhone.success == false) {
          wx.showToast({
            title: checkPhone.message,
            icon: 'none'
          })
            this.disabled = false
        }else{
            let data = {
                phoneNumber: this.phoneNumber,
                validType: 'LOGIN'
            };
            let that = this;
            this.$http.get('/cust-information/custbaseinfo/getValidCodeByMobilephone', data).then(function(rest) {
                if (rest.code == this.$global.reponeSucessCode) {
                    let time = 60;
                    that.interval = setInterval(function() {
                        if (time > 0) {
                            that.disabled = true,
                            that.validBtnText = (time--) + "s"
                        } else {
                            that.disabled = false,
                            that.validBtnText = '重新获取'
                            clearInterval(that.interval);
                        }
                    }, 1000);
                } else {
                    that.disabled = false,
                    wx.showToast({
                        title: rest.message ? rest.message : "网络异常，请稍候重试！",
                        icon: 'none',
                        duration: 1500
                    })
                }
            });
        }
    },

    //注册或登陆
    registOrLogin: function(e) {
      // console.log(this.globalData.globalData1);
      debugger;

        if (this.logindisabled == true) return;
        this.logindisabled = true;
        var that = this;
        let phone = that.phoneNumber;
        let code = that.code;
        let checkPhone = that.$utils.checkPhoneNumber(phone);
      if (checkPhone.success == false && code == ''){
        wx.showToast({
          title: "请把信息补全",
          icon: 'none',
          duration: 1500
        })
        this.logindisabled = false;

      }else if (checkPhone.success == false){
            wx.showToast({
              title: checkPhone.message,
              icon: 'none',
              duration: 1500
            })
            that.logindisabled = false;

        } else if (code == ''){
            wx.showToast({
              title: '请输入验证码',
              icon: 'none',
              duration: 1500
            })
            that.logindisabled = false;

        }else {

            wx.showLoading({
              title: '加载中…',
              mask: true
            })
            var data = that.$utils.getSystemInfo();;
            data.phoneNumber = that.phoneNumber;
            data.validCode = that.code;
            data.validType = "LOGIN";
            data.loginTag = "6";

            this.$http.get('/cust-information/custbaseinfo/registOrLoginByPhone', data,'POST').then(function (rest) {
                wx.hideLoading();
                debugger
                if (rest.code == this.$global.reponeSucessCode) {
                    //获取用户信息
                    this.$utils.saveUserInfo({
                        info: rest.data
                    });
                    console.log("发送login事件");
                    wx.setStorageSync("openDeviceForLoginFlag", "1");
                    var logoutFlag = wx.getStorageSync("LOGOUT_405");
                    if (that.data.shareKey && that.data.shareKey == '1') {
                        wx.reLaunch({
                          url: '/pages/index/index'
                        })
                    } else if (logoutFlag && logoutFlag == 1){
                         wx.reLaunch({
                          url: '/pages/mine/index/index'
                         })
                    }else{
                        wx.navigateBack({
                            delta: 2
                        })
                    }
                  wx.setStorageSync('accountLogout', ''); 
                } else {
                    wx.showToast({
                        title: rest.message ? rest.message : "网络异常，请稍候重试！",
                        icon: 'none',
                        duration: 1500
                    })
                }
                that.logindisabled = false;
            });
        }
    },

  },


  //创建完毕状态
  created () {
    var that = this;
  },
}
</script>

<style scoped>
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
}

.register{
    margin-top: 1px;
    padding: 1rpx 7% 0 7%;

}
.topLineV{
  width: 100%;
  height: 1px;
  background: linear-gradient(rgba(229,226,238,0.1), #fff);
}


.title{
    font-size:44rpx;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(51,51,51,1);
}
.row{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 87rpx;
    border-bottom: 1px solid #EBEBEB;
    margin-top: 54rpx;
}

.row input{
    flex: 1;
    height: 80rpx;
    line-height: 80rpx;
    font-size:30rpx;
    font-family:PingFangSC-Regular;
    font-weight:400;
}
.row .btn_code{
    width:220rpx;
    font-size:24rpx;
    font-family:PingFangSC-Regular;
    color:rgba(129,216,207,1);
    text-align: right;
    padding-right: 0px;
    background-color: transparent;
}

.row .btn_code[disabled] {
    color: #81D8CF !important;
}

/*消除按钮边框线*/
button::after{
  border: none;
}

.tips{
    height: 215rpx;
    line-height: 70rpx;
    color: red;
    font-size: 26rpx;
}
.btn{
    width: 100%;
    height: 98rpx;
    border-radius: 5rpx;
    font-size:30rpx;
    font-family:PingFangSC-Regular;
    font-weight:bold;
    color:rgba(255,255,255,1);
    background-color:rgba(129,216,207,1);
    display: flex;
    justify-content: center;
    align-items: center;
}


.userlogindelete_View{
  height: 80rpx;
  width: 80rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.userlogindelete_icon{
    width: 36rpx;
    height: 36rpx; 
}
</style>
