import React from "react";
import { Menu } from "antd";
import { useHistory } from "react-router";
import style from "./style.module.less";
import menuList from "../../mock/menuConfig";
export default function Left(props) {
  const history=useHistory()
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const foo=data=>{
    const arr=[]
    data.map(item=>{
      if(item.children?.length>0){
        return (
          arr.push(getItem(item.label,item.key,null,foo(item.children)))
        )
      }else{
        return (
          arr.push(getItem(item.label,item.key,null,))
        )
      }
    })
    return arr
  }
  const onClick = (e) => {
    history.push(e.key)
  };
  return (
    <div>
      <div className={style.logo}>
        <img src="/assets/logo-ant.svg" alt="" />
        <h1>Imooc MS</h1>
      </div>
      <Menu
        onClick={onClick}
        style={{
          width: 256,
        }}
        mode="vertical"
        items={foo(menuList)}
        theme='dark'
      />
    </div>
  );
}
