import React,{ useState, useEffect } from 'react';
import { Nav, NavItem} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import FilterMenu from './FilterMenu';
import CustomTooltip from './CustomTooltip';
import '../style/SidebarStyle.css';

function Sidebar(props) {

    const [items, setItems] = useState([]);

    const [isOpen, setIsOpen] = useState(false);

    const {exercises, setExercise, t, filterEx, tags} = props;
    
    
    useEffect(() => {
        const setEx = (e) => {
            setExercise(exercises[e.target.id], parseInt(e.target.id) + 1)
        }

        var tmp = [];
        tmp.push(<><NavItem onClick={()=>{setIsOpen(!isOpen)}}  className="filterText" >
            {t('filter')} 
        <FontAwesomeIcon style={{paddingLeft: '0.3vw' }} icon={isOpen ? faCaretUp :faCaretDown} size='lg'/></NavItem>
            <FilterMenu isOpen={isOpen} filterEx={filterEx} tags={tags}/></>
        )

        if (exercises.length > 0) {
            for (var i = 0; i < exercises.length; i++) {
                if(exercises[i] !== false){
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
                var tooltips = '';
                if(exercises[i].tag){
                    var tagsArray = exercises[i].tag;
                    for(var j = 0; j < tagsArray.length; j++){
                        tooltips +=tagsArray[j];
                        if(j !== (tagsArray.length-1)){                            
                            tooltips +=", ";
                        }
                    }
                }

                tmp.push( 
                    <NavItem style={{paddingRight: '2vw'}} className='w-100 mx-4'>
                        <span  id={i} onClick={(e) => setEx(e)} style={{ cursor: 'pointer', float: 'left' }}>{t('exercise')} n. {i + 1}
                        </span>
                        <div style={{float:'right', marginRight: '2vw'}}>
                        <span className={"box difficulty" + exercises[i].difficulty} id={i}>{difficulty}</span>
                        <span style={{marginTop: '1vh', marginLeft: '5px'}}>
                        <FontAwesomeIcon
                        id={`Tag${i}`} style={{ cursor: 'pointer', color: '#1E92F4', position: 'relative', top: '0.3vh'}} 
                        size='lg' icon={faInfoCircle}/>
                        </span>
                        </div>
                        <CustomTooltip target={`Tag${i}`} message={tooltips} />
                    </NavItem>)
                }
            }
            setItems(tmp);
        }
    }, [exercises, setExercise, t,isOpen, filterEx ]);

    return (
        <Nav vertical className="Sidebar px-3 ">
            {items}
        </Nav>
    )
}


export default Sidebar;