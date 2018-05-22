// 返回本环境下对应的api的结果
const apis = {
  dev:{
    main:"http://10.51.36.116:8006"
  },
  test:{
    main:"http://10.51.36.116:8006"
  },
  production:{
    main:"https://seven.xhmind.com:8443"
  }
}
export default apis[process.env.API_TYPE]

