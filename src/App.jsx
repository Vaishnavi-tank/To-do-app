import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";


function App() {
    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState([])
    const [showFinished, setshowFinished] = useState(true)
    const savetoLs=(params) => {
      localStorage.setItem("todos",JSON.stringify(todos))
    }
    useEffect(() => {
        let todoString=localStorage.getItem("todos");
        if(todoString){

            let todos= JSON.parse(localStorage.getItem("todos"));
            setTodos(todos)
        }
    }, [])
    const togglefunction=(e) => {
      setshowFinished(!showFinished)
    }
    const handleEdit = (e,id) => {
       let t=todos.filter(i=>i.id===id)
       setTodo(t[0].todo)
       let newTodos=todos.filter(item=>{
        return item.id!== id
      });
      setTodos(newTodos)
      savetoLs();
    }
    const handleDelete = (e,id) => {
            let newTodos=todos.filter(item=>{
                return item.id!== id
              });
              setTodos(newTodos)
              savetoLs();
    }
    const handleAdd = () => {
        // https://www.npmjs.com/package/uuid
        setTodos([...todos, {id:uuidv4(), todo, isCompleted: false }])
        setTodo("")
        savetoLs();
    }
    const handleChange = (e) => {
        setTodo(e.target.value)
    }
    const handleCheckbox=(e)=>{
       let id= e.target.name
       console.log(`the id is ${id}`)
       let index=todos.findIndex(item=>{
        return item.id === id;
       })
       let newTodos=[...todos]
       newTodos[index].isCompleted=!newTodos[index].isCompleted;
       setTodos(newTodos)
       savetoLs();
    }
    return (
        <>
        {}
            <Navbar />
            <div className=' mx-3 md:container md:mx-auto NP my-5 rounded-xl  p-5 bg-blue-200 text-blue-700 min-h-[80vh] md:h-full md:w-full'>
                <div className="addTodo flex flex-col gap-5 border-2 border-blue-700 p-4">
                    <h1 className="text-lg font-bold text-center ">Add a TODO</h1>
                    <input onChange={handleChange} value={todo} type="text" className='w-full h-8 rounded-md' />
                    <button onClick={handleAdd} disabled={todo.length<3} className=' bg-blue-100 border-2 disabled:bg-blue-100 px-3 py-1 rounded-xl text-sm border-white  font-bold text  m-auto'>Save</button>
                </div>
                <div className="show text-center m-4">
                <input onChange={togglefunction} type="checkbox" checked={showFinished} id=""className='' />Show All  
                </div>
                <div className='border-2 border-blue-900 p-4'>     
                <h1 className='text-xl p-5 font-bold text-center'>Your Todo</h1>
                <div className="todos">
                    {todos.length==0 && <div className='m-5 text-center'>No todos to display</div>}
                    {todos.map(item =>{
                        return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex my-3 justify-between ">
                            <input onChange={handleCheckbox} type="checkbox" checked={todo.isCompleted} name={item.id} id="" />
                            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
                            <div className="btn flex h-full">
                                <button onClick={(e)=>handleEdit(e,item.id)} className='mx-5 bg-blue-100 border-2 px-3 py-1 rounded-xl text-sm border-white font-bold hover:border-4'><CiEdit /></button>
                                <button onClick={(e)=>handleDelete(e,item.id)} className=' bg-blue-100 border-2 px-3 py-1 rounded-xl text-sm border-white font-bold hover:border-4 transition-all duration-75' ><AiOutlineDelete />
                                </button>
                            </div>
                        </div>
                    })}
                </div>
                </div>
            </div>
        </>
    )
}
export default App
