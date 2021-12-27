import React, { useState } from "react";
import CurrencyInput, { formatValue } from "react-currency-input-field";
import Slider from "@mui/material/Slider";
import styles from "../styles/Calculator.module.scss";

const Calculator = () => {
  const [form, setForm] = useState({ postcode: "", income: "0", term: 0, growth: 3.5 });
  const { income, term, growth } = form;
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
  const productFee = 2999;
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

  function valueText(value, index) {
    return `${value} %`;
  }

  const onChange = (e) => {
    const { name, value } = e.target;

    setForm((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));

    console.log(form);
  };

  function maxBudget(maxAmount) {
    if (isNaN(maxAmount)) {
      return "£0";
    } else {
      return formatter.format(maxAmount);
    }
  }

  function monthlyCost(monthlyAmount) {
    if (isNaN(monthlyAmount)) {
      return "£0";
    } else {
      return formatter.format(monthlyAmount);
    }
  }

  function projectedValue(projValue) {
    if (!maxAmount || !term) {
      return "Please enter details";
    } else if (isNaN(projValue)) {
      return "£0";
    } else {
      return formatter.format(projValue);
    }
  }

  function totalRent(convertedRent) {
    if (!maxAmount || !term) {
      return "Please enter details";
    } else if (isNaN(convertedRent)) {
      return "£0";
    } else {
      return formatter.format(convertedRent);
    }
  }

  function overallPayment(totalPayment) {
    totalPayment = projValue - convertedRent;
    if (!maxAmount || !term) {
      return "Please enter details";
    } else if (isNaN(totalPayment)) {
      return "£0";
    } else {
      return formatter.format(totalPayment);
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
                maxLength={4}
                onChange={onChange}
              ></input>
            </li>
            <li className={styles.row}>
              <label>What is your annual income?</label>
              <input
                type="number"
                name="income"
                className={styles.row}
                placeholder="0"
                min="25000"
                max="1000000"
                onChange={onChange}
              ></input>
            </li>
            <li className={styles.row}>
              <label>
                {" "}
                How long do you
                want?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </label>
              <button name="term" type="button" className={styles.btn} onClick={onChange} value="3">
                3 years
              </button>
              <button name="term" type="button" className={styles.btn} onClick={onChange} value="5">
                5 years
              </button>
              <button name="term" type="button" className={styles.btn} onClick={onChange} value="7">
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
                onChange={onChange}
              />
            </li>
          </form>
        </ul>
      </div>
      <div className={styles.result}>
        <span>
          Based on the postcode {form.postcode}, an income of £{form.income}, a term of {""}
          {form.term} years and an assumed price growth of {form.growth}%:
        </span>
        <br />
        <ul>
          <li>Maximum Budget: {maxBudget(maxAmount)}</li>
          <li>Monthly Cost: {monthlyCost(monthlyAmount)}</li>
          <li>Product Fee: £{productFee}</li>
          <li>Projected Value: {projectedValue(projValue)}</li>
          <li>Total Rent Covered: {totalRent(convertedRent)}</li>
          <li>Total Payment: {overallPayment(totalPayment)}</li>
        </ul>
      </div>
    </div>
  );
};

export default Calculator;
