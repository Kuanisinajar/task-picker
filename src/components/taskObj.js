import React from 'react';

const TaskObj = ({ tasks }) => {

   const tagList = tasks.tags.map( tag => {
       return (
           // the key should be considered!
           <div key={Math.floor(Math.random() * 100 + Math.random() * 10)}>
               {tag}
           </div>
       )
   });

    return (
        <div className="taskObj" key={tasks.id}>
            <div className="content title">{tasks.task}</div>
            <div className="tags">{tagList}</div>
            <div className="description">{tasks.description}</div>
        </div>
    )
}

export default TaskObj;