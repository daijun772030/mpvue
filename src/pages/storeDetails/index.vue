<template>
  <div>
    <!-- Banner -->
    <div class="swiper_box">
      <Swiper :images="bannerImages" />
    </div>

    <div class="storeDetailsView">
      <StoreAddress :storeDetails="storeDetailsDic"/>
    </div>

    <div class="storeDeviceUseView">
      <StoreDeviceUse :storeDetails="storeDetailsDic" @storeDeviceUseIndexClick="getDeviceUseIndex"/>
    </div>

  </div>
</template>

<script>
import Swiper from "@/components/swiper";
import StoreAddress from "@/pages/storeDetails/storeDetailsComponent/storeAddress";
import StoreDeviceUse from "@/pages/storeDetails/storeDetailsComponent/storeDeviceUse";

export default {
    //引入组件
  components: { 
              Swiper,
              StoreAddress,
              StoreDeviceUse
            },

  data () {
    return {
      //图片数组
       bannerImages: [],
       storeDetailsDic:{},
       distance:'暂无距离'
    }
  },

  computed: {
    
  },

  onLoad: function(options) {

    console.log('门店Id'+options.storeId);
    let param = {
            storeId: options.storeId,
        };
        let lat = 0;
        let lng = 0;
        if (lat) param.latitude = lat;
        if (lng) param.longitude = lng;
        let loginFlag = true;
        if (!this.$utils.checkLogin()) {
            loginFlag = false;
        }

        this.$api('queryStoreDetails',param).then((res)=>{
        //   debugger
          if (res.code == this.$global.reponeSucessCode) {
                let data = res.data;
                let obj = {};
                obj.storeName = data.storeName;
                obj.address = data.address;
                obj.fireFlower = Number(data.fireFlower);
                obj.fireFlowers = 5 - Number(data.fireFlower);
                obj.onlineNum = data.onlineNum;
                //门店运营状态
                if (data.bizStatus == 1) {
                    obj.bizStatus = '运营中';
                    obj.statusClass = 'storeStatus';
                } else if (data.bizStatus == 2) {
                    obj.bizStatus = '停电中';
                    obj.statusClass = 'storeStatusF';
                } else if (data.bizStatus == 3) {
                    obj.bizStatus = '停业中';
                    obj.statusClass = 'storeStatusF';
                } else {
                    obj.bizStatus = '规划中';
                    obj.statusClass = 'storeStatusF';
                }
                debugger
                //banner图片
                obj.attachRvos = [];
                let imagesArr = [];
                if (data.attachRvos.length > 0) {
                    for (var i = 0; i < data.attachRvos.length; i++) {
                        let url = data.attachRvos[i].fileUrl + data.attachRvos[i].url;
                        obj.attachRvos.push(url);

                        let imagesObg = {attachUrl:url};
                        imagesArr.push(imagesObg);
                    }
                }
                obj.refCollect = data.refCollect;
                obj.score = data.commentScore == undefined ? "5.0" : data.commentScore.toString();
                if (obj.score.length <= 1) {
                    obj.score = obj.score + ".0";
                }
                obj.scoreStar = this.$utils.getScoreStar(obj.score);
                obj.faciList = data.faciList;
                obj.latitude = data.latitude;
                obj.longitude = data.longitude;
                // 距离
                if(this.distance){
                    if (this.distance == '暂无距离'){
                        obj.distance = "暂无距离";
                    }else{
                        obj.distance = '距离你' + this.distance;
                    }
                }
                this.bannerImages = imagesArr;
                this.storeDetailsDic = obj;
                // this.setData({
                //     currentShow: 1,
                //     total: obj.attachRvos.length,
                //     collectStatus: obj.refCollect ? obj.refCollect : '0',
                //     storeDetails: obj
                // });
            }
        })
        

  },

  methods: {
    getDeviceUseIndex(data){
      const url = '../storeDetails/main?storeId='+data.a;
      mpvue.navigateTo({ url })
    }

  },


   created () {

   },

  
}
</script>

<style>
/* 首页bannerCSS */
.swiper_box{
    background-color: #F5F9FA;
    width: 100%;
    height: 360rpx;
}

.storeDetailsView{
  height: 258rpx;
  width: 100%;
}

.storeDeviceUseView{
  width: 100%;
}

</style>
