import { Container, Row, Col, Alert } from 'reactstrap';
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


    const [exercises, setExercises] = useState([]);

    const [filterExercises, setFilterExercises] = useState([]);

    const [chosenEx, setChosenEx] = useState({});

    const [numberEx, setNumberEx] = useState(-1);

    const [valid, setValid] = useState('');

    const [error, setError] = useState("");

    const [isEng, setIsEng] = useState(false);

    const [tags, setTags] = useState([]);

    const [queryResult, setQueryResult] = useState(null);

    const [solution, setSolution] = useState('');

    const { t, i18n } = useTranslation();

    const baseUrl = 'http://lorenzo.tomesani2.tw.cs.unibo.it';


    const checkCondition = (ex, dif, tag, col) => {
        var first = true;
        var second = true;
        var third = true;
        if (dif !== null && dif !== "") {
            if (ex.difficulty !== parseInt(dif)) {
                first = false;
            }
        }

        if (tag !== null && tag.length > 0) {
            for (var i = 0; i < tag.length; i++) {
                second &= ex.tag.includes(tag[i].value)
            }
        }

        if (col !== "") {
            if (ex.collection !== col) {
                third = false;
            }
        }

        return first && second && third;
    }

    const filterEx = (difficulty, tag, collection) => {
        var res = [];
        if (difficulty !== "" || tag !== "" || collection !== "") {
            for (var i = 0; i < exercises.length; i++) {
                var cond = checkCondition(exercises[i], difficulty, tag, collection);
                if (cond) {
                    res.push(exercises[i]);
                } else {
                    res.push(false)
                }
            }
            setFilterExercises(res);
        } else {
            setFilterExercises([]);
        }
    }

    useEffect(() => {
        var body = document.getElementsByTagName('body')[0];
        body.scrollTop = 0;
        axios.get(baseUrl + "/exercises").then(res => {
            setExercises(res.data);
        }).catch(err => {
            console.log(err);
        });

        axios.get(baseUrl + "/exercises/tags").then(res => {
            setTags(res.data);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    const setExercise = (ex, nEx) => {
        setChosenEx(ex);
        setNumberEx(nEx);
        setValid('');
        setQueryResult(null);
        setError('');
    }

    const checkAnswer = (answer) => {
        answer = answer.replace(/[\n\r]/g, '');
        if (answer && answer.length > 0) {
            axios.post(baseUrl + "/exercises/" + chosenEx._id + "/userSolution", {
                query: answer
            }).then(res => {
                setValid((res.data['resultCode']).toString());
                setQueryResult(res.data['result']?  res.data['result']: []);
                setError(res.data['errormsg']? res.data['errormsg']: '');
            })
        } else {
            setValid('false')
        }
    }

    const executeQuery = (query) => {
        query = query.replace(/[\n\r]/g, '');
        if (query && query.length > 0) {
            axios.post(baseUrl + "/exercises/" + chosenEx._id + "/query", {
                query: query
            }).then(res => {        
                if(res.data.resultCode !== 'syntax') {         
                    setQueryResult(res.data.data);
                    setError('')
                } else {
                    setError(res.data.errormsg)
                }
            })
        } else {
            alert(t('syntax'))
        }
    }

    const showSolution = () => {
        axios.get(baseUrl + "/exercises/" + chosenEx._id + "/solution").then(res => {
            setSolution(res.data);
        })
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
            <div className='topbar'>
                <span  className="appName"> MongoTest </span>
                <span onClick={changeLang} style={{ cursor: "pointer", float: 'right', marginRight: '2vw' }}>
                    {!isEng ? <Flags.IT height='24' width="48" /> :
                        <Flags.GB height='24' width="48" className='mr-2' />}
                </span>
            </div>
            <Row style={{ height: '100%', width: '100%', marginRight: '0vw', marginLeft: '0vw' }}>
                <Col xl={3} xs={13}  style={{ height: '100%', paddingRight: '0vw', paddingLeft: '0vw' }}>
                    <Sidebar exercises={filterExercises.length > 0 ? filterExercises : exercises} setExercise={setExercise} t={t} filterEx={filterEx} tags={tags} />
                </Col>
                <Col xl={6} xs={13}  className="main" style={{ paddingLeft: '0vw', paddingRight: '0vw' }}>
                    <Main chosenEx={chosenEx} numberEx={numberEx} 
                    checkAnswer={checkAnswer} valid={valid ? valid : ''} t={t}  
                    executeQuery={executeQuery}
                    showSolution={showSolution}
                    solution={solution}/>
                </Col>

                <Col xl={3} xs={13} style={{ paddingLeft: '0vw', paddingRight: '0vw' }}>
                    <CollectionExample queryResult={queryResult} errorMsg={error}/>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
