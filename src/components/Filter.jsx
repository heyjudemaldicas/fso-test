const Filter = (props) => {
    return (
        <div>
        filter shown with <input value={props.searchTerm} onChange={props.handleSearch}/>
      </div>
    );
};

export default Filter;