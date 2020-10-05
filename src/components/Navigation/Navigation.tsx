import React from 'react';
import {Button, Fab} from "@material-ui/core";
import {useNavigate} from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

function Navigation({goto, add}: {goto: string, add: boolean}) {
    const navigate = useNavigate()

    return (
        <nav className='navigation'>
            <div className='navigation-main'>
                <Button className='navigate-back' aria-label="back" onClick={()=>{
                    navigate(`${goto}`)
                }}>
                    <NavigateBeforeIcon /> Back
                </Button>
                {
                    add
                        ?
                        <Fab size="small" className='navigate-add' aria-label="add" onClick={()=>{
                            navigate('/transaction/add')
                        }}>
                            <AddIcon/>
                        </Fab>

                        :

                        null
                }
            </div>
        </nav>
    );
}

export default Navigation;
