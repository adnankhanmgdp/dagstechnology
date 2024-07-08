import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const InvoiceDetails = () => {
  const location = useLocation();
  const userOrder = location.state?.order;
  const orderLocation = location.state.location

  // console.log("userOrderrrr", userOrder);

  const token = localStorage.getItem("token");

  const [dataOfUser, setDataOfUser] = useState({});
  const [allTotal, setAllTotal] = useState(0);
  // console.log("dataOfUser", dataOfUser)

  useEffect(() => {
    if (userOrder?.userId) {
      const fetchData = async () => {
        try {
          const res = await fetch(`${process.env.REACT_APP_API_URL}/getUser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              phone: userOrder.userId ? userOrder.userId : userOrder.orderId,
            }),
          });
          const data = await res.json();
          if (res.ok) {
            // console.log("userOrderData", data.user[0]);
            setDataOfUser(data.user[0]);
          }
        } catch (error) {
          // console.log(error.message);
        }
      };
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (userOrder?.items) {
      const newTotal = userOrder.items.reduce(
        (acc, item) => acc + item.unitPrice * item.qty,
        0,
      );
      setAllTotal(newTotal);
    }
  }, [userOrder]);

  const handlePrint = () => {
    window.print();
  };

  if (!userOrder) {
    return (
      <div>
        <h2>No order details available</h2>
        <Link to="/invoices">Go back to invoices</Link>
      </div>
    );
  }

  return (
    <div
      style={{ background: "#F8F8FB", minHeight: "100vh" }}
      className="main-content"
    >
      <div className="page-content">
        <div className="container-fluid">
          {/* <!-- start page title --> */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Detail</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/invoices">Invoices</Link>
                    </li>
                    <li className="breadcrumb-item active">Detail</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end page title --> */}

          <div className="row">
            <div className="col-lg-12">
              <div className="card p-5">
                <div className="card-body">
                  <div className="invoice-title d-flex justify-content-between">
                    <div className="auth-logo mb-4">
                      <img
                        src="/assets/Dags.jpg"
                        alt="logo"
                        className="auth-logo-dark"
                        height="20"
                      />
                    </div>
                    <h4 className="float-end font-size-16">
                      Order # {userOrder && userOrder.orderId}
                    </h4>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-6">
                      <address>
                        <strong>Billed To:</strong>
                        <br />
                        {dataOfUser && dataOfUser.name}
                        <br />
                        {orderLocation}
                      </address>
                    </div>
                    <div className="col-sm-6 text-sm-end">
                      <address className="mt-2 mt-sm-0">
                        <strong>Shipped To:</strong>
                        <br />
                        {dataOfUser && dataOfUser.name}
                        <br />
                        {orderLocation}
                      </address>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6 mt-3">
                      <address>
                        <strong>Payment Method:</strong>
                        <br />
                        Razorpay
                      </address>
                      <address>
                        <strong>Transaction Id:</strong>
                        <br />
                        {userOrder.transactionId?userOrder.transactionId:"N/A"}
                      </address>
                    </div>
                    <div className="col-sm-6 mt-3 text-sm-end">
                      <address>
                        <strong>Order Date:</strong>
                        <br />
                        {userOrder && userOrder.orderDate}
                        <br />
                        <br />
                      </address>
                    </div>
                  </div>
                  <div className="py-2 mt-3">
                    <h3 className="font-size-15 fw-bold">Order summary</h3>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-nowrap">
                      <thead>
                        <tr>
                          <th colSpan="3" style={{ width: "70px" }}>
                            No.
                          </th>
                          <th>Item</th>
                          <th className="text-center">Quantity</th>
                          <th className="text-center">Price</th>
                          <th className="text-center">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userOrder &&
                          userOrder.items.map((item, index) => (
                            <tr key={index}>
                              <td colSpan="3">{item.itemId}</td>
                              <td>Shirt</td>
                              <td className="text-center">{item.qty}</td>
                              <td className="text-center">₹{item.unitPrice}</td>
                              <td className="text-center">
                                ₹{item.unitPrice * item.qty}
                              </td>
                            </tr>
                          ))}

                        <tr>
                          <td colSpan="8"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="w-100 my-5 d-flex justify-content-end">
                    <div className="d-flex flex-column w-25  mr-5">
                      <div className="mb-2 d-flex flex-row justify-content-between">
                        <strong>Sub Total</strong>
                        <span>₹{allTotal.toFixed(2)}</span>
                      </div>
                      <div className="mb-2 d-flex flex-row justify-content-between">
                        <strong>Shipping</strong>
                        <span>+₹{userOrder && userOrder.deliveryFee}</span>
                      </div>
                      <div className="mb-2 d-flex flex-row justify-content-between">
                        <strong>18% GST(tax)</strong>
                        <span>+₹{(18 / 100) * allTotal.toFixed(2)}</span>
                      </div>
                      <div className="mb-2 d-flex flex-row justify-content-between">
                        <strong>Total</strong>
                        <span>
                          ₹
                          {allTotal +
                            userOrder.deliveryFee +
                            (18 / 100) * allTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="d-print-none">
                    <div className="float-right">
                      <Link
                        to="#"
                        onClick={handlePrint}
                        className="btn btn-success waves-effect waves-light mx-3"
                      >
                        <i className="fa fa-print"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
