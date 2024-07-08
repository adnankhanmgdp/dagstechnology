import React from "react";
import { Link } from "react-router-dom";

const VendorDetails = () => {
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
                <h4 className="mb-sm-0 font-size-18">Vendor Detail</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link>Vendors</Link>
                    </li>
                    <li className="breadcrumb-item active">VendorDetail</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end page title --> */}

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
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
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-6">
                      <address>
                        <strong>Personal Information:</strong>
                        <br />
                        John Smith
                        <br />
                        6363636363
                        <br />
                        John@gmail.com
                        <br />
                        Joined on 10/03/2004
                      </address>
                    </div>
                    <div className="col-sm-6 text-sm-end">
                      <address className="mt-2 mt-sm-0">
                        <strong>Address:</strong>
                        <br />
                        Kenny Rigdon
                        <br />
                        1234 Main
                        <br />
                        Apt. 4B
                        <br />
                        Springfield, ST 54321
                      </address>
                    </div>
                    <div className="col-sm-6 text-sm-end">
                      <address className="mt-2 mt-sm-0">
                        <strong>Services Providing:</strong>
                        <br />
                        - cleaning <br />
                        - Drying <br />
                        - Colouring <br />- Ironing
                      </address>
                    </div>
                  </div>

                  <div className="py-2 mt-3 mb-2">
                    <strong className="font-size-16 fw-bold">
                      Active Orders
                    </strong>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-nowrap">
                      <thead>
                        <tr>
                          <th colspan="3" style={{ width: "70px" }}>
                            No.
                          </th>
                          <th>Item</th>
                          <th className="text-end">Price</th>
                          <th className="text-center">Order By</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colspan="3">01</td>
                          <td>Shirt, Pant, Tshirts</td>
                          <td className="text-end">$499.00</td>
                          <td className="text-center">John Doe (ORD04)</td>
                        </tr>

                        <tr>
                          <td colspan="3">02</td>
                          <td>Blazor Set</td>
                          <td className="text-end">$399.00</td>
                          <td className="text-center">Joe Don (ORD04)</td>
                        </tr>

                        <tr>
                          <td colspan="3">03</td>
                          <td>Washing Clothes</td>
                          <td className="text-end">$499.00</td>
                          <td className="text-center">John Don (ORD04)</td>
                        </tr>

                        <tr>
                          <td colspan="6"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="w-100 my-5 d-flex justify-content-end">
                    <div className="d-flex flex-column w-25  mr-5">
                      <div className="mb-2 d-flex flex-row justify-content-between">
                        <strong>Sub Total</strong>
                        <span>$1397.00</span>
                      </div>
                      <div className="mb-2 d-flex flex-row justify-content-between">
                        <strong>Shipping</strong>
                        <span>$13.00</span>
                      </div>
                      <div className="mb-2 d-flex flex-row justify-content-between">
                        <strong>Total</strong>
                        <span>$1410.00</span>
                      </div>
                    </div>
                  </div>
                  <div className="d-print-none">
                    <div className="float-right">
                      <Link className="btn btn-success waves-effect waves-light mx-3">
                        <i className="fa fa-print"></i>
                      </Link>
                      <Link className="btn btn-primary w-md waves-effect waves-light">
                        Send
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

export default VendorDetails;
