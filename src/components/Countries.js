const CountryItem = ({ country, handleShow }) => {
    return (
        <>
            <p>{country.name.common}
                <button onClick={() => handleShow(country.name.common)}>Show</button>
            </p>
        </>
    )
}

const Countries = ({ countries, handleShow }) => {

    return (
        <>
            {
                countries.map(country => <CountryItem key={country.name.common} country={country} handleShow={handleShow} />)
            }
        </>
    )
};

export default Countries;