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

    const [currentXFactor, setCurrentXFactor] = useState(FACTOR_TYPE.formal)
    const [currentYFactor, setCurrentYFactor] = useState(FACTOR_TYPE.emotion)

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

            let apiURL = "http://localhost:8888/api/generate"

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
                resultOutput = "Failed to communicate with the server";
            } finally {
                setOutput(resultOutput)
            }
    }


    return (
        <>
            <div id="main_container">
                <div id="left_pane">
                    <div id="logo">C3 Project</div>
                </div>
                <div id="chat_pane">
                    <div id="situation_config" className='config_pane'>
                        <p>Situation</p>
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
                    <CoordinateInput value={value} setValue={setValue} currentXFactor={currentXFactor} currentYFactor={currentYFactor} setCurrentXFactor={setCurrentXFactor} setCurrentYFactor={setCurrentYFactor} request={request}/>
                    <div id="button_area">
                        <button className="btn-bordered">Reset</button>
                        <button className="btn-solid">Generate</button>
                    </div>
                </div>
                <div className="link_line"></div>
                <div className="output_pane"></div>
            </div>
        </>
    );
}

export default App;