import { PermissionContext } from "./Permission";

export default function PermissionHoc (authorization) {
    return function(Component) {
        return function Index(props) {
            // 根据组件权限列表和用户角色判断是否有此组件访问权限。
            const matchPermission = (value,userInfo) => {
                console.log(userInfo.role, 'userInfo')
                console.log(value, 'userInfo')
                return value.indexOf(userInfo?.role) 
            }
            return  (
            <PermissionContext.Consumer>
                {(userInfo) => {
                    // console.log(permissionList, 'permissionList')
                    return matchPermission(authorization,userInfo) >= 0 ? <Component {...props}></Component> : <div>你无权限</div>
                }
                }
            </PermissionContext.Consumer>
            )
        }
    } 
}
