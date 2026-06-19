import { useEffect, useState } from 'react';
import './App.css';
import './assets/FormatSelectBox.css';
import { FACTOR_TYPE } from './FACTOR_TYPE.ts';
import CoordinateInput from './CoordinateInput';

function App() {

    const [value, setValue] = useState({ x: 50, y: 50 });
    const [situation, setSituation] = useState("")
    const [prompt, setPrompt] = useState("")


    // const [currentFactors, setCurrentFactors] = useState({x: FACTOR_TYPE.HAPPINESS, y: FACTOR_TYPE.FRANKNESS})
    const [currentXFactor, setCurrentXFactor] = useState(FACTOR_TYPE.HAPPINESS)
    const [currentYFactor, setCurrentYFactor] = useState(FACTOR_TYPE.LENGTH)

    // Requst when Enter key is pressed
    const handleInputKeyDown = (e: 
    React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;
        e.preventDefault();
        request()
    }

    useEffect(() => {
        request()
    },[currentXFactor, currentYFactor])

    const request = () => {
        if (situation != "" && prompt != "") {
            console.log("x factor : " + currentXFactor + ", y factor : " + currentYFactor)
            console.log("x value : " + value.x + ", y value : " + value.y)
            console.log("Situation: " + situation)
            console.log("Prompt: " + prompt)
        }
    }


    return (
        <>
            <div id="main_container">
                <div id="left_pane">
                    <div id="logo">C3 Project</div>
                    <CoordinateInput value={value} setValue={setValue} currentXFactor={currentXFactor} currentYFactor={currentYFactor} setCurrentXFactor={setCurrentXFactor} setCurrentYFactor={setCurrentYFactor} request={request}/>
                </div>
                <div id="chat_pane">
                    <div id="situation_config" className='config_pane'>
                        <p>Situation</p>
                        {/* <div className="format_select_box">
                            <select name="format">
                                <option>E-Mail</option>
                                <option>Letter</option>
                                <option>Report</option>
                                <option>Lyric</option>
                            </select>
                             <div className="format_select_box_arrow"></div>
                        </div> */}
                        <div id="situation_area">
                            <input type="text" id="situation_input" placeholder='Type Situation...' onChange={(e) => setSituation(e.target.value)} onKeyDown={handleInputKeyDown}></input>
                        </div>
                    </div>
                    <div id="prompt_config" className='config_pane'>
                        <p>Prompt</p>
                        <div id="prompt_area">
                            <input type="text" id="prompt_input" placeholder='Type Prompt...' onChange={(e) => setPrompt(e.target.value)} onKeyDown={handleInputKeyDown}></input>
                        </div>
                    </div>
                    <div>
                        <p id="output">親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。なぜそんな無闇をしたと聞く人があるかも知れぬ。別段深い理由でもない。新築の二階から首を出していたら、同級生の一人が冗談に、いくら威張っても、そこから飛び降りる事は出来まい。弱虫やーい。と囃したからである。小使に負ぶさって帰って来た時、おやじが大きな眼をして二階ぐらいから飛び降りて腰を抜かす奴があるかと云ったから、この次は抜かさずに飛んで見せますと答えた。（青空文庫より）</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;