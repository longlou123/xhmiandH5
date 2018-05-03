<template>
  <div class="main">
    <div class="head">
      <div class="tips">
        <Icon type="close-circled" class="error" v-if="stepStatus==9"></Icon>
        <div class="tips_one" :class="{error_text: errorText}">{{tipsText1}}</div>
        <div class="tips_two">{{tipsText2}}</div>
      </div>
      <div class="circle_time" v-if="stepStatus==1||stepStatus==2">
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
<script>
import { mapState, mapMutations } from 'vuex';
import { getStore } from '@/script/util';
import { MessageBox } from 'mint-ui';
export default {
  name: 'test',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      phone: '',
      website: '',
      stepStatus: 0,
      tipsText1: '',
      btnText: '下一步',
      tipsText2: '请选择一个方便您授权发卡的门禁读头',
      currents: 0, //步骤条的步骤数
      countTime: 30,
      tempTime: null,
      long: true,    // 当前轮询是短时还是长时
      selectValue: '',
      countTimer: null,
      longAskTimer: null,
      firstCount: 30, // 首次轮询30s
      secondCount: 15,
      cardID: null,
      doorID: null,
      doorList: [],
      errorText: false,
      doors: null,
      grantNo: null
    }
  },
  computed: {
    ...mapState(['massageSave', 'authorizationUrl'])
  },
  mounted() {
    this.stepStatus = 0;
    this.initData();
  },
  methods: {
    // 成功后判断不同端去传输数据和跳出webview
    judgeToComplete() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var iOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid && ! iOS) {
        jsObj.twoDimensionCode(this.doors, this.grantNo);
      }else if(!isAndroid && iOS){
        window.webkit.messageHandlers.passValue.postMessage({doors: this.doors, grantNo: this.grantNo});
      }
    },
    judgeToClose() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var iOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid && ! iOS) {
        jsObj.finished();
      }else if(!isAndroid && iOS){
        window.webkit.messageHandlers.passValue.postMessage({finish: true});
      }
    },
    initData() {
      this.cardID = this.$route.query.cardID;
      this.doorList = JSON.parse(getStore('choisedDoorList')).doors;
      this.doorList = JSON.parse(this.doorList);
    },
    nextClick() {
      if (this.stepStatus === 0) {
        if (!this.selectValue) {
          this.tipsText1 = '请选择授权发卡的门禁读头';
          MessageBox('错误', this.tipsText1);
        } else {
          this.registerFirst();
        }
      } else if (this.stepStatus === 3) {
        if (this.authorizationUrl) {
          this.judgeToClose();
        } else {
          history.back(-1);
          // this.$router.push({ path: '/management' });
        }
      }
    },
    // 第一次注册
    registerFirst() {
      this.$post('/ssh/grantCard/registerCardEvent', {
        cardId: this.cardID,
        doorID: this.doorID, // 测试门
      }).then(res => {
        console.log(res);
        if (res.errorCode === 200) {
          this.switchJuged(1);
        } else {
          this.tipsText1 = '' + res.message;
          this.allRestart();
        }
      }).catch(err => {
        console.log(err)
        this.tipsText1 = '' + res.message;
        this.allRestart();
      })
    },
    // 第二次注册
    registerSec() {
      this.$post('/ssh/grantCard/registerCardEventSecound', {
        cardId: this.cardID,
      }).then(res => {
        console.log(res);
        if (res.errorCode === 200) {
          this.longAsk(this.secondCount, false);
        } else {
          console.log(res)
          this.tipsText1 = '' + res.message;
          this.allRestart();
        }
      }).catch(err => {
        console.log(err)
        this.tipsText1 = '' + res.message;
        this.allRestart();
      })
    },
    // 最终授权卡
    grantCard() {
      this.$post('/ssh/grantCard/grantCardEvent', {
        cardId: this.cardID,
      }).then(res => {
        console.log(res)
        if (res.errorCode === 200) {
          clearInterval(this.longAskTimer);
          this.doors = res.result.doors;
          this.grantNo = res.result.cardNumber;
          this.switchJuged(3);
          this.judgeToComplete();
        } else {
          this.tipsText1 = '' + res.message;
          this.allRestart();
        }
      }).catch(err => {
        console.log(err)
        this.tipsText1 = '' + res.message;
        this.allRestart();
      })
    },
    // 全部清除重新开始
    allRestart() {
      clearInterval(this.longAskTimer);
      this.switchJuged(10);
      document.getElementsByClassName('btn')[0].removeAttribute('disabled');
    },
    // 计时
    // count(num) {
    //   this.countTime = num;
    //   var _this = this;
    //   this.countTimer = setInterval(function() {
    //     _this.countTime = parseInt(_this.countTime);
    //     _this.countTime--;
    //     if (_this.countTime < 10 && _this.countTime >= 0) {
    //       _this.countTime = '0' + _this.countTime;
    //     }
    //     if (_this.countTime <= 0) {
    //       clearInterval(_this.longAskTimer)
    //       clearInterval(_this.countTimer);
    //       if (num === _this.firstCount) {
    //         _this.registerFirst();
    //       }
    //       if (num === _this.secondCount) {
    //         _this.registerSec();
    //       }
    //       _this.countTime = num;
    //     }
    //   }, 1000)
    // },
    // 轮询
    longAsk(num, long) {
      var _this = this;
      this.tempTime = num;
      this.long = long;
      this.longAskTimer = setInterval(function() {
        _this.tempTime = _this.tempTime - 2;
        _this.$post('/ssh/grantCard/checkCallBack', {
          cardId: _this.cardID,
        }).then(res => {
          console.log(res.result);
          if (res.errorCode === 200) {
            if (res.result.number === 1 && res.result.registerNumber === 1) {
              clearInterval(_this.longAskTimer)
              _this.switchJuged(2);
            } else if (res.result.number === 2 && res.result.registerNumber === 2) {
              clearInterval(_this.longAskTimer)
              _this.grantCard();
            }
          } else {
            console.log(res.errorCode)
            _this.tipsText1 = '' + res.message;
            // _this.allRestart();
          }
          // 判断是30s的还是15s的
          if (_this.tempTime<=0) {
              if (_this.long) {
                _this.tempTime = _this.firstCount;
                _this.registerFirst();  // 重新注册1
              } else {
                _this.tempTime = _this.secondCount;
                _this.switchJuged(2);   //重新注册2
              }
          }
        }).catch(err => {
          console.log(err)
          this.tipsText1 = '' + res.message;
        })
      }, 1000)
    },
    switchJuged(num) {
      this.stepStatus = num;
      switch (num) {
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
          clearInterval(this.longAskTimer);
          this.currents = 1;
          this.longAsk(this.firstCount, true);
          break
        case 2:
          this.tipsText1 = '第二次读卡';
          this.tipsText2 = '请再次将IC卡防止门禁读头上';
          this.btnText = '下一步';
          clearInterval(this.longAskTimer);
          this.registerSec();
          break
        case 3:
          document.getElementsByClassName('btn')[0].removeAttribute('disabled');
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
          this.tipsText2 = '';
          this.errorText = true;
          var _this = this;
          MessageBox('错误', this.tipsText1);

          // 如果是从当家进来的则跳回有参数的页面,否则是无参的页面
          if (this.authorizationUrl) {
            history.back(-1);
          } else {
            this.$router.push({ path: "/authorization", query: { return: 1 } })
          }
          break
        default:
          break
      }
    }
  },
  destroyed() {
    clearInterval(this.countTimer);
    clearInterval(this.longAskTimer);
  },
  watch: {
    // stepStatus 只关注tips
    // stepStatus: function(),
    // 监听选择器的值变化
    selectValue: function() {
      this.doorID = this.selectValue;
    }
  }
}

</script>
<style lang="scss" scoped>
.main {
  height: 100%;
  .head {
    height: 5.8rem;
  }
  .circle_time {
    background-color: #fff;
    width: 100%;
    height: 5rem;
    margin: 0 auto;
    margin-top: 0.2rem;
    background: url('http://202.105.96.131:3002/active.jpg');
    background-size: 100% 100%;
  }
  overflow: hidden;
  .tips {
    height: 0.9rem;
    margin-top: 0.5rem;
    position: relative;
    .error {
      position: absolute;
      left: 2.6rem;
      top: -0.08rem;
      color: red;
      font-size: 0.5rem;
    }
    .tips_one,
    .tips_two {
      height: 0.45rem;
    }
  }
  .select {
    vertical-align: middle;
    position: relative;
    .label {
      position: absolute;
      left: 0.5rem;
      top: 0.15rem;
    }
    .picker_div {
      margin-top: 2rem;
      margin-left: 1.85rem;
      width: 5.2rem;
      box-shadow: 0 0.05rem 0.1rem 0 #ddd;
      border-radius: 0.1rem;
      .select_div {
        width: 100%;
      }
    }
  }
  .succese {
    position: relative;
    .succese_text {
      margin-top: 1rem;
      font-size: 0.65rem;
      color: #7c7c88;
    }
    .smile {
      position: absolute;
      left: 4.5rem;
      top: -0.2rem;
      height: 0.5rem;
      width: 0.5rem;
      background: url(../images/succese.png) no-repeat;
      background-size: 100% 100%
    }
    span {
      display: inline-block;
      color: #2f405f;
      margin-top: 1rem;
    }
  }
  .step_div {
    height: 2.75rem;
    width: 6.6rem;
    margin: 0 auto;
    margin-top: 0.5rem; // margin-top: 1rem;
    background-color: #fff;
    box-shadow: 0 0.12rem 0.21rem 0 #ced4e5;
    border-radius: 0.1rem;
    padding-top: 0.8rem;
  }
  .next_btn {
    margin-top: 0.4rem;
    Button {
      width: 6.92rem;
      height: 0.89rem;
      border-radius: 0.2rem;
      font-size: 0.36rem;
      color: #ffffff;
    }
  }
  .error_text {
    color: red;
  }
}

</style>
