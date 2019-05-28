<template>
    <div class="minetopView">
        <!-- 背景圆弧 -->
        <image class="mineTopCircleBgView" :src="topbgImageUrl" mode="aspectFill"></image>

        <div class="mineTopUserBgView">

          <!-- 头像 -->
          <image class="minePhotoImage" :src="userDataInfo.photoUrl" mode="aspectFill">
          </image>
          <image class="mineEditImage" :src="editImageUrl" mode="aspectFill"></image>
          <div class="mineTopInfoBgView">
              <!-- 名字 -->
              <div class="mineNameAndSexView">
                <div class="nameTxt">{{userDataInfo.name}}</div>
                <image class="mineSexImage" :src="mineSexImageUrl" mode="aspectFill"></image>
              </div>

              <!-- 订单和充值 -->
              <div class="orderAndChargeBgView">
                  <div class="mineOrderView">
                      <image class="mineorderImage" :src="mineorderImageUrl" mode="aspectFill"></image>
                      <div class="mineOrderTxt">订单</div>
                  </div>
                  <div class="mineMoneyView">
                      <div class="moneyBgView">
                        <image class="minemoneyImage" :src="mineMoneyImageUrl" mode="aspectFill"></image>
                        <div class="mineMoneyrTxt">99999</div>
                      </div>
                      <div class="mineOrderTxt">自由币</div>
                  </div>
                  <div class="mineChargeView">
                      <image class="mineorderImage" :src="minechargeImageUrl" mode="aspectFill"></image>
                      <div class="mineOrderTxt">充值</div>
                  </div>
              </div>
            
          </div>
        </div>
      </div>
</template>

<script>
export default {
    props: {
        userDataInfo: {
        type: Object,
        },
    },

  data() {
    return {
        topbgImageUrl:'/static/images/mine_top_bgView.png',
        editImageUrl:'/static/images/mine_edit.png',
        mineorderImageUrl:'/static/images/mine_order.png',
        minechargeImageUrl:'/static/images/mine_deposit.png',
        mineMoneyImageUrl:'/static/images/mine_coin.png',
        mineSexImageUrl:'/static/images/mine_girl.png'
    };
  },

  methods: {
        mineCellTap(e, key){
          this.$emit('serviceIndexClick', {a:key});
        }
  }
};
</script>

<style scoped>

.minetopView{
  height: 100%;
  width: 100%;
}

.mineTopCircleBgView{
  position:absolute;
  height: 228rpx;
  width: 100%;
}

.mineTopUserBgView{
  position:relative;
  height: 300rpx;
  width: 92.6%;
  margin-left: 3.7%;
  margin-right: 3.7%;
}

.mineTopInfoBgView{
  z-index: 1;
  position:absolute; 
  background-color: white;
  margin-top: 60rpx;
  width: 100%;
  height: 240rpx;
  border-radius: 10rpx;
}

.mineNameAndSexView{
    margin-top: 65rpx;
    height: 30rpx;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.nameTxt{
    font-size:30rpx;
    font-family:PingFangSC-Medium;
    font-weight:bold;
    color:rgba(51,51,51,1);
    text-align: center;
}
.mineSexImage{
    width: 24rpx;
    height: 24rpx;
    margin-left: 10rpx;
}

.minePhotoImage{
  z-index: 2;
  position:absolute; 
  height: 110rpx;
  width: 110rpx;
  border-radius: 55rpx;
  left:50%; 
  margin-left: -55rpx;
  border: 5rpx solid white;
}


.mineEditImage{
    left:calc(50% + 27rpx);
    top: 73rpx;
    position:absolute;
    z-index: 3;
    width: 32rpx;
    height: 32rpx;
}


.orderAndChargeBgView{
    height: calc(100% - 95rpx);
    width: 100%;
    display: flex;
}

.mineOrderView,.mineChargeView,.mineMoneyView{
    flex: 1;/*为1的时候平分*/
    display: flex;
    flex-direction: column;
    align-items: center;
}

.mineOrderTxt{
    font-size:22rpx;
    font-family:PingFangSC-Thin;
    font-weight:bold;
    color:rgba(102,102,102,1);
    line-height:21rpx;
    margin-top: 10rpx;
}
.mineorderImage{
    width: 28rpx;
    height: 34rpx;
    margin-top: 28rpx;
}

.moneyBgView{
    margin-top: 28rpx;
    width: 100%;
    height: 34rpx;
    display: flex;
    justify-content: center;
    align-items: center;
}
.minemoneyImage{
    width: 34rpx;
    height: 34rpx;
}

.mineMoneyrTxt{
    font-size:36rpx;
    font-family:PingFangSC-Medium;
    font-weight:bold;
    color:rgba(129,216,207,1);
    line-height:21rpx;
    margin-left: 10rpx;
}


</style>