<template>
    <div class="menuBgView">
        <!-- 门店状态  -->
        <view class='store'>
            <view class='name_box'>
                <text class='name'>{{storeDetails.storeName}}</text>
                <div v-if="storeDetails.statusClass == 'storeStatus'">
                    <text class='status storeStatus'>{{storeDetails.bizStatus}}</text>
                </div>
                <div v-else>
                    <text class='status storeStatusF'>{{storeDetails.bizStatus}}</text>
                </div>

                
            </view>
            <view class='star_box'>
                <text>评分</text>
                <div v-for="(scoreSItem, index)  in storeDetails.scoreStar" :key='index'>
                    <image class='storeScoreStar' :src='scoreSItem'></image>
                </div>


                <text class='online_num'>人气</text>

                <div v-for="(hotImage, index1)  in storeDetails.fireFlower" :key='index1'>
                    <image :src='storeStateHotUrl' class='fire fl'></image>
                </div>  
                <div v-for="(nomarlImage, index2)  in storeDetails.fireFlowers" :key='index2'>
                    <image :src='storeStateNomalUrl' class='fire fl'></image>
                </div>  
                <text class='online_num'>在店人数：{{storeDetails.onlineNum}}</text>
            </view>
        </view>

        <!-- 门店位置 -->
        <view class='storeAddress'>
            <image class='addressImage' :src="storeAddressUrl"></image>
            <text class='addressText'>{{storeDetails.address}}</text>
            <text class='diffDistance'>{{storeDetails.distance}}</text>
        </view>
    </div>
</template>

<script>

export default {
  props: {
    storeDetails: {
      type: Object,
    },
  },
  data() {
    return {
      storeStateHotUrl:'/static/images/store_state_hot_lighted.png',
      storeStateNomalUrl:'/static/images/store_state_hot_nomal.png',
      storeAddressUrl:'/static/images/storeDetails_address.png'

    };
  }
};
</script>

<style scoped>
.store {
    height: 148rpx;
    padding: 0 20rpx;
    border-bottom: 2rpx solid #e2e2e2;
}
.name_box{
    height: 90rpx;
    line-height: 96rpx;
    overflow: hidden;
}
.name_box .name {
    float: left;
    font-size: 40rpx;
    color: #333;
    font-weight: bold;
    margin-right: 20rpx;
}
.name_box .status{
    float: right;
}
.star_box{
    width: 750rpx;
    height: 54rpx;
    overflow: hidden;
}
.star_box text{
    float: left;
    margin-right: 15rpx;
    font-size: 24rpx;
    color: #666;
}
.star_box .fire{
    float: left;
    width: 24rpx;
    height: 24rpx;
    margin: 6rpx 0 0 0;
}
.scoreText {
    float: left;
    font-size: 24rpx;
    color: #666;
    margin: 0 50rpx 0 15rpx;
}
.storeScoreStar {
    float: left;
    width: 24rpx;
    height: 22rpx;
    margin: 8rpx 0 0 0;
}
.star_box .online_num{
    margin-left: 30rpx;
}
.storeStatus {
    display: block;
    width: 118rpx;
    height: 40rpx;
    line-height: 40rpx;
    text-align: center;
    color:#81d8cf;
    border:1px solid #81d8cf;
    border-radius: 4rpx;
    font-size: 24rpx;
    margin: 34rpx 0 0 0;
}
.storeStatusF {
    display: block;
    width: 118rpx;
    height: 40rpx;
    line-height: 40rpx;
    text-align: center;
    /* background-color: #c5c5c5; */
    border-radius: 4rpx;
    font-size: 24rpx;
    color:#c5c5c5;
    border:1px solid #c5c5c5;
    margin: 34rpx 0 0 0;
}
.storeAddress {
    display: flex;
    justify-content: flex-start;
    height: 110rpx;
    align-items: center;
    border-bottom: 4rpx solid #efefef;
    padding: 0 20rpx 0 40rpx; 
}
.addressImage {
    width: 32rpx;
    height: 44rpx;
    margin: 0 15rpx 0 0;
}
.addressText {
    flex: 1;
    display: -webkit-box;
    /* max-width: 455rpx; */
    max-height: 80rpx;
    font-size: 28rpx;
    font-family: PingFangSC-Regular;
    color: #666;
    line-height: 40rpx;
    padding: 0 18rpx;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
}
.diffDistance {
    font-size: 24rpx;
    color: #666;
}
</style>
