
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Input } from 'reactstrap';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Login() {

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const baseUrl = 'http://lorenzo.tomesani2.tw.cs.unibo.it';
    const [isOpenLogin, setIsOpenLogin] = useState(true);
    const [isOpenAddExercise, setIsOpenAddExercise] = useState(false);

    const [type, setType] = useState('');
    const [collection, setCollection] = useState('');
    const [difficulty, setDifficulty] = useState(1);
    const [query, setQuery] = useState('db.collection()');
    const [questEn, setQuestEn] = useState('');
    const [questIt, setQuestIt] = useState('');
    const [tag, setTag] = useState([]);

    const loginCred = () => {
        axios.post(baseUrl + "/user", {
            user: userId,
            psw: password
        }).then(res => {
            if(res.data){
                setIsOpenLogin(false);
                setIsOpenAddExercise(true);
            } else {
                document.getElementById("error").style.display = "block";
            }
        })
    }

    const insertNewEx = () => {
        axios.post(baseUrl + "/exercises",  {
            'user': userId,
            'psw': password,
            'type': type,
            'collection': collection,
            'difficulty': difficulty,
            'query': query,
            'question-en': questEn,
            'question-it': questIt,
            'tag': tag
    
        }).then(res => {
            if(!res.data.error){
                setType('');
                setCollection('');
                setDifficulty(1);
                setQuery('db.collection()');
                setQuestEn('');
                setQuestIt('');
                setTag([]);
                document.getElementById("success").style.display = "block";
                document.getElementById("error2").style.display = "none";
                document.getElementById("tags").value = "";
            } else {
                document.getElementById("success").style.display = "none";
                document.getElementById("error2").style.display = "block";
            }
        })
    }

    const transformArray = (e) => {           
        var array = e.split(",");
        console.log(e)
        setTag(array)
    }

    return (
    <div>
        <Modal isOpen={isOpenLogin}>
        <ModalHeader className='text-center'>
                Inserisci le credenziali
            </ModalHeader>
            <ModalBody>
                <Input type="text" name="user" id="user" onChange={(e) => {setUserId(e.target.value)}} style={{marginTop:"1vw"}} placeholder="user id"/>
                <Input type="password" name="password" id="examplePassword" onChange={(e) => {setPassword(e.target.value)}} style={{marginTop:"1vw"}} placeholder="password"/>
                <div style={{color: 'red',  textAlign: 'center', marginTop: '0.5vw', display:'none'}} id="error">credenziali errate</div>
            </ModalBody>
            <ModalFooter>            
                <Button color="primary" onClick={()=> {loginCred()}}>Conferma</Button>
            </ModalFooter>
        </Modal>

        
        <Modal isOpen={isOpenAddExercise}>
            <ModalHeader className='text-center'>
                Inserisci un nuovo esercizio
            </ModalHeader>
            <ModalBody>
                <Input type="text"  onChange={(e) => {setType(e.target.value)}} style={{marginTop:"1vw"}} placeholder="type" value={type}/>
                <Input type="text" onChange={(e) => {setCollection(e.target.value)}} style={{marginTop:"1vw"}} placeholder="collection" value={collection}/>
                <Input type="number" min={1} onChange={(e) => {setDifficulty(e.target.value)}} style={{marginTop:"1vw"}} placeholder="difficulty" value={difficulty}/>
                <Input type="text" onChange={(e) => {setQuery(e.target.value)}} style={{marginTop:"1vw"}} placeholder="query" value={query}/>
                <Input type="text" onChange={(e) => {setQuestEn(e.target.value)}} style={{marginTop:"1vw"}} placeholder="domanda in inglese" value={questEn}/>
                <Input type="text" onChange={(e) => {setQuestIt(e.target.value)}} style={{marginTop:"1vw"}} placeholder="domanda in italiano" value={questIt}/>
                <Input type="text" onChange={(e) => {transformArray(e.target.value)}} style={{marginTop:"1vw"}} placeholder="tags" id="tags" />
                <div style={{color: 'green',  textAlign: 'center', marginTop: '0.5vw', display:'none'}} id="success">successo</div>
                <div style={{color: 'red',  textAlign: 'center', marginTop: '0.5vw', display:'none'}} id="error2">errore</div>
            </ModalBody>
            <ModalFooter>            
                <Button color="primary" onClick={()=> {insertNewEx()}}>Conferma</Button>
            </ModalFooter>
        </Modal>
    </div>
    )
}


export default Login;