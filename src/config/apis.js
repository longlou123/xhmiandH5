// 返回本环境下对应的api的结果
const apis = {
  dev:{
    main:"https://seven.xy-mind.com:8443"
  },
  test:{
    main:"https://seven.xy-mind.com:8443"
  },
  production:{
    main:"https://seven.xhmind.com:8443"
  }
}
export default apis[process.env.API_TYPE]

