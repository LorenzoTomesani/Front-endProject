import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next'; 
import {Button} from 'reactstrap';
import '../style/ValidateStyle.css';


function ValidateAnswer(props) {
    
    const {t} = useTranslation();

    const {valid} = props;

    return (
        <div className="margin-left" style={{marginTop: '5vh', marginBottom: '5vh'}}>
            <div className="solution">{t('solution')} {valid !== ''? (valid==='true'?  t('correct'):  t('wrong')) : ''}</div> 

             <Button className="checkButton" onClick={props.checkAnswer}> {t('check')} </Button>
        </div>
    )
}

export default ValidateAnswer;