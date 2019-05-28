<template>
    <div class="serviceBgView">
        <div @click="mineCellTap($event,item.id)" class="cellBgView" v-for="item  in serviceArr" :key='item'>
            <div class="countBgView">
                <div class="cellCount">{{item.count}}</div>
            </div>
            <div class="titleBgView">
                <div class="cellTitle">{{item.title}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        serviceArr: {
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
          this.$emit('serviceIndexClick', {a:key});
        }
  }
};
</script>

<style scoped>

.serviceBgView{
    background-color: white;
    height: 100%;
    width: 92.6%;
    margin-left: 3.7%;
    margin-right: 3.7%;
    border-radius: 10rpx;
    display: flex;
}

.cellBgView{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    flex: 1;/*为1的时候平分*/
    display: flex;
    flex-direction: column;
    align-items: center;
}

.countBgView{
    width: 100%;
    flex: 1;/*为1的时候平分*/
    display: flex;
    align-items: flex-end;
    justify-content: center;
}
.titleBgView{
    width: 100%;
    flex: 1;/*为1的时候平分*/
    display: flex;
    align-items: center;
    justify-content: center;
}
.cellCount{
    font-size:30rpx;
    font-family:PingFangSC-Medium;
    font-weight:bold;
    color:rgba(51,51,51,1);
    line-height:21px;
}
.cellTitle{
    font-size:22rpx;
    font-family:PingFangSC-Thin;
    font-weight:bold;
    color:rgba(102,102,102,1);
    line-height:21px;
}

</style>