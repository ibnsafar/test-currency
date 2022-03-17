import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_PATH } from "../actions/service";
import "./css/currency.css";

const OneCurrency = () => {
    const params = useParams()
    let code = params.code
    // configuring date
    let month = String(new Date().getMonth());
    let result = [];
    let days = [];
    if (month.length === 1) {
        month = "0" + month;
    }
    // getting data for 10 days
    for (let i = 0; i < 10; i++) {
        let datet = String(new Date().getDate() - i)
        if (datet.length < 2) {
            datet = "0" + datet;
        }
        let today = new Date().getFullYear() + "/" + month + "/" + datet
        days.push(today)
        axios.get(API_PATH + today + "/daily_json.js").then((res) => {
            // console.log(res.data.Valute)
            Object.entries(res.data.Valute).map(item => {
                if (item[1].NumCode == code) {
                    result.push(item)
                    // console.log(result)
                }
            })
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
    }, [])

    return (
        <>
            <div className="currency-wrapper">
                <h1>currency code: {params.code}</h1>
                {result.map((item, index) => {
                    return <p key={index}>
                        {item[0]}
                    </p>
                })}
            </div>
        </>
    )
}
export default OneCurrency;