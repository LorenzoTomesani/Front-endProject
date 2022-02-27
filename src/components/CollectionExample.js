import React,{ useEffect, useState} from "react";
import CardExample from './CardExample.js';
import { useTranslation } from 'react-i18next';
import './../style/CollectionStyle.css';

function CollectionExample(props) {

    const {  queryResult, errorMsg } = props;    
    
    const { t } = useTranslation();

    const [list, setList] = useState([]);

    
    useEffect(() =>{
        var tmp = [];
        if( errorMsg == '' && queryResult && queryResult.length > 0){
            queryResult.forEach(function (key, index) {
                tmp.push(<CardExample document={key}></CardExample>)
            })
            setList(tmp)
        } else if(queryResult==null){
            setList([])
        }
    }, [queryResult])

    return (
        <div className="scrollableDiv">
            {errorMsg == ''? list.length>0? list : 
            queryResult?
            <div style={{marginLeft: "1vw", marginTop: "1vw", fontSize: "1.0rem"}}>{t('empty')}</div> : null : 
            <div style={{marginLeft: "1vw", marginTop: "1vw", fontSize: "1.0rem", color:"red", fontWeight: "bold"}}>Error: {errorMsg}</div> }
        </div>
    )
}

export default CollectionExample;