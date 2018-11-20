import React, { Component } from 'react';
import TagObj from './tagObj';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { addTag } from '../actions/addTag';


class TagList extends Component {
    state = {
        noNewTag: this.props.noNewTag,
        tag: {
            tag: "",
            ownerId: this.props.auth.uid
        }

    }

    handleChange = (e) => {
        this.setState({
            tag: {
                ...this.state.tag,
                tag: e.target.value   
            }
        });
    }

    handleSubmit = (e) => {
        this.props.addTag(this.state.tag);
        this.setState({
            tag: {
                ...this.state.tag,
                tag: ""   
            }
        });
    }

    render() {
        const newTagForm = this.state.noNewTag ? null : (
            <div id="tag-input" className='tagObj'>
                <input type="text" onChange={this.handleChange} value={this.state.tag.tag} placeholder="New Task" />
                <span onClick={this.handleSubmit}>submit</span>
            </div>
        )

        const userContent = this.props.userTags && this.props.userTags ? (
            this.props.userTags.map((tag, index) => {
                return (
                    <TagObj tag={tag.tag}
                        checkTagState={this.props.checkTagState}
                        key={index} />
                )
            })
        ) : (
                <p>No tags</p>
            );

        const defaultContent = this.props.defaultTags && this.props.defaultTags ? (
            this.props.defaultTags.map((tag, index) => {
                return (
                    <TagObj tag={tag.tag}
                        checkTagState={this.props.checkTagState}
                        key={index} />
                )
            })
        ) : (
                <p>No tags</p>
            );

        return (
            <div id="tagList">
                {newTagForm}
                {this.props.auth.uid ? userContent : defaultContent}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    const userTags = state.firestore.ordered.userTags && state.firestore.ordered.userTags.filter(tag => tag.ownerId === state.firebase.auth.uid);
    return {
        userTags: userTags,
        defaultTags: state.firestore.ordered.defaultTags,
        auth: state.firebase.auth,
        firestore: state.firestore
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTag: (tag) => { dispatch(addTag(tag)) }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'defaultTags' }, { collection: "userTags" }
    ])
)(TagList);

