import './App.css';
import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { AiOutlineEdit } from 'react-icons/ai'

function App() {

   const [isCompleteScreen, setIsCompleteScreen] = useState(false);
   const [allTodos, setTodos] = useState([]);
   const [newTitle, setNewTitle] = useState("");
   const [newDescription, setNewDescription] = useState("");
   const [completedTodos, setCompletedTodos] = useState([]);
   const[currentEdit, setCurrentEdit] = useState("");
   const [currentEditedItem, setCurrentEditedItem] = useState('')

   const handleAddTodo = () => {
      let newTodoItem = {
         title: newTitle,
         description: newDescription
      };

      let updatedTodoArr = [...allTodos];
      updatedTodoArr.push(newTodoItem);
      setTodos(updatedTodoArr);
      localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
   };

   const handleDeleteTodo = (index) => {
      let reducedTodo = [...allTodos];
      reducedTodo.splice(index, 1); // 1 elem eltávolítása az adott indexről

      localStorage.setItem('todolist', JSON.stringify(reducedTodo));
      setTodos(reducedTodo);
   };

   const handleComplete = (index) => {
      let now = new Date();
      let completedOn = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

      let filteredItem = {
         ...allTodos[index],
         completedOn: completedOn
      };

      let updatedCompletedArr = [...completedTodos];
      updatedCompletedArr.push(filteredItem);
      setCompletedTodos(updatedCompletedArr);
      handleDeleteTodo(index);
      localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
   };

   const handleDeleteCompletedTodo = (index) => {
      let reducedTodo = [...completedTodos];
      reducedTodo.splice(index, 1);

      localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
      setCompletedTodos(reducedTodo);
   };

   useEffect(() => {
      let savedTodo = JSON.parse(localStorage.getItem('todolist'));
      let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
      if (savedTodo) {
         setTodos(savedTodo);
      }
      if (savedCompletedTodo) {
         setCompletedTodos(savedCompletedTodo);
      }
   }, []);

   const handleEdit=(ind, item)=>{
      console.log(ind);
      setCurrentEdit(ind)
      setCurrentEditedItem(allTodos[ind])
   }

   const handleUpdateTitle=(value)=>{
      setCurrentEditedItem((prev)=>{
         return{...prev,title:value}
      })
   }

   const handleUpdateDescription=(value)=>{
      setCurrentEditedItem((prev)=>{
         return{...prev,description:value}
      })
   }

   const handleUpdateToDo=()=>{
      let newTodo=[...allTodos];
      newTodo[currentEdit]=currentEditedItem;
      setTodos(newTodo);
      setCurrentEdit("");

   }

   return (
      <div className="App">
         <h1>My Todos</h1>

         <div className='todo-wrapper'>
            <div className='todo-input'>
               <div className='todo-input-item'>
                  <label>Title</label>
                  <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="What's the task title?" />
               </div>
               <div className='todo-input-item'>
                  <label>Description</label>
                  <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="What's the task description?" />
               </div>
               <div className='todo-input-item'>
                  <button type="button" onClick={handleAddTodo} className="primaryBtn">Add</button>
               </div>
            </div>
            <div className="btn-area">
               <button type="button" className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={() => setIsCompleteScreen(false)}>ToDo</button>
               <button type="button" className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={() => setIsCompleteScreen(true)}>Completed</button>
            </div>
            <div className="todo-list">
               {isCompleteScreen === false && allTodos.map((item, index) => {
                  if(currentEdit===index){
                     return(
                        <div className='edit-wrapper' key={index}>
                        <input placeholder='Updated Title' onChange={(e)=>handleUpdateTitle(e.target.value)} value={currentEditedItem.title} />
                        <textarea placeholder='Updated Title' rows={4} onChange={(e)=>handleUpdateDescription(e.target.value)} value={currentEditedItem.description} />
                        <button type="button" onClick={handleUpdateToDo} className="primaryBtn">Update</button>
                     </div>
                     )
                  } else {
                     return (
                        <div className="todo-list-item" key={index}>
                           <div>
                              <h3>{item.title}</h3>
                              <p>{item.description}</p>
                           </div>
                           <div>
                              <MdDelete className='icon' title='Delete?' onClick={() => handleDeleteTodo(index)} />
                              <FaCheck className='icon-check' title='Complete?' onClick={() => handleComplete(index)} />
                              <AiOutlineEdit className='icon-check' title='Edit?' onClick={() => handleEdit(index,item)} />
                           </div>
                        </div>
                     );
                  }
                  
               })}
               {isCompleteScreen === true && completedTodos.map((item, index) => {
                  return (
                     <div className="todo-list-item" key={index}>
                        <div>
                           <h3>{item.title}</h3>
                           <p>{item.description}</p>
                           <p><small>Completed on: {item.completedOn}</small></p>
                        </div>
                        <div>
                           <MdDelete className='icon' title='Delete?' onClick={() => handleDeleteCompletedTodo(index)} />
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
}

export default App;




{/*import './App.css';
import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

function App() {

   const [isCompleteScreen, setIsCompleteSreen] = useState(false)
   const [allTodos, setTodos] = useState([])
   const [newTitle, setNewTitle] = useState("")
   const [newDescription, setNewDescription] = useState("")
   const [completedTodos, setCompletedTodos] = useState([])

   const handleAddTodo = () => {
      let newTodoItem = {
         title: newTitle,
         description: newDescription
      }

      let updatedTodoArr = [...allTodos];
      updatedTodoArr.push(newTodoItem);
      setTodos(updatedTodoArr);
      localStorage.setItem('todolist', JSON.stringify(updatedTodoArr))
   };

   const handleDeleteTodo = index => {
      let reducedTodo = [...allTodos];
      reducedTodo.splice(index);

      localStorage.setItem('todolist', JSON.stringify(reducedTodo))
      setTodos(reducedTodo)
   };

   
   const handleComplete = (index) => {
      let now = new Date();
      let dd = now.getDate();
      let mm = now.getMonth() + 1;
      let yyyy = now.getFullYear();
      let h = now.getHours();
      let m = now.getMinutes();
      let s = now.getSeconds();
      let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

      let filteredItem = {
         ...allTodos[index],
         completedOn: completedOn
      }

      let updatedCompletedArr = [...completedTodos];
      updatedCompletedArr.push(filteredItem);
      setCompletedTodos(updatedCompletedArr);
      handleDeleteTodo (index);
      localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
   };

   const handleDeleteCompletedTodo =(index)=>{
      let reducedTodo = [...completedTodos];
      reducedTodo.splice(index);

      localStorage.setItem('completedTodos', JSON.stringify(reducedTodo))
      setCompletedTodos(reducedTodo)
   };


   useEffect(() => {
      let savedTodo = JSON.parse(localStorage.getItem('todolist'));
      let savedCompletedTodo= JSON.parse(localStorage.getItem('completedTodos'));
      if (savedTodo) {
         setTodos(savedTodo);
      }
      if(savedCompletedTodo) {
         setCompletedTodos(savedCompletedTodo)
      }
   }, [])

   return (
      <div className="App">
         <h1>My Todos</h1>

         <div className='todo-wrapper'>
            <div className='todo-input'>
               <div className='todo-input-item'>
                  <label>Title</label>
                  <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="What's the task title?" />
               </div>
               <div className='todo-input-item'>
                  <label>Description</label>
                  <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="What's the task description?" />
               </div>
               <div className='todo-input-item'>
                  <button type="button" onClick={handleAddTodo} className="primaryBtn">Add</button>
               </div>
            </div>
            <div className="btn-area">
               <button type="button" className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={() => setIsCompleteSreen(false)}>ToDo</button>
               <button type="button" className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={() => setIsCompleteSreen(true)}>Completed</button>
            </div>
            <div className="todo-list">

               {isCompleteScreen === false && allTodos.map((item, index) => {
                  return (
                     <div className="todo-list-item" key={index}>
                        <div>
                           <h3>{item.title}</h3>
                           <p>{item.description}</p>
                        </div>
                        <div>
                           <MdDelete className='icon' title='Delete?' onClick={() => handleDeleteTodo(index)} />
                           <FaCheck className='icon-check' title='Complete?' onClick={() => handleComplete(index)} />
                        </div>
                     </div>
                  )
               })}

               {isCompleteScreen === true && completedTodos.map((item, index) => {
                  return (
                     <div className="todo-list-item" key={index}>
                        <div>
                           <h3>{item.title}</h3>
                           <p>{item.description}</p>
                           <p><small>Completed on: {item.completedOn}</small></p>
                        </div>
                        <div>
                           <MdDelete className='icon' title='Delete?' onClick={() => handleDeleteCompletedTodo(index)} />
                        </div>
                     </div>
                  )
               })}
            </div>
         </div>
      </div>
   );
}

export default App;*/}
