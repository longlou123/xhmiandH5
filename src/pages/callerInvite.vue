<template>
  <div class="callerinvite">
    <div class="scoll">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="姓名 :" prop="name">
          <Input v-model="formValidate.name" placeholder="" :disabled="hasParams"></Input>
        </FormItem>
        <FormItem label="类型 :" prop="type">
          <Select v-model="formValidate.type" placeholder="请选择" :disabled="hasParams">
            <Option value="1">家属</Option>
            <Option value="2">租客</Option>
            <Option value="3">访客</Option>
          </Select>
        </FormItem>
        <FormItem label="手机 :" prop="phone">
          <Input id="number" v-model="formValidate.phone" placeholder="" :disabled="hasParams"></Input>
        </FormItem>
        <div @click="starTime_">
          <FormItem label="生效日期 :" prop="startTime">
            <Input placeholder="请填写生效时间" v-model="formValidate.startTime" readonly='readonly' :disabled="hasParams"></Input>
          </FormItem>
        </div>
        <mt-datetime-picker v-model="selectTimeStar" type="datetime" ref="pickerSrtar" year-format=" {value} 年" month-format=" {value} 月" date-format=" {value} 日" hour-format=" {value}时" minute-format="{value}分" :startDate="this.time" :disabled="hasParams">
        </mt-datetime-picker>
        <div @click="endTime_">
          <FormItem label="失效日期 :" prop="endTime">
            <Input placeholder="请填写失效时间" v-model="formValidate.endTime" readonly='readonly' :disabled="hasParams"></Input>
          </FormItem>
        </div>
        <mt-datetime-picker confirmText="确定" v-model="selectTimeEnd" type="datetime" ref="pickerEnd" year-format=" {value} 年" month-format=" {value} 月" date-format=" {value} 日" hour-format=" {value}时" minute-format="{value}分" :startDate="this.time" :disabled="hasParams">
        </mt-datetime-picker>
        <FormItem label="有效次数 :" prop="useCount">
          <Select v-model="formValidate.useCount" placeholder="请选择" :disabled="hasParams">
            <Option value="0">无限次</Option>
            <Option value="1">1次</Option>
            <Option value="2">2次</Option>
            <Option value="3">3次</Option>
            <Option value="4">4次</Option>
            <Option value="5">5次</Option>
          </Select>
        </FormItem>
      </Form>
      <div class="door_stop">
        <div class="text">授权门禁:</div>
        <div class="flex">
          <transition-group name="list" tag="ul">
            <li class="door_box" v-for='(item,index) in projectPage' :key="item">
              <span>{{item}}</span>
              <div class="detele" @click="Delete(index)">
                <Icon type="ios-close"></Icon>
              </div>
            </li>
            <div class="door_box" v-if='add' :key="add">
              <div class="Icon ">
                <span @click="sure">
                    <Icon type="ios-plus-outline" class='Icons'></Icon>
                  </span>
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </div>
    <div class="next_btn" @click="handleSubmit('formValidate')">
      <Button type="primary" shape="circle" :long="true">{{hasParams?"确定":"确定邀请"}}</Button>
    </div>
  </div>
</template>
<script>
import { getStore, saveStore } from '@/script/util';
import { mapState, mapMutations } from 'vuex';
import { MessageBox } from 'mint-ui';
export default {
  name: 'test',
  data() {
    return {
      add: false,
      projectCode: '',
      granterPhone: '',
      userName: '',
      submit: true,
      projectPage: [], //页面展示数据
      projectInital: [], //初始化存储全部数据
      projectDoor: [], //存储门列表数据
      dataTime: '',
      ruleValidate: {
        name: [{ required: true, message: '请填写使用人', trigger: 'blur' }],
        type: [{ required: true, message: '请选择类型', trigger: 'change' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }, { type: "string", required: true, len: 11, message: '号码输入错误', trigger: 'blur' }],
        startTime: [{ required: true, message: '请填写生效时间', trigger: 'change' }],
        endTime: [{ required: true, message: '请填写失效时间', trigger: 'change' }],
        useCount: [{ required: true, message: '请选择有效次数', trigger: 'change' }],
      },
      selectTimeStar: new Date(),
      // selectTimeStar: "",
      selectTimeEnd: new Date(),
      time: new Date(), //选择生效的最早起始时间
      index: 0,
      show: [],
      sendData: [], //发送后台的数据
      hasParams: false,
      doors: null,
      codeData: null
    }
  },
  watch: {
    //数据变化时
    selectTimeStar: function() {
      this.starTime_();
    },
    selectTimeEnd: function() {
      this.endTime_();
    }
  },
  computed: {
    ...mapState(['project', 'formValidate'])
  },
  created() {
  },
  mounted() {
    this.getUrlParams();
    this.getdata();
    this.active();
    var d = new Date();
    this.formValidate.startTime = d.format("yyyy-MM-dd hh:mm");
    var number = document.getElementById("number");
    var input =number.getElementsByTagName('input');
    input[0].type = 'number';
    var u = navigator.userAgent;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isIOS) {
      if (screen.height == 812 && screen.width == 375){
          //是iphoneX
          var scoll = document.getElementsByClassName('scoll');
          scoll[0].classList.add('addheight') ;
      }else{
      }
    }
  },
  methods: {
    getUrlParams() {
      if (this.$route.query.userName && this.$route.query.projectCode && this.$route.query.granterPhone && this.$route.query.name && this.$route.query.type && this.$route.query.phone && this.$route.query.endTime && this.$route.query.useCount && this.$route.query.telephone) {
        this.formValidate.name = this.$route.query.name;
        this.formValidate.type = this.$route.query.type;
        this.formValidate.phone = this.$route.query.phone;
        this.formValidate.endTime = this.$route.query.endTime;
        this.formValidate.useCount = this.$route.query.useCount;
        this.hasParams = true; // 禁用表单
      }
    },
    active() {
      document.body.addEventListener('touchstart', function() {});
    },
    getdata() {
      var _this = this;
      _this.projectCode = getStore('projectCode');
      _this.userName = getStore('userName');
      _this.granterPhone = getStore('granterPhone');
      _this.$post('/ssh/openDoor/getDoorByPhone', {
        projectCode: _this.projectCode,
        userName: _this.userName,
        phone: _this.$route.query.telephone ? _this.$route.query.telephone : _this.granterPhone
      }).then(res => {
        if(res.errorCode === 200){
            for (var i = 0; i < res.result.doorList.length; i++) {
            var list = {};
            list.doorID = res.result.doorList[i].doorID;
            list.doorName = res.result.doorList[i].doorName;
            _this.projectInital[i] = list;
            _this.projectDoor[i] = res.result.doorList[i].doorName;
            _this.show.push(1)
          }
          if (this.project === null || this.project.length !== 0) {
            this.projectPage = this.project ? this.project : [];
            this.$store.commit('PROJECT', []);
            if (this.projectPage.length < this.projectDoor.length) {
              this.add = true;
            }
          } else {
            this.projectPage = this.projectDoor
            //this.projectPage = JSON.stringify(this.projectInital)
          }
        }else{
          MessageBox('提示', res.message);
        }
      }).catch(function(error) {
          console.log(error);
      });
    },
    //删除门列表选项
    Delete(index) {
      var _this = this;
      _this.projectPage.splice(index, 1);
      _this.add = true;
      _this.$store.commit('PROJECT', this.projectPage); //储存修改的数据
      //将修改过的门列表保存到vuex
    },
    starTime_() {
      if (!this.hasParams) {
        this.$refs.pickerSrtar.open();
      }
      var Year = this.selectTimeStar.getFullYear();
      var Month = this.selectTimeStar.getMonth() + 1;
      if (Month < 10) { Month = '0' + Month; }
      var Date = this.selectTimeStar.getDate();
      if (Date < 10) {
        Date = '0' + Date;
      }
      var hour = this.selectTimeStar.getHours();
      if (hour < 10) { hour = '0' + hour; }
      var minute = this.selectTimeStar.getMinutes();
      if (minute < 10) { minute = '0' + minute; }
      this.formValidate.startTime = Year + '-' + Month + '-' + Date + ' ' + hour + ':' + minute;
    },
    endTime_() {
      if (!this.hasParams) {
        this.$refs.pickerEnd.open();
      }
      var Year = this.selectTimeEnd.getFullYear();
      var Month = this.selectTimeEnd.getMonth() + 1;
      if (Month < 10) { Month = '0' + Month; }
      var Date = this.selectTimeEnd.getDate();
      if (Date < 10) {
        Date = '0' + Date;
      }
      var hour = this.selectTimeEnd.getHours();
      if (hour < 10) {
        hour = '0' + hour;
      }
      var minute = this.selectTimeEnd.getMinutes();
      if (minute < 10) {
        minute = '0' + minute;
      }
      this.formValidate.endTime = Year + '-' + Month + '-' + Date + ' ' + hour + ':' + minute;
    },
    //添加门列表
    sure() {
      if (this.add) {
        this.$router.push({
          path: "/doorEmpower"
        })
      }
    },
    // 判断不同端返回不同数据
    shareProfessor() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var iOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid && !iOS) {
        jsObj.twoDimensionCode(this.doors, this.grantNo);
      } else if (!isAndroid && iOS) {
        window.webkit.messageHandlers.passValue.postMessage({ doors: this.doors, grantNo: this.grantNo
        });
      }
    },
    // 判断不同端调用关闭webview
    judgeToClose() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var iOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid && !iOS) {
        jsObj.finished();
      } else if (!isAndroid && iOS) {
        window.webkit.messageHandlers.passValue.postMessage({ finish: true });
      }
    },
		// 确定邀请
		handleSubmit(name) {
      if (this.formValidate.endTime && this.formValidate.endTime < this.formValidate.startTime) {
        MessageBox('提示', '失效日期不能小于有效日期');
        return;
      } else {
        // console.log("不能选择")
      }
			this.$refs[name].validate((valid) => {
				if(valid) {
					if(this.submit){
						this.submit = false;//确认后不可重复（禁止按钮）
						//将当前选中授权的门列表与初始的门列表对比相同的元素
						for(var i = 0; i < this.projectPage.length; i++) {
							for(var j = 0; j < this.projectInital.length; j++) {
								if(this.projectPage[i] == this.projectInital[j].doorName) {
									this.sendData[i]=this.projectInital[j];
								}
							}
						}
					}
          this.formValidate.granterPhone = this.granterPhone;
          this.formValidate.projectCode = this.projectCode;
          this.formValidate.doors = JSON.stringify(this.sendData);
          this.$post('/ssh/grantCard/grantQREvent', this.formValidate).then(res => {
            this.doors = res.result.doors;
            this.grantNo = res.result.codeData;
            if (this.hasParams) {
                this.shareProfessor();
                this.judgeToClose();
            } else {
                this.saveData();
            }
          })
				} else {
					// this.$Message.error('Fail!');
				}
			})
		},
		saveData(){
			var _this = this;
			this.$get('/ssh/grantCard/getGrantQRByUser', {
				"projectCode": _this.projectCode,    //项目id
				"pageSize": "2",
				"granterPhone": _this.granterPhone,  //使用人的手机号
				"pageNumber":'1'
			}).then(res => {
        if(res.errorCode === 200){
          this.userData = res.result.cardList;
          saveStore('userData',this.userData);
          this.$store.commit('CLEAR_FORM');
          this.submit = true;//恢复按钮
          this.$router.push({path: "/callerDetail",query: {value: 0}})
        }else{
          MessageBox('提示', res.message);
        }
			}).catch(function(error) {
				console.log(error);
			});
		},
		handleReset(name) {
        this.$refs[name].resetFields();
		}
	}
}
</script>
<style lang="scss" scoped>
// @import './style/common.scss'
.callerinvite {
  height: 100%;
  background-color: #EFf2f5;
  padding-top: 0.2rem;
  .scoll {
    width: 100%;
    height: 9.9rem;
    overflow-y: auto;
    Form {
      width: 7.5rem;
      width: 90%;
      border-radius: 0.15rem;
      background-color: #ffffff;
      margin: 0.2rem 0.3rem 0.2rem 0.4rem;
      padding: 0.5rem 0.3rem 0.2rem 0;
      box-shadow: 0px -5px 5px #E8EBF4, 0px 5px 5px #E8EBF4, 0px 5px 5px #E8EBF4, 0px 5px 5px #E8EBF4;
    }
    .door_stop {
      margin: 0 0.3rem;
      text-align: left;
      .text {
        font-size: 0.3rem;
        margin: 0.15rem 0;
      }
      .flex {
        .colse {
          display: none;
        }
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .door_box {
          width: 1.98rem;
          height: 1.14rem;
          background-color: #ffffff;
          line-height: 1.14rem;
          text-align: center;
          border-radius: 0.02rem;
          position: relative;
          margin: 0.2rem 0.15rem;
          box-shadow: 5px 5px 5px #E8EBF4;
          border-radius: 0.1rem;
          float: left;
          span {
            display: inline-block;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 0.24rem;
          }
          .Icon {
            font-size: 0.5rem;
            .Icons {
              font-size: 0.5rem;
              color: #5698FF;
            }
            .Icons:active {
              color: red;
            }
          }
          .detele {
            display: inline-block;
            position: absolute;
            top: -30px;
            left: 1.7rem;
            font-size: 0.5rem;
            .ivu-icon {
              font-size: 0.5rem;
              color: #5698FF;
            }
          }
          .detele :active {
            color: red;
          }
        }
      }
    }
  }
  .addheight{
    height:12rem;
  }
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s;
  }
  .list-enter,
  .list-leave-to
  /* .list-leave-active for below version 2.1.8 */
  {
    opacity: 0;
    transform: translateY(30px);
  }
  .next_btn {
    width: 6.92rem;
    margin: 0 auto;
    margin-top: 0.2rem;
    Button {
      height: 0.89rem;
    }
  }
}

</style>
