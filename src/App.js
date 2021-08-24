import React, { useState, useReducer } from "react";
import Modal from "./Modal";
import Data from "./Data";

const reducer = (state, action) => {
 if(action.type === 'ADD_ITEM'){
  const newItems = [...state.people, action.payload]
  return {
    ...state,
    people: newItems,
    isModalOpen: true,
    modalContent: 'item added'
  };
 }
 if(action.type === 'NO_VALUE'){
  return { ...state, isModalOpen:true, modalContent:'Please enter value'}
}
if(action.type === 'CLOSE_MODAL'){
  return {...state, isModalOpen:false }
}
if(action.type === 'REMOVE_ITEM'){
  const newPeople = state.people.filter( (person) =>
    person.id !== action.payload)
  return {...state, people: newPeople};
}
 throw new Error ('No matching action type');
}

const defaultState = {
  people: [],
  isModalOpen:false,
  modalContent: ''
}
function App() {
  const [name, setName] = useState('');
  const [state, dispatch] = useReducer(reducer, defaultState)

  const handleSubmit = (e) => {
   e.preventDefault();
   if(name){
    const newItem = {id:new Date().getTime().toString(), name}
    dispatch({type:'ADD_ITEM', payload: newItem})
    setName('')
   }else{
    dispatch({type:'NO_VALUE'})
   }
  }
  const closeModal = () => {
    dispatch( {type: 'CLOSE_MODAL'})
  }
  return (
    <>
    {state.isModalOpen && <Modal closeModal={closeModal} modalContent={state.modalContent} />}
    <form onSubmit={handleSubmit} className="form">
      <div>
        <input type="text" value={name} onChange={ (e) => setName(e.target.value)}/>
      </div>
      <button type="submit" className="add">Add</button>
    </form>
    {state.people.map( (person) => {
      return(
        <>
        <div key={person.id} className="list">
          <div>{person.name}</div>
          <button onClick= { () => dispatch(
            {type: 'REMOVE_ITEM', payload:person.id}
          )}>Remove</button>
        </div>
        </>
      )
    })}
    </>
  );
}

export default App;
