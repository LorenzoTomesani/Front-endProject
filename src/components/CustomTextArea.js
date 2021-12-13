import React, { useEffect, useState } from 'react';
import '../style/TextAreaStyle.css';
import ValidateAnswer from './ValidateAnswer'; 

function CustomTextArea(props) {

    const spaces = 4;
    const [text, setText] = useState({value: '', caret: -1, target: null});

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

        } else if(e.key==='"'){
            e.preventDefault();
            alert('Per le stringhe usa il singolo apice!');
        }
    }

    const handleText = (e) => setText({value: e.target.value, caret: -1, target: e.target});

    const checkAnswer = () => {
        props.checkAnswer(text.value)
    }

    return(
        <>
        <textarea
            onChange  = {handleText}
            onKeyDown = {handleTab}
            value     = {text.value}
            className='textareaCustom margin-left'
        />
        
         <ValidateAnswer  checkAnswer={checkAnswer} valid={props.valid}/> 
        </>
    )

}

export default CustomTextArea;