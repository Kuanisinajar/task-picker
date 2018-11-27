import React, { Component } from 'react';
import CustomScroll from 'react-custom-scroll';

class ScrollTest extends Component {
    render() {
        return (
            <div id='testing'>
                <div className="area">
                    <CustomScroll heightRelativeToParent="100%">
                        <div className="blocks"></div>
                        <div className="blocks"></div>
                        <div className="blocks"></div>
                        <div className="blocks"></div>
                        <div className="blocks"></div>
                        <div className="blocks"></div>
                        <div className="blocks"></div>
                    </CustomScroll>
                </div>
            </div>



        )
    }
}

export default ScrollTest