import ReactDOM from 'react-dom';
import React from 'react';

const BASE_URL = 'https://www.acme-api.com/api';

const Users = ({ users })=> {
  return (
      <ul>
        {
          users.map( user => {
            return (
              <li key={ user.id }>
                { user.fullName }
                ( { user.email })
                <br />
                { user.title }
                
              </li>
            );
          })
        }
      </ul>
  );
};

const App = ()=> {
  const [term, setTerm] = React.useState('');
  const [users, setUsers] = React.useState([]);
  const search = async(ev)=> {
    ev.preventDefault();
    const url = `${BASE_URL}/users/search/${term}`;
    const response = await fetch(url);
    const json = await response.json();
    const { users } = json;
    setUsers(users)
  }
  return (
    <div>
      <h1>Acme User Search</h1>
      <form onSubmit={ search }>
        <input value={ term } onChange={ ev => setTerm(ev.target.value)}/>
        <button disabled={ !term }>Search</button>
      </form>
      <Users users={ users }/>
    </div>
  );
};
//const root = ReactDOM.createRoot(document.querySelector('#root'));
//root.render(<App />);
ReactDOM.render(<App />, document.querySelector('#root'));