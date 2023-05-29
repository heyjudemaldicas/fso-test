const PersonForm = (props) => {
    return (
    <form onSubmit={props.handleSubmit}>
        <div>
          name: <input value={props.newName} onChange={props.handleAddName} />
        </div>
        <div>number: <input type="tel" pattern="[0-9]{11}" value={props.number} onChange={props.handleNewNumber} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
};

export default PersonForm;