import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Howl } from 'howler';
import { faHeadphonesSimple } from '@fortawesome/free-solid-svg-icons';
import { Button, Grid, TextField, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from './BodyGame.module.scss';
import { updateDataHandle } from '../../../CRUB/CRUB'

const cx = classNames.bind(styles);

function BodyGame({ data, setIndexQuestion, lengthData }) {
    // Sound
    const soundPlay = (src) => {
        const sound = new Howl ({
            src, 
            html5: true,
            preload: true,
        })
        sound.play();
    }
    
    //Answer
    const [ wordAnswer, setWordAnswer ] = useState("")
    const [ meanAnswer, setMeanAnswer ] = useState("")
    
    // Submit
    
    const nextQuestion = () => {
        setIndexQuestion(lengthData - Math.floor(Math.random() * (48)) - 1); 
    }
    const handleKeyDown = (event, callback) => {
        if (event.key === 'Enter' && event.shiftKey === false) {
            event.preventDefault();
            callback();
        }
    };
    const handleSubmit = () => {
        let updateWord = {
            ...data
        };
        if(data.type === 'Listening' && wordAnswer === data.word && meanAnswer === data.mean ) {
            updateWord = {
                ...updateWord,
                result: [...updateWord.result, "correct"]
            }
            updateDataHandle(updateWord);
            
        } else if(data.type === 'Reading' && meanAnswer === data.mean) {
            updateWord = {
                ...updateWord,
                result: [...updateWord.result, "correct"]
            }
            updateDataHandle(updateWord);
            alert("true")
        } else {
            updateWord = {
                ...updateWord,
                result: [...updateWord.result, "incorrect"]
            }
            updateDataHandle(updateWord);
            alert("false")
        }
        setWordAnswer("");
        setMeanAnswer("");
        nextQuestion();
    }
    const handleSkip = (e) => {
        nextQuestion();
    } 

    return ( 
        <div className={cx('bodyGame')} style={{ height: 32, display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center', paddingTop: 100 }}>
            <Typography variant="h5" mb={8}>
                {
                    {   
                        'Unknown' : <span style={{ height: 60}}>{data.word}</span>,
                        'Reading' : <span style={{ height: 60}}>{data.word}</span>,
                        'Listening' : <FontAwesomeIcon icon={faHeadphonesSimple} onClick={(e) => soundPlay(data.audio)} />
                    }[data.type]
                }
            </Typography> 
            <Grid container width={400} spacing={2}>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit} onKeyDown={e => {handleKeyDown(e, handleSubmit)}}>
                        <Grid item xs={12} mb={2}>
                            <TextField
                                id="outlined-textarea"
                                label="Word"
                                placeholder="Enter your answer"
                                fullWidth
                                multiline
                                variant="filled"
                                value={wordAnswer}
                                onChange={(e) => setWordAnswer(e.target.value)}
                                // color='warning'
                            />
                            {/* <span style={{ position: "absolute", marginLeft: 20, lineHeight: 4 }}> {data.mean}</span> */}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-textarea"
                                label="Mean"
                                placeholder="Enter your answer"
                                multiline
                                fullWidth
                                variant="filled"
                                // color='success'
                                value={meanAnswer}
                                onChange={(e) => setMeanAnswer(e.target.value)}
    
                            />
                        </Grid>
                    </form>
                </Grid>
                <Grid item xs={6}>
                    <Button 
                        type="submit" 
                        variant="outlined" 
                        fullWidth 
                        size='large'
                        color="primary" 
                        endIcon={<ArrowForwardIosIcon />}
                        onClick={handleSkip}
                        >
                        Skip
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        fullWidth 
                        size="large"
                        color="primary" 
                        endIcon={<CheckIcon />}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </div>
     );
}
export default BodyGame;
