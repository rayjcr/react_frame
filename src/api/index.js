import request from '../utils/request';
const base = '/api'

// 根据用户名，密码获取用户信息、Token
export async function getToken(params) {

    return new Promise((res, rej)=>{
        setTimeout(()=>{
            res({token:'fadfasga'})
        },1000)
    })
}

export async function getUserInfo(params) {
    return new Promise((res, rej)=>{
        setTimeout(()=>{
            res({user:'Jiang cui', age:23, other:'test_Info'})
        },1000)
    })
}
