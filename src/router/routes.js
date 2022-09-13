import { Navigate } from 'react-router-dom';
import { RequireAuth } from './Auth';
// import PageA from '../views/pageA';
// import PageB from '../views/pageB';
import PageC from '../views/pageC';
import Layout from '../layout';
import Home from '../views/Home';
import List from '../views/List';
import Login from '../views/Login';

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
        children: [
            {
                path: 'home',
                title: 'HOME',
                element: <Home />
            },
            {
                path: 'list',
                title: 'LIST',
                element: <List />
            },
        ]
    },
    {
        path: '*',
        title: 'login',
        element: <PageC />,
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