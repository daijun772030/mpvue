<template>
    <div class="menuBgView">
        <div class="menuLeftScanBgView">
            <image class="scanIcon" :src="homeTopScanUrl" mode="aspectFit"></image>
        </div>
        <div class="menuCountdownBgView">
            <!-- <i-count-down
                target="{{targetTime}}"
                countdown-class="big"
                clear-timer="{{clearTimer}}">
            </i-count-down> -->
        </div>
        <div class="menurightAllCityBgView">
            <text class="homeTopCityFont">成都市</text>
            <image class="arrowdownIcon" :src="homeToparrowdownUrl" mode="aspectFit"></image>
        </div>
    </div>
</template>

<script>

export default {
    
  data() {
    return {
      homeTopScanUrl: '/static/images/home_top_scan.png',
      homeToparrowdownUrl:'/static/images/home_top_arrow_down.png',
      targetTime: new Date().getTime() + 6430000,
    };
  }
};
</script>

<style scoped>
.menuBgView {
  height: 100% !important;
  display: flex;
  background-color: white;
}

.menuLeftScanBgView{
    height: 100%;
    width: 15% !important;
    display: flex;
    justify-content: center;
    align-items: center;
}
.scanIcon{
    height: 44rpx !important;
    width: 44rpx;
}

.menuCountdownBgView{
    height: 100%;
    width: 60% !important;
    /* background-color: peru; */
}
.menurightAllCityBgView{
    height: 100%;
    width: 25% !important;
    display: flex;
    align-items:center;
    justify-content: flex-end;

}

.arrowdownIcon{
    height: 17rpx !important;
    width: 23rpx;
    margin-right: 46rpx;
}

.homeTopCityFont{
    font-size:30rpx;
    font-family:PingFangSC-Thin;
    font-weight:bold;
    color:rgba(51,51,51,1);
    margin-right: 14rpx;
}

/* .big{
  font-size: 20px;
  color: #3399FF;
  font-weight: bold;
} */


image {
  height: 100%;
  width: 100%;
}
</style>