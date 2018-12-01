import React, { Component } from 'react';
//import TagObj from './tagObj';
import { connect } from 'react-redux';
import { addTask } from '../actions/manageTask';
import TagList from './tagList';

class TaskForm extends Component {

    state = {
        task: "",
        description: "",
        tags: [],
        ownerId: this.props.auth.uid,
    }

    checkTagState = (isActive, tag) => {
        let tags = [...this.state.tags];
        if (isActive) {
            tags.push(tag);
            this.setState({
                tags: tags
            });
        } else {
            let newTags = tags.filter(words => words !== tag);
            this.setState({
                tags: newTags
            });
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
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
        this.props.addTask(this.state, this.props.auth.uid)
        this.setState({
            task: "",
            description: "",
            tags: [],
        });
    }

    render() {
        return (
            <div>
                <form id="taskForm" onSubmit={this.handleSubmit}>
                    <input type="text" id='task' onChange={this.handleChange} value={this.state.task} autoComplete="off" placeholder='任務' />
                    <textarea type="text" id='description' onChange={this.handleChange} value={this.state.description} autoComplete="off" placeholder='說明' />
                    {/* <input type="text" id='tags' onChange={this.handleTags} value={this.state.tags.join(' ')} autoComplete="off" /> */}
                    <TagList checkTagState={this.checkTagState} 
                             noNewTag={false} />
                    <div className="formButtonArea">
                        <button form="taskForm">新增</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allTags: state.localStore.allTags,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (task, userId) => { dispatch(addTask(task, userId)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm); 