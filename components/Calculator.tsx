import React, { useState } from "react";
import CurrencyInput, { formatValue } from "react-currency-input-field";
import Slider from "@mui/material/Slider";
import styles from "../styles/Calculator.module.scss";

const Calculator = () => {
  const [form, setForm] = useState({ postcode: "", income: "", term: 0, growth: 3.5 });
  const { postcode, income, term, growth } = form;
  const marks = [
    {
      value: -1,
      label: "-1%",
    },
    {
      value: 3.5,
      label: "15-year avg",
    },
    {
      value: 7.5,
      label: "7.5%",
    },
  ];
  let incomeMultiplier = 6.99;
  let maxAmount = parseInt(income) * incomeMultiplier;
  let monthlyAmount = ((parseInt(income) * incomeMultiplier) / 12) * 0.045;
  let projValue = maxAmount * (1 + growth) ** term;
  let convertedRent = 0.25 * monthlyAmount * (term * 12);
  let totalPayment = projValue - convertedRent;
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
  });
  const productFee = formatter.format(2999);

  const blockInvalidChar = (e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  function valueText(value, index) {
    return `${value} %`;
  }

  const stringChange = (e) => {
    const { name, value } = e.target;

    setForm((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));

    console.log(form);
  };

  const numChange = (e) => {
    const { name, value } = e.target;

    if (parseInt(value) === NaN) {
      setForm((prevFormValues) => ({
        ...prevFormValues,
      }));
    } else {
      setForm((prevFormValues) => ({
        ...prevFormValues,
        [name]: value,
      }));
    }
    console.log(form);
  };

  function renderValue(value) {
    if (isNaN(value)) {
      return "£0";
    } else {
      return formatter.format(value);
    }
  }

  function renderDetail(value) {
    if (!maxAmount || !term) {
      return "Please enter details";
    } else if (isNaN(value)) {
      return "£0";
    } else {
      return formatter.format(value);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputForm}>
        <ul className={styles.list}>
          <form>
            <li className={styles.row}>
              <label>Where do you want to live?&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <input
                className={styles.row}
                name="postcode"
                type="text"
                minLength={3}
                maxLength={4}
                onChange={stringChange}
                value={form.postcode.toUpperCase()}
              ></input>
            </li>
            <li className={styles.row}>
              <label>What is your annual income?</label>
              <input
                type="number"
                name="income"
                className={styles.row}
                min="25000"
                max="1000000"
                onChange={numChange}
                onKeyDown={blockInvalidChar}
                value={form.income}
                required
              ></input>
            </li>
            <li className={styles.row}>
              <label className={styles.test}> How long do you want?</label>
              <button
                name="term"
                type="button"
                className={styles.btn_prim}
                onClick={stringChange}
                value="3"
              >
                3 years
              </button>
              <button
                name="term"
                type="button"
                className={styles.btn}
                onClick={stringChange}
                value="5"
              >
                5 years
              </button>
              <button
                name="term"
                type="button"
                className={styles.btn}
                onClick={stringChange}
                value="7"
              >
                7 years
              </button>
            </li>
            <li className={styles.row}>
              <label>Assumed price growth?</label>
              <Slider
                aria-label="Always visible"
                className={styles.slider}
                name="growth"
                min={-1}
                max={7.5}
                defaultValue={3.5}
                getAriaValueText={valueText}
                step={0.1}
                marks={marks}
                valueLabelDisplay="on"
                onChange={numChange}
                value={form.growth}
              />
            </li>
          </form>
        </ul>
      </div>
      <div className={styles.result}>
        <span>
          Based on the postcode {form.postcode}, an income of {formatter.format(parseFloat(income))}
          , a term of {""}
          {form.term} years and an assumed price growth of {form.growth}%:
        </span>
        <br />
        <ul>
          <li>Maximum Budget: {renderValue(maxAmount)}</li>
          <li>Monthly Cost: {renderValue(monthlyAmount)}</li>
          <li>Product Fee: {productFee}</li>
          <li>Projected Value: {renderDetail(projValue)}</li>
          <li>Total Rent Covered: {renderDetail(convertedRent)}</li>
          <li>Total Payment: {renderDetail(totalPayment)}</li>
        </ul>
      </div>
    </div>
  );
};

export default Calculator;
