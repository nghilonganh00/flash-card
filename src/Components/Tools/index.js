import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faXmark, } from '@fortawesome/free-solid-svg-icons'
import { useState, useRef, useEffect } from 'react'
import styles from './Tools.module.scss'
import { addWords } from '../CRUB/CRUB'
import DropdownBtn from '../Button/DropdownBtn'

const cx = classNames.bind(styles);
export function DisplayToolAdd ({length, setData, setAddTheme}){ 
    const wordForm = {
        "id": "",
        "word": "",
        "mean": [],
        "type": "",
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
                        mean: [value],
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
    }
    const [typeOfWord, setTypeOfWord] = useState('Unknown');
    const handleTypeOfWord = (type) => {
        setTypeOfWord(type);
    }

    const handleSubmit = () => {
        //Remove whitespace
        var wordTrim = words.word.trim();
        // Set time 
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var min = String(today.getMinutes()).padStart(2, '0');
        var hour = String(today.getHours()).padStart(2, '0'); 
        today = `${hour}:${min} ${dd}/${mm}/${yyyy}`

        // Set pronouce audio
        var audio = `https://dict.youdao.com/dictvoice?audio=${words.word.trim()}&type=2`
        // Add data
        const addAllWords = async () => {
            const addedData = await addWords({...words, word: wordTrim, type: typeOfWord, audio: audio, date: today})
            setData(data => [
                addedData,
                ...data
            ])
        }
        addAllWords()
        setWords(wordForm)   
    }
    const containRef = useRef();
    useEffect(() => {
        const handleCancel = (e) => {
            if(!containRef.current.contains(e.target)) {
                setAddTheme(false)
            }
        }
        document.addEventListener("mousedown", handleCancel);

        return () => {
            document.removeEventListener("mousedown", handleCancel)
        }
    })
    return (
        <div className={cx('wrapper')}>
            <div className={cx('overlay')}></div>
            <div className={cx('contain')} ref={containRef}>
                <div className={cx('header')}>
                    <h1 className={cx('title')}>Add words</h1>
                    <div className={cx('btn', 'btn-cancel')} onClick={() => {setAddTheme(false)}}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                </div>
                <div className={cx('body')}>
                    <span>Word: </span>
                    <input 
                        type='text' 
                        placeholder='New word'
                        value={words.word}
                        name='word'
                        onChange={handleChangeWord}
                    />
                    <span>Mean: </span>
                    <input 
                        type='text' 
                        placeholder='Mean'
                        value={words.mean}
                        name='mean'
                        onChange={handleChangeWord}
                    />
                    <DropdownBtn wordInfo={words} value={handleTypeOfWord} />
                </div>
                <div className={cx('footer')}>
                    <div className={cx('btn-submit')} onClick={handleSubmit}>
                        Submit
                    </div>
                </div>
            </div>
        </div>
    )
}
