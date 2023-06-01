import './Filter.css';

const Filter = (props) => {
    return (
      <>
        {
          props.successMessage &&
          <div className="message-container success">
            {props.successMessage}
          </div>
        }
        {
          props.errorMessage &&
          <div className="message-container error">
            {props.errorMessage}
          </div>
        }
        <div>
          filter shown with <input value={props.searchTerm} onChange={props.handleSearch}/>
        </div>
      </>
    );
};

export default Filter;