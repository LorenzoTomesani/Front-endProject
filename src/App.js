import { Container, Row, Col } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import Flags from 'country-flag-icons/react/3x2';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './style/AppStyle.css';
import Sidebar from './components/Sidebar.js';
import Main from './components/Main.js';
import CollectionExample from './components/CollectionExample';
import 'bootstrap/dist/css/bootstrap.css';

function App() {

    var oldCollection = '';

    const [exercises, setExercises] = useState([]);

    const [chosenEx, setChosenEx] = useState({});

    const [numberEx, setNumberEx] = useState(-1);

    const [valid, setValid] = useState('');

    const [collection, setCollection] = useState([]);

    const [isEng, setIsEng] = useState(false);

    const { t, i18n } = useTranslation();

    const baseUrl = 'lorenzo.tomesani2.tw.cs.unibo.it';

    useEffect(() => {
        axios.get( baseUrl + "/exercises").then(res => {
            setExercises(res.data);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        if (chosenEx.collection !== oldCollection) {
            axios.get(baseUrl + "/collections/" + chosenEx.collection).then(res => {
                setCollection(res.data);
            }).catch(err => {
                console.log(err);
            });
        }
    }, [chosenEx, oldCollection]);

    const setExercise = (ex, nEx) => {
        oldCollection = chosenEx.collection;
        setChosenEx(ex);
        setNumberEx(nEx);
    }

    const checkAnswer = (answer) => {
        if(answer && answer.length > 0){
            axios.post(baseUrl + "/exercises/" + chosenEx._id, {
                query: "db.collection('" + chosenEx.collection + "')" + answer
            }).then(res => {
                setValid((res.data).toString());
            })
        } else {
            setValid('false')
        }
    }

    const changeLang = () => {
        setIsEng(!isEng);
    }

    useEffect(() => {
        if (isEng) {
            i18n.changeLanguage("en")
        } else {
            i18n.changeLanguage("it")
        }
    }, [isEng, i18n]);

    return (
        <Container fluid style={{ paddingLeft: '0vw', paddingRight: '0vw', height: '100%' }}>
            <div className='topbar'>MongoTest 
            <span onClick={changeLang} style={{ cursor: "pointer", position: "absolute", right: '40px' }}> 
            {!isEng ? 
                <Flags.GB style={{ width: "2vw", height: "2vh" }}
            /> : <Flags.IT style={{ width: "2vw", height: "2vh" }} />}
             </span>
            </div>
            <Row style={{ height: '100%', width: '100%', marginRight: '0vw', marginLeft: '0vw' }}>
                <Col xl={2} xs={13} style={{ height: '100%', paddingRight: '0vw', paddingLeft: '0vw' }}>
                    <Sidebar exercises={exercises} setExercise={setExercise} t={t} />
                </Col>
                <Col xl={6} xs={13} className="main" style={{ paddingLeft: '0vw', paddingRight: '0vw' }}>
                    <Main chosenEx={chosenEx} numberEx={numberEx} checkAnswer={checkAnswer} valid={valid ? valid : ''}  t={t}/>
                </Col>

                <Col xl={4} xs={13} style={{ paddingLeft: '0vw', paddingRight: '0vw' }}>
                    <CollectionExample collection={collection} />
                </Col>
            </Row>
        </Container>
    );
}

export default App;
