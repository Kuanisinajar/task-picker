import React, { Component } from 'react';
import TagList from './tagList';
import { connect } from 'react-redux';
import { deleteTask, editTask } from '../actions/manageTask';
import editImg from '../edit.svg';
import flagImg from '../flag.svg';
import CustomScroll from 'react-custom-scroll';


class TaskObj extends Component {
    state = {
        task: {
            task: this.props.task.task,
            description: this.props.task.description,
            tags: this.props.task.tags,
            id: this.props.task.id
        },
        editing: false,
        showTagList: false
    }

    toggleEditMode = () => {
        this.setState({
            editing: !this.state.editing
        });
    }

    toggleTagList = () => {
        this.setState({
            showTagList: !this.state.showTagList
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
        this.props.editTask(this.state.task, this.props.userId);
        this.setState({
            editing: !this.state.editing
        });
    }

    checkTagState = (isActive, tag) => {
        let newTags = [...this.state.task.tags];
        if (isActive) {
            let shouldAdd = true;
            for (let item of newTags) {
                if (tag === item) {
                    shouldAdd = false;
                }
            }
            if (shouldAdd) {
                newTags.push(tag);
            }
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
                <textarea type="text" name='description' onChange={this.handleChange} defaultValue={this.state.task.description} autoComplete="off" />
                {/* <label htmlFor="">已選取</label>
                <input type="text" name='tags' onChange={this.handleTags} value={this.state.task.tags.join(' ')} autoComplete="off" /> */}
                <TagList checkTagState={this.checkTagState} noNewTag={false} editingTaskTags={this.state.task.tags} />
                <div className="formButtonArea">
                    <button>儲存</button>
                    <button onClick={() => { this.props.deleteTask(this.props.task.id) }} name='delete'>刪除</button>
                </div>
            </form>
        ) : (
                <div className='taskObjWrapper'>

                    <div className='taskObjUpper'>
                        <div className="title">{this.props.task.task}</div>
                    </div>
                    <div className="taskObjLower">
                        <div className="description">{this.props.task.description}</div>
                    </div>
                    <div className={this.state.showTagList ? "taskObjTagList" : "taskObjTagList tagListHidden"}>
                        <CustomScroll heightRelativeToParent="100%">
                        <div className="tags">
                            {tagList}
                        </div>
                        </CustomScroll>
                    </div>

                    {/* <button className='closeBtn' onClick={() => { this.props.deleteTask(this.props.task.id) }}>
                        <img src={closeImg} />
                    </button> */}
                    { this.props.disableEdit ? 
                    null : 
                    <button className='editBtn' onClick={this.toggleEditMode}>
                        <img src={editImg} alt='' />
                    </button>
                     }
                     { this.props.task.tags ? 
                    <button className="toggleTagsBtn" onClick={this.toggleTagList}>
                        <img src={flagImg} alt='' />
                    </button> 
                    : null
                     }
                </div>
            );


        return (
            <div className={this.state.editing ? "taskEditForm" : "taskObj"}
                key={this.props.task.id}>
                {content}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.firebase.auth.uid
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteTask: (taskId) => { dispatch(deleteTask(taskId)) },
        editTask: (task, userId) => { dispatch(editTask(task, userId)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskObj);