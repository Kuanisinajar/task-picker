import React, { Component } from 'react';
import TagList from './tagList';
import TaskObj from './taskObj';
import { connect } from 'react-redux';
import { setCurrentTask } from '../actions/setCurrentTask';
import dropUp from '../dropUp.svg';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class Picker extends Component {
    state = {
        selectedTags: [],
        showTagSelectionPannel: false,
        pickedTask: null,
        animationPerformed: false,
    }

    returnToDefaultStyle = () => {
        const li2 = document.querySelector('li:nth-child(2)');
        li2.classList.add('transparent');
        this.setState({
            pickedTask: null,
            animationPerformed: false
        });
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.loggedIn !== this.props.loggedIn) {
            this.returnToDefaultStyle();
        }

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

    toggleTagSelectionPannel = () => {
        this.setState({
            showTagSelectionPannel: !this.state.showTagSelectionPannel
        });
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

    execute = () => {
        this.props.setCurrentTask(this.state.pickedTask);
        // redirect
        const areaLine = document.getElementsByClassName('area-line');
        const titleScroll = document.getElementById('title-scroll');
        const template = document.getElementById('template');
        for (let item of areaLine) {
            item.classList.remove('area-line-active');
        }
        areaLine[1].classList.toggle('area-line-active');
        titleScroll.style.transform = "translate(0, -100%)";
        template.style.transform = "translate(-100%, 0)";

        // return to initial state
        // const li2 = document.querySelector('li:nth-child(2)');
        // li2.classList.add('transparent');
        // this.setState({
        //     pickedTask: null,
        //     animationPerformed: false
        // });
        this.returnToDefaultStyle();
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
                                    <button id='excuteBtn'
                                        onClick={this.execute}>
                                        執行
                                    </button>
                                ) : null}
                            </div>

                        </div>
                    </li>
                    <li className={this.animationPerformed ? "null" : "transparent"}>
                        {this.state.pickedTask && this.state.pickedTask ? <TaskObj task={this.state.pickedTask} /> : null}
                    </li>
                    <div id='tagSelectionBtn'
                        onClick={this.toggleTagSelectionPannel}>
                        選取任務範圍
                        <img src={dropUp} alt="" />
                    </div>
                </ul>

                {this.state.showTagSelectionPannel ?
                    <div className='tagListWrapper'>
                        <TagList checkTagState={this.checkTagState} noNewTag={true} />
                    </div>
                    : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.firebase.auth.uid ? true : false,
        tasks: state.firebase.auth.uid ? state.localStore.tasks : state.firestore.ordered.defaultTasks,
        allTags: state.localStore.allTags,
        currentTask: state.localStore.currentTask
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentTask: (task) => { dispatch(setCurrentTask(task)) }
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Picker);

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'defaultTasks' }
    ])
)(Picker);