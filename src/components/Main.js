import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import CustomTextArea from './../components/CustomTextArea.js';
import './../style/MainStyle.css';
function Main(props) {

    const [difficulty, setDifficulty] = useState('');

    const { chosenEx, numberEx } = props;

    useEffect(() => {
        if (chosenEx) {
            var difficulty = '';
            switch (chosenEx.difficulty) {
                case 1:
                    difficulty = 'EASY';
                    break;
                case 2:
                    difficulty = 'NORMAL';
                    break;
                case 3:
                    difficulty = 'HARD';
                    break;
                default:
                    break;
            }
            setDifficulty(difficulty);
        }
    }, [chosenEx]);

    const checkAnswer = (answer) => {
        props.checkAnswer(answer)
    }

    return (<Container fluid style={{ paddingLeft: '0vw', paddingRight: '0vw' }}>
        <div className="exercises">Esercizio n. {numberEx > -1 ? numberEx : null}
            {props.chosenEx.difficulty ? <span className={"box difficulty" + chosenEx.difficulty}>{difficulty}</span> : null}</div>
        <Row>
            <Col>
                <div className="question margin-left">
                    {props.chosenEx.question}
                </div>
                <div className="collection margin-left">db.getCollection({props.chosenEx.collection})</div>
                <CustomTextArea checkAnswer={checkAnswer} valid={props.valid} />
            </Col>
        </Row>
    </Container>
    );
}

export default Main;