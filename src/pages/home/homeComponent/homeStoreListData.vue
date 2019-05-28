<template>
    <div>
        <div class="storeTopBgView">
            <div class="leftTitlte">门店情况</div>
            <div class="storeTitleRightBgView"> 
                <div class="rightTitle">查看更多</div>
                <div class="arrowRightView">
                    <image class="arrowIcon" :src="lookMoreArrowUrl" mode="aspectFit"></image> 
                </div>
            </div>
        </div>

        <!-- 门店列表 -->
        <div class="storeListBgView">
            <div class="storeCellBgView" v-for="(item, index)  in storeDataArray" :key='index'>
                <div @click="storeCellTap($event,item.storeId)" class="storeCellContentView">
                    <image class="storeImage" :src="item.imgUrl" mode="aspectFill"></image>
                    <!-- 门店详情 -->
                    <div class="storeDetailsRightView">
                        <div class="storeNameBgView">
                            <div class="storeName">{{item.storeName}}</div>
                            <div class="storeState">{{item.bizStatusName}}</div>
                        </div>
                        <div class="addressName">{{item.address}}</div>
                        <div class="distanceName">{{item.distance}}</div>
                        <div class="lineV"></div>
                        <div class="startBgView">
                            <view class="hotImgBlock">
                                <div v-for="(hotImage, index1)  in item.hotArray" :key='index1'>
                                <image class="hotImg" :src="storeStateHotUrl"></image>
                                </div>
                                <div v-for="(nomarlImage, index2)  in item.notHotArray" :key='index2'>
                                <image class="nomarlImg" :src="storeStateNomalUrl"></image>
                                </div>
                            </view>
                            <div class="deviceState">设备空闲 {{item.idleDeviceCount}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
    props: {
    storeDataArray: {
      type: Array,
    },
  },

  data() {
    return {
      lookMoreArrowUrl: '/static/images/more_arrow.png',
      storeStateHotUrl:'/static/images/store_state_hot_lighted.png',
      storeStateNomalUrl:'/static/images/store_state_hot_nomal.png'
    };
  },

 methods: {
        storeCellTap(e, key){
            console.log(key);
          this.$emit('storeIndexClick', {a:key});
        }
  }

};
</script>

<style scoped>
.storeTopBgView {
  height: 48rpx !important;
  display: flex;
}

.leftTitlte{
    font-size:36rpx;
    font-family:PingFangSC-Semibold;
    font-weight:bold;
    color:rgba(51,51,51,1);
    padding-left: 28rpx;
    width: 50%;
    height: 100%;
}

.storeTitleRightBgView{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    width: 50%;
}

.rightTitle{
    font-size:24rpx;
    font-family:PingFangSC-Thin;
    font-weight:bold;
    color:rgba(153,153,153,1);
}

.arrowRightView{
    margin-right: 28rpx;
    height: 100%;
    width: 28rpx;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.arrowIcon{
    width: 23rpx;
    height: 23rpx;
}


.storeCellBgView{
    height: 250rpx;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
}
.storeCellContentView{
    background-color: white;
    width: 92.6%;
    height: 92.6%;
    border-radius: 10rpx;
    display: flex;
}

.storeImage{
    width: 50%;
    height: 100%;
    border-radius : 10rpx 0rpx 0rpx 10rpx;
}

.storeDetailsRightView{
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
}
.storeNameBgView{
    display: flex;
    margin-top: 30rpx;
    height: 40rpx;
    justify-content: space-between;
    align-items: center;
}
.storeName{
    font-size:32rpx;
    font-family:PingFangSC-Semibold;
    font-weight:bold;
    color:rgba(51,51,51,1);
    margin-left: 20rpx;
    overflow: hidden;
    height: 40rpx;
}

.storeNameBgView .storeState{
  border:1px solid rgba(129,216,207,1);
  border-radius:4rpx;
  font-size:20rpx;
  padding:2px 8rpx 2px 8rpx;
  font-family:PingFangSC-Thin;
  font-weight:bold;
  color:rgba(129,216,207,1);
  margin-right: 20rpx;
  text-align: center;
  width: 65rpx;
}
.store .status.gray{
    color: #C5C5C5;
    border-color: #C5C5C5;
}

.addressName{
    margin: 9rpx 20rpx 0 20rpx;
    font-size:24rpx;
    font-family:PingFangSC-Thin;
    font-weight:bold;
    color:rgba(102,102,102,1);
    height: 30rpx;
    overflow: hidden;
}
.distanceName{
    margin: 7rpx 20rpx 0 20rpx;
    font-size:24rpx;
    font-family:PingFangSC-Thin;
    font-weight:bold;
    color:rgba(153,153,153,1);
    height: 34rpx;
}
.lineV{
    margin: 15rpx 20rpx 0 20rpx;
    height:1px;
    background:rgba(235,235,235,1);
}

.hotImgBlock{
   flex:1;
   display: flex;
  justify-content:flex-start;
  flex-direction: row;
  flex-wrap: wrap;
}

.hotImg,.nomarlImg{
  width:24rpx;
  height:25rpx;
  padding-right:5rpx;
}

.startBgView{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 20rpx;
}

.deviceState{
  font-size:20rpx;
  font-family:PingFangSC-Thin;
  font-weight:bold;
  color:rgba(153,153,153,1);
  margin-right: 20rpx;
}

</style>