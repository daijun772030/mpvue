<template>
    <div class="rankingMainBgView">
      <div class="rankingTopView">
        <div class="topLeftView">
          <div class="topleftTitleBgView">
              <div class="topleftTitleLineV"></div>
              <div class="topleftTitleTxT">累计运动</div>
          </div>
          <div class="bottomleftContentBgView">
            <div class="bottomleftContentNumberTxT">{{homeRankingDic.sportMin}}</div>
            <div class="bottomleftContentunitTxT">分钟</div>
          </div>
        </div>
        <!-- 中间部分 -->
        <div class="topMiddleView">
          <div class="topleftTitleBgView">
              <div class="topleftTitleLineV"></div>
              <div class="topleftTitleTxT">运动排名</div>
          </div>
          <div class="bottomleftContentBgView">
            <div class="bottomleftContentNumberTxT">{{homeRankingDic.sportRanking}}</div>
            <div class="bottomleftContentunitTxT">名</div>
          </div>

        </div>
        <!-- 头像部分 -->
        <div class="topRightView">
          <image class="rankingPhotoImage" :src="photoUrl" mode="aspectFill"></image>
        </div>
      </div>
      <div class="lineV"></div>
      <!-- 测量数据 -->
      <div class="rankingBottomView">
        <div class="bottomLeftView">
           <div class="bottomleftTitleBgView">
              <div class="bottomleftTitleTxT">测量分值</div>
           </div>
           <div class="bottomleftHaveLineContentBgView">
              <div class="bottomLineView"></div>
              <div class="havelineView">
                <div class="haveLineContentNumberTxT">{{homeRankingDic.measurementScore}}</div>
                <div class="haveLineContentunitTxT">分</div>
              </div>
           </div>
        </div>

        <!-- 体重和体脂 -->
        <div class="bottomRightView">
          <!-- 体重 -->
          <div class="bottomRightWeightView">
              <div class="bottomRightWeightTxT">体重</div>
              <div class="bottomWeightLineBgView">
                <div class="WeightbottomLineView"></div>
                <div class="havelineView">
                  <div class="haveLineWeightNumberTxT">{{homeRankingDic.measurementScore}}</div>
                  <div class="haveLineContentunitTxT">公斤</div>
                </div>
             </div>
          </div>
          <!-- 体脂 -->
          <div class="bottomRightBodyFatView">
              <div class="bottomRightWeightTxT">体脂</div>
              <div class="bottomWeightLineBgView">
                <div class="WeightbottomLineView"></div>
                <div class="havelineView">
                  <div class="haveLineWeightNumberTxT">{{homeRankingDic.measurementScore}}</div>
                </div>
             </div>
          </div>


        </div>
      </div>
    </div>
</template>

<script>

export default {
  props: {
    homeRankingDic: {
      type: Object,
    },
  },
  data() {
    return {
      photoUrl:'/static/images/mine_photo.jpeg',
      
    };
  }
};
</script>

<style scoped>

.rankingMainBgView{
  background-color: white;
  height: 100%;
  width: 92.6%;
  margin-left: 3.7%;
  margin-right: 3.7%;
  border-radius: 10rpx;
}

.lineV{
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  height:1px;
  background-color: rgba(225,225,225,1);
}

.rankingTopView{
  width: 100%;
  height: 45%;
  display: flex;
}

.topLeftView{
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.topleftTitleBgView{
  width: 100%;
  height: 40%;
  display: flex;
  align-items: flex-end;
}
.topleftTitleLineV{
  height: 26rpx;
  width: 3px;
  background-color: #81D8CFFF;
  margin-left: 64rpx;

}

.topleftTitleTxT{
  margin-left: 11rpx;
  font-size:24rpx;
  font-family:PingFangSC-Thin;
  font-weight:bold;
  color:rgba(102,102,102,1);
  height: 30rpx;
}


.bottomleftContentBgView{
  position:relative;
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center;
}

.bottomleftHaveLineContentBgView{
  position:relative;
  width: 100%;
  height: 40%;
  display: flex;
  align-items: flex-end;
}



.havelineView{
  position:absolute;
  z-index: 2;
  display: flex;
  align-items: flex-end;
  height: 100%;
  width: 100%;
}

.bottomLineView{
  position:absolute;
  z-index: 1;
  margin-left: 64rpx;
  height:23rpx;
  width: calc(100% - 84rpx);;
  background-color: rgba(235,235,235,1);
}

.haveLineContentNumberTxT{
  font-size:72rpx;
  font-family:PingFangSC-Semibold;
  font-weight:bold;
  color:rgba(51,51,51,1);
  margin-left: 64rpx;
  height: 100%;
}

.haveLineContentunitTxT{
  font-size:24rpx;
  font-family:PingFangSC-Regular;
  font-weight:bold;
  color:rgba(51,51,51,1);
  margin-left: 10rpx;
  height: 30rpx;
}


.bottomleftContentNumberTxT{
  font-size:48rpx;
  font-family:PingFangSC-Semibold;
  font-weight:bold;
  color:rgba(51,51,51,1);
  line-height:21rpx;
  margin-left: 64rpx;
}

.bottomleftContentunitTxT{
  font-size:24rpx;
  font-family:PingFangSC-Regular;
  font-weight:bold;
  color:rgba(51,51,51,1);
  line-height:21rpx;
  margin-left: 10rpx;
}

.rankingPhotoImage{
  height: 110rpx;
  width: 110rpx;
  border-radius: 55rpx;
}



.topMiddleView{
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.topRightView{
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
}

/*底部数据相关*/
.rankingBottomView{
  width: 100%;
  height: 55%;
  display: flex;
}

.bottomLeftView{
  width: 50%;
  height: 100%;
}
.bottomRightView{
  width: 50%;
  height: 100%;
}

.bottomleftTitleBgView{
  width: 100%;
  height: 40%;
  display: flex;
  margin-left: 64rpx;
  align-items:flex-end; 
}

.bottomleftTitleTxT{
  font-size:24rpx;
  font-family:PingFangSC-Thin;
  font-weight:bold;
  color:rgba(102,102,102,1);
  height: 30rpx;
}

.bottomRightWeightView,.bottomRightBodyFatView{
  height: 40%;
  width: 100%;
  display: flex;
  align-items: flex-end;
}
.bottomRightWeightTxT{
  font-size:24rpx;
  font-family:PingFangSC-Thin;
  font-weight:bold;
  color:rgba(102,102,102,1);
  height: 30rpx;
  width: 68rpx;
}


.bottomWeightLineBgView{
  position:relative;
  height: 100%;
  width: calc(100% - 68rpx);
  display: flex;
  align-items: flex-end;
}

.haveLineWeightNumberTxT{
  font-size:48rpx;
  font-family:PingFangSC-Semibold;
  font-weight:bold;
  color:rgba(51,51,51,1);
  height: 50rpx;
}
.WeightbottomLineView{
  position:absolute;
  z-index: 1;
  height:23rpx;
  width: calc(100% - 68rpx);;
  background-color: rgba(235,235,235,1);
}

</style>