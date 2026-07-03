import { useEffect, useState } from 'react';
import './App.css';
import './assets/FormatSelectBox.css';
import { FACTOR_TYPE } from './FACTOR_TYPE.ts';
import CoordinateInput from './CoordinateInput';

function App() {

    const [value, setValue] = useState({ x: 50, y: 50 });
    const [situation, setSituation] = useState("")
    const [prompt, setPrompt] = useState("")

    const [output, setOutput] = useState("")


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

    const request = async () => {
        if (situation != "" && prompt != "") {
            console.log("x factor : " + currentXFactor + ", y factor : " + currentYFactor)
            console.log("x value : " + value.x + ", y value : " + value.y)
            console.log("Situation: " + situation)
            console.log("Prompt: " + prompt)
        } else return

            const valueX = -1 + 2 * (value.x / 100)
            const valueY = -1 + 2 * (value.y / 100)
            const axisX = Object.keys(FACTOR_TYPE).find((key) => FACTOR_TYPE[key as keyof typeof FACTOR_TYPE] == currentXFactor)
            const axisY = Object.keys(FACTOR_TYPE).find((key) => FACTOR_TYPE[key as keyof typeof FACTOR_TYPE] == currentYFactor)
            let resultOutput = ""

            // let apiURL = "http://localhost:8888/api/generatee
            let apiURL = "http://localhost:8888/api/story_content.php?id=135"

            setOutput("...")

            try {
                // ローカルで起動しているNode.jsサーバーにリクエストを送信
                const response = await fetch(apiURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        situation,
                        prompt,
                        axisX,
                        axisY,
                        valueX, // JavaScript側で保持している現在の座標値
                        valueY
                    })
                });

                const data = await response.json();

                if (data.result) {
                    resultOutput= data.result;
                } else {
                    resultOutput = "エラーが発生しました: " + (data.error || "未知のエラー");
                }

            } catch (error) {
                console.error("通信エラー:", error);
                resultOutput = "サーバーとの通信に失敗しました。";
            } finally {
                setOutput(resultOutput)
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
                        <p id="output">{output}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;