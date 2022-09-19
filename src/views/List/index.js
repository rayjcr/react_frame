import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from '../../router/Auth';
import PermissionHoc from '../../common/PermissionHoc';

const List = memo(() => {
  const navigate = useNavigate();
  const { setMessage } = Auth();

  const jump = () => {
    navigate('/home/home_a');
  }

  const showMsg = (msg) => {
    setMessage(msg)
  }

  return (
    <div className='pageMain'>List Page
        <button onClick={()=>jump()}>go to Home_a Page</button>
        <button onClick={()=>showMsg('test, Notification, oy')}>msg</button>
        <div style={{height:'2000px',width:'100%',background:'#f3f3f3',marginTop:'10px'}}>
          
        </div>
    </div>
  )
})

const mapStateToProps = (state) => {
  const { app } = state;
  return { app };
}

export default connect(mapStateToProps)(PermissionHoc(['manager'])(List));
// export default connect(mapStateToProps)(List);
