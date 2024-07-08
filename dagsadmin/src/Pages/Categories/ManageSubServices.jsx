import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageSubServices = () => {
  const [options, setOptions] = useState([]);

  const token = localStorage.getItem("token")
    useEffect(() => {
      const handleFetch = async () => {
        try {
          const res = await fetch(
            `${process.env.REACT_APP_API_URL}/getService`,
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
            // console.log(data.service);
            setOptions(data.service);
          }
        } catch (error) {
          console.log(error);
        }
      };

      handleFetch();
    }, []);

  return (
    <div
      className="main-content"
      style={{ backgroundColor: "#F6F6F9", minHeight: "100vh" }}
    >
      <div className="page-content">
        <div className="container-fluid">
          {/* <!-- start page title --> */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">All Services</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link>Categories</Link>
                    </li>
                    <li className="breadcrumb-item active">Categories List</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end page title --> */}

          {/* list starting */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    {
                      options.length > 0? (<table className="table table-bordered table-hover table-centered mb-0">
                      <thead>
                        <tr className="text-center">
                          <th className="text-white">Avatar</th>
                          <th>Service ID</th>
                          <th>Service Name</th>
                          <th>Vendor Commission</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {options.map((service) => (
                          <tr className="text-center align-center" key={service.serviceId}>
                            <td data-field="image">
                              <div
                                className="border mx-auto newImageBorder overflow-hidden"
                                style={{ width: "50px", height: "50px" }}
                              >
                                <img
                                  src={service.serviceIcon}
                                  width="60"
                                  height="60"
                                  className=" p-2"
                                  alt="icon"
                                />
                              </div>
                            </td>
                            <td className="text-center align-middle">{service.serviceId}</td>
                            <td className="text-center align-middle">
                              {service.serviceName}
                            </td>
                            <td className="text-center align-middle">
                              {service.vendorCommission} %
                            </td>
                            <td className="text-center align-middle">
                              <Link
                                to={{
                                  pathname: `/categories/ServiceProvidingList/${service.serviceId}`,
                                }}
                                className="btn btn-primary btn-sm"
                              >
                                View Services
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>):(<span className="text-center">No services available</span>)
                        
                    }
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

export default ManageSubServices;
