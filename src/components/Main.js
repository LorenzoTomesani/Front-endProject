import React,{ useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import CustomTextArea from './../components/CustomTextArea.js';
import './../style/MainStyle.css';
import i18n from './i18n.js';
function Main(props) {

    const [difficulty, setDifficulty] = useState('');

    const { chosenEx, numberEx, t, solution } = props;
 

    const [needReset, setNeedReset] = useState(0);

    useEffect(() => {
        if (chosenEx) {
            
            setNeedReset(needReset+1)

            var difficulty = '';
            switch (chosenEx.difficulty) {
                case 1:
                    difficulty = t('easy');
                    break;
                case 2:
                    difficulty =  t("normal");
                    break;
                case 3:
                    difficulty = t('hard');
                    break;
                default:
                    break;
            }
            setDifficulty(difficulty);
        }
    }, [chosenEx, t]);

    const checkAnswer = (answer) => {
        props.checkAnswer(answer)
    }

    const executeQuery = (query) => {
        props.executeQuery(query)
    }

    const showSolution = () => {
        props.showSolution()
    }


    return (
    <Container fluid style={{ paddingLeft: '0vw', paddingRight: '0vw' }}>
      {Object.keys(chosenEx).length !== 0?<>
      <div className="exercises"><h3> {t("exercise")} n. {numberEx > -1 ? numberEx : null} 
            {props.chosenEx.difficulty ? <span className={"topMargin box difficulty" + chosenEx.difficulty} style={{position: 'absolute', marginTop: '5.5px'}}>{difficulty}</span> : null}</h3></div>
        <Row>
            <Col>
                <div className="question margin-left">
                    {props.chosenEx['question-' +i18n.language]}
                </div>
                <div className="collection margin-left">db.getCollection({'"' + props.chosenEx.collection + '"'})</div>
                <CustomTextArea checkAnswer={checkAnswer} valid={props.valid}
                chosenEx={props.chosenEx}
                executeQuery={executeQuery}
                showSolution={showSolution}
                solution={solution}
                />
            </Col>
        </Row></> : <div style={{paddingTop: '40vh', paddingLeft: '20vw'}}>{t('noExercise')}</div>} 
    </Container>
    );
}

export default Main;