<template>
    <div class="groundBgView">
        <div @click="mineCellTap($event,item.id)" class="cellBgView" v-for="item  in groundOneArr" :key='item'>
            <image class="cellIcon" :src="item.iconUrl" mode="aspectFit"></image>
            <div class="groundCellTitle">{{item.title}}</div>
            <image class="arrowIcon" :src="morenArrowUrl" mode="aspectFit"></image>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        groundOneArr: {
        type: Array,
        },
    },

  data() {
    return {
      morenArrowUrl:'/static/images/more_arrow.png',
    };
  },

  methods: {
        mineCellTap(e, key){
          this.$emit('mineIndexClick', {a:key,b:key});
        }
  }
};
</script>

<style scoped>

.groundBgView{
    background-color: white;
    height: 100%;
    width: 92.6%;
    margin-left: 3.7%;
    margin-right: 3.7%;
    border-radius: 10rpx;
}

.cellBgView{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50%;
    width: 100%;
}

.cellIcon{
    width: 24rpx;
    height: 24rpx;
    margin-left: 39rpx;
}

.arrowIcon{
    width: 21rpx;
    height: 21rpx;
    margin-right: 40rpx;
}

.groundCellTitle{
    font-size:28rpx;
    font-family:PingFangSC-Thin;
    font-weight:bold;
    color:rgba(51,51,51,1);
    width: calc(100% - 139rpx);
    margin-left: 15rpx;
}

</style>