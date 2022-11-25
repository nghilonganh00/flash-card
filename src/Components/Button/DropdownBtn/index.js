import { useState, useRef, useEffect} from 'react';
import classNames from "classnames/bind";

import { updateDataHandle } from '../../CRUB/CRUB'
import styles from './DropdownBtn.module.scss'

const cx = classNames.bind(styles)
function DropdownBtn({ wordInfo, data, autoUpdate = false, value = false }) {
    const [isDropdown, setIsDropdown] = useState(false);
    const [currentType, setCurrentType] = useState(wordInfo.type)
    const dropdownRef = useRef();
    useEffect(() => {
        const handler = (e) => {
            if(!dropdownRef.current.contains(e.target)) {
                setIsDropdown(false);
            }
        }
        document.addEventListener("mousedown", handler)
        return () => {
            document.removeEventListener("mousedown", handler)
        }
    },[])
    useEffect(() => {
        setCurrentType(wordInfo.type)
    },[data])
    const toggleDropdown = (e) => {
        setIsDropdown(!isDropdown);
        e.stopPropagation()
    }
    // Update type of word
   
    const updateTypeOfWord = (e, type) => {
        setCurrentType(type);
        toggleDropdown(e);
        value && value(type)
        const updateWord = {
            ...wordInfo,
            type: type,
        }
        autoUpdate && updateDataHandle(updateWord);
    }
    
    return (
        <div className={cx('wrapper')} ref={dropdownRef} >
            <button className={cx('dropdownBtn')} onClick={(e) => (toggleDropdown(e))}>
                {currentType}
            </button>
            { isDropdown && <div className={cx('dropdownContainer') } >
                <div className={cx('dropdownItem')} onClick={(e) => (updateTypeOfWord(e, 'Listening'))}>Listening</div>
                <div className={cx('dropdownItem')} onClick={(e) => (updateTypeOfWord(e, 'Reading'))}>Reading</div>
            </div>}
        </div>
    )
}
export default DropdownBtn;