<template>
  <div class="management" >
    <mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :max-distance="150"
                    ref="loadmore" :auto-fill="false" @bottom-status-change="handleTopChange" >
    <ul class="visitors" v-for="(item, index) in doorList" v-if="hasData">
      <li class="center_one">
        <div class="center_two" @click="getnow(item,index)">
          <span class="text_span">{{item.name}}</span><span class="guest" v-if="item.type===1">家属</span>
          <span class="guest" v-else-if="item.type===2">租客</span><span class="guest" v-else-if="item.type===3">访客</span>
          <div class="card" :value="item.cardNumber">卡号：{{item.cardNumber}}</div>
          <div class="time">有效期：{{item.startTime}} 至 {{item.endTime}}</div>
          <img class="show_img" src="../images/cancellation.png" alt="" v-show="item.isCancel">
          <img class="show_img" src="../images/overdue.png" alt="" v-show="!showBtnList[index]">
        </div>
        <div v-show="!item.isCancel">
          <Button  type="primary" class="btn" @click="showModal(item,index)" v-if="showBtnList[index]">注销</Button>
        </div>
      </li>
      <div class="deletes">
        <Modal v-model="modal3" @on-ok="cancellation(modalItem,modalIndex)">
          <p>注销将会无法使用门卡</p>
          <p>请确定是否进行删除</p>
        </Modal>
      </div>
    </ul>
    </mt-loadmore>
    <div v-if="!hasData">
      <div class="center">
        <div class="door_text"></div>
        <img class="door_img" src="../images/dragon.png">
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { getStore, saveStore } from '@/script/util'
import {Loadmore} from 'mint-ui';
export default {
  data() {
    return {
      modal3: false,
      doorList: null,
      showBtnList: [],
      modifyvue: null,
      detailsList: false,
      value: [],
      doors: [],
      cardNumber: [],
      userData: null,
      status: null,
      modalIndex: null,
      modalItem: null,
      showBtn: true,
      overdue: false,
      topStatus: '',
      hasData: true,
      allLoaded: false,
      page:1,
      dataList:null,
      scrollMode:"touch",
       topStatus: '',

      // showImg:false
    }
  },
  mounted() {
    this.getdata();
  },
  created() {

  },
  methods: {
    loadBottom() { // 加载更多数据的操作
                //load data
                //this.allLoaded = true;// 若数据已全部获取完毕
             var _this = this;
             setTimeout(function () {
                    if(_this.dataList<2){
                        console.log('无数据更新')
                    }else{
                         _this.page = Number(_this.page) +1;
                         _this.getdata();
                    }
                    _this.$refs.loadmore.onBottomLoaded();
               }, 1000);
            },
        handleTopChange(status) {
            this.topStatus = status;
        },
    showModal(item, index) {
      this.modalItem = item;
      this.modalIndex = index;
      this.modal3 = true
    },
    cancellation(item, index) {
      var cardN = item.cardNumber.toString();
      this.$post('/ssh/grantCard/cancelGrantCard', {
        cardNumber: cardN
      }).then(res => {
        if(res.errorCode===200){
        this.getdata();
        Vue.set(this.doorList,index,res.result.cardList);
        console.log(res);
        }else{

        }

      }).catch(err => {
        console.log(err)
      })
    },
    getnow(d, index) {
      this.modifyvue = d;
      this.$router.push({
        path: "/details",
        query: {
          value: index + ''
        }
      });
    },
    success() {
      this.MessageBox.confirm(message, title);
    },
    getdata() {
      var _this = this
      _this.projectCode = getStore('projectCode');
      _this.granterPhone = getStore('granterPhone');
      this.$post('/ssh/grantCard/getGrantCardByUser', {
        "projectCode": _this.projectCode,
        "granterPhone": _this.granterPhone,
        "pageSize": 4,
        "pageNumber": _this.page
      }).then(res => {
        console.log(res);
         if (res.result.cardList.length === 0) {
          this.hasData = false;
        }else{
          this.dataList=res.result.cardList.length;
          if(this.page===1){
                      this.doorList = res.result.cardList;
                  }else{
                      this.doorList =this.doorList.concat(res.result.cardList);
                  }
          this.hasData = true;
          saveStore('userData', this.doorList);
          for (var i = 0; i < this.doorList.length; i++) {
            this.doorList[i].startTime = this.doorList[i].startTime.substring(0, 10)
            this.doorList[i].endTime = this.doorList[i].endTime.substring(0, 10);
            if (new Date() > new Date(this.doorList[i].endTime)) {
              this.showBtnList[i] = false;
            } else {
              this.showBtnList[i] = true;
            }
          }
        }
      }).catch(function(error) {
        console.log(error);
      });
    }
  }
}

</script>
<style lang="scss" scoped>
.management {
  width: 7.5rem;
  height: 13.34rem;
  background-color: #EFf2f5;
  padding-top: 0.2rem;
  .visitors {
    height: 3.5rem;
    background-color: #ffffff;
    overflow: hidden;
    box-shadow: 0px 5px 5px #E8EBF4;
    margin: 0 0.3rem;
    margin-bottom: 0.4rem;
    border-radius: 0.15rem;
    box-shadow: 0px -5px 5px #E8EBF4, 0px 5px 5px #E8EBF4, 0px 5px 5px #E8EBF4, 0px 5px 5px #E8EBF4;
    .center_one {
      text-align: left;
      width: 7rem;
      height: 2rem;
      margin: 0 auto;
      .center_two {
        padding: 0.3rem 0 0.4rem 0.3rem;
        border-bottom: 0.02rem solid #E0E0E1;
        position: relative;
        .text_span {
          font-size: 0.36rem;
          color: #36A0FB;
          padding-right: 0.25rem;
        }
        .time {
          font-size: 0.24rem;
        }
        .show_img {
          width: 2rem;
          position: absolute;
          left: 4.5rem;
          top: 1rem;
        }
        .card {
          margin: 0.3rem 0;
          font-size: 0.24rem;
        }
        .guest {
          font-size: 0.24rem;
        }
      }
      .btn {
        float:right;
        color: #ffffff;
        outline: none;
        margin-top: 0.1rem;
        margin-right: 0.5rem;
      }
    }
  }
}
.center{
    width:7.5rem;
    height:13.34rem;
    background-color:#EFf2f5;
    padding-top:2.3rem;
  .door_text{
    width:2.96rem;
    height:0.29rem;
    background-image:url(../images/text.png);
    background-size:100% 100%;
    margin:0 auto;
    margin-bottom:0.5rem;
  }
  .door_img{
    width:1.76rem;
    height:1.19rem;
    background-size:100% 100%;
    margin:0 auto;
  }
}

</style>
