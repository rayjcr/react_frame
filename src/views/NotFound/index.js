import React, { memo } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = memo(() => {

  const backPage = () => {
    window.history.back();
  }

  return (
    <Result 
        status='404' 
        title='404'
        subTitle='Sorry, the page you visited does not exist.'
        extra={<Button type='primary' onClick={backPage}>Back</Button>}
    />
  )
})

export default NotFound;