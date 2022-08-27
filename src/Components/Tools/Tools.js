import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import './Tools.scss'
import { StateToolContext } from '../Provider'
import { addWords } from '../CRUB/CRUB'


export function DisplayToolAdd ({visibility, lengthaudio}) {
    const context = useContext(StateToolContext)
    const wordForm = {
        "id": "",
        "word": "",
        "mean": "",
        "result": [],
        "audio": "",
        "date": "",

    }
    const [ words, setWords ] = useState(wordForm)
    const handleChangeWord = (event) => {
        const name = event.target.name
        const value = event.target.value
        setWords(() => {
            switch (name) {
                case "word":
                    return {
                        ...words,
                        word: value,
                    }
                case "mean":
                    return {
                        ...words,
                        mean: value,
                    }
                case "audio":
                    return {
                        ...words,
                        audio: value,
                    }
                default:
                    break;
            }
        })
        console.log(words)
    }
    const submitHanle = () => {
        // Set time 
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var min = String(today.getMinutes()).padStart(2, '0');
        var hour = String(today.getHours()).padStart(2, '0');
        
        today = `${hour}:${min} ${dd}/${mm}/${yyyy}`
        // Add data
        const addAllWords = async () => {
            const addedData = await addWords({...words, date: today})
            if(words) { 
                context.setAddedData(addedData)
                context.setStateTool('hidden')
            }
        }
        addAllWords()
        
        setWords(wordForm)
     }
    return (
        <div className={ `toolAdd ${context.stateTool}` }>
            <div className='container'>
                <h1 className='nameTool'>Add</h1>
                <div className='bodyTool'>
                    <div className='inputTool'>
                        <input 
                            type='text' 
                            placeholder='New word'
                            value={words.word}
                            style={{ flexGrow: 1}}
                            name='word'
                            onChange={handleChangeWord}
                        />
                        <input 
                            type='text' 
                            placeholder='Mean'
                            value={words.mean}
                            style={{ flexGrow: 1}}
                            name='mean'
                            onChange={handleChangeWord}
                        />
                        <input 
                            type='text' 
                            placeholder='Pronounce'
                            value={words.audio}
                            style={{ flexGrow: 1}}
                            name='audio'
                            onChange={handleChangeWord}
                        />
                         <div className='btnAdd'>
                            <FontAwesomeIcon icon={faHome}/>
                         </div>
                    </div>
                    <div>
                        <div className='btnSubmit' onClick={submitHanle} >
                            Submit
                        </div>
                        <div className='btnCancel' onClick={context.handleStateTool}>
                            Cancel
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
