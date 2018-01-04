<template>
    <div class="main">
      <div class="head">
        <div class="tips">
          <Icon type="close-circled" class="error" v-if="stepStatus==9"></Icon>
          <div class="tips_one">{{tipsText1}}</div>
          <div class="tips_two">{{tipsText2}}</div>
        </div>
        <div class="circle_time" v-if="stepStatus==1">
          <span>00:{{countTime}}</span>
        </div>
        <div class="select" v-if="stepStatus==0">
          <span class="label">读卡门禁：</span>
          <div class="picker_div">
            <Select v-model="selectValue" class="select_div">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
        </div>
        <div class="succese" v-if="stepStatus==2">
          <div class="succese_text">成功</div>
          <span>该门卡已经可以使用了哟~</span>
          <div class="smile"></div>
        </div>
      </div>
      <div class="step_div">
        <Steps :current="currents">
            <Step title="" content="门禁选择"></Step>
            <Step title="" content="读卡等待"></Step>
            <Step title="" content="授权成功"></Step>
        </Steps>
      </div>
      <div class="next_btn">
        <Button type="primary" shape="circle" :long="true" class="btn" @click="nextClick()">{{btnText}}</Button>
      </div>
    </div>
</template>
<script >

  export default {
    name:'test',
    data(){
      return {
        username:'',
        email:'',
        password:'',
        phone:'',
        website:'',
        stepStatus: 0,
        tipsText1: '',
        btnText: '下一步',
        tipsText2: '请选择一个方便您授权发卡的门禁读头',
        currents: 0, //步骤条的步骤数
        countTime: 30, 
        selectValue: '',
        cityList: [
          {
              value: 'New York',
              label: 'New York'
          },
          {
              value: 'London',
              label: 'London'
          },
          {
              value: 'Sydney',
              label: 'Sydney'
          },
          {
              value: 'Ottawa',
              label: 'Ottawa'
          },
          {
              value: 'Paris',
              label: 'Paris'
          },
          {
              value: 'Canberra',
              label: 'Canberra'
          }
        ],
      }
    },
    methods:{
      nextClick(){
        this.currents++;
        this.stepStatus++;
        clearInterval(this.timer);
      },
      count(num){
        this.countTime = num;
        var _this = this;
        this.timer = setInterval(function(){
          parseInt(_this.countTime);
          _this.countTime--;
          if(_this.countTime<10){
            _this.countTime = '0' + _this.countTime;
          }
          if(_this.countTime == 0){
            clearInterval(_this.timer)
          }
        }, 1000)
      },
      //轮询
      longAsk(num){

      },
    },
    mounted() {
      this.stepStatus = 0;
    },
    watch: {
      stepStatus: function(){
        console.log(this.stepStatus);
        switch (this.stepStatus){
          case 0:
            this.tipsText1 = '';
            this.tipsText2 = '请选择一个方便您授权发卡的门禁读头';
            this.btnText = '下一步';
            break
          case 1:
            this.tipsText1 = '第一次读卡';
            this.tipsText2 = '请将IC卡放置需要授权的门禁读头';
            this.btnText = '下一步';
            this.count(30);
            this.longAsk(30);
            break
          case 2:
            this.tipsText1 = '';
            this.tipsText2 = '';
            this.btnText = '完成';
            break
          case 3:
            this.tipsText1 = '第二次读卡';
            this.tipsText2 = '请再次将IC卡防止门禁读头上';
            this.btnText = '下一步';
            break
          case 9:
            this.tipsText1 = '读卡失败';
            this.tipsText2 = '请重新将IC卡放置需要授权的门禁读头上';
            break
        }
      },
      //监听选择器的值变化
      selectValue: function(){
        
      }
    }
  }

</script>
<style lang="scss" scoped>
  .main{
    .head{
      height: 6.5rem;
    }
    .circle_time{
      background-color: #fff;
      width: 3rem;
      height: 3rem;
      border-radius: 1.5rem;
      background-color: #ffffff;
      box-shadow: 0px 12px 21px 0px #ced4e5;
      margin: 0 auto;
      margin-top: 0.85rem;
      text-align: left;
      span{
        margin-left: 0.7rem;
        font-size: 0.65rem;
        line-height: 3rem;
        color: #7c7c88;
      }
    }
    overflow: hidden;
    .tips{
      height: 0.9rem;
      margin-top: 0.9rem;
      position: relative;
      .error{
        position: absolute;
        left: 2.6rem;
        top: -0.08rem;
        color: red;
        font-size: 0.5rem;
      }
      .tips_one, .tips_two{
        height: 0.45rem;
      }
    }
    .select{
      vertical-align: middle;
      position: relative;
      .label{
        position: absolute;
        left: 0.5rem;
        top: 0.15rem;
        
      }
      .picker_div{
        margin-top: 2rem;
        margin-left: 1.85rem;
        width: 5.2rem;
        box-shadow: 0 0.05rem 0.1rem 0 #ddd;
        border-radius: 0.1rem;
        .select_div{
          width: 100%;
        }
      }
    }
    .succese{
      position: relative;
      .succese_text{
        margin-top: 1rem;
        font-size: 0.65rem;
        color: #7c7c88;
      }
      .smile{
        position: absolute;
        left: 4.5rem;
        top: -0.2rem;
        height: 0.5rem;
        width: 0.5rem;
        background: url(../images/succese.png) no-repeat;
        background-size: 100% 100%
      }
      span{
        display: inline-block;
        color: #2f405f;
        margin-top: 1rem;
      }
    }
    .step_div{
      height: 2.75rem;
      width: 6.6rem;
      margin: 0 auto;
      background-color: #fff;
      box-shadow: 0 0.12rem 0.21rem 0 #ced4e5;
      border-radius: 0.1rem;
      padding-top: 0.8rem;
    }
    .next_btn{
      position: fixed;
      bottom: 0.65rem;
      width: 6.2rem;
      left: 50%;
      transform: translateX(-50%);
      span{
        font-size: 0.3rem;
        color: #fff;
      }
    }
  }

</style>