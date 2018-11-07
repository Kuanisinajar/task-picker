import React from 'react';
import TagObj from './tagObj'
import { connect } from 'react-redux';

const TagList = ({ allTags, checkTagState }) => {

    const items = allTags.length ? (
        allTags.map((tag, index) => {
            return (
                <TagObj tag={tag}
                    checkTagState={checkTagState}
                    key={index} />
            )
        })
    ) : (
            <p>No tags</p>
        );

    return (
        <div id="tagList">
            {items}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        allTags: state.allTags
    }
}

export default connect(mapStateToProps)(TagList);

