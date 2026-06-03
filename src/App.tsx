import { useState } from 'react';
import './App.css';
import Message from './Message';
import CoordinateInput from './CoordinateInput';

function App() {

    const [value, setValue] = useState({ x: 50, y: 50 });

    return (
        <div>
            <div id="logo">C3 Project</div>
            <CoordinateInput value={value} setValue={setValue}></CoordinateInput>
            <div id="value_area">
                <div className='value_wrapper'>
                    <div id="x_value_label" className='value_label'>X Coordinate</div>
                    <div id="x_value" className='value'>{value.x}%</div>
                </div>
                <div className='value_wrapper'>
                    <div id="y_value_label" className='value_label'>Y Coordinate</div>
                    <div id="y_value" className='value'>{value.y}%</div>
                </div>
            </div>
            {/* <Message text="Hello React"></Message> */}
        </div>
    );
}

export default App;