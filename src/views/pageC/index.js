import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Tree } from 'antd';
import { routes } from '../../router/routes';
import { addRealPath } from '../../utils/tools';
import { find } from 'lodash';

const PageC = () => {

  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);

  const jump = () => {
    navigate('/home/home_a')
  }

  const saveMenu = () => {
    sessionStorage.setItem('permissionMenu', JSON.stringify(checkedKeys));
    console.log(checkedKeys, 'E----line-18')
  }

  const onCheck = (checkedKeysValue, e) => {
    console.log('checkedKeysValue', checkedKeysValue);
    console.log(e, 'e-info')
    console.log(menu, 'menu')
    setCheckedKeys(checkedKeysValue);
  };

  useEffect(() => {
    let realMenu = addRealPath(find(routes,{'rootMenu':true}).children, '');
    setCheckedKeys([...JSON.parse(sessionStorage.getItem('permissionMenu')||'[]')])
    setMenu(realMenu);
  }, [])
  
  return (
    <div className='pageMain' style={{background:'#FFEFD5'}}>
      PageC <button onClick={()=>jump()}>go pageA</button>
      <div>
        this is Menu config:
        <Tree
          checkable
          // selectedKeys={selectedKeys}
          // onSelect={onSelect}
          autoExpandParent={true}
          checkedKeys={checkedKeys}
          onCheck={onCheck}
          treeData={menu}
        />
      </div>
      <div>
        <Button onClick={saveMenu}>Save</Button>
      </div>
    </div>
  )
}

export default PageC;