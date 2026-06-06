import {useEffect, useRef} from 'react';
import './assets/SelectBox.css';
import { FACTOR_TYPE } from './FACTOR_TYPE.ts';

function FactorSelectBox({className, currentFactor, setCurrentFactor, unavailableFactor}: {className?: string, currentFactor: string, setCurrentFactor: Function, unavailableFactor: string}) {

    const selectRef = useRef<HTMLSelectElement>(null)


    useEffect(() => {
        // Remove all options every relender
        if (selectRef.current) {
              selectRef.current.innerHTML = "";
        }
        // Add all available factor options to <select>
        for (const value of Object.values(FACTOR_TYPE)) {
            if (selectRef.current  && value != unavailableFactor) {
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
        }
    }, [currentFactor, unavailableFactor]);

    const handleChange = (e) => {
        setCurrentFactor(e.target.value)
    }
    

    return (
        <div className={`select_box ${className}`}>
            <select name="factor" ref={selectRef} onChange={handleChange}>
                
            </select>
            <div className="select_box_arrow"></div>
        </div>
    );
}

export default FactorSelectBox;