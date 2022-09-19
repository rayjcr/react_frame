export const addRealPath = (menuList, rootPath) => {
  menuList.forEach(item => {
  item.realPath = (rootPath ? (rootPath+'/') : rootPath) + item.path;
  if(item.children) {
      addRealPath(item.children, item.realPath);
  }
  })
  return menuList;
}