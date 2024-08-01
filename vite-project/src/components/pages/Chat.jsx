import React, { Fragment, useEffect, useRef, useState } from "react";
import SingleMessge from "./SingleMessge";
import { useNavigate, useParams}from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../Actions/authActions";
import { useSocketContext } from "../../Context/SocketPrivider";
import { GetAllCoversationMessage, sendSingleMessage } from "../../Actions/messageActions";
// import { io } from "socket.io-client";
// import useListneMessages from "../../hooks/useListneMessages";


const Chat = () => {

const {onlineUsers=[],socket}=useSocketContext()


  const [user,setUser]=useState('')
  // const [messages, setMessages] = useState([]);
  // const [receivedMessages, setReceivedMessages] = useState([]);
  const [inputMessage,setinputMessage]=useState('')
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const {id}=useParams()
  const srlOp =useRef(null)
  const [refresh,setrefresh]=useState(true)
  const inputRef=useRef(null)

  const {
    user:loginuser,
    users = [],
    loading = false,
    isAuthenticatedUser = false,
    error = null,
  } = useSelector((state) => state.authState);
  const {
    conversation={},
  } = useSelector((state) => state.messageState);
 const autoScroll=()=>{
  if (srlOp.current) {
    srlOp.current.scrollTo(0, srlOp.current.scrollHeight);
  }
 }
  let isonline =onlineUsers.some(onliner=>onliner.toString()===id.toString())
  
  useEffect(()=>{
     if(users.length>=0){
      const result = users.filter(user => user._id.toString() === id.toString());
      setUser(result);

     }else{
      dispatch(getUsers)
      
     }
  },[users,dispatch])

  useEffect(()=>{
    
    dispatch(GetAllCoversationMessage(id))
  },[dispatch])

  const handleSubmit=(e)=>{
    e.preventDefault()

    if(!inputMessage||!id)return 

// console.log(loginuser);
    socket?.emit('sendMessage',{message:inputMessage,id,senderId:loginuser._id,users})
    setrefresh(!refresh)

    dispatch(sendSingleMessage(inputMessage,id))
  //  console.log('dis');
    setinputMessage('')

  }

  
  useEffect(() => {
    const handleConnect = () => {
      // console.log(socket);
      console.log('Connected with Socket ID:', socket.id);
    };
    
    const handleNewMessage = (mess) => {
      console.log('Dispatching new message');
      dispatch(GetAllCoversationMessage(id));
      setTimeout(() => {   
        if (srlOp.current) {
          srlOp.current.scrollTo(0, srlOp.current.scrollHeight);
        }
      }, 200);
    };
  
    if (socket) {
      // console.log('socket');
      socket.on('connect', handleConnect);
      socket.on('newMessage', handleNewMessage);
    }
  
    // Automatically scroll to bottom
    autoScroll();
  
    // Focus input field if it exists
    if (inputRef.current) {
      inputRef.current.focus();
    }
  
    // Cleanup event listeners on unmount or dependency change
    return () => {
      if (socket) {
        socket.off('connect', handleConnect);
        socket.off('newMessage', handleNewMessage);
      }
    };
  }, [socket, refresh]);
  

useEffect(() => {
 autoScroll()
}, [refresh,conversation]);
  return (
    <Fragment>
     {!loading&& <div>
        <header className="d-flex justify-content-start p-1  bg-primary chat-height position-sticky top-0">
          <div className="d-flex justify-content-center align-items-center">
            <i onClick={()=>navigate('/')} className="fa-solid fa-arrow-left fs-1 "></i>
            <figure className=" d-flex justify-content-center align-items-center chat-profile p-0  ">
              <img
                src={user[0]?.avatar?user[0].avatar:'/unknown.png'}
                alt="cake profile"
                className="img"
              />
            </figure>
          </div>
          <div className="row align-itmes-center p-1 ms-2 mt-1">
            <h4>{user[0]?.name}</h4>
            <p>{isonline ?"Online":"Offline"}</p>
          </div>
        </header>
        <div className="p-3 container  w-100 " ref={srlOp} style={{ overflowY: 'auto' ,maxHeight:'785px'}}>
          {conversation?.participants ?
          conversation?.messages.map((convo,index)=><SingleMessge message={convo} key={index  

          } id={id}/>):<p>Start conversation</p>
          }
          
         
          
        </div>
      </div>}
      
        <form action="#" onSubmit={handleSubmit} className=" form-gruop  w-100 d-flex justify-content-evenly mb-1  position-fixed bottom-0">
        <input type="text" name="" ref={inputRef} value={inputMessage} onChange={e=>setinputMessage(e.target.value)} id="chatInput" className="form-control p-3" placeholder="Message" />
        <label htmlFor="chatInput" hidden  className="form-label">chatInput </label>
        </form>

    </Fragment>
  );
};

export default Chat;
