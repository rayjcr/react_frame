import React, { memo } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = memo(({ app }) => {
  const navigate = useNavigate();

  const jump = () => {
    navigate('/list');
  }

  console.log(app, 'Home page app value')

  return (
    <div>Home Page
        <button onClick={()=>jump()}>go to List Page</button>
    </div>
  )
})

const mapStateToProps = (state) => {
  const { app } = state;
  return { app };
}

export default connect(mapStateToProps)(Home);

