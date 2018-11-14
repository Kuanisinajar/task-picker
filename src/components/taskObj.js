import React, { Component } from 'react';
import TagList from './tagList';
import { connect } from 'react-redux';
import { deleteTask, editTask } from '../actions/manageTask';

class TaskObj extends Component {
    state = {
        task: {
            task: this.props.tasks.task,
            description: this.props.tasks.description,
            tags: this.props.tasks.tags
        },
        editing: false
    }

    toggleEditMode = () => {
        this.setState({
            editing: !this.state.editing
        });
    }

    handleChange = (e) => {
        this.setState({
            task: {
                [e.target.name]: e.target.value
            }  
        });
    }

    handleTags = (e) => {
        let tags = e.target.value.split(' ');
        this.setState({
            tags: tags
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.editTask(this.state.task, this.props.tasks.id);
        this.setState({
            editing: !this.state.editing
        });
    }

    render() {
        const tagList = this.props.tasks.tags.map((tag, index) => {
            return (
                <div key={index}>
                    {tag}
                </div>
            )
        });

        const content = this.state.editing ? (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name='task' onChange={this.handleChange} defaultValue={this.state.task.task} autoComplete="off" />
                <input type="text" name='description' onChange={this.handleChange} defaultValue={this.state.task.description} autoComplete="off" />
                <input type="text" name='tags' onChange={this.handleTags} value={this.state.task.tags.join(' ')} autoComplete="off" />
                <TagList checkTagState={this.checkTagState} noNewTag={false}/>
                <button>submit</button>
            </form>
        ) : (
                <div className='taskObjWrapper'>
                    <div className="content title">{this.props.tasks.task}</div>
                    <div className="tags">{tagList}</div>
                    <div className="description">{this.props.tasks.description}</div>
                    <button id='deleteBtn' onClick={() => { this.props.deleteTask(this.props.tasks.id) }}>Delete</button>
                    <button id='editBtn' onClick={this.toggleEditMode}>Edit</button>
                </div>
            );

        return (
            <div className="taskObj" key={this.props.tasks.id}>
                {content}
            </div>
        )
    }
}

// const TaskObj = ({ tasks, deleteTask }) => {

//     const tagList = tasks.tags.map(tag => {
//         return (
//             // the key should be considered!
//             <div key={Math.floor(Math.random() * 100 + Math.random() * 10)}>
//                 {tag}
//             </div>
//         )
//     });

//     return (
//         <div className="taskObj" key={tasks.id}>
//             <div className="content title">{tasks.task}</div>
//             <div className="tags">{tagList}</div>
//             <div className="description">{tasks.description}</div>
//             <button onClick={() => { deleteTask(tasks.id) }}>Delete</button>
//         </div>
//     )
// }

const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteTask: (taskId) => { dispatch(deleteTask(taskId)) },
        editTask: (task, id) => { dispatch(editTask(task, id)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskObj);