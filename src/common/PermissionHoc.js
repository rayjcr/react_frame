import { PermissionContext } from "./Permission";
import { Result, Button } from "antd";

export default function PermissionHoc (authorization) {
    return function(Component) {
        return function Index(props) {
            // 根据组件权限列表和用户角色判断是否有此组件访问权限。
            const matchPermission = (value,userInfo) => {
                return value.indexOf(userInfo?.role) 
            }
            return  (
            <PermissionContext.Consumer>
                {(userInfo) => {
                    // console.log(permissionList, 'permissionList')
                    return matchPermission(authorization,userInfo) >= 0 ? <Component {...props}></Component> : <Result
                        status="403"
                        title="403"
                        subTitle="Sorry, you are not authorized to access this page."
                        extra={<Button type="primary" onClick={()=>window.history.back()}>Back Page</Button>}
                    />
                }
                }
            </PermissionContext.Consumer>
            )
        }
    } 
}
