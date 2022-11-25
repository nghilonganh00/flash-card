import classNames from 'classnames/bind'
import { Howl } from 'howler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus, faPlus, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect} from 'react'

import styles from './store.module.scss'
import { retrieveWords, removeWord } from '../../Components/CRUB/CRUB'
import { DisplayToolAdd } from '../../Components/Tools/index'
import Table from '../../Components/Layouts/Table';
const cx = classNames.bind(styles);

function Store() {
    const [ data, setData ] = useState([])
    const [ query, setQuery ] = useState('')
    const [addTheme, setAddTheme] = useState(false)
    const dataFitered = data.filter(word => word.word.toLowerCase().includes(query))
    const handleAddTheme = () => {
        setAddTheme(true)
    }
    const handleSingleRemove = (id) => {
        removeWord(id)
        
        
    }
    const soundPlay = (src) => {
        const sound = new Howl ({
            src, 
            html5: true,
        })
        sound.play();
    }
    const handleSpeaking = (audio) => {
        audio.play()
    }
    useEffect(() => {
        const getAllWords = async () => {
            const allWordsReverse = await retrieveWords()
            const allWords = allWordsReverse.reverse()
            if(allWords) setData(allWords)
        }
        getAllWords()
    },[])
    return (
        <div className={cx('wrapper')}>
            <div className={cx('navTop')}>
                <FontAwesomeIcon icon={faFileCirclePlus} onClick={handleAddTheme} className={cx('btn', 'btnAdd')}/>
                <form className={cx('search')} action="/search">
                    <button type="submit" data-e2e="search-button" className={cx('btn', 'btnSearch')}>
                        <svg width="24" height="24" viewBox="0 0 48 48" fill="var(--white)" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M22 10C15.3726 10 10 15.3726 10 22C10 28.6274 15.3726 34 22 34C28.6274 34 34 28.6274 34 22C34 15.3726 28.6274 10 22 10ZM6 22C6 13.1634 13.1634 6 22 6C30.8366 6 38 13.1634 38 22C38 25.6974 36.7458 29.1019 34.6397 31.8113L43.3809 40.5565C43.7712 40.947 43.7712 41.5801 43.3807 41.9705L41.9665 43.3847C41.5759 43.7753 40.9426 43.7752 40.5521 43.3846L31.8113 34.6397C29.1019 36.7458 25.6974 38 22 38C13.1634 38 6 30.8366 6 22Z">
                            </path>
                        </svg>
                    </button>
                    <input 
                        type="search" 
                        placeholder="Search" 
                        name="search" 
                        autocomplete="off" 
                        className={cx('input')}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </form>
                <span>All Words ({data.length})</span>
            </div>
            <Table 
                dataFitered={dataFitered}
                data={data}
                setData={setData}
            />
            <div className={cx('displayTool')}>
                <div className={cx('overlay')}></div> 
                <div className={cx('contanierTool')}>
                    {addTheme && <DisplayToolAdd  setData={setData} setAddTheme={setAddTheme} />}
                </div>
            </div>
        </div>
        )
        
}
export default Store