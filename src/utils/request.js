import fetch from 'axios';
import _ from 'lodash';
import nProgress from 'nprogress';
// import { notification } from "antd";
// import { success } from './tools';
// fetch.defaults.timeout = 200;

// const CancelToken = fetch.CancelToken;
// const controll = new AbortController();

// nProgress.configure({ easing: 'ease', speed: 200 });

const service = fetch.create();
/**
 * 当前正在pending的接口，如果有后端返回(无论对错)都将清除当前接口
 * 重复接口并不会记录在allPendingRequestsRecord中，因为removeSomeKey清除了相同URL、相同参数的接口
 */
let allPendingRequestsRecord = [];
const pending = {};

const removeAllPendingRequestsRecord = () => {
    allPendingRequestsRecord && allPendingRequestsRecord.forEach((func) => {
        func('路由跳转取消所有请求');
    });
    // allPendingRequestsRecord.splice(0);
    allPendingRequestsRecord = [];
};

/**
 * 清除相同Key的接口记录
 * @param {} key 
 */
const removeSomeKey = (key) => {
    allPendingRequestsRecord.splice(_.findIndex(allPendingRequestsRecord,{'key':key}),1);
}

/**
 * 如果重复了就清除
 * @param {*} key 
 * @param {*} isRequest 
 */
const removePending = (key, isRequest = false) => {
    // console.log(pending, 'pending')
    if(pending[key] && isRequest) {
        console.log('重复重复')
        // 删除重复接口Key
        removeSomeKey(key);
        // allPendingRequestsRecord.splice(_.findIndex(allPendingRequestsRecord,{'key':key}),1);
        // console.log('重复了.....');
        pending[key]('取消重复请求');
    }
    // console.log(key, '清除么')
    delete pending[key];
    // console.log(pending, 'pending')
};

// const abc = (key) => {
//     console.log(pending[key], 'key-abc')
// }

const getReqData = (config) => {
    // console.log(config.data, 'config.data')
    // console.log(JSON.stringify(config.params||config.data), 'JSON.stringify(config.params||config.data)')
    // console.log( typeof config.params, 'typeof-params' )
    // console.log( typeof config.data, 'typeof-data' )
    let params = '';
    if(config.params){
        params = typeof config.params === 'string' ? config.params : JSON.stringify(config.params);
    } else {
        params = typeof config.data === 'string' ? config.data : JSON.stringify(config.data);
    }
    return '' + config.url + config.method + params;
}

export const getConfirmation = (mes='', callback = () => {}) => {
    removeAllPendingRequestsRecord();
    callback();
};

service.interceptors.request.use(
    config => {
        config.headers.Authorization = 'Basic c2FiZXI6c2FiZXJfc2VjcmV0';
        config.headers['Blade-Auth'] = `bearer ${sessionStorage.getItem('token')}`;
        
        if(!nProgress.status) {
            nProgress.start();
        }
        let reqData = '';
        // reqData = config.url + config.method + JSON.stringify(config.params||config.data);
        reqData = getReqData(config);
        // console.log(config, 'request')
        removePending(reqData, true);
        // console.log(allPendingRequestsRecord, 'allPendingRequestsRecord');
        config.cancelToken = new fetch.CancelToken((c) => {
            pending[reqData] = c;
            allPendingRequestsRecord.push({
                key: reqData,
                fun: c,
            });
        })
        // console.log(allPendingRequestsRecord, 'allPendingRequestsRecord');
        return config
    },
    err => Promise.reject(err)
)

service.interceptors.response.use(
    response => {
        // console.log(getReqData(response.config), 'response.config');
        // console.log(pending, 'pending-response-A');
        // console.log(response.config, 'response')
        const key = getReqData(response.config);
        removeSomeKey(key);
        delete pending[key];
        if(allPendingRequestsRecord.length===0){
            nProgress.done();
        }
        // abc(key);
        // console.log(pending[decodeURI(key)], 'pending-response-B');
        // console.log(key, 'key-response')
        // console.log(allPendingRequestsRecord, 'allPendingRequestsRecord');
        console.log(allPendingRequestsRecord, 'allPendingRequestsRecord-response');
        console.log(pending, 'pending-response');
        // console.log(response, '这里是结果')
        // return response
        if(response.status === 200){
            return { data: response.data }
        } else {
            // notification.error({
            //     message: 'An error has occured',
            //     description: response.data.msg,
            //     placement: 'bottomRight',
            // })
        }
    },
    error => {
        if(fetch.isCancel(error)) {
            // console.log(response,)
            // console.log('response-error')
            return new Promise(() => {});
        }
    }
)

export default service;

// export default function request(url, options) {

//     return fetch(`${url}`, options)
//         .catch(handleError)
//         .then((response) => {
//             // console.log(response, 'response')
//             if(response.status === 200){
//                 // success(response.data);
//                 return{ data: response.data}
//             } else {
//                 // notification.error({
//                 //     message: 'An error has occured',
//                 //     description: response.data.msg,
//                 //     placement: 'bottomRight',
//                 // })
//             }
//             // console.log(response,'response')
//             // try{
//             //     return { data: response.data };
//             // }catch(e){
//             //     return { data: response.data };
//             // }
//         });
// }

// function handleError(errorObj) {
//     console.log('this is error!')
// }