import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from '../../router/Auth';
import PermissionHoc from '../../common/PermissionHoc';

const List = memo(() => {
  const navigate = useNavigate();
  const { setMessage } = Auth();

  const jump = () => {
    navigate('/home');
  }

  const showMsg = (msg) => {
    setMessage(msg)
  }

  return (
    <div>List Page
        <button onClick={()=>jump()}>go to Home Page</button>
        <button onClick={()=>showMsg('test, Notification, oy')}>msg</button>
    </div>
  )
})

const mapStateToProps = (state) => {
  const { app } = state;
  return { app };
}

// export default connect(mapStateToProps)(PermissionHoc([1])(List));
export default connect(mapStateToProps)(List);
