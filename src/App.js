import React, { useState, useReducer } from "react";
import Modal from "./Modal";
import Data from "./Data";

function App() {
  const [name, setName] = useState('');
  const [people, setPeople] = useState(Data);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (event) => {
   event.preventDefault();
   if(name){
     showModal(true);
     setPeople([...people,{ id:new Date().getTime().toString(), name}])
     setName('')

   }else{
     setShowModal(true)
   }
  }
  return (
    <>
    {showModal && <Modal />}
    <form onSubmit={handleSubmit} className="form">
      <div>
        <input type="text" value={name} onClick={ (e) => setName(e.target.value)}/>
      </div>
      <button type="submit" className="add">Add</button>
    </form>
    {people.map( (person) => {
      return(
        <>
        <div key={person.id} className="list">
          <div>{person.name}</div>
        </div>
        </>
      )
    })}
    </>
  );
}

export default App;
