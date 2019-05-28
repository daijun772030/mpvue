<template>
  <div class="homeMainBgView">
    <!-- 顶部菜单 -->
    <div class="menuView">
      <TopMenu></TopMenu>
    </div>
    
    <!-- Banner -->
    <div class="swiper_box">
      <div class="inswiper_box">
          <Swiper :images="images" />
      </div>
    </div>
    <!-- 用户运动数据 -->
    <div class="homeRankingDataView">
      <HomeRankingData :homeRankingDic="homeRankingDic"></HomeRankingData>
    </div>
    <!-- 门店列表 -->
    <div class="storeDataListView">
      <storeListData :storeDataArray="storeDataArray" @storeIndexClick="getStoreIndex"></storeListData>
    </div>
    
  </div>
</template>

<script>
import TopMenu from "@/pages/home/homeComponent/homeTopMenu";
import Swiper from "@/components/swiper";
import HomeRankingData from "@/pages/home/homeComponent/homeRankingData";
import storeListData from "@/pages/home/homeComponent/homeStoreListData";


export default {
  //引入组件
  components: { 
              TopMenu,
              Swiper ,
              HomeRankingData,
              storeListData
            },
            
  data () {
    return {
      //图片数组
       images: [],
       //门店数组
       storeDataArray: [],

      //排行数据
       homeRankingDic:{
         sportMin:11,
         sportRanking:1,
         measurementScore:200
       }
    }
  },


//方法都要写在这里面
  methods: {
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },

    getStoreIndex(data){
      const url = '../storeDetails/main?storeId='+data.a;
      mpvue.navigateTo({ url })
    },
    test () {//测试get请求封装请求成功
        this.$api('postC',{commentContent:'这个门店不错',score:5,storeId:34}).then((res)=>{
        console.log(res);

    })
    },
    test1 () {//测试post请求封装成功
        this.$api('banner',{classType:"5"}).then((res)=>{
        console.log(res);
        var advImgs = res.data[0].advImgs;
        this.images = advImgs;
    })
    },
    queryShop(data) {//获取门店列表
        var that = this;
        this.$api('queryShop',data).then((res)=>{
            console.log(res);
            var storeList = [];
          let data = res.data;
            var obj = {};
            // var setData = {};
            if (data.result && data.result.length > 0) {
              data.result.forEach((o, i) => {
                obj = {};
                obj.storeId = o.storeId;
                obj.storeName = o.storeName;
                obj.address = o.address;
                obj.idleDeviceCount = o.idleDeviceCount;
                obj.commentScore = Number(o.commentScore).toFixed(1);
                obj.refCollect = o.refCollect;
                obj.bizStatus = o.bizStatus;
                obj.onlineNum = o.onlineNum;
                var  fireFlower = o.fireFlower; 
                var notFireFlow = 5 - fireFlower;
                var notHotArray =[];
                var hotArray = [];
                for (var i = 0; i < fireFlower;i++){
                   hotArray.push(i)
                }
                for (var i = 0; i < notFireFlow; i++) {
                  notHotArray.push(i)
                }
                obj.hotArray = hotArray;
                obj.notHotArray = notHotArray;

                obj.commentArr = [];
                if (o.bizStatus == 1) {
                  obj.bizStatusName = '运营中';
                } else if (o.bizStatus == 2) {
                  obj.bizStatusName = '停电中';
              r  } else if (o.bizStatus == 3) {
                  obj.bizStatusName = '停业中';
                } else {
                  obj.bizStatusName = '规划中';
                }
                //门店人气
                obj.fireFlower = o.fireFlower;
                obj.fireFlowers = 5 - Number(o.fireFlower);
                //距离 
                if (o.distance) {
                  if (o.distance > 1000) {
                    obj.distance = Number(o.distance / 1000).toFixed(1) + "km";
                  } else {
                    obj.distance = "<" + Number(o.distance).toFixed(0) + "m";
                  }
                } else {
                  obj.distance = "暂无距离";
                }
                //门店图片
                if (o.attachRvos && o.attachRvos.length > 0) {
                  obj.imgUrl = o.attachRvos[0].fileUrl + o.attachRvos[0].url;
                } else {
                  obj.imgUrl = '/static/images/default_store.png';
                }
                storeList.push(obj);
              });
              // setData.emptyShow=false;
              // setData.storeList = storeList;
              // setData.totalSize = data.totalSize;
              // if (data.result.length < this.data.rows) {
              //     setData.moreShow=true;
              // }
            } else {
              // setData.emptyShow = true;
              wx.showModal({
                title: '',
                content: '您所在城市尚未开通此服务,是否继续？',
                confirmText: '继续',
                confirmColor: '#81d8cf',
                success: (res) => {
                  if (res.confirm) { //确定

                  } else if (res.cancel) { //取消
                    wx.navigateTo({
                      url: '../store/city/city?city=' + this.data.city
                    });
                  }
                }
              });
            }
            console.log("拼装后的数据"+ storeList);
            that.storeDataArray = storeList
        })
    }
  },


  created () {
    var that = this;
    that.test();//调用方法
    that.test1();//调用方法
    //获取banner 数据
    // this.$http.get('/cust-dynamic/labeltype/queryLabelType?classType=5').then((response) => {
    //   var advImgs = response.data["0"].advImgs;
    //   this.images = advImgs;
    // }).catch((error) => {
    //   console.log(error)
    // }),

    //获取门店列表
    wx.getLocation({
    type: 'wgs84',
    success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        console.log(res);
        var start = 1;
        var rows = 5;
        var cityCode = 510107;
        var data = {
            start:1,
            rows:5,
            cityCode:510107,locateLng:longitude,locateLat:latitude
        }
        that.queryShop(data);
      }
    })
    
  },
}
</script>

<style scoped>
.homeMainBgView {
  background-color: rgba(245,249,250,1);
}

/* 首页bannerCSS */
.swiper_box{
    background-color: #F5F9FA;
    width: 100%;
    height: 360rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}
.inswiper_box{
    overflow: hidden; 
    border-radius: 10rpx;
    transform: translateY(0);
    width: 92.6%;
    margin-left: 3.7%;
    margin-right: 3.7%;
    height: 300rpx;
}

.homeRankingDataView{
  width: 100%;
  height: 360rpx;
  margin-top: 30rpx;
}

.storeDataListView{
  margin-top: 30rpx;
}

.menuView{
  width: 100%;
  height: 80rpx;
}

</style>
