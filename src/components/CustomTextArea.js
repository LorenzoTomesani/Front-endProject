import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../style/TextAreaStyle.css';
import ValidateAnswer from './ValidateAnswer'; 

function CustomTextArea(props) {

    const {t} = useTranslation();
    
    const spaces = 4;
    
    const [text, setText] = useState({value: ".find({})", caret: -1, target: null});

    const [isValid, setValid] = useState(props.valid);
    
    const [solution, setSolution] = useState(props.solution)

    useEffect(()=>{
        setText({value: ".find({})", caret: -1, target: null});
        setValid('');
        setSolution('');
    }, [props.chosenEx])

    useEffect(()=>{
        setValid(props.valid);
    }, [props.valid])

    useEffect(()=>{
        setSolution(props.solution);
    }, [props.solution])

    useEffect(() => {

        if(text.caret >= 0){

            text.target.setSelectionRange(text.caret + spaces, text.caret + spaces);

        }

    }, [text]);

    const handleTab = (e) => {

        let content = e.target.value;
        let caret   = e.target.selectionStart;

        
        if(e.key === 'Tab'){

            e.preventDefault();

            let newText = content.substring(0, caret) + ' '.repeat(spaces) + content.substring(caret);

            setText({value: newText, caret: caret, target: e.target});
            
        } 
    }

    const handleText = (e) => setText({value: e.target.value, caret: -1, target: e.target});

    const checkAnswer = () => {
        props.checkAnswer(text.value)
    }

    const executeQuery = () => {
        props.executeQuery(text.value)
    }

    const showSolution = () => {
        props.showSolution()
    }

    return(
        <>
        <textarea
            onChange  = {handleText}
            onKeyDown = {handleTab}
            value     = {text.value}
            className='textareaCustom margin-left'
        />
        
         <ValidateAnswer  checkAnswer={checkAnswer} 
         valid={isValid} executeQuery={executeQuery} showSolution={showSolution} solution={solution}
         chosenEx={props.chosenEx}/> 
        </>
    )

}

export default CustomTextArea;