import "antd/dist/antd.css";
import { Row ,Col} from "antd";
import Header from "./components/header/Header";
import "./style/common.less";
function Common(props) {
  return (
    <div>
      <Row className="simple-page">
        <Col span="24" className="main">
          <Header menuType='second'></Header>
          <Row className="content">
          <Col span={24}>
              {/* <Home></Home> */}
              {props.children}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
export default Common;