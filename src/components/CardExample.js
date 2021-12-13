import { useEffect, useState } from "react";
import { Card, CardTitle } from "reactstrap";
function CardExample(props) {

    const { document, key } = props;

    const [card, setCard] = useState([]);

    useEffect(() =>{
        var tmp = [];
        if(document){
        Object.keys(document).map((key, index) =>{
            if(key==='_id'){
                tmp.push(<CardTitle style={{fontWeight: 'bold'}}>{key + ': ' + document[key]}</CardTitle>)
            } else {
                if(typeof document[key] !=='object'){
                    tmp.push(
                    <div><span style={{fontWeight: 'bold'}}>{key + ': ' }</span>{document[key]}</div>
                    )
                } else {
                    tmp.push(
                    <div><span style={{fontWeight: 'bold'}}>{key + ': ' }</span>{JSON.stringify(document[key], null, '\t')}</div>
                    )

                }
            }
        })
        setCard(tmp)
        }
    }, [document])

    return (
        <Card style={{paddingLeft:'0.2vw', paddingTop: '1vh', paddingBottom: '1vh'}}>
            {card}
        </Card>
    )
}

export default CardExample;