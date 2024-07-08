import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import "datatables.net-bs4";
import { BsCreditCard } from "react-icons/bs";
import { HiCreditCard } from "react-icons/hi2";
import { FaCcPaypal } from "react-icons/fa"; 

const VendorPayments = () => {
  const tableRef = useRef();

  const [payment, setPayment] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const handlefetchPayments = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/getPayments`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();
        if (res.ok) {
          setPayment(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    handlefetchPayments();
  }, []);

  useEffect(() => {
    if (payment.length > 0) {
      // Destroy previous instance of DataTable if exists
      if ($.fn.dataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }

      // Initialize DataTable
      $(tableRef.current).DataTable();
    }
  }, [payment]);

  return (
    <div
      style={{ background: "#F8F8FB", minHeight: "100vh" }}
      className="main-content"
    >
      <div className="page-content">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-sm-0 font-size-18">Payment History</h4>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <Link to="#">Payment</Link>
                  </li>
                  <li className="breadcrumb-item active">Payment History</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="table-responsive">
            <table
              ref={tableRef}
              className="table table-striped table-bordered"
            >
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Order ID</th>
                  <th>Amount</th>
                  <th>Payer</th>
                  <th>Payee</th>
                  <th>Payment Type</th>
                </tr>
              </thead>
              <tbody>
                {
                  payment.length > 0 ? (
                  payment.map((order) => (
                  <tr key={order.transactionId}>
                    <td>{order.transactionId}</td>
                    <td>{order.orderId}</td>
                    <td className="text-center">₹{order.amount}</td>
                    <td>{order.paymentFrom}</td>
                    <td>{order.paymentTo}</td>
                    <td>
                      {(order.paymentMethod === "Credit Card" && (
                        <BsCreditCard size={"20px"} />
                      )) ||
                        (order.paymentMethod === "Debit Card" && (
                          <HiCreditCard size={"20px"} />
                        )) ||
                        (order.paymentMethod === "PayPal" && (
                          <FaCcPaypal size={"20px"} />
                        ))}
                      <span className="pl-3">{order.paymentMethod}</span>
                    </td>
                  </tr>
                ))
                  ) : (
                      <span>Currently there is no payment history</span>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorPayments;
