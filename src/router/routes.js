import { Navigate } from 'react-router-dom';
import { HomeOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { RequireAuth } from './Auth';
import PageA from '../views/pageA';
import PageB from '../views/pageB';
import PageC from '../views/pageC';
import Layout from '../layout';
// import Home from '../views/Home';
import List from '../views/List';
import Login from '../views/Login';
import NotFound from '../views/NotFound';

const routes = [
    {
        path: '/',
        element: <Navigate to='home' />
    },
    {
        path: '/login',
        title: 'login',
        element: <Login />,
        isMenu: false,
    },
    {
        path: '/',
        title: '/',
        element: <RequireAuth><Layout /></RequireAuth>,
        isMenu: false,
        rootMenu: true,
        children: [
            {
                path: 'home',
                title: 'HOME',
                key: 'home',
                icon: <HomeOutlined />,
                // element: <Home />,
                children: [
                    {
                        path: 'home_a',
                        title: 'home_a',
                        key: 'home_a',
                        element: <PageA />
                    },
                    {
                        path: 'home_b',
                        title: 'home_b',
                        key: 'home_b',
                        // element: <PageB />
                        children:[
                            {
                                path: 'home_b_son_b',
                                title: 'home_b_son_b',
                                key: 'home_b_son_b',
                                element: <PageB />
                            }
                        ]
                    },
                    {
                        path: 'home_c',
                        title: 'home_c',
                        key: 'home_c',
                        element: <PageC />
                    },
                    {
                        path: '',
                        title: 'root_NotFound',
                        key: 'root_NotFound',
                        element: <NotFound />,
                    },
                ]
            },
            {
                path: 'list',
                title: 'LIST',
                key: 'list',
                icon: <UnorderedListOutlined />,
                element: <List />
            },
        ]
    },
    {
        path: '*',
        title: 'NotFound',
        element: <NotFound />,
        isMenu: false,
    },
]

const onRouteBefore = ({ pathname, meta }) => {
    console.log(pathname, 'pathname');
    console.log(meta, 'meta');
}

export {
    routes,
    onRouteBefore,
}