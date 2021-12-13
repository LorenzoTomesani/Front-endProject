import '../style/ValidateStyle.css';


function ValidateAnswer(props) {
    
    return (
        <div className="margin-left" style={{marginTop: '5vh', marginBottom: '5vh'}}>
            <div className="solution">{'La soluzione è: ' + props.valid}</div> 

             <button className="checkButton" onClick={props.checkAnswer}> Controlla soluzione </button>
        </div>
    )
}

export default ValidateAnswer;