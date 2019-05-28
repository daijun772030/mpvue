import Fly from 'flyio/dist/npm/wx'
import qs from 'qs'
const creat = function() {//请求对象实列，具体的方法
    const fly = new Fly()
    const host = "http://test-api.cdhryx.com/"
    fly.config.baseURL=host;//默认全局函数
    //添加请求拦截器
    fly.interceptors.request.use((request) => {
        wx.showLoading({
        title: "加载中",
        mask:true
        });
        request.headers = {
        "X-Tag": "flyio",
        'content-type': 'application/json'
        };
        if (request.method === 'POST' || request.method === 'post') {//对post请求参数进行序列化
            request.body = qs.stringify(request.body)
          }
        return request;
    },(err)=>{
        return Promise.reject(err)
    });
    //添加响应拦截器
    fly.interceptors.response.use(
        (response) => {
        wx.hideLoading();
        return response.data;//请求成功之后将返回值返回
        },
        (err) => {
        //请求出错，根据返回状态码判断出错原因
        console.log(err);
        wx.hideLoading();
        if(err){
            return "请求失败";
        };
        return Promise.reject(error)
        }
    );
    return fly
};
const instance = creat ();
const get = (url) => {//对get请求进行封装
    return (data) => {
        return (config) => {
            return instance.get(url, data, config);
        }
    }
};
const post = (url) => {//对post请求进行封装
    return (data) => {
        return (config) => {
            return instance.post(url, data, config);
        }
    }
};
const apis = {//接口的map表
    banner:get('/cust-dynamic/labeltype/queryLabelType'),//首页banner图获取
    postC:post('/store/comment/commentStore'),//测试
    queryShop:get('/store/base/queryStoreByPage'),//获取门店列表
    queryStoreDetails:get('/store/base/querStoreByInfo'),//获取门店详情
};
// const apis = myapi;
const request = function(name, data, config) {
    return apis[name](data)(config);
};
export default request;