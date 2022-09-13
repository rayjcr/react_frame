import React, { memo } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PermissionHoc from '../../common/PermissionHoc';
import { fetchTimeoutData } from '../../api';

const Home = memo(({ app }) => {
  const navigate = useNavigate();

  const jump = () => {
    navigate('/list');
  }

  const getTimeoutData = async () => {
    let res = await fetchTimeoutData();
    console.log(res, 'res')
  }

  console.log(app, 'Home page app value')

  return (
    <div>Home Page
        <button onClick={()=>jump()}>go to List Page</button>
        <button onClick={()=>getTimeoutData()}>get Timeout Data</button>
    </div>
  )
})

const mapStateToProps = (state) => {
  const { app } = state;
  return { app };
}

// export default connect(mapStateToProps)(PermissionHoc([1])(Home))
export default connect(mapStateToProps)(Home)
