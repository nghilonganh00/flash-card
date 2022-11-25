import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import styles from './Main.module.scss'
import { retrieveWords } from '../../Components/CRUB/CRUB'
import StartGameBtn from '../../Components/Button/StartGameBtn/index';
import BodyGame from '../../Components/Layouts/Main/BodyGame';

const cx = classNames.bind(styles)

export default function Main() {
    const [ stateGame, setStateGame ] = useState(false)
    const [ data, setData ] = useState([])
    const lengthData = data.length
    const [ indexQuestion, setIndexQuestion ] = useState()

    const handleStateGame = () => {
        setStateGame(!stateGame)
        setIndexQuestion(lengthData - Math.floor(Math.random() * (48)) - 1); 
    }

    useEffect(() => {
        const getAllWords = async () => {
            const allWords = await retrieveWords()
            if(allWords) setData(allWords)
        }
        getAllWords()
    }, [])   
    return (
        <div className={cx('main')}>
            {!stateGame && <StartGameBtn onClick={handleStateGame}> Button </StartGameBtn> }
            {stateGame && (<div className={cx('displayGame')}>
                <div className={cx('wrapper')}>
                    <div className={cx('headerGame')}>
                        <div className={cx('btnReturn')} onClick={handleStateGame}>
                            <FontAwesomeIcon icon={faArrowRightFromBracket} />
                        </div>
                    </div>
                    <BodyGame data={data[indexQuestion]} setIndexQuestion={setIndexQuestion} lengthData = {lengthData} /> 
                    <div className={cx('footGame')}>
                    </div>
                </div>
            </div>)}
            
        </div>
    )
}

