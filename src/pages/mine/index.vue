<template>
  <div class="mineMainBgView">
      
      <div class="minetopView">
        <MineUserInfo :userDataInfo="userDataInfo"> </MineUserInfo>
      </div>

      <div class="serviceBgView">
        <MineService :serviceArr="serviceArr" @serviceIndexClick="getServiceIndex"> </MineService>
      </div>

      <div class="section_one">
        <TableGround :groundOneArr="groundOneArr"  @mineIndexClick="getIndex" />
      </div>
      <!-- 我的储物 -->
      <div class="storageCellView">
        <TableCell :groundOneArr="groundThreeArr"  @mineIndexClick="getIndex"></TableCell>
      </div>
      <div class="section_one">
        <TableGround :groundOneArr="groundTwoArr" @mineIndexClick="getIndex"/>
      </div>

      <div class="exitBtnView">
        <div class="exitBtn" @click="userExitSystem" >
          <div class="exitTxt">退出当前账号</div>
        </div>
      </div>
      
  </div>
</template>

<script>
import MineUserInfo from "@/pages/mine/mineComponent/mineUserInfo";
import TableGround from "@/pages/mine/mineComponent/mineTableGround";
import TableCell from "@/pages/mine/mineComponent/mineTableCell";
import MineService from "@/pages/mine/mineComponent/mineService";


export default {
  components: {
    MineUserInfo,
    TableGround,
    TableCell,
    MineService
  },

  data () {
    return {
      //用户数据
      userDataInfo:{
        name:'Jay Chou',
        money:'999',
        photoUrl:'/static/images/mine_photo.jpeg',
      },

      

      //图片数组
       groundOneArr: [
         {
           id:1,
           title:'身体档案',
           iconUrl:'/static/images/mine_bodyprofile.png'
         },{
           id:2,
           title:'运动历程',
           iconUrl:'/static/images/mine_sportdata.png'
         }
       ],
       groundTwoArr: [
         {
           id:4,
           title:'意见反馈',
           iconUrl:'/static/images/mine_suggestion.png'
         },{
           id:5,
           title:'协议与政策',
           iconUrl:'/static/images/mine_policy.png'
         }
       ],
       groundThreeArr: [
         {
           id:3,
           title:'我的储物',
           iconUrl:'/static/images/mine_savebox.png'
         }
       ],
       //服务类数据
       serviceArr: [
         {
           id:1,
           title:'优惠券',
           count:'0'
         },{
           id:2,
           title:'门票',
           count:'0'
         },{
           id:3,
           title:'会员卡',
           count:'0'
         }
       ],
      
    }
  },

  methods: {
        getServiceIndex(data){
          console.log("优惠劵门票相关,索引"+data.a);
        },

        userExitSystem(){
          console.log("退出登录");
          const url = '../loginAndRegist/loginType/main'
          mpvue.navigateTo({ url })
          // if (mpvuePlatform === 'wx') {
          //   mpvue.switchTab({ url })
          // } else {
            
          // }
        },

        getIndex(data) {
          console.log("我是父组件,索引"+data.a+";"+data.b);
          // if(data.a == 1){
          //   wx.toast('身体档案');
          // }
    },
  },


  mounted () {
    console.log(this.$store.state.userInfo.name)
    this.$store.commit('mutations', '88 world')
    console.log(this.$store.state.userInfo.name)
  },

  

  created () {
    console.log("设置新的颜色");
    wx.setNavigationBarColor({
        frontColor: "#000000",/*标题颜色，这里貌似仅支持 #ffffff 和 #000000 */
        backgroundColor: "#81D8CFFF",/*背景色 十六进制即可*/
        animation: {/*动画*/
          duration: 400,
          timingFunc: 'easeIn'
        }
    }),

    console.log("本地参数"+ this.$store.state.userInfo.name);
  }
}
</script>

<style>
.minetopView{
  width: 100%;
  height: 300rpx;
}

.serviceBgView{
  margin-top: 30rpx;
  height: 120rpx;
  width: 100%;
}

.section_one{
  margin-top: 30rpx;
  width: 100%;
  height: 216rpx;
}

.storageCellView{
  margin-top: 30rpx;
  width: 100%;
  height: 88rpx;
}

.exitBtnView{
  width: 100%;
  height: 166rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.exitBtn{
  background-color: #81D8CFFF;
  height: 98rpx;
  width: 92.6%;
  border-radius: 4rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.exitTxt{
  font-size:30rpx;
  font-family:PingFangSC-Regular;
  font-weight:bold;
  color:rgba(255,255,255,1);
}

</style>
