import { memo, useEffect } from 'react'
import { useRoutes, useLocation, useNavigate } from "react-router-dom";

import { routes, onRouteBefore } from './routes';

export default memo(() => {   

    const location = useLocation();
    const navigate = useNavigate();

    const elements = useRoutes(routes);

    // 路由监听可以取消
    // useEffect(() => {
    //     console.log(location, 'location');
    //     if(location.pathname === '/b'){
    //         navigate('/c');
    //     }
    //     // getConfirmation();
    // }, [location, navigate])
    

    return elements
})
