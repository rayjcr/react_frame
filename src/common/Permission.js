import { memo, createContext } from 'react';
import { connect } from 'react-redux';

export const PermissionContext = createContext([]);

const Permisson = memo(({ children, app }) => {
  return <PermissionContext.Provider value={app.userInfo}>
    {children}
  </PermissionContext.Provider>
})

const mapStateToProps = (state) => {
  const { app } = state;
  return { app };
}

export default connect(mapStateToProps)(Permisson);