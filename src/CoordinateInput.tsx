import { useState } from 'react';
import './assets/CoordinateInput.css';
import Message from './Message';
import axisImg from "./assets/axis.png"

function CoordinateInput() {

    const [msg, setMsg] = useState("Input")

    return (
        <div id="coordinate_input">
            <div id="coordinate_plane">
                <div id="y_axis_label" className="axis_label">Y Coordinate</div>
                <div id="x_axis_label" className="axis_label">X Coordinate</div>
                <div id="pointer"></div>
                <img src={axisImg} id="axis_img"></img>
            </div>
        </div>
    );
}

export default CoordinateInput;