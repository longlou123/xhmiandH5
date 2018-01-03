<template>
    <div class="main">
      <div class="tips">请选择一个方便你授权发卡的门禁读头</div>
<!--       <div class="select">
        <span class="label">读卡门禁：</span>
        <div class="picker_div">
          <mt-picker :slots="slots" @change="onValuesChange" :visibleItemCount="3" ></mt-picker>
        </div>
      </div> -->
    </div>
</template>
<script >
  import { Picker } from 'mint-ui';

  export default {
    name:'test',
    data(){
      return {
        username:'',
        email:'',
        password:'',
        phone:'',
        website:'',
        slots: [
          {
            flex: 1,
            values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
            className: 'slot',
            textAlign: 'center'
          }
        ],
      }
    },
    methods:{
      onValuesChange(picker, values) {
        if (values[0] > values[1]) {
          picker.setSlotValue(1, values[0]);
        }
      }

    }
  }

</script>
<style lang="scss" scoped>
  .main{
    .tips{
      margin-top: 0.9rem;
    }
    .select{
      vertical-align: middle;
      position: relative;
      // margin-top: 1rem;
      .label{
        // display: inline-block;
        // margin-bottom: 0.5rem;
        // height: 0.3rem;
        line-height: 2rem;
        position: absolute;
        
      }
      .picker_div{
        width: 4rem;
        height: 2rem;
        display: inline-block;
      }
    }
  }

</style>