import { useState } from 'react'
import ExchangeRate from './ExchangeRate'
import axios from 'axios'

const CurrencyConverter = () => {
    const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA' ]
    const [chosenFrom, setChosenFrom] = useState('BTC')
    const [chosenTo, setChosenTo] = useState('BTC')
    const [amount, setAmount] = useState(1)
    const [exchangedData, setExchangedData] = useState({
        From: 'BTC',
        To: 'BTC',
        exchangeRate: 0
    })
    const [result, setResult] = useState(0)


    const convert = () => { 
        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {from_currency: chosenFrom, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenTo},
            headers: {
              'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
              'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
            }
          };
          
          axios.request(options).then((response) => {
              setExchangedData({
                From: chosenFrom,
                To: chosenTo,
                exchangeRate: parseFloat(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']).toFixed(2)
              })
              setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount)
          }).catch((error) => {
              console.error(error);
          });
    }

    return (
        <div className="currency-converter">
            <h2>Currency Converter</h2>

            <div className="input-box">

                <table>
                    <tbody>
                    <tr>
                        <td>FROM:</td>
                        <td>
                            <select
                                value={chosenFrom}
                                name="currency-option-1"
                                className="currency-options"
                                onChange={(e) => setChosenFrom(e.target.value)}
                            >
                                {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                            </select>
                        </td>
                        <td>
                            <input
                                type="number"
                                name="currency-amount-1"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </td>
                        
                    </tr>
                    <tr>
                        <td>TO:</td>
                        <td>
                            <select
                                value={chosenTo}
                                name="currency-option-2"
                                className="currency-options"
                                onChange={(e) => setChosenTo(e.target.value)}
                            >
                                {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                            </select>
                        </td>
                        <td>
                            <input
                                name="currency-amount-2"
                                value={result}
                                disabled={true}
                            />
                        </td>
                        
                    </tr>
                    </tbody>
                </table>
                <button id="convert-button" onClick={convert}>Convert</button>
            </div>
            <ExchangeRate
                    exchangedData={exchangedData}
                    />

            
        </div>
    )
}

export default CurrencyConverter  