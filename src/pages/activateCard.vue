<template>
    <div class="main">
      <div class="head">
        <div class="tips">
          <div>{{' '}}</div>
          <div >请选择一个方便你授权发卡的门禁读头</div>
        </div>
        <div class="circle_time">
          <span>00:30</span>
        </div>
        <div class="select" v-if="0">
          <span class="label">读卡门禁：</span>
          <div class="picker_div">
            <Select v-model="model1" class="select_div">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
        </div>
      </div>
      <div class="step_div">
        <Steps :current="2">
            <Step title="" content="门禁选择"></Step>
            <Step title="" content="读卡等待"></Step>
            <Step title="" content="授权成功"></Step>
        </Steps>
      </div>
      <div class="next_btn">
        <Button type="primary" shape="circle" :long="true">下一步</Button>
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
        model1: ''
      }
    },
    methods:{

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
      box-shadow: 0px 12px 21px 0px 
        #ced4e5;
      margin: 0 auto;
      margin-top: 0.85rem;
      text-align: center;
      span{
        font-size: 0.65rem;
        line-height: 3rem;
        color: #7c7c88;
      }
    }
    overflow: hidden;
    .tips{
      margin-top: 0.9rem;
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
    .step_div{
      height: 2.7rem;
      width: 6.6rem;
      margin: 0 auto;
      background-color: #fff;
      box-shadow: 0 0.05rem 0.1rem 0 #ddd;
      border-radius: 0.1rem;
      padding-top: 0.8rem;
    }
    .next_btn{
      position: fixed;
      bottom: 0.65rem;
      width: 6.2rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }

</style>