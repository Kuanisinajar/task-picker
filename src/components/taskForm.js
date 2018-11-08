import React, { Component } from 'react';
//import TagObj from './tagObj';
import { connect } from 'react-redux';
import { addTask } from '../actions/addTask';
import TagList from './tagList';

class TaskForm extends Component {

    state = {
        task: "",
        description: "",
        tags: []
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
        this.props.addTask(this.state);
        this.setState({
            task: "",
            description: "",
            tags: []
        });
    }

    // tagList = this.props.allTags.map((tag, index )=> {
    //     return (
    //         // the key should be considered!
    //         <TagObj tag={tag} 
    //                 checkTagState={this.checkTagState} 
    //                 key={index} />
    //     )
    // });

    render() {
        return (
            <div>
                <form id="taskForm" onSubmit={this.handleSubmit}>
                    <label htmlFor="task">Task: </label>
                    <input type="text" id='task' onChange={this.handleChange} value={this.state.task} autoComplete="off" form="taskForm" />
                    <label htmlFor="description"> Description</label>
                    <input type="text" id='description' onChange={this.handleChange} value={this.state.description} autoComplete="off" form="taskForm" />
                    <label htmlFor="tags">Tags: </label>
                    <input type="text" id='tags' onChange={this.handleTags} value={this.state.tags.join(' ')} autoComplete="off" form="taskForm" />
                    <TagList checkTagState={this.checkTagState} noNewTag={false}/>
                    <button form="taskForm">submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allTags: state.allTags
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addTask: (task) => { dispatch(addTask(task)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm); 