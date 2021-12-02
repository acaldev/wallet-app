import React, { useState } from "react";
import { useSelector } from "react-redux";

export const ExchangeRate = () => {
  const { account } = useSelector((state) => state.account);
  const exchangeRates = useSelector((state) => state.exchangeRates);

  const findRate = (c) =>
    exchangeRates?.find(({ currency }) => currency === c).rate;

  const { balance } = account;
  const initialCurrency = "USD";
  const initialRate = findRate(initialCurrency);

  const [values, setValues] = useState({
    rate: initialRate,
    currency: initialCurrency,
  });

  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      ...{ rate: target.value },
    });
  };

  const handleSelectChange = ({ target }) => {
    setValues({
      rate: findRate(target.value),
      currency: target.value,
    });
  };

  const { rate, currency } = values;

  const calcBalance = () =>
    (rate * Number(balance)).toLocaleString("en-US", {
      style: "currency",
      currency,
    });

  return (
    <div className="row mt-5">
      <div className="col">
        <div className="card">
          <div className="card-body">
            <h6>Rate:</h6>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                name="rate"
                min="0"
                step="0.01"
                value={rate}
                onChange={handleInputChange}
              />
              <div id="emailHelp" className="form-text">
                Exchange rate
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card">
          <div className="card-body">
            <select
              className="form-select"
              name="currency"
              data-key="rate"
              value={currency}
              onChange={handleSelectChange}
            >
              {exchangeRates &&
                exchangeRates.map((rate) => (
                  <option key={rate.id} value={rate.currency}>
                    {rate.currency}
                  </option>
                ))}
            </select>
            <h6 className="my-4">
              Balance: <span className="badge bg-primary">{calcBalance()}</span>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};
