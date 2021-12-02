import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { addAccount } from "../../../../actions/accounts";
import { setError } from "../../../../actions/ui";
import { useForm } from "../../../../hooks/useForm";

export const AccountAdd = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    address: "",
    name: "",
  });

  const { address, name } = formValues;

  const handleAdd = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(addAccount({ address, name }));
      close.current.click();
    }
  };

  const close = useRef(null);

  const isFormValid = () => {
    if (validator.isEmpty(name)) {
      dispatch(setError("Address is required"));
      return false;
    } else if (validator.isEmpty(address)) {
      dispatch(setError("Address is required"));
      return false;
    } else if (!validator.isEthereumAddress(address)) {
      dispatch(setError("Address must be an Ethereum Address"));
      return false;
    }
    return true;
  };

  return (
    <>
      <button
        className="btn btn-sm btn-primary ms-auto"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#addModal"
      >
        {" "}
        <i className="bi bi-plus-circle"></i> Add account
      </button>
      <div
        className="modal fade"
        id="addModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleAdd}>
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Add Account</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {msgError && (
                  <div className="alert alert-warning">{msgError}</div>
                )}
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={address}
                    onChange={handleInputChange}
                  />
                  <div className="form-text">
                    <p className="mb-0">examples:</p>
                    <p className="mb-0">
                      0x71c7656ec7ab88b098defb751b7401b5f6d8976f
                    </p>
                    <p className="mb-0">
                      0xb794f5ea0ba39494ce839613fffba74279579268
                    </p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={close}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
