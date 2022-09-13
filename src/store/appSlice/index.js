import { createSlice } from "@reduxjs/toolkit";
// import { getToken, getSemesterList, getWeeklyList, getClassListByTeacherID,getClassListSubjectByTeacherID,getMyChildren,getYearTermList,getWeekList} from '../../api/index';
import { login } from "../../api";
// import { find } from 'lodash';
// 等同于vuex的功能，app是一个全局切片，根据业务可以拆分出不同的切片
export const appSlice = createSlice({
    name: 'app',
    initialState: {
        initComplete: false,
        userInfo: null,
    },
    reducers: {
        setState: (state, action) => {
            return {...state, ...action.payload}
        }
    }
})
// 根据username 和 password 获取用户基础信息
// export const getTokenAndUserInfo = params => async (dispatch, getState) => {
//     const { data } = await getToken(params);
//     dispatch(setState({userInfo:data}));
//     return data
// }

/**
 * 一次性获取教师需要的基础数据
 * 1.学年学期列表 （当前学年学期对象）
 * 2.周次列表
 */
// export const getBaseTeacherData = params => async (dispatch, getState) => {
//     let semesterListData = await getSemesterList();
//     let semesterList = semesterListData.data.data;
//     console.log(semesterList, 'PPPOOO')
//     semesterList = semesterList.map(item => {
//         return {
//             ...item,
//             label: item.name,
//             value: item.code,
//         }
//     })
//     let curSemester = find(semesterList, {'isCurYear':1});
//     console.log(params, 'params--line-36')

//     let weeklyList = [];
//     let teachClassList = [];
//     let subjectList = [];
//     await Promise.all([
//         getWeeklyList({ schoolYearAndTermCode: curSemester.code }),
//         getClassListByTeacherID({ teacherId: params.user_id }),
//         getClassListSubjectByTeacherID({teacherId: params.user_id}),
//     ]).then((res) => {
//         console.log(res, 'promise.all')
//         weeklyList = res[0].data.data;
//         subjectList = res[2].data.data.map(item=>{
//             return {
//                 ...item,
//                 label:item.subjectName,
//                 value:item.id,
//             }
//         });
//         teachClassList = res[1].data.data.map(item=>{
//             return {
//                 ...item,
//                 label:item.dingNick,
//                 value:item.id,
//             }
//         });
//         // 测试数据，多记录后删除
//         teachClassList = teachClassList.concat([{label: 'Test Merchant', value: '11987', classAliasName: 'Test Merchant'}])
//         subjectList = subjectList.concat([{label: 'Test Merchant', value: '222', classAliasName: 'Test Merchant'}])
//     })

//     dispatch(setState({
//         semesterList,
//         curSemester,
//         weeklyList,
//         teachClassList,
//         subjectList,
//         initComplete: true,
//     }));
// }

/**
 * 获取家长需要的数据
 * 学生列表/当前学期/周次列表
 */
// export const getBaseParentData = params => async (dispatch, getState) => {
//   let yearTermData = await getYearTermList()
//   let yearTermList = yearTermData.data.data.filter(item=>item.isCurYear == 1)
//   let currTerm = yearTermList && yearTermList.length ? yearTermList[0] : null
//   let studentLists = []
//   let weekList = []
  
//   await Promise.all([
//     getMyChildren(),
//     getWeekList({schoolYearAndTermCode: currTerm.code}),
//   ]).then(res=>{
//     studentLists = res[0].data.data;
//     weekList = res[1].data.data.map(item=>{
//         return{
//             ...item,
//             label: item.name,
//             value: item.id
//         }
//     })
//   })
//    dispatch(setState({
//         studentLists,
//         currTerm,
//         weekList,
//         initComplete: true,
//     }));
// }
// 获取用户基本数据并更新redux的数据
export const fetchUserInfo = params => async (dispatch, getState) => {
    // const res = await getUserInfo();
    const res = await login(params);
    // dispatch(setState({userInfo:{username:'jiangcui', age:32, sex:'male', role:1}}));
    console.log(res, 'appSlice-login-res')
    // dispatch(setState({userInfo:null}));
    return true;
}

export const { setState } = appSlice.actions;
export default appSlice.reducer;



