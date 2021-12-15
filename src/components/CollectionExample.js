import React,{ useEffect, useState} from "react";
import CardExample from './CardExample.js';
import './../style/CollectionStyle.css';

function CollectionExample(props) {

    const { collection } = props;
    

    const [list, setList] = useState([]);

    useEffect(() =>{
        var tmp = [];
        if(collection && collection.length > 0){
            collection.map(function (key, index) {
                tmp.push(<CardExample document={key}></CardExample>)
            })
            setList(tmp)
            var myDiv = document.getElementsByClassName('scrollableDiv')[0];
            myDiv.scrollTop = 0;
        }
    }, [collection])

    return (
        <div className="scrollableDiv">
            {list}
        </div>
    )
}

export default CollectionExample;