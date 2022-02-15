import React from "react";
import { Card } from "reactstrap";
import ReactJson from 'react-json-view';

import './../style/CollectionStyle.css';

function CardExample(props) {

    const { document } = props;

    return (
        <Card style={{paddingLeft:'0.2vw', paddingTop: '1vh', paddingBottom: '1vh'}} className="cardStyle">
            {typeof document === 'object'?
            <ReactJson src={document} collapsed={true} 
            iconStyle='triangle' displayDataTypes={false} 
            enableClipboard={false} groupArraysAfterLength={0} name={null} />
            :<span>{document}</span>}
        </Card>
    )
}

export default CardExample;