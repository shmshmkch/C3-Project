import { useState } from 'react';
import './App.css';
import { FACTOR_TYPE } from './FACTOR_TYPE.ts';
import CoordinateInput from './CoordinateInput';

function App() {

    const [value, setValue] = useState({ x: 50, y: 50 });
    // const [currentFactors, setCurrentFactors] = useState({x: FACTOR_TYPE.HAPPINESS, y: FACTOR_TYPE.FRANKNESS})
    const [currentXFactor, setCurrentXFactor] = useState(FACTOR_TYPE.HAPPINESS)
    const [currentYFactor, setCurrentYFactor] = useState(FACTOR_TYPE.LENGTH)

    return (
        <div>
            <div id="logo">C3 Project</div>
            <CoordinateInput value={value} setValue={setValue} currentXFactor={currentXFactor} currentYFactor={currentYFactor} setCurrentXFactor={setCurrentXFactor} setCurrentYFactor={setCurrentYFactor}/>
            {/* <div id="value_area">
                <div className='value_wrapper'>
                    <div id="x_value_label" className='value_label'>{currentXFactor}</div>
                    <div id="x_value" className='value'>{value.x}%</div>
                </div>
                <div className='value_wrapper'>
                    <div id="y_value_label" className='value_label'>{currentYFactor}</div>
                    <div id="y_value" className='value'>{value.y}%</div>
                </div>
            </div> */}
            {/* <Message text="Hello React"></Message> */}
        </div>
    );
}

export default App;