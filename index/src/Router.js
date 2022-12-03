import React from "react";
import { HashRouter, Route, Redirect, Switch } from "react-router-dom";
import Admin from "./admin";
import Buttons from "./pages/ui/Buttons";
import NotFound from "./pages/notfound/NotFound";
import Home from './pages/home/home'
import City from "./pages/city/City";
import Order from './pages/order/Order'
import OrderDetail from "./pages/order/detail";
import Common from "./common";
export default function Router() {
  return (
    <HashRouter>
      <div>
        <Route
          path="/admin"
          render={() => {
            return (
              <Admin>
                <Switch>
                    <Route exact path='/admin' component={Home}></Route>
                  <Route path="/admin/ui/buttons" component={Buttons}></Route>
                  <Route path="/admin/city" component={City}></Route>
                  <Route path="/admin/order" component={Order}></Route>
                  <Route component={NotFound}></Route>
                
                </Switch>
              </Admin>
            );
          }}
        ></Route>
        <Route path='/common' render={()=>{
          return <Common>
                <Route path='/common/order/detail/:orderId' component={OrderDetail}></Route>
          </Common>    
        }}></Route>
        <Redirect from="/" to="/admin"></Redirect>
      </div>
    </HashRouter>
  );
}
