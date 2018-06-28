import React from 'react'



const Bookmark = (props) => {
    let { title, url, remove, _id, onClick } = props
    return(
        <div>
            <p>
                {title}
                <span> <a target='_blank' href={'http://'+ url}>{url} </a></span>
                <button onClick={() => remove(_id)}>Delete</button>

            </p>
            <a onClick={() => onClick(_id)}>Edit</a>
            
        </div>
    )
}

export default Bookmark
