import React, { Component } from 'react';
import TagList from './tagList';
import { connect } from 'react-redux';
import { deleteTask, editTask } from '../actions/manageTask';
import editImg from '../edit_img.svg';


class TaskObj extends Component {
    state = {
        task: {
            task: this.props.task.task,
            description: this.props.task.description,
            tags: this.props.task.tags,
            id: this.props.task.id
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
                ...this.state.task,
                [e.target.name]: e.target.value
            }
        });
    }

    handleTags = (e) => {
        let tags = e.target.value.split(' ');
        this.setState({
            task: {
                ...this.state.task,
                tags: tags
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.editTask(this.state.task);
        this.setState({
            editing: !this.state.editing
        });
    }

    checkTagState = (isActive, tag) => {
        let newTags = [...this.state.task.tags]
        if (isActive) {
            newTags.push(tag);
            this.setState({
                task: {
                    ...this.state.task,
                    tags: newTags
                }
            });
        } else {
            newTags = newTags.filter(original => original !== tag);
            this.setState({
                task: {
                    ...this.state.task,
                    tags: newTags
                }
            });
        }
    }

    render() {
        console.log(this.props.task.tags);
        const tagList = this.props.task.tags && this.props.task.tags.map((tag, index) => {
            return (
                <div key={index} className="tagObj">
                    {tag}
                </div>
            )
        });

        const content = this.state.editing ? (
            <form onSubmit={this.handleSubmit}>
                <input type="text" name='task' onChange={this.handleChange} defaultValue={this.state.task.task} autoComplete="off" />
                <input type="text" name='description' onChange={this.handleChange} defaultValue={this.state.task.description} autoComplete="off" />
                <input type="text" name='tags' onChange={this.handleTags} value={this.state.task.tags.join(' ')} autoComplete="off" />
                <TagList checkTagState={this.checkTagState} noNewTag={false} />
                <button>submit</button>
            </form>
        ) : (
                <div className='taskObjWrapper'>
                    <button className='closeBtn' onClick={() => { this.props.deleteTask(this.props.task.id) }}>
                        <div className='bar'></div>
                    </button>
                    <button className='editBtn' onClick={this.toggleEditMode}>
                        <img src={editImg} />
                    </button>
                    <div className="title">{this.props.task.task}</div>
                    <div className="description">{this.props.task.description}</div>
                    <div className="tags">{tagList}</div>

                </div>
            );

        return (
            <div className="taskObj" key={this.props.task.id}>
                {content}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.uid
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteTask: (taskId) => { dispatch(deleteTask(taskId)) },
        editTask: (task) => { dispatch(editTask(task)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskObj);