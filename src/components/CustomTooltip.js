import React,{ useState } from 'react';
import { Tooltip} from 'reactstrap';

function CustomTooltip(props){

    const [isOpen, setIsOpen] = useState(false);   

    return(
    <Tooltip 
        isOpen={isOpen}
        toggle={()=>{setIsOpen(!isOpen)}}
        target={props.target}
        placement="right">
        {props.message}
    </Tooltip>)
}

export default CustomTooltip;