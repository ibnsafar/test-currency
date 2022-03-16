import axios from "axios";
import { useEffect, useState } from "react";
import { API_PATH } from "../actions/service";
import "./css/home.css";
const Home = () => {
  const [currency, setCurrency] = useState(null);
  // getting correct date time
  let month = String(new Date().getMonth());
  let exarr = [];
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
    if (amount < previous) {
      return <img className="home-icon" src={require("./../assets/icons/down.png")} alt="down" />
    } else if (amount > previous) {
      return <img className="home-icon" src={require("./../assets/icons/up.png")} alt="up" />
    } else {
      return <img className="home-icon" src={require("./../assets/icons/equal.png")} alt="equal" />
    }
  }
  return (
    <>
      <div className="wrapper">
        <h1>Курсы валют ЦБ РФ на {currentDate}</h1>
        {currency &&
          <p>Доллар США $ — {currency.Valute.USD.Value} руб. {iconMaker(currency.Valute.USD.Value, currency.Valute.USD.Previous)}</p>}
        {currency &&
          <p>Евро € — {currency.Valute.EUR.Value} руб. {iconMaker(currency.Valute.EUR.Value, currency.Valute.USD.Previous)}</p>}
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
            {currency && Object.entries(currency.Valute).map(item => {
              return <tr key={item[1].id}>
                <td>{item[1].NumCode}</td>
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
