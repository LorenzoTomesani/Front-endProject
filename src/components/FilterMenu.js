import React, { useEffect, useState } from "react";
import { Nav, NavItem, Input, Button } from 'reactstrap';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import '../style/SidebarStyle.css';

function FilterMenu(props) {

    const { t } = useTranslation();

    const {tags} = props;

    const [selectedDifficulty, setSelectedDifficulty] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState("");

    const [options, setOptions] = useState([])

    useEffect(()=>{
        var tmp = [];
        for(var i = 0; i < tags.length; i++){
            tmp.push({ value: tags[i], label: tags[i] })
        }
        setOptions(tmp)
    }, [tags])

    const onChangeDiff = (e) => {
        setSelectedDifficulty(e.target.value);
    };

    const onChangeCol = (e) => {
        setSelectedCollection(e.target.value);
    }   

    return (
        props.isOpen ?
            <div style={{ borderBottom: '1px black solid', marginBottom: '1vh', marginRight: '5vw' }}  className="filterMenu">
                <Nav vertical style={{ marginBottom: '0.2vh'}}>
                    <NavItem>{t('difficulty')}
                        <Input
                            type={"select"}
                            value={selectedDifficulty}
                            onChange={onChangeDiff}
                            style={{ marginRight: '1vw', paddingTop: '1vh' }}
                        >

                            <option value="" selected>{t("selectDiff")}</option>
                            <option value={1}>{t('easy')}</option>
                            <option value={2}>{t('normal')}</option>
                            <option value={3}>{t('hard')}</option>
                        </Input>
                    </NavItem>
                    <NavItem>Tag: 
                        <Select key={options} placeholder={t('selectTag')} options={options} defaultValue={selectedTags} onChange={setSelectedTags} isMulti='true'/> 
                    </NavItem>
                    <NavItem>{t('col')}
                        <Input
                            type={"select"}
                            value={selectedCollection}
                            onChange={onChangeCol}
                            style={{ marginRight: '1vw', paddingTop: '1vh' }}
                        >
                            <option value="" selected>{t("selectCol")}</option>
                            <option value={"restaurants"}>restaurants</option>
                            <option value={"nba2016_players"}>nba2016_players</option>
                            <option value={"games"}>games</option>
                        </Input>  
                        </NavItem>
                <Button style={{marginBottom: '1vh'}} className="checkButton" onClick={()=>{props.filterEx(selectedDifficulty, selectedTags, selectedCollection)}} color="primary"> OK </Button>
                </Nav>
                
            </div> :
            null
    )
}

export default FilterMenu;