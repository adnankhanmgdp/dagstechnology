import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Order from "./Pages/Order";
import Sidebar from "./components/Sidebar";
import TopNavigation from "./components/TopNavigation";
import "./App.css";
import CreateOrder from "./Pages/CreateOrder";
import CancelledOrders from "./Pages/CancelledOrders";
import OrderHistory from "./Pages/OrderHistory";
import AllUsers from "./Pages/AllUsers";
import CreateUser from "./Pages/CreateUser";
import InvoiceList from "./Pages/InvoiceList";
import InvoiceDetails from "./Pages/InvoiceDetails";
import Login from "./Pages/Login";

const App = () => {
  return (
    <>
      <Router>
        <TopNavigation />
        <div>
          <div>
            <Sidebar />
          </div>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />

              {/* users routes */}

              <Route path="/users/allUsers" element={<AllUsers />} />
              <Route path="/users/createUser" element={<CreateUser />} />

              {/* orders routes */}

              <Route path="/orders/allOrders" element={<Order />} />
              <Route path="/orders/createOrder" element={<CreateOrder />} />
              <Route path="/orders/orderHistory" element={<OrderHistory />} />
              <Route
                path="/orders/cancelledOrders"
                element={<CancelledOrders />}
              />

              {/* invoice routes */}

              <Route path="/invoice/invoiceList" element={<InvoiceList />} />
              <Route
                path="/invoice/invoiceDetail"
                element={<InvoiceDetails />}
              />
            </Routes>
          </div>
        </div>
      </Router>

      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
