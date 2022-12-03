import React,{useState,useEffect} from 'react'
import { Row,Col } from 'antd'
// import axios from '../axios/index'
import './style.less'
import formateDate from '../../utils/utils'
export default function Header(props) {
  const [time, settime] = useState( formateDate(new Date().getTime()))
  // const [dayImg, setdayImg] = useState('')
  // const [weather, setweather] = useState('')
  const [name] = useState('河畔一角')
  var info=setInterval(() => {
    settime(formateDate(new Date().getTime()))
  }, 1000);
  // useEffect(() => {
  //   let city='北京'
  //   axios.jsonp({
  //     url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
  // }).then((res)=>{
  //     if(res.status ==='success'){
  //       let data = res.results[0].weather_data[0];
  //       setdayImg(data.dayPictureUrl)
  //       setweather(data.weather)
  //     }
  //   })
  // }, [])
  useEffect(() => {
    
  
    return () => {
     clearInterval(info)
    }
  }, [info])
  return (
    <div className='header'>
      <Row className='header-top'>
        {props.menuType?<Col span='6' className='logo'>
          <img src="/assets/logo-ant.svg" alt="" />
          <span>IMOOC通用管理系统</span>
        </Col>:''}
        <Col span={props.menuType?18:24}>
          <span>欢迎,{name}</span>
          <a href="javascript;:" >退出</a>
        </Col>
      </Row>
     {props.menuType?'': <Row className='breadcrumb'>
        <Col span='4' className='breadcrumb-title'>首页</Col>
        <Col span='20' className='weather'>
           <span className='date'>{time}</span>
           <span><img src='' alt="" /></span>
           <span className='weather-detail'></span>
        </Col>
      </Row>}
    </div>
  )
}
