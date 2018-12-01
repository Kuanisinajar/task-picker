import React, { Component } from 'react';
import TagObj from './tagObj';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { addTag } from '../actions/addTag';
import CustomScroll from 'react-custom-scroll';
import addIcon from '../add.svg';


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
        this.props.addTag(this.state.tag, this.props.auth.uid);
        this.setState({
            tag: {
                ...this.state.tag,
                tag: ""
            }
        });
    }

    matchWithEditingTaskTag = (tag, editingTaskTags) => {
        let match = false;
        for (let editingTag of editingTaskTags) {
            if (tag === editingTag) {
                match = true;
            }
        }
        return match;
    }

    render() {
        const newTagForm = this.state.noNewTag ? null : (
            <div className="tagInput tagObj">
                <input type="text" onChange={this.handleChange} value={this.state.tag.tag} placeholder="新標籤" />
                <span onClick={this.handleSubmit}><img src={addIcon} alt=""/></span>
            </div>
        )

        const content = this.props.tags && this.props.tags.length ? (
            this.props.tags.map((tag, index) => {
                const active = this.props.editingTaskTags && this.matchWithEditingTaskTag(tag.tag, this.props.editingTaskTags);
                return (
                    <TagObj tag={tag.tag}
                        checkTagState={this.props.checkTagState}
                        key={index}
                        active={active} />
                )
            })
        ) : null;


        return (
            <div className="tagList">
                <CustomScroll heightRelativeToParent="100%">
                    {newTagForm}
                    {content}
                </CustomScroll>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    // const userTags = state.firestore.ordered.userTags && state.firestore.ordered.userTags.filter(tag => tag.ownerId === state.firebase.auth.uid);
    return {
        tags: state.localStore.allTags,
        defaultTags: state.firestore.ordered.defaultTags,
        auth: state.firebase.auth,
        firestore: state.firestore
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTag: (tag, userId) => { dispatch(addTag(tag, userId)) }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'defaultTags' }, { collection: "userTags" }
    ])
)(TagList);

