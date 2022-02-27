import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import '../style/ValidateStyle.css';


function ValidateAnswer(props) {

    const { t } = useTranslation();

    const { valid, chosenEx, solution } = props;

    const [attempt, setAttempt] = useState(0);

    const [tried, setTried] = useState(0);

    const [open, setOpen] = useState(false);

    const [solutionQ, setSolutionQ] = useState('');

    useEffect(() => {
        if (valid !== 'true' && valid !== '') {   
            setAttempt(attempt + 1);
        }
    }, [tried]);

    useEffect(()=>{
        setAttempt(0);
        setTried(0)
    }, [chosenEx])

    useEffect(()=>{
        var tmp = solution.substring(solution.indexOf(')')+1);
        var string = '.find(';
        if(tmp.includes(".project(")){ 
            var substrings = tmp.substring(tmp.indexOf('(')+1);
            var checkLength = substrings.split(')');
            if(checkLength.length === 4){
                var findParam = tmp.split('.find(')[1];
                var tmpParam = findParam.split(').project(');        
                var findParam = tmpParam[0];        
                string = string + findParam + ',';
                var projectParam = tmpParam[1];
                string = string + projectParam;                
            } else if(checkLength.length === 3){
                var findParam = checkLength[0];    
                string = string + findParam + ',';
                substrings = checkLength[1];        
                var projectParam = substrings.split('(')[1];
                string = string + projectParam + ')';
            }
            setSolutionQ(string);
        } else {            
            setSolutionQ(tmp);
        }
    }, [solution])


    const openModal = () =>{
        props.showSolution();
        setOpen(!open);
    }

    const checkButton = () => {
       props.checkAnswer(); 
       setTried(tried+1); 
    }


    return (
        <div className="margin-left">
            <div className="solution" style={{ paddingLeft: '0vw', paddingRight: '0vw' }}>
                <div style={{ marginTop: '2vh' }}>
                    <div style={{ position: 'relative', top: '1.7vh', display: 'inline-block' }}>{t('executeQuery')}</div>
                    <Button className="checkButton exec" onClick={props.executeQuery} style={{ float: 'right' }}> {t('exec')} </Button>
                </div>
                <div style={{ marginTop: '5vh' }} >

                    <div style={{ position: 'relative', top: '1.7vh', display: 'inline-block' }} className="solutionText">
                        {t('solution')}
                        {valid !== '' ?
                            (valid === 'true' ?
                                t('correct') :
                                (valid === 'false' ?
                                    t('wrong') : t('syntax')
                                )
                            ) : ''
                        }
                    </div>
                    <Button className="checkButton checkAnswer" onClick={() => {checkButton()}} style={{ float: 'right' }}> {t('check')} </Button>
                </div>
                {attempt >= 2 ?
                    <div style={{ marginTop: '5vh', textAlign: 'center' }}>
                        <Button className="checkButton exec" onClick={openModal}> {t('showSolution')} </Button>
                    </div> : null}
                <Modal isOpen={open}>
                    <ModalHeader className='text-center' toggle={() => setOpen(false)}>
                        {t('proposedSolution')} 
                    </ModalHeader>
                    <ModalBody>
                        {solutionQ}
                    </ModalBody>
                </Modal>
            </div>
        </div>
    )
}

export default ValidateAnswer;