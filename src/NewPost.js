import React, { useContext } from 'react'
import DataContext from './context/DataContext'

const NewPost = () => {
  const{handleSubmit, postTitle, setPostTitle, postBody, setPostBody}= useContext(DataContext)
  return (
    <main className="NewPost" onSubmit={handleSubmit}>
      <h2>New Post</h2>
      <form className='newPostForm'>
        <label htmlFor="postTitle">Title:</label>
        <input 
            id='postTitle'
            type="text"
            required
            value={postTitle}
            onChange={(e)=> setPostTitle(e.target.value)} 
        />
        <label htmlFor="postBody">Post:</label>
        <textarea 
            name="" 
            id="postBody"
            required
            value={postBody}
            onChange={(e)=>setPostBody(e.target.value)}
        />
        <button type="submit" onSubmit={handleSubmit}>Submit</button>
      </form>
    </main>
  )
}

export default NewPost