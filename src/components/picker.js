import React, { Component } from 'react';
import TagList from './tagList';
import { connect } from 'react-redux';
import { setCurrentTask } from '../actions/setCurrentTask';

class Picker extends Component {
    state = {
        selectedTags: []
    }

    checkTagState = (isActive, tag) => {
        let newTags = [...this.state.selectedTags]
        if (isActive) {
            newTags.push(tag);
            this.setState({
                selectedTags: newTags
            });
        } else {
            newTags = newTags.filter(original => original !== tag);
            this.setState({
                selectedTags: newTags
            });
        }
    }

    pickTask = () => {
        let allTasks = [...this.props.tasks];
        let options = [];
        for (let task of allTasks) {
            let match = false;
            for (let taskTag of task.tags) {
                for (let sTag of this.state.selectedTags) {
                    if (taskTag === sTag) {
                        match = true;
                    }
                }
            }
            if (match) {
                options.push(task);
            }
        }
        if (options.length === 0) {
            this.props.setCurrentTask(allTasks[Math.floor(Math.random() * allTasks.length)]);
        } else {
            this.props.setCurrentTask(options[Math.floor(Math.random() * options.length)]);
        }
    }

    render() {
        return (
            <div id="picker">
                <div className='wrapper'>
                    <div className='tagWrapper'>
                        <TagList checkTagState={this.checkTagState} noNewTag={true} />
                    </div>
                    <div className='buttonWrapper'>
                        <button onClick={this.pickTask}><div className="circle"><span>挑！</span></div></button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.localStore.tasks,
        allTags: state.localStore.allTags,
        currentTask: state.localStore.currentTask
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentTask: (task) => { dispatch(setCurrentTask(task)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Picker);