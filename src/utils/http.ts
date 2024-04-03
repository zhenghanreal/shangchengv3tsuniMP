import { useMemberStore } from '@/stores'

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
const httpInterceptor = {
  invoke(options: UniApp.RequestOptions) {
    // 拼接请求地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    //设置请求超时时间
    options.timeout = 10000
    //添加小程序请求头标识
    options.header = {
      ...options.header,
      'source-client': 'miniapp',
    }
    //添加token请求头标识
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
    console.log(options)
  },
}
uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile ', httpInterceptor)

interface Data<T> {
  code: string
  msg: string
  result: T
}
export const http = <T>(options: UniApp.RequestOptions) => {
  //返回promise对象
  return new Promise<Data<T>>((resolve, reject) => {
    //发送请求
    uni.request({
      ...options,
      //请求响应成功
      success(res) {
        //判断请求状态码2开头
        if (res.statusCode >= 200 && res.statusCode < 300) {
          //执行resolve提取核心数据
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          const memberStore = useMemberStore()
          memberStore.clearProfile()
          //token错误跳转页面
          uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求错误',
          })
          reject(res)
        }
      },
      //请求响应失败
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误，请换个网络试试',
        })
        reject(err)
      },
    })
  })
}
