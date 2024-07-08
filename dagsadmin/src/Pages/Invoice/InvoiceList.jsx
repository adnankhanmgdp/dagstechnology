import React from "react";
import { Link } from "react-router-dom";

const InvoiceList = () => {
  const orders = [
    {
      invoice_number: "INV-001",
      user_name: "John Doe",
      product: "T-shirt",
      amount: 25.0,
      date: "2024-04-01",
    },
    {
      invoice_number: "INV-002",
      user_name: "Jane Smith",
      product: "Jeans",
      amount: 50.0,
      date: "2024-04-02",
    },
    {
      invoice_number: "INV-003",
      user_name: "Michael Johnson",
      product: "Sneakers",
      amount: 80.0,
      date: "2024-04-03",
    },
    {
      invoice_number: "INV-004",
      user_name: "Emily Davis",
      product: "Dress",
      amount: 65.0,
      date: "2024-04-04",
    },
    {
      invoice_number: "INV-005",
      user_name: "Alex Brown",
      product: "Jacket",
      amount: 90.0,
      date: "2024-04-05",
    },
    {
      invoice_number: "INV-006",
      user_name: "Sarah Wilson",
      product: "Skirt",
      amount: 40.0,
      date: "2024-04-06",
    },
    {
      invoice_number: "INV-007",
      user_name: "Daniel Taylor",
      product: "Hoodie",
      amount: 60.0,
      date: "2024-04-07",
    },
    {
      invoice_number: "INV-008",
      user_name: "Olivia Martinez",
      product: "Scarf",
      amount: 30.0,
      date: "2024-04-08",
    },
    {
      invoice_number: "INV-009",
      user_name: "Ethan Anderson",
      product: "Shorts",
      amount: 35.0,
      date: "2024-04-09",
    },
    {
      invoice_number: "INV-010",
      user_name: "Chloe Wilson",
      product: "Sweater",
      amount: 55.0,
      date: "2024-04-10",
    },
  ];

  return (
    <div
      style={{ background: "#F8F8FB", minHeight: "100vh" }}
      className="main-content"
    >
      <div className="page-content">
        <div class="container-fluid">
          {/* <!-- start page title --> */}
          <div class="row">
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18">Invoice List</h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <Link>Invoices</Link>
                    </li>
                    <li class="breadcrumb-item active">Invoice List</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end page title --> */}

          <div class="row justify-content-center scrollable">
            <div class="d-flex flex-row flex-wrap justify-content-center">
              {orders.map((order, index) => {
                return (
                  <div class="card cardCustom m-2">
                    <div class="card-body">
                      <div class="row">
                        <div class="col">
                          <div class="text-center">
                            <div class="avatar-sm me-3 mx-auto mb-3">
                              <span
                                style={{ backgroundColor: "#D5DAFA" }}
                                class="avatar-title rounded-circle text-primary font-size-16"
                              >
                                {order.user_name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <h5 class="mb-1 font-size-15 text-truncate">
                              {order.user_name}
                            </h5>
                            <Link class="text-muted">@Dags</Link>
                          </div>
                        </div>

                        <div class="col">
                          <div>
                            <Link
                              class="d-block text-primary text-decoration-underline mb-2"
                            >
                              Invoice {order.invoice_number}
                            </Link>
                            <h5 class="text-truncate mb-4">{order.product}</h5>
                            <ul class="list-inline mb-0">
                              <li class="list-inline-item me-3">
                                <h5
                                  class="font-size-14"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Amount"
                                >
                                  <i class="bx bx-money me-1 text-muted"></i> $
                                  {order.amount}
                                </h5>
                              </li>
                              <li class="list-inline-item">
                                <h5
                                  class="font-size-14"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Due Date"
                                >
                                  <i class="bx bx-calendar me-1 text-muted"></i>{" "}
                                  {order.date}
                                </h5>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* <!-- end row --> */}

          <div class="row">
            <div class="col-12">
              <div class="text-center my-3">
                <Link class="text-success">
                  <i class="bx bx-loader bx-spin font-size-18 align-middle me-2"></i>{" "}
                  Load more{" "}
                </Link>
              </div>
              {/* </div> <!-- end col--> */}
            </div>
            {/* <!-- end row --> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;
