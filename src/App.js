import { Container, Row, Col } from 'reactstrap';
import React, {useState, useEffect} from 'react';
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

    const[valid, setValid] = useState('');

    const[collection, setCollection] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/exercises").then(res => {
            setExercises(res.data);
        }).catch( err => {
            console.log(err);
        });
    }, []);

    useEffect(() =>{
        console.log(chosenEx.type)
        if(chosenEx.collection !== oldCollection){
            axios.get("http://localhost:3001/collections/" + chosenEx.collection).then(res => {
                setCollection(res.data);
            }).catch( err => {
                console.log(err);
            });
        }
    }, [chosenEx]);
    
    const setExercise = (ex, nEx) => {
        oldCollection = chosenEx.collection;
        setChosenEx(ex);
        setNumberEx(nEx);
    }

    const checkAnswer = (answer) => {
        axios.post("http://localhost:3001/exercises/" + chosenEx._id, {
            query: "db.collection('" + chosenEx.collection  + "')" + answer 
        }).then(res=>{
            if(res.data === true){
                setValid('corretta')
            } else{
                setValid('sbagliata')
            }
        })
    }

    return (
        <Container fluid style={{paddingLeft: '0vw', paddingRight: '0vw', height: '100%'}}>
        <div className='topbar'>MongoTest</div>
            <Row style={{height: '100%', width:'100%', marginRight: '0vw', marginLeft:'0vw' }}>
                <Col xl={2}  xs={13}  style={{height: '100%',  paddingRight: '0vw', paddingLeft: '0vw'}}>
                <Sidebar  exercises={exercises} setExercise={setExercise}/>
                </Col>
                <Col xl={6} xs={13} className="main" style={{paddingLeft: '0vw', paddingRight: '0vw'}}>
                <Main chosenEx={chosenEx} numberEx={numberEx} checkAnswer={checkAnswer} valid={valid? valid: ''}/>
                </Col>
                
                <Col xl={4} xs={13}  style={{paddingLeft: '0vw', paddingRight: '0vw'}}>
                <CollectionExample collection={collection}/>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
