
//  获取用户地址
export function getUserLocation () {
  console.log("开始获取位置");
  wx.getSetting({
    success: function(e) {
      console.log(e.authSetting["scope.userLocation"]);
      let userLocation = e.authSetting["scope.userLocation"];
      if(typeof(userLocation)=="undefined"){  // 用户第一次授权地理位置
          //1、获取当前位置坐标
        wx.getLocation({
          type: 'wgs84',
          success: res => {
            //2、根据坐标获取当前位置名称，显示在顶部:逆地址解析
            console.log("获取成功",res);
            return `${res.latitude} ${res.longitude}`
          },
          fail:res => {
            console.log("获取失败1",res);
          }
        })
      }else{  // 用户点了允许授权之后 又设置不允许获取位置的处理
        console.log("用户点了允许授权之后 又设置不允许获取位置的处理");
      }
    },
    fail: function(e) {
      console.log("未配置");
    }
  })
}


//获取系统信息
function getSystemInfo(){
  var phoneInfo = {};
  try {
      var res = wx.getSystemInfoSync();
      phoneInfo.iemiNo = res.model;
      phoneInfo.deviceTypeNo = res.brand;
      phoneInfo.systemInfo = res.system;
  } catch (e) { }
  console.log("获取系统信息" + phoneInfo);
  return phoneInfo;
}

function getCurrentSession () {
  var session = wx.getStorageSync('wx_current_session');
  return session;
}


//保存用户信息
function saveUserInfo (userInfo) {
  if (userInfo.info) {
      wx.setStorageSync("token", userInfo.info.token);
  } else {
      wx.removeStorageSync("token");
  }
  wx.removeStorageSync("logoutFlag");
  wx.setStorageSync('userInfo', userInfo);
}


function wxLogin(e) {
  wx.login({
      success: res => {
        e.$http.get('/wechatmini/getSessionKeyByCode',{code: res.code}).then(function(rest){
            //openid，检查第三方登录账户
            debugger
            if (rest.code == 200) {
              wx.setStorageSync('wx_current_session', rest.data);
              
          } else {
              wx.showToast({
                  title: rest.message ? rest.message : "网络异常，请稍候重试！",
                  icon: 'none',
                  duration: 2000,
                  success: function() {
                      if (errorCallBack) {
                          errorCallBack(rest);
                      }
                  }
              })
          }
        });
      }
  })
}


function checkPhoneNumber(phoneNumber) {
  var result = {};
  result.success = false;
  result.message = "手机号错误";
  if (phoneNumber) {
      var myreg = /^[1][3-9][0-9]{9}$/;
      if (!myreg.test(phoneNumber)) {
          result.success = false;
      } else {
          result.success = true;
          result.message = "手机号正确";
      }
  } else {
      result.message = "请输入手机号";
  }
  return result;
}


function checkLogin() {
  var userInfo = wx.getStorageSync('userInfo');
  var isLogin = !userInfo ? false : true;
  if (isLogin) {
      isLogin = !userInfo.info ? false : true;
  }
  if (isLogin) {
      var token = wx.getStorageSync('token');
      isLogin = !token ? false : true;
  }
  return isLogin;
}


function getScoreStar (score) {
  let starArr = [];
  let preNum = score.toString().split('.')[0];
  let aftNum = score.toString().split('.')[1];
  let star_1 = '/static/images/scoreStar1.png';
  let star_2 = '/static/images/scoreStar2.png';
  let star_3 = '/static/images/scoreStar3.png';
  if (aftNum == 0) {
      for (let i = 0; i < preNum; i++) {
          starArr.push(star_1);
      }
      let num = 5 - preNum;
      for (let i = 0; i < num; i++) {
          starArr.push(star_2);
      }

  } else if (aftNum > 0) {
      for (let i = 0; i < preNum; i++) {
          starArr.push(star_1);
      }
      starArr.push(star_3);
      let num = 5 - preNum - 1;
      for (let k = 0; k < num; k++) {
          starArr.push(star_2);
      }
  }
  return starArr;
}


export default {
  getSystemInfo,
  getCurrentSession,
  saveUserInfo,
  wxLogin,
  checkPhoneNumber,
  checkLogin,
  getScoreStar
}


