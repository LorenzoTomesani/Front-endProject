import React,{ useEffect, useState } from "react";
import { Card, CardTitle } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
function CardExample(props) {

    const { document } = props;
    const [isClicked, setIsClicked] = useState(false);
    const [card, setCard] = useState([]);

    useEffect(() =>{
        var tmp = [];
        if(document){
        Object.keys(document).forEach((key, index) =>{
            if(key==='_id'){
                tmp.push(<CardTitle style={{fontWeight: 'bold'}}>{key + ': '}<span style={{ color:'orangered'}}>{' ObjectId("' + document[key] + '")'}</span></CardTitle>)
            } else {
                if(typeof document[key] !=='object'){
                    tmp.push(
                    <div><span style={{fontWeight: 'bold'}}>{key + ': ' }</span>{document[key]}</div>
                    )
                } else {
                    var type = (Array.isArray(document[key])? 'Array': 'Object');
                    tmp.push(
                    <div><span style={{fontWeight: 'bold'}}>{key + ': ' }</span>{type}
                    <FontAwesomeIcon style={{paddingLeft: '0.3vw', fontSize: '1.3rem'}} icon={isClicked ? faCaretUp :faCaretDown}/>
                    </div>
                    )

                }
            }
        })
        setCard(tmp)
        }
    }, [document, isClicked])

    return (
        <Card style={{paddingLeft:'0.2vw', paddingTop: '1vh', paddingBottom: '1vh'}}>
            {card}
        </Card>
    )
}

export default CardExample;