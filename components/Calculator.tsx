import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
// import NumberFormat from "react-number-format";
import Slider from "@mui/material/Slider";
import styles from "../styles/Calculator.module.scss";

const Calculator = () => {
  const [form, setForm] = useState({ postcode: "", income: 0, term: 0, growth: 3.5 });

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

  const { income } = form;
  console.log(income);
  let times = 6.99;

  function maxBudget() {
    let amount = income * times;
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
              <CurrencyInput
                name="income"
                placeholder="£25000"
                defaultValue={25000}
                decimalsLimit={2}
                maxLength={8}
                step={1000}
                onChange={onChange}
                className={styles.row}
              />
              {/* <NumberFormat
                className={styles.row}
                name="income"
                thousandsGroupStyle="thousand"
                prefix="£"
                decimalSeparator="."
                displayType="input"
                type="number"
                thousandSeparator={true}
                allowNegative={false}
                isNumericString={true}
                onChange={onChange}
              /> */}
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
              <button
                name="term"
                type="button"
                className={styles.btn}
                onChange={onChange}
                onClick={onChange}
                value="5"
              >
                5 years
              </button>
              <button
                name="term"
                type="button"
                className={styles.btn}
                onChange={onChange}
                onClick={onChange}
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
                onChange={onChange}
              />
            </li>
          </form>
        </ul>
      </div>
      <div className={styles.result}>
        <span>
          Based on the postcode {form.postcode}, an income of {form.income}, a term of {""}
          {form.term} years and an assumed price growth of {form.growth}%:
        </span>
        <br />
        <ul>
          <li>Maximum Budget: {maxBudget()}</li>
          <li>Monthly Cost:</li>
          <li>Product Fee:</li>
          <li>Projected Value:</li>
          <li>Rent Covered:</li>
          <li>Total Payment:</li>
        </ul>
      </div>
    </div>
  );
};

export default Calculator;
