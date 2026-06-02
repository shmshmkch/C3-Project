import { useState } from 'react';
import './App.css';
import Message from './Message';
import CoordinateInput from './CoordinateInput';

function App() {

    const [msg, setMsg] = useState("Hello World")

    return (
        <div>
            <div id="logo">C3 Project</div>
            <CoordinateInput></CoordinateInput>
            {/* <Message text="Hello React"></Message> */}
        </div>
    );
}

export default App;