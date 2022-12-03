import React, { useState, useEffect } from "react";
import { Card } from "antd";
import axios from "axios";
import "./detail.less";
import baseUrl from "../../utils/data";
export default function OrderDetail(props) {
  const [info, setinfo] = useState("");

  useEffect(() => {
    let flag = true;
    axios
      .get(baseUrl + "/order/detail", {
        params: {
          orderId: props.match.params.orderId,
        },
      })
      .then((res) => {
        if (flag) {
          console.log(res);
          setinfo(res.data.result);
          renderMap(res.data.result);
        }
      });
    return () => {
      flag = false;
    };
  }, [props.match.params.orderId]);
  const renderMap = (result) => {
    let map = new window.BMapGL.Map("container");
    let point = new window.BMapGL.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);
    // 添加控件
    var opts = {
      offset: new window.BMapGL.Size(150, 5),
    };
    // 添加控件
    map.addControl(new window.BMapGL.ScaleControl(opts));
    // 移除控件
    map.addControl(new window.BMapGL.ZoomControl());
    map.addControl(new window.BMapGL.CityListControl());
    drawBikeRoute(result.position_list, result.area);
  };
  const drawBikeRoute = (positionList, area) => {
    if (positionList.length > 0) {
      let first = positionList[0];
      let last = positionList[positionList.length - 1];
      var map = new window.BMapGL.Map("container");
      map.centerAndZoom(new window.BMapGL.Point(last.lon, last.lat), 11);
      map.enableScrollWheelZoom(true);
      var myIcon = new window.BMapGL.Icon(
        "/assets/start_point.png",
        new window.BMapGL.Size(36, 42),
        {
          imageSize: new window.BMapGL.Size(36, 42),
          anchor: new window.BMapGL.Size(18, 42),
        }
      );
      var myIcon1 = new window.BMapGL.Icon(
        "/assets/end_point.png",
        new window.BMapGL.Size(36, 42),
        {
          imageSize: new window.BMapGL.Size(36, 42),
          anchor: new window.BMapGL.Size(18, 42),
        }
      );
      var pt = new window.BMapGL.Point(first.lon, first.lat);
      var pt1 = new window.BMapGL.Point(last.lon, last.lat);
      var marker3 = new window.BMapGL.Marker(pt, {
        icon: myIcon,
      });
      var marker4 = new window.BMapGL.Marker(pt1, {
        icon: myIcon1,
      });
      map.addOverlay(marker3);
      map.addOverlay(marker4);
      let trackPoint = [];
      for (let i = 0; i < positionList.length; i++) {
        let point = positionList[i];
        trackPoint.push(new window.BMapGL.Point(point.lon, point.lat));
      }

      let polyline = new window.BMapGL.Polyline(trackPoint, {
        strokeColor: "#1869AD",
        strokeWeight: 3,
        strokeOpacity: 1,
      });
      let trackPoint1 = [];
      for (let i = 0; i < area.length; i++) {
        let point = area[i];
        trackPoint1.push(new window.BMapGL.Point(point.lon, point.lat));
      }

      let polygon = new window.BMapGL.Polyline(trackPoint1, {
        strokeColor: "#CE0000",
        strokeWeight: 4,
        strokeOpacity: 1,
        fillColor: "#ff8605",
        fillOpacity: 0.4,
      });
      function add_overlay() {
        //增加点
        map.addOverlay(polyline);
        map.addOverlay(polygon);
      }
      add_overlay(polyline);

      add_overlay(polygon);
    }
  };
  //   const drawServiceArea=(positionList)=>{
  //     console.log('222');
  //     // var map = new window.BMapGL.Map("container");
  //         let last = positionList[positionList.length - 1];
  //         var map = new window.BMapGL.Map("container");
  //         map.centerAndZoom(new window.BMapGL.Point(last.lon, last.lat), 11);
  //         map.enableScrollWheelZoom(true);
  //         let trackPoint = [];
  //               for(let i=0;i<positionList.length;i++){
  //                   let point = positionList[i];
  //                   trackPoint.push(new window.BMapGL.Point(point.lon, point.lat));
  //               }

  //               let polygon =  new window.BMapGL.Polyline(trackPoint,{
  //                 strokeColor: '#CE0000',
  //                 strokeWeight: 4,
  //                 strokeOpacity: 1,
  //                 fillColor: '#ff8605',
  //                 fillOpacity:0.4
  //               })
  //               function add_overlay(){
  //                   map.addOverlay(polygon);
  //               }
  //               add_overlay(polygon);

  //   }
  return (
    <div>
      <Card>
        <div id="container" className="order-map"></div>
        <div className="detail-items">
          <div className="item-title">基础信息</div>
          <ul className="detail-form">
            <li>
              <div className="detail-form-left">用车模式</div>
              <div className="detail-form-content">
                {info.mode === 1 ? "服务区" : "停车点"}
              </div>
            </li>
            <li>
              <div className="detail-form-left">订单编号</div>
              <div className="detail-form-content">{info.order_sn}</div>
            </li>
            <li>
              <div className="detail-form-left">车辆编号</div>
              <div className="detail-form-content">{info.bike_sn}</div>
            </li>
            <li>
              <div className="detail-form-left">用户姓名</div>
              <div className="detail-form-content">{info.user_name}</div>
            </li>
            <li>
              <div className="detail-form-left">手机号码</div>
              <div className="detail-form-content">{info.mobile}</div>
            </li>
          </ul>
        </div>
        <div className="detail-items">
          <div className="item-title">行驶轨迹</div>
          <ul className="detail-form">
            <li>
              <div className="detail-form-left">行程起点</div>
              <div className="detail-form-content">{info.start_location}</div>
            </li>
            <li>
              <div className="detail-form-left">行程终点</div>
              <div className="detail-form-content">{info.end_location}</div>
            </li>
            <li>
              <div className="detail-form-left">行驶里程</div>
              <div className="detail-form-content">
                {info.distance / 1000}公里
              </div>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
