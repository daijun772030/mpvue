<template>
    <view class='device_box'>
        <text class='deviceUse'>器械使用情况</text>
        <view class="deviceView">
            <div class="storeCellBgView" v-for="(item, index)  in storeDetails.faciList" :key='index'>
                <view @click="storeDeviceUseCellTap($event,item.deviceTypeSeq)" class='deviceType' :data-baseTypeSeq="item.deviceTypeSeq">
                    <image class='deviceImage' :src="item.attachDto.fileUrl+item.attachDto.url"></image>
                    <text class='deviceName'>{{item.faciType}}</text>
                    <text class='deviceUnused'>空闲：{{item.nullCount}}</text>
                </view>
            </div>
        </view>
    </view>
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
        

        };
    },

    methods: {
        storeDeviceUseCellTap(e, key){
            console.log(key);
          this.$emit('storeDeviceUseIndexClick', {a:key});
        }
    }

};
</script>

<style scoped>
.device_box{
    overflow: hidden;
    background: #fff;
}
.deviceUse {
    height: 100rpx;
    line-height: 100rpx;
    font-size: 28rpx;
    color: #333;
    font-weight: bold;
    padding: 0 20rpx;
}
.deviceType{
    float: left;
    width: 33.3%;
    margin-bottom: 25rpx;
}
.deviceType text{
    display: block;
    font-size: 24rpx;
    color: #878787;
    text-align: center;
}
.deviceImage {
    display: block;
    width: 68rpx;
    height: 60rpx;
    margin: auto;
}
.deviceType .deviceName{
    height: 56rpx;
    line-height: 65rpx;
    font-size: 28rpx;
    color: #666;
}
</style>
