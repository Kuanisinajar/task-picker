import React, { Component } from 'react';
import TagList from './tagList';
import TaskObj from './taskObj';
import { connect } from 'react-redux';
import { setCurrentTask } from '../actions/setCurrentTask';

class Picker extends Component {
    state = {
        selectedTags: [],
        pickedTask: null,
        animationPerformed: false
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
        // Matching with selected tags
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
        // if (options.length === 0) {
        //     this.props.setCurrentTask(allTasks[Math.floor(Math.random() * allTasks.length)]);
        // } else {
        //     this.props.setCurrentTask(options[Math.floor(Math.random() * options.length)]);
        // }

        // for animation
        const taskDeck = document.getElementsByClassName('deckWrapper')[0];
        if (taskDeck && !this.state.animationPerformed) {
            taskDeck.classList.toggle('isAnimating');
        }

        // pick and set the task
        const tasks = [...this.props.tasks];
        this.setState({
            pickedTask: tasks[Math.floor(Math.random() * tasks.length)]
        });
    }

    animationEnd = () => {
        const taskDeck = document.getElementsByClassName('deckWrapper')[0];
        const taskCard = document.getElementsByClassName('transparent')[0];
        if (taskCard) {
            taskCard.classList.toggle('transparent');
        }
        if (taskDeck) {
            taskDeck.classList.toggle('isAnimating');
        }
        this.setState({
            animationPerformed: true
        })
    }

    render() {
        return (
            <div id="picker">
                <TagList checkTagState={this.checkTagState} noNewTag={true} />
                <ul className="deck">
                    <li>
                        <div className="deckWrapper">
                            <div className="pickerCard"></div>
                            <div className={this.state.pickedTask && this.state.pickedTask ? "pickerCard animatedCard" : "pickerCard"}
                                onAnimationEnd={this.animationEnd}>
                                {this.state.pickedTask && this.state.pickedTask ? <TaskObj task={this.state.pickedTask} /> : null}
                            </div>
                            <div className="pickerCard"></div>
                            <div id='buttonWrapper'>
                                <button id='pickerButton' onClick={this.pickTask}>
                                    {this.state.animationPerformed ? "再一次" : "挑任務"}
                                </button>
                                {this.state.animationPerformed ? (
                                    <button id='excuteBtn'>執行</button>
                                ) : null}
                            </div>
                            <div id='tagSelectionBtn'>選取任務範圍</div>
                        </div>
                    </li>
                    <li className={this.animationPerformed ? "null" : "transparent"}>
                        {this.state.pickedTask && this.state.pickedTask ? <TaskObj task={this.state.pickedTask} /> : null}
                    </li>
                </ul>
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