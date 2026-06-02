import { useState, useCallback, useEffect, useRef} from 'react';
import './assets/CoordinateInput.css';
import Message from './Message';
import axisImg from "./assets/axis.png"

function CoordinateInput() {

    const trackingAreaRef = useRef<HTMLInputElement>(null)
    
    const pointerSize = 20

    const [isDragging, setIsDragging] = useState(false);
    const [pointerPosition, setPointerPosition] = useState({ x: 10, y: 100 });

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        setPointerPosition(convertCoordinate(e.clientX, e.clientY))
    };

    const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
        if (isDragging) {
            setPointerPosition(convertCoordinate(e.clientX, e.clientY))
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

    const convertCoordinate = (x: number,y: number) => {
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
            

            return {x: calculatedX, y: calculatedY}
        } else {
            return {x:0, y:0}
        }
    }

    return (
        <div id="coordinate_input">
            <div id="coordinate_plane_wrapper">
                <div id="coordinate_plane" style={{ backgroundImage: `url(${axisImg})` }}></div>
                <div id="tracking_area"
                     onMouseDown={handleMouseDown} 
                     onMouseMove={handleMouseMove} 
                     onMouseUp={handleMouseUp}
                     onMouseLeave={handleMouseLeave}
                     ref={trackingAreaRef}>
                    <div 
                        id="pointer" 
                        style={{
                            transform: `translateX(${pointerPosition.x - pointerSize/2}px) translateY(${pointerPosition.y - pointerSize/2}px)`,
                            height: `${pointerSize}px`,
                            width: `${pointerSize}px`
                        }}>
                    </div>
                </div>
                <div id="y_axis_label" className="axis_label">Y Coordinate</div>
                <div id="x_axis_label" className="axis_label">X Coordinate</div>
            </div>
        </div>
    );
}

export default CoordinateInput;