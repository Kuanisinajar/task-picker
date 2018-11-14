import React, { Component } from 'react';




class Navigation extends Component {

    handleSelect = (e, i) => {
        const areaLine = document.getElementsByClassName('area-line');
        const titleScroll = document.getElementById('title-scroll');
        const template = document.getElementById('template');
        for (let item of areaLine) {
            item.classList.remove('area-line-active');
        }
        e.target.classList.toggle('area-line-active');
        titleScroll.style.transform = "translate(0, -" + i * 100 + "%)"
        template.style.transform = "translate(-" + i * 100 + "%, 0)"
    }

    render() {
        return (
            <div id="nav">
                <div id="area-titles">
                    <div id="title-scroll">
                        <div className="title"><span>挑任務</span></div>
                        <div className="title"><span>當下任務</span></div>
                        <div className="title"><span>新增任務</span></div>
                        <div className="title"><span>任務清單</span></div>
                    </div>
                </div>
                <div id="area-paging">
                    <div className="area-line area-line-active" onClick={(e) => { this.handleSelect(e, 0) }}></div>
                    <div className="area-line" onClick={(e) => { this.handleSelect(e, 1) }}></div>
                    <div className="area-line" onClick={(e) => { this.handleSelect(e, 2) }}></div>
                    <div className="area-line" onClick={(e) => { this.handleSelect(e, 3) }}></div>
                </div>
            </div>
        )
    }
}


export default Navigation;