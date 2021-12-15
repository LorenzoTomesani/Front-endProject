import React,{ useState, useEffect } from 'react';
import { Nav, NavItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import '../style/SidebarStyle.css';

function Sidebar(props) {

    const [items, setItems] = useState([]);

    const [isClicked, setIsClicked] = useState(false);

    const {exercises, setExercise, t} = props;
    
    useEffect(() => {

        const setEx = (e) => {
            setExercise(exercises[e.target.id], parseInt(e.target.id) + 1)
        }
        
        var tmp = [];
        tmp.push(<NavItem style={{fontWeight: '800', fontSize: '1.6rem'}}>{t('filter')} 
        <FontAwesomeIcon style={{paddingLeft: '0.3vw', fontSize: '2rem'}} icon={isClicked ? faCaretUp :faCaretDown}/></NavItem>)
        if (exercises.length > 0) {
            var lastOp = '';
            for (var i = 0; i < exercises.length; i++) {
                if (lastOp !== exercises[i].type) {
                    lastOp = exercises[i].type;
                }
                var difficulty = '';
                switch (exercises[i].difficulty) {
                    case 1:
                        difficulty = t('easy');
                        break;
                    case 2:
                        difficulty =  t("normal");
                        break;
                    case 3:
                        difficulty = t('hard');
                        break;
                    default:
                        break;
                }
                tmp.push( 
                    <NavItem id={i} onClick={(e) => setEx(e)} style={{ cursor: 'pointer' }}>
                        {t('exercise')} n. {i + 1}
                        <span className={"box difficulty" + exercises[i].difficulty} id={i}>{difficulty}</span>
                    </NavItem>)
            }
            setItems(tmp);
        }
    }, [exercises, setExercise, t,isClicked]);


    return (
        <Nav vertical className="Sidebar">
            {items}
        </Nav>
    )
}


export default Sidebar;