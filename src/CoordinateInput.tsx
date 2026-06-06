import { type Dispatch, useState, useCallback, useEffect, useRef} from 'react';
import './assets/CoordinateInput.css';
import Message from './Message';
import axisImg from "./assets/axis.png"
import { FACTOR_TYPE } from './FACTOR_TYPE.ts';
import CoordinatePlane from './CoordinatePlane';
import SelectBox from './SelecBox';

type ValueProps = {
  value: {x: number, y:number},
  setValue: Dispatch<React.SetStateAction<{x:number, y:number}>>,
  currentXFactor: string,
  currentYFactor: string,
  setCurrentXFactor: Function,
  setCurrentYFactor: Function
};

function CoordinateInput(props: ValueProps) {

    const trackingAreaRef = useRef<HTMLInputElement>(null)
    
    const pointerSize = 20

    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        const value = calculateValueFromCoordinate(e.clientX, e.clientY)
        props.setValue({x: value.x, y: 100 - value.y})
    };

    const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
        if (isDragging) {
            const value = calculateValueFromCoordinate(e.clientX, e.clientY)
            props.setValue({x: value.x, y: 100 - value.y})
        }
        document.onselectstart = () => {
            return false
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    };

    const handleMouseLeave = () => {
        setIsDragging(false)
    }

    const calculateValueFromCoordinate = (x: number,y: number) => {
        if (trackingAreaRef.current) {
            const rect = trackingAreaRef.current.getBoundingClientRect()

            // Calculate coordinates relative to the tracking area
            var calculatedX = x - rect.x
            var calculatedY = y - rect.y

            // Keep the pointer inside the tracking area
            if (calculatedX < 0) {
                calculatedX = 0
            } else if (calculatedX > rect.width) {
                calculatedX = rect.width
            }

            if (calculatedY < 0) {
                calculatedY = 0
            } else if (calculatedY > rect.height) {
                calculatedY = rect.height
            }
            
            return {x: Math.round((calculatedX / rect.width) * 10)*10, y: Math.round((calculatedY / rect.height) * 10)*10}
        } else {
            return {x:50, y:50}
        }
    }

    return (
        <div id="coordinate_input">
            <div id="coordinate_plane_wrapper"
                    onMouseDown={handleMouseDown} 
                     onMouseMove={handleMouseMove} 
                     onMouseUp={handleMouseUp}
                     onMouseLeave={handleMouseLeave}
            >
                <CoordinatePlane/>
                <div id="tracking_area"
                     
                     ref={trackingAreaRef}>
                    <div 
                        id="pointer" 
                        style={{
                            height: `${pointerSize}px`,
                            width: `${pointerSize}px`,
                            top: `calc(${100 - props.value.y}% - ${pointerSize/2}px)`,
                            left: `calc(${props.value.x}% - ${pointerSize/2}px)`,
                        }}>
                    </div>
                </div>
                <div id="y_axis_label" className="axis_label">{props.currentYFactor}</div>
                <div id="x_axis_label" className="axis_label">{props.currentXFactor}</div>
            </div>
            <div id="select_area">
                <p className="axis_text">→ Horizontal Axis</p>
                <SelectBox className='horizontal' currentFactor={props.currentXFactor} setCurrentFactor={props.setCurrentXFactor}/>
                <p className="axis_text">↑ Vertical Axis</p>
                <SelectBox className="vertical" currentFactor={props.currentYFactor} setCurrentFactor={props.setCurrentYFactor}/>
            </div>
        </div>
    );
}

export default CoordinateInput;