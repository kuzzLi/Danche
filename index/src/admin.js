import "antd/dist/antd.css";
import { Row, Col } from "antd";
import Left from "./components/Navleft";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
// import Home from './pages/home/home';
import "./style/common.less";
function Admin(props) {
  return (
    <div>
      <Row className="container">
        <Col span="4" className="nav-left">
          <Left></Left>
        </Col>
        <Col span="20" className="main">
          <Header></Header>
          <Row className="content">
            <Col span={24}>
              {/* <Home></Home> */}
              {props.children}
            </Col>
          </Row>
          <Footer></Footer>
        </Col>
      </Row>
    </div>
  );
}

export default Admin;
