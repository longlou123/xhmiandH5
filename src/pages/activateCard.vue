<template>
    <div class="main">
      <div class="head">
        <div class="tips">
          <Icon type="close-circled" class="error" v-if="stepStatus==9"></Icon>
          <div class="tips_one">{{tipsText1}}</div>
          <div class="tips_two">{{tipsText2}}</div>
        </div>
        <div class="circle_time" v-if="stepStatus==1||stepStatus==2">
          <span>00:{{countTime}}</span>
        </div>
        <div class="select" v-if="stepStatus==0">
          <span class="label">读卡门禁：</span>
          <div class="picker_div">
            <Select v-model="selectValue" class="select_div">
                <Option v-for="item in doorList" :value="item.doorID" :key="item.doorID">{{ item.doorName }}</Option>
            </Select>
          </div>
        </div>
        <div class="succese" v-if="stepStatus==3">
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
        <Button type="primary" :long="true" class="btn" @click="nextClick()">{{btnText}}</Button>
      </div>
    </div>
</template>
<script >
import { mapState, mapMutations } from 'vuex';
import { getStore } from '@/script/util'
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
        countTimer: null,
        longAskTimer: null,
        firstCount: 30,
        secondCount: 15,
        cardID: null,
        doorID: null,
        doorList: [],
      }
    },
   	computed:{
      ...mapState(['massageSave'])
    },
    mounted() {
      this.stepStatus = 0;
      this.initData();
    },
    methods:{
      initData(){
        this.cardID = this.$route.query.cardID;
        this.doorList = JSON.parse(getStore('choisedDoorList')).doors;
        this.doorList = JSON.parse(this.doorList)
      },
      nextClick(){
      	if(this.stepStatus === 0){
      		this.registerFirst();
      	}
      },
      // 第一次注册
      registerFirst(){
      	this.$post('/ssh/grantCard/registerCardEvent', {
          cardId: this.cardID,
          doorID: this.doorID,	// 测试们
        }).then(res=>{
          console.log(res.errorCode);
     			if(res.errorCode === 200){
     				this.stepStatus = 1;
     			}
        }).catch(err=>{
          console.log(err)
          this.stepStatus = 10;
        })
      },
      // 第二次注册
      registerSec(){
      	this.$post('/ssh/grantCard/registerCardEventSecound', {
        	cardId: this.cardID,
        }).then(res=>{
          console.log(res);
          if (res.state){
          	this.longAsk();
          }
        }).catch(err=>{
          console.log(err)
          this.stepStatus = 10;
        })
      },
      // 最终授权卡
      grantCard(){
      	this.$post('/ssh/grantCard/grantCardEvent', {
        	cardId: this.cardID,
        }).then(res=>{
          if (res.errorCode === 200){
          	this.stepStatus = 3;
          	clearInterval(this.countTimer);
        		clearInterval(this.longAskTimer);
          	console.log('最终成功');
          } else {
          	this.allRestart();
          }
        }).catch(err=>{
          console.log(err)
          this.allRestart();
        })
      },
      // 全部清除重新开始
      allRestart(){
      	clearInterval(this.countTimer);
        clearInterval(this.longAskTimer);
        this.stepStatus = 10;
        document.getElementsByClassName('btn')[0].removeAttribute('disabled');
      },
      // 计时
      count(num){
        this.countTime = num;
        var _this = this;
        clearInterval(_this.longAskTimer);
        this.countTimer = setInterval(function(){
          _this.countTime = parseInt(_this.countTime);
          _this.countTime--;
          if(_this.countTime<10 && _this.countTime >= 0){
            _this.countTime = '0' + _this.countTime;
          }
          if(_this.countTime <= 0){
          	clearInterval(_this.longAskTimer)
          	if(num === _this.firstCount){
          		_this.registerFirst();
          	}
          	if(num ===  _this.secondCount){
          		_this.registerSec();
          	}
            _this.countTime = num;

          }
        }, 1000)
      },
      // 轮询
      longAsk(){
      	var _this = this;
      	clearInterval(_this.longAskTimer);
      	this.longAskTimer = setInterval(function(){
      		_this.$post('/ssh/grantCard/checkCallBack', {
            cardId: _this.cardID,
	          }).then(res=>{
	            console.log(res.result);
                if(res.errorCode){
                    if(res.result.number === 1 && res.result.registerNumber === 1){
                        _this.stepStatus = 2;
                        clearInterval(_this.longAskTimer);
                    }
                    if(res.result.number === 2 && res.result.registerNumber === 2){
                        clearInterval(_this.longAskTimer);
                        _this.grantCard();
                    }
                } else {
                        _this.allRestart();
                }

	          }).catch(err=>{
	            console.log(err)
	            _this.allRestart();
	          })
      	}, 2000)
      },
    },
    destroyed(){
    	clearInterval(this.countTimer);
      clearInterval(this.longAskTimer);
    },
    watch: {
    	// stepStatus 只关注tips
      stepStatus: function(){
        switch (this.stepStatus){
          case 0:
            this.tipsText1 = '';
            this.tipsText2 = '请选择一个方便您授权发卡的门禁读头';
            this.btnText = '下一步';
            break
          case 1:
          	document.getElementsByClassName('btn')[0].setAttribute('disabled', 'disabled');
            this.tipsText1 = '第一次读卡';
            this.tipsText2 = '请将IC卡放置需要授权的门禁读头';
            this.btnText = '下一步';
            this.count(this.firstCount);
            this.currents = 1;
            this.longAsk();
            break
          case 2:
            this.tipsText1 = '第二次读卡';
            this.tipsText2 = '请再次将IC卡防止门禁读头上';
            this.btnText = '下一步';
            clearInterval(this.countTimer);
            this.count(this.secondCount);
            this.registerSec();
            break
          case 3:
          	document.getElementsByClassName('btn')[0].setAttribute('disabled', 'disabled');
            this.tipsText1 = '';
            this.tipsText2 = '';
            this.currents = 2;
            this.btnText = '完成';
            break
          case 9:
            this.tipsText1 = '读卡失败';
            this.tipsText2 = '请重新将IC卡放置需要授权的门禁读头上';
            break
          case 10:
            this.tipsText1 = '发生错误';
            this.tipsText2 = '';
            this.currents = 0;
            var _this = this;
            setTimeout(function(){
                _this.stepStatus = 0;
            }, 2000)
            break
        }
      },
      // 监听选择器的值变化
      selectValue: function(){
        this.doorID = this.selectValue;
      }
    }
  }

</script>
<style lang="scss" scoped>
  .main{
    .head{
      height: 6.2rem;
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
      margin-top: 0.5rem;
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
      margin-bottom: 0.3rem;
      background-color: #fff;
      box-shadow: 0 0.12rem 0.21rem 0 #ced4e5;
      border-radius: 0.1rem;
      padding-top: 0.8rem;
    }
    .next_btn{
      position: fixed;
      bottom: 0.8rem;
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
