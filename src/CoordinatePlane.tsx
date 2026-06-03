import axisImg from "./assets/axis.png"
import {useEffect, useRef} from 'react';

function CoordinatePlane() {

    const planesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (planesRef.current) {

            const rect = planesRef.current.getBoundingClientRect()

            var htmlText = ""
            for (var i = 0; i < 11; i++) {
                for (var j = 0; j < 11; j++) {

                    if (i == 5 || j == 5) {
                        continue
                    }

                    const x = (rect.width / 10) * j - 2
                    const y = (rect.height / 10) * i - 2

                    const div = `<div class="dot_mark" style="top: ${y}px; left: ${x}px;"></div>`
                    htmlText += div
                }
            }
            planesRef.current.innerHTML = htmlText
        } 
    })


    return (
        <div id="coordinate_plane" style={{ backgroundImage: `url(${axisImg})` }} ref={planesRef}></div>
    );
}

export default CoordinatePlane;