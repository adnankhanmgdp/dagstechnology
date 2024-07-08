import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VenderCreation = () => {

  const [formData, setFormData] = useState({})
  console.log("formData",formData);

  const handleChange = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value});
  }

  const token = localStorage.getItem("token");


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      setFormData((prevData) => ({ ...prevData, imgData: base64String }));
    };

    reader.readAsDataURL(file);
  };

  const [vendorData, setVendorData] = useState({});
  console.log("vendorDatais", vendorData);

  const handleCreateVendor = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/createVendor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          capacity: formData.capacity,
          docType: "PAN",
          imgData: formData.imgData,
          pincode: formData.pincode,
          address: formData.address,
        }),
      });
      const data = await res.json();
      console.log("data", data);
      if (res.ok) {
        setVendorData(data.data);

        const res2 = await fetch(
          `${process.env.REACT_APP_API_URL}/createBankDetails`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              accountHolderName: formData.accountHolderName,
              bankName: formData.bankName,
              accountNumber: formData.accountNumber,
              IFSC: formData.IFSC,
              branch: formData.branch,
              address: formData.bankAddress,
              bankId: data.data.vendorId,
            }),
          },
        );
        const data2 = await res2.json();
        console.log("bankdetail data is", data2);
        if (res2.ok) {
          toast.success("Vendor created successfully");
        } else {
          toast.warning(data2.message);
        }
      } else {
        toast.warning(data.message);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div
      style={{ background: "#F8F8FB", minHeight: "100vh" }}
      className="main-content"
    >
      <ToastContainer />
      <div className="page-content">
        {/* main form */}

        <form action="">
          <div className="container-fluid">
            <div class="row">
              <div class="col-lg-12">
                <div>
                  <div class="card-body">
                    {/* / Seller Details --> */}
                    <div className="card p-3 mb-4">
                      <h3 className="mt-1 mb-3">Vendor Details</h3>

                      <section>
                        <div class="row">
                          <div class="col-lg-6">
                            <div class="mb-3">
                              <label for="basicpill-firstname-input">
                                First name
                              </label>
                              <input
                                onChange={handleChange}
                                required
                                type="text"
                                class="form-control"
                                id="name"
                                placeholder="Enter First Name"
                              />
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="mb-3">
                              <label for="basicpill-firstname-input">
                                Phone
                              </label>
                              <input
                                onChange={handleChange}
                                required
                                type="text"
                                class="form-control"
                                id="phone"
                                placeholder="Enter Phone "
                              />
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-lg-6">
                            <div class="mb-3">
                              <label for="basicpill-phoneno-input">Email</label>
                              <input
                                onChange={handleChange}
                                type="email"
                                class="form-control"
                                id="email"
                                placeholder="Enter Email ."
                              />
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="mb-3">
                              <label for="basicpill-email-input">
                                PAN card
                              </label>
                              <input
                                onChange={handleChange}
                                type="number"
                                class="form-control"
                                id="document"
                                placeholder="Enter PAN number"
                              />
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="mb-3">
                              <label for="basicpill-pancard-input">
                                Capacity
                              </label>
                              <input
                                onChange={handleChange}
                                type="text"
                                class="form-control"
                                id="capacity"
                                placeholder="Enter vendors capacity ."
                              />
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="mb-3">
                              <label for="basicpill-pancard-input">
                                Verification document
                              </label>
                              <input
                                id="documentImage"
                                type="file"
                                className="form-control"
                                onChange={handleFileChange}
                              />
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>

                    <div className="card p-3 mb-4 mt-3">
                      <h3 className="mt-1 mb-3">Address Details</h3>

                      <section>
                        <div class="row">
                          <div class="col-lg-6">
                            <div class="mb-3">
                              <label for="basicpill-phoneno-input">
                                Postal Code
                              </label>
                              <input
                                onChange={handleChange}
                                type="text"
                                class="form-control"
                                id="pincode"
                                placeholder="Enter postal code"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="mb-3">
                              <label for="basicpill-address-input">
                                Address
                              </label>
                              <textarea
                                id="address"
                                class="form-control"
                                rows="2"
                                onChange={handleChange}
                                placeholder="Enter complete Address"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>

                    {/* bank details form */}

                    <div className="card p-3">
                      <h3 className="mt-1 mb-3">Bank Details</h3>

                      <section>
                        <div class="row">
                          <div class="col-lg-6">
                            <div class="mb-3">
                              <label for="basicpill-firstname-input">
                                Account holder's name
                              </label>
                              <input
                                onChange={handleChange}
                                required
                                type="text"
                                class="form-control"
                                id="accountHolderName"
                                placeholder="Enter Owner Name"
                              />
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="mb-3">
                              <label for="basicpill-lastname-input">
                                Account Number
                              </label>
                              <input
                                onChange={handleChange}
                                type="text"
                                class="form-control"
                                id="accountNumber"
                                placeholder="Enter Account Number"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-lg-6">
                            <div class="mb-3">
                              <label for="basicpill-phoneno-input">
                                Bank Name
                              </label>
                              <input
                                onChange={handleChange}
                                type="text"
                                class="form-control"
                                id="bankName"
                                placeholder="Enter Bank Name."
                              />
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="mb-3">
                              <label for="basicpill-phoneno-input">
                                Branch Name
                              </label>
                              <input
                                onChange={handleChange}
                                type="text"
                                class="form-control"
                                id="branch"
                                placeholder="Enter Branch Name."
                              />
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-lg-6">
                            <div class="mb-3">
                              <label for="basicpill-phoneno-input">
                                Bank Address
                              </label>
                              <input
                                onChange={handleChange}
                                type="text"
                                class="form-control"
                                id="bankAddress"
                                placeholder="Enter bank address."
                              />
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-lg-6">
                            <div class="mb-3">
                              <label for="basicpill-phoneno-input">
                                IFSC Code
                              </label>
                              <input
                                onChange={handleChange}
                                type="text"
                                class="form-control"
                                id="IFSC"
                                placeholder="Enter IFSC Code."
                              />
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                    <button
                      onClick={handleCreateVendor}
                      className="createUserBtn mt-3"
                    >
                      Register
                    </button>
                  </div>

                  {/* / end card body --> */}
                </div>
                {/* / end card --> */}
              </div>
              {/* / end col --> */}
            </div>
          </div>
        </form>
      </div>
      <script src="/assets/js/pages/form-wizard/init.js"></script>
    </div>
  );
};

export default VenderCreation;
