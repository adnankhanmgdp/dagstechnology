import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllServices = () => {
  const [services, setServices] = useState([]);
  // console.log("services", services);

    const token = localStorage.getItem("token");

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/getService`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          // console.log(data.service);
          setServices(data.service);
        }
      } catch (error) {
        // console.log(error);
      }
    };

    handleFetch();
  }, []);

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Service Cost</h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <span>Categories</span>
                    </li>
                    <li className="breadcrumb-item active">Service Cost</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="table-responsive">
            {
              services.length>0?(<table className="table table-bordered table-hover table-centered mb-0">
              <thead>
                <tr className="text-center">
                  <th>Service Icon</th>
                  <th>Service ID</th>
                  <th>Service Name</th>
                  <th>View items</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(services) &&
                  services.map((item) => (
                    <tr key={item._id} data-id="1" className="text-center">
                      <td data-field="image">
                        <div
                          className="border mx-auto newImageBorder overflow-hidden"
                          style={{ width: "50px", height: "50px" }}
                        >
                          <img
                            src={item.serviceIcon}
                            width="60"
                            height="60"
                            className=" p-2"
                            alt="icon"
                          />
                        </div>
                      </td>
                      <td data-field="id">{item.serviceId}</td>
                      <td data-field="name">{item.serviceName}</td>
                      <td data-field="price">
                        <Link
                          to={`/categories/CategoryServiceTable/${encodeURIComponent(JSON.stringify(item))}`}
                        >
                          <button className="border-0 pl-3 pr-3 pt-1 pb-1 bg-primary text-white">
                            View Items
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>):(<span className="text-center fs-15">No services available</span>)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllServices;
