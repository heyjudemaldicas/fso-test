import './Persons.css';

const Persons= (props) => {
    return (
    <ul>
        {
          props.filtered.map(item => {
            return (
              <li key={item.id}>
                {item.name} {item.number}
                <button className="delete" onClick={() => props.handleDelete(item.id, item.name)}>Delete</button>
              </li>
            )
          })
        }
      </ul> 
    );
};

export default Persons;