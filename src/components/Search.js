const Search = ({ handleSearch, term }) => {
    return (
        <>
            <span style={{ marginRight: '10px' }}>Find countries</span>
            <input type="text" onChange={handleSearch} value={term} />
        </>
    )
};

export default Search;