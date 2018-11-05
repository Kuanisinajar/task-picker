import React, { Component } from 'react';

class TagObj extends Component {

    state = {
        tag: this.props.tag,
        active: false
    }
    
    handleClick = (e) => {
        this.setState({
            active: !this.state.active
        }, () => {
            this.props.checkTagState(this.state.active, this.props.tag)
        });

    }

    render() {
        return (
            <div className={this.state.active ? "tagObj tagActive" : "tagObj"} onClick={this.handleClick}>
                {this.props.tag}
            </div>
        )
    }

}

export default TagObj;