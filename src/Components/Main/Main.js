import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Howl } from 'howler';
import { faArrowRightFromBracket, faHeadphonesSimple } from '@fortawesome/free-solid-svg-icons';
import styles from './Main.module.scss'
import { retrieveWords, updateDataHandle } from '../CRUB/CRUB'

const cx = classNames.bind(styles)

export default function Main() {
    const [ stateGame, setStateGame ] = useState("hidden")
    const [ data, setData ] = useState([])
    const lenghtData = data.length
    const [ indexQuestion, setIndexQuestion ] = useState(0)
    const soundPlay = (src) => {
        const sound = new Howl ({
            src, 
            html5: true,
        })
        sound.play();
    }
    const [ wordAnswer, setWordAnswer ] = useState("")
    const [ meanAnswer, setMeanAnswer ] = useState("")

    const handleStateGame = () => {
        setStateGame(stateGame === "hidden" ? "visible" : "hidden")
    }
    const nextQuestion = () => {
        indexQuestion !== lenghtData - 1 ? setIndexQuestion((index) => index + 1) : setIndexQuestion(0)
    }
    const handleSubmit = () => {
        let updateWord = {
            ...data[indexQuestion]
        };
        if(wordAnswer === data[indexQuestion].word && meanAnswer === data[indexQuestion].mean) {
            updateWord = {
                ...updateWord,
                result: [...updateWord.result, "correct"]
            }
            alert("true")
        } else {
            alert("false")
        }

        updateDataHandle(updateWord);
        nextQuestion();
    }
    const handleSkip = () => {
        
        nextQuestion();
    }
    
    
    
    useEffect(() => {
        const getAllWords = async () => {
            const allWords = await retrieveWords()
            if(allWords) setData(allWords)
        }
        getAllWords()
    }, [])    
    console.log(wordAnswer)
    return (
        <div className={cx('main')}>
            {stateGame === "hidden" && <button className={cx('btnStart')} onClick={handleStateGame}>Start</button>}

            {stateGame === "visible" && (<div className={cx('displayGame')}>
                <div className={cx('container')}>
                    <div className={cx('headerGame')}>
                        <span className={cx('oridinalQuestion')}>
                            {`${indexQuestion + 1} / ${lenghtData} `}
                        </span>
                        <div className={cx('btnReturn')} onClick={handleStateGame}>
                            <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        </div>
                    </div>
                    <div className={cx('bodyGame')}>
                        <div className={cx('btnSpeaking')} >
                            <FontAwesomeIcon icon={faHeadphonesSimple} onClick={(e) => soundPlay(data[indexQuestion].audio)} />
                        </div>
                        <input 
                            type='text'
                            placeholder='Word answer'
                            value={wordAnswer}
                            name='wordAnswer'
                            onChange={(e) => setWordAnswer(e.target.value)}
                        />
                        <input  
                            type='text'
                            placeholder='Mean answer'
                            value={meanAnswer}
                            name='wordAnswer'
                            onChange={(e) => setMeanAnswer(e.target.value)}
                        />
                        <button onClick={handleSubmit}>Submit</button>
                        <button onClick={handleSkip}>Skip</button>
                    </div>
                    <div className={cx('footGame')}></div>
                </div>
            </div>)}
            
        </div>
    )
}

