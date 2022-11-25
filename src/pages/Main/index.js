import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Howl } from 'howler';
import { faArrowRightFromBracket, faHeadphonesSimple } from '@fortawesome/free-solid-svg-icons';
import styles from './Main.module.scss'
import { retrieveWords, updateDataHandle } from '../../Components/CRUB/CRUB'
import Button from '../../Components/Button';
const cx = classNames.bind(styles)

export default function Main() {
    const [ stateGame, setStateGame ] = useState("hidden")
    const [ data, setData ] = useState([])
    const lengthData = data.length
    const [ indexQuestion, setIndexQuestion ] = useState()
    const soundPlay = (src) => {
        const sound = new Howl ({
            src, 
            html5: true,
            preload: true,
        })
        sound.play();
    }
    const [ wordAnswer, setWordAnswer ] = useState("")
    const [ meanAnswer, setMeanAnswer ] = useState("")

    const handleStateGame = () => {
        setStateGame(stateGame === "hidden" ? "visible" : "hidden")
        setIndexQuestion(lengthData - Math.floor(Math.random() * (48)) - 1); 
    }
    const nextQuestion = () => {
       setIndexQuestion(lengthData - Math.floor(Math.random() * (48)) - 1); 
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let updateWord = {
            ...data[indexQuestion]
        };
        if(wordAnswer === data[indexQuestion].word) {
            updateWord = {
                ...updateWord,
                result: [...updateWord.result, "correct"]
            }
            alert("true")
        } else {
            updateWord = {
                ...updateWord,
                result: [...updateWord.result, "incorrect"]
            }
            alert("false: " + data[indexQuestion].word + data[indexQuestion].mean)
        }

        updateDataHandle(updateWord);
        nextQuestion();
        setWordAnswer("");
    }
    const handleSkip = (e) => {
        
        nextQuestion();
    }
    useEffect(() => {
        const getAllWords = async () => {
            const allWords = await retrieveWords()
            if(allWords) setData(allWords)
        }
        getAllWords()

    }, [])   
    console.log(indexQuestion)
    return (
        <div className={cx('main')}>
            {stateGame === "hidden" && <Button onClick={handleStateGame}> Button </Button> }

            {stateGame === "visible" && (<div className={cx('displayGame')}>
                <div className={cx('wrapper')}>
                    <div className={cx('headerGame')}>
                        
                        <div className={cx('btnReturn')} onClick={handleStateGame}>
                            <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        </div>
                    </div>
                    <div className={cx('bodyGame')}>
                        {data[indexQuestion].mean === "" && <div className={cx('btnSpeaking')}>
                            <FontAwesomeIcon icon={faHeadphonesSimple} onClick={(e) => soundPlay(data[indexQuestion].audio)} />
                        </div>}
                        {data[indexQuestion].mean !== "" && <span style={{ minHeight: 120}}>{data[indexQuestion].mean}</span>}
                        <form onSubmit={handleSubmit}>
                            <div className={cx('box')}>
                                <div className={cx('container-1')}>
                                    <input 
                                        type='search'
                                        className={cx('search')}
                                        placeholder='Word answer'
                                        spellCheck={false}
                                        autoComplete="off"
                                        autoFocus
                                        value={wordAnswer}
                                        name='wordAnswer'
                                        onChange={(e) => setWordAnswer(e.target.value)}
                                    />
                                </div>
                            </div>         
                            <div className={cx('box')}>
                                <div className={cx('container-1')}>
                                        <input  
                                            type='search'
                                            className={cx('search')}
                                            placeholder='Mean answer'
                                            spellCheck={false}
                                            value={meanAnswer}
                                            name='wordAnswer'
                                            onChange={(e) => setMeanAnswer(e.target.value)}
                                        />
                                </div>
                            </div>
                            
                            <button onClick={handleSubmit}>Submit</button>
                            <button onClick={handleSkip}>Skip</button>
                        </form>
                    </div>
                    <div className={cx('footGame')}></div>
                </div>
            </div>)}
            
        </div>
    )
}

