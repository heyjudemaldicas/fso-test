const Persons= (props) => {
    return (
    <ul>
        {
          props.filtered.map(item => {
            return <li key={item.id}>{item.name} {item.number}</li>
          })
        }
      </ul> 
    );
};

export default Persons;