import React, { Component } from 'react';
import TagObj from './tagObj';
import { connect } from 'react-redux';
import { addTag } from '../actions/addTag';


class TagList extends Component {
    state = {
        noNewTag: this.props.noNewTag,
        input: ""
    }

    handleChange = (e) => {
        this.setState({
            input: e.target.value
        });
    }

    handleSubmit = (e) => {
        this.props.addTag(this.state.input);
        this.setState({
            input: ""
        });
    }

    render() {

        return (
            <div id="tagList">
                {this.state.noNewTag ? null : (
                    <div id="tag-input" className='tagObj'>
                        <input type="text" onChange={this.handleChange} value={this.state.input} placeholder="New Task" />
                        <span onClick={this.handleSubmit}>submit</span>
                    </div>
                )}


                {/* Below run through allTags in props and return TagObj, retun p if nothing*/}

                {this.props.allTags.length ? (
                    this.props.allTags.map((tag, index) => {
                        return (
                            <TagObj tag={tag}
                                checkTagState={this.props.checkTagState}
                                key={index} />
                        )
                    })
                ) : (
                        <p>No tags</p>
                    )}
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
    return {
        addTag: (tag) => { dispatch(addTag(tag)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagList);

