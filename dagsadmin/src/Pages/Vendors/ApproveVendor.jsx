import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-bs4"; // Import the Bootstrap 4 DataTables extension
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Modal } from "bootstrap"; // Import Bootstrap modal components
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApproveVendor = () => {
  const tableRef = useRef();
  const modalRef = useRef();

  const navigate = useNavigate();

  const location = useLocation();
  const vendors = location.state?.vendors

  const token = localStorage.getItem("token");

  console.log("vendors",vendors)

  useEffect(() => {
    $(tableRef.current).DataTable().destroy();
    $(tableRef.current).DataTable();
  }, []);

  const handleApprove = () => {
    // Show the modal when Approve button is clicked
    const modal = new Modal(modalRef.current);
    modal.show();
  };

  const handleChangeStatus = async () => {
   try {
     const res = await fetch(`${process.env.REACT_APP_API_URL}/editVendor`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
       },
       body: JSON.stringify({
         vendorId: vendors.vendorId,
         verificationStatus: "active"
       }),
     });
     
     const data = await res.json();
     if (res.ok) {
       console.log(data);
       navigate("/vendors/approveVendors");
       toast.success("vendor approved")
     }
   } catch (error) {
    console.log(error)
   }
  }

    const handleRemoveVendor = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/deleteUnapprovedVendor`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ vendorId: vendors.vendorId }),
          },
        );

        const data = await res.json();

        if (res.ok) {
          navigate("/vendors/approveVendors");
          toast.success(data.message);
        }
        toast.warning(data.message);
      } catch (error) {
        toast.warning(error.message);
      }
    };

  return (
    <div
      className="main-content"
      style={{ backgroundColor: "#F6F6F9", minHeight: "100vh" }}
    >
      <ToastContainer />
      <div className="page-content">
        <div className="container-fluid">
          <div className="row ">
            <div className="d-flex flex-column m-3 flex-xl-row">
              <div className="card border-0 xl-mb-0 mr-xl-4 col-xl-4">
                <div className="bg-primary-subtle p-2">
                  <div className="row">
                    <div className="mx-auto mt-3">
                      <img
                        src="/assets/images/users/avatar-1.jpg"
                        className="avatarCustom"
                        alt="user's img"
                      />
                    </div>
                    <div className="col-12">
                      <div className="p-3">
                        <h5 className="text-center">
                          {vendors.name}'s Profile
                        </h5>
                        <p className="text-center text-primary">
                          " It will seem like simplified "
                        </p>
                      </div>
                      <p className="text-center ProfileService">
                        Services Providing
                      </p>
                    </div>
                    <div
                      className="mx-auto border-0"
                      style={{ backgroundColor: "#F6F6F9" }}
                    >
                      <div className="p-2 text-center mx-auto">
                        <span className="badge badge-soft-secondary">
                          Clothing Distribution /
                        </span>
                        <span className="badge badge-soft-secondary">
                          Apparel Shipping /
                        </span>
                        <span className="badge badge-soft-secondary">
                          Fashion Logistics
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card border-0">
                <div className="card-body">
                  <h4 className="card-title mb-4 font-size-20">
                    Personal Information
                  </h4>

                  <p className="text-muted mb-4 font-size-14">
                    Hi I'm {vendors.name},has been the industry's standard dummy
                    text To an English person, it will seem like simplified
                    English, as a skeptical Cambridge.
                  </p>
                  <div className="table-responsive">
                    <table className="table table-nowrap mb-0">
                      <tbody>
                        <tr>
                          <th className="headingCustom" scope="row">
                            Full Name :
                          </th>
                          <td>{vendors.name}</td>
                        </tr>
                        <tr>
                          <th className="headingCustom" scope="row">
                            Mobile :
                          </th>
                          <td>{vendors.phone}</td>
                        </tr>
                        <tr>
                          <th className="headingCustom" scope="row">
                            E-mail :
                          </th>
                          <td>{vendors.email}</td>
                        </tr>
                        <tr>
                          <th className="headingCustom" scope="row">
                            Location :
                          </th>
                          <td>{vendors.address}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="col-12">
              <div className="card border-0">
                <div className="card-body">
                  <h4 className="card-title text-center mt-2 font-size-20 mb-2">
                    Verify Documents
                  </h4>
                  <div className="mt-4 ml-3">
                    <div className="text-center">
                      <img
                        src={
                          vendors.document
                            ? vendors.document
                            : "https://tse3.mm.bing.net/th?id=OIP.K4jXSK4XQahOLPEliCtvlwHaHa&pid=Api&P=0&h=180"
                        }
                        alt="DocumentImage"
                        width="500px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-3 mt-3 text-center mt-5">
              <button
                onClick={handleApprove}
                className="mr-3 w-25 border-0 p-1 bg-success text-white"
              >
                Approve
              </button>
              <button
                onClick={handleRemoveVendor}
                className="w-25 border-0 p-1 bg-danger text-white"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal for confirmation */}
      <div
        ref={modalRef}
        className="modal fade"
        tabindex="-1"
        aria-labelledby="confirmModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmModalLabel">
                Confirmation
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to make changes?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                onClick={handleChangeStatus}
                type="button"
                className="btn btn-primary"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveVendor;
