import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faXmark, } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import styles from './Tools.module.scss'
import { StateToolContext } from '../Provider'
import { addWords } from '../CRUB/CRUB'

const cx = classNames.bind(styles);
export function DisplayToolAdd ({length, setData, setAddTheme}) {
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
    const handleSubmit = () => {
        //Remove whitespace
        setWords(() => { 
            var wordTrim = words.word.trim();
            var meanTrim = words.mean.trim();
            return {
                ...words,
                word: wordTrim,
                mean: meanTrim,
            }
        })
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
        //Mew Data
        const newData = {...words, date: today, audio: audio}
        // Add data
        const addAllWords = async () => {
            const addedData = await addWords({...words, date: today, audio: audio})
            setData(data => [
                addedData,
                ...data
            ])
        }
        addAllWords()
        setWords(wordForm)   
    }
    const handleCancel = () => {
        setAddTheme(false)
        console.log("cancel")
    } 
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('overlay')}></div>
            <div className={cx('contain')}>
                <div className={cx('header')}>
                    <h1 className={cx('title')}>Add words</h1>
                    <div className={cx('btn', 'btn-cancel')} onClick={handleCancel}>
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
                        <div className='btnAdd'>
                        <FontAwesomeIcon icon={faHome}/>
                        </div>
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
