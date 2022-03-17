import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_PATH } from "../actions/service";
import "./css/home.css";

const Home = (context) => {
  const [currency, setCurrency] = useState(null);
  // getting correct date time
  let month = String(new Date().getMonth());
  if (month.length === 1) {
    month = "0" + month;
  }
  let currentDate = String(new Date().getFullYear()) + "/" + month + "/" + String(new Date().getDate());

  // getting data from backend
  useEffect(() => {
    axios.get(API_PATH + currentDate + "/daily_json.js").then((res) => {
      setCurrency(res.data);
    })
  }, []);

  const iconMaker = (amount, previous) => {
    if (amount < previous) return "▲"
    else if (amount > previous) return "▼"
    else return "="
  }
  return (
    <>
      <div className="wrapper">
        <h1>Курсы валют ЦБ РФ на {currentDate}</h1>
        {currency &&
          <div><p>Доллар США $ — {currency.Valute.USD.Value} руб.
            {iconMaker(currency.Valute.USD.Value, currency.Valute.USD.Previous)}</p>
            <p>Евро € — {currency.Valute.EUR.Value} руб.
              {iconMaker(currency.Valute.EUR.Value, currency.Valute.USD.Previous)}</p>
            <p>Последнее обновление базы данных: {currency.Timestamp.slice(0, 4)}/
              {currency.Timestamp.slice(5, 7)}/
              {currency.Timestamp.slice(8, 10)} , {currency.Timestamp.slice(11, 19)}
            </p>
          </div>
        }
        <table className="table">
          <thead>
            <tr>
              <th>Цифр. код</th>
              <th>Букв. код</th>
              <th>Единиц</th>
              <th>Валюта</th>
              <th>Курс</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currency && Object.entries(currency.Valute).map((item, index) => {
              return <tr key={index} className="home-tr">
                <td><Link className="home-link" to={"/currency/" + item[1].NumCode}>{item[1].NumCode}</Link></td>
                <td>{item[0]}</td>
                <td>{item[1].Nominal}</td>
                <td>{item[1].Name}</td>
                <td>{item[1].Value}</td>
                <td>{(item[1].Value - item[1].Previous).toFixed(1)}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Home;
