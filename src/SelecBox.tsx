import {useEffect, useRef} from 'react';
import './assets/SelectBox.css';

function SelectBox({className}: {className?: string}) {



    return (
        <div className={`select_box ${className}`}>
            <select name="category">
                <option value="">Happiness</option>
                <option value="living">Frankness</option>
            </select>
            <div className="select_box_arrow"></div>
        </div>
    );
}

export default SelectBox;