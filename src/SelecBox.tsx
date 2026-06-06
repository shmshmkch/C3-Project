import {useEffect, useRef} from 'react';
import './assets/SelectBox.css';
import { FACTOR_TYPE } from './FACTOR_TYPE.ts';

function SelectBox({className, currentFactor, setCurrentFactor}: {className?: string, currentFactor: string, setCurrentFactor: Function}) {

    const selectRef = useRef<HTMLSelectElement>(null)

    let ignore = false
    console.log(currentFactor)
    useEffect(() => {
        // Add all factor options to <select>
        for (const [key, value] of Object.entries(FACTOR_TYPE)) {
            if (selectRef.current && !ignore) {
                const option = document.createElement('option'); 
                option.text = value; // e.g. "Happiness"
                option.value = value;    
                if (value == currentFactor) {
                    option.selected = true
                }            
                selectRef.current.appendChild(option)
            }
        }
        return () => {
            if (selectRef.current) {
                selectRef.current.value = currentFactor.toString()
            }
            ignore = true
        }
    }, []);

    const handleChange = (e) => {
        setCurrentFactor(e.target.value)
    }
    

    return (
        <div className={`select_box ${className}`}>
            <select name="factor" ref={selectRef} defaultValue={currentFactor.toString()} value={currentFactor.toString()} onChange={handleChange}>
                
            </select>
            <div className="select_box_arrow"></div>
        </div>
    );
}

export default SelectBox;