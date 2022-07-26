const ExchangeRate = ({exchangedData}) => {
    return (
        <div className="exchange-rate">
            <p>Exchange Rate</p>
            <p><strong>{exchangedData.exchangeRate}</strong></p>
            <p>{exchangedData.From} to {exchangedData.To}</p>
            
        </div>
    )
}

export default ExchangeRate