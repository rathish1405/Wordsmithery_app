// eslint-disable-next-line no-unused-vars
import {createContext, useState, useEffect, children} from "react";
import useWindowSize from '../hooks/useWindowSize';
import useAxiosFetch from '../hooks/useAxiosFetch';
import api from '../api/postdata';
import {useNavigate } from "react-router-dom"
import { format } from "date-fns"


const DataContext = createContext({})


export const DataProvider = ({children})=>{
    const [posts, setPosts] = useState([])
    const [search, setSearch]=useState('')
    const [searchResults, setSearchResults]=useState([])
    const [postTitle, setPostTitle]=useState('')
    const [editTitle,setEditTitle]=useState('')
    const [postBody,setPostBody]=useState('')
    const [editBody,setEditBody]=useState('')
    const navigate=useNavigate()
    const {width}=useWindowSize()
    const {data, fetchError,isLoading} = useAxiosFetch('http://localhost:3500/postdata')
  
  
    useEffect(() =>{
      setPosts(data)
    },[data])
  
    useEffect(()=>{
      const filteredResults = posts.filter((post) =>
        ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase()));
  
      setSearchResults(filteredResults.reverse())
    },[posts,search])
  
    const handleSubmit = async(e)=>{
      e.preventDefault()
      const id=posts.length?posts[posts.length-1].id+1:1
      const datetime= format(new Date(), 'MMMM dd, yyyy pp')
      const newPost ={id,title:postTitle,datetime,body:postBody}
      try{
        const response = await api.post('/Postdata', newPost)
        const allposts=[...posts, response.data]
        setPosts(allposts)
        setPostTitle('')
        setPostBody('')
        navigate('/')
      }catch(err){
        console.log(`Error: ${err.message}`);
        
      }
    }
    const handleEdit = async(id)=>{
      const datetime= format(new Date(), 'MMMM dd, yyyy pp')
      const updatePost ={id,title:editTitle,datetime,body:editBody}
      try{
        const response = await api.put(`/postdata/${id}`,updatePost)
        setPosts(posts.map(post => post.id===id ? {...response.data}:post))
        setEditTitle('')
        setEditBody('')
        navigate('/')
      }catch(err){
        console.log(`Error: ${err.message}`);
      }
    }
  
    const handleDelete = async(id) =>{
      try{
        await api.delete(`/postdata/${id}`)
        const postsList=posts.filter(post => post.id !==id)
        setPosts(postsList)
        navigate('/')
      }catch(err){
        console.log(`Error: ${err.message}`);
        
      }
    }
    return(
        <DataContext.Provider value={{
            width, search,setSearch,searchResults,fetchError,isLoading,handleSubmit, postTitle, setPostTitle, postBody, setPostBody,posts,handleEdit,editBody,setEditBody,editTitle,setEditTitle,handleDelete
        }}>
            {children}
        </DataContext.Provider>
    )
}


export default DataContext