<template>
    <swiper class="swiper" :indicator-dots="images.length > 1 ?true:false" :autoplay="autoplay" :interval="interval" :duration="duration" :indicator-color="indicatorColor" :indicator-active-color="indicatorActivecolor" >
      <block v-for="(item, index) in images" :key="index" >
        <swiper-item>
          <image :src="item.attachUrl" class="slide-image" mode="aspectFill"></image>
        </swiper-item>
      </block>
    </swiper>
</template>



<script>
export default {
  props: {
    images: {
      type: Array,
    }
  },

  data() {
    return {
      autoplay: true,
      interval: 3000,
      duration: 500,
      ndicatorColor:"rgb(255, 255, 255,0.6)",
      indicatorActivecolor: "#fff",
      circular: true,
    };
  },


   created () {
    //  console.log('数组长度是',images.length)
   }

};
</script>

<style scoped>
.swiper {
    overflow: hidden;
    border-radius: 10rpx;
    transform: translateY(0);
    width: 100%;
    height: 100%;
}
image {
  height: 100%;
  width: 100%;
}
</style>