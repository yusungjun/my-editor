import { Drawer, makeStyles } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react'
import { getBreakMoreNews } from '../../common/interface/common'
import CardItem from './CardItem';

const useStyles = makeStyles(theme => ({
    searchBox: {
        border: '1px solid #5D5D5D', 
        width: 'calc(100% - 54px)',
        height: '36px', 
        borderRadius: '2px',
        backgroundImage:'url(/rozeus_editor/images/ic_search.png)',
        backgroundRepeat:'no-repeat',
        backgroundSize:'20px 20px',
        backgroundPosition:'center right 8px',
        paddingLeft: '16px',
        paddingRight:'36px',
        "&:focus":{
            outline: 'none',
            border: '1px solid #ED1C24', 
        }
    },
}));

const Search = ({news}) => {

    const classes = useStyles();
    // const [searchKeyword, setSearchKeyword] = useState();
    const [newsList, setNewsList] = useState();

    useEffect(()=>{
        if(news.open){
            getBreakMoreNews()
                .then(function (response) {
                    if (response.data) {
                        setNewsList(response.data);
                    }
                })
        }
    },[news.open])

    const handleChange = (e) =>{
        // setSearchKeyword(e.target.value)
    }

    return (
        <Drawer anchor='right' open={news.open} onClose={(e)=>news.setOpen(false)}>
            <div style={{width:'40vw'}}>
                <div style={{padding:'16px'}}>
                    <div style={{display:'flex',justifyContent:'flex-end'}}>
                        <img
                            src={'/rozeus_editor/images/ic_button_close_light.png'}
                            alt='Popup Close'
                            style={{ display: 'block', width: '20px', height: '20px', cursor: 'pointer' }}
                            onClick={(e) => news.setOpen(false)}
                        />
                    </div>
                    <div style={{height:'16px'}}/>
                    <input type='text' className={classes.searchBox} onChange={handleChange}/>
                </div>
                <div style={{ padding: '16px', overflowY:'auto', height:'calc(100vh - 142px)'}}>
                        {newsList &&
                            newsList.map((item) => {
                                return <CardItem key={item.gid} item={item} type='breakNews' />
                            })
                        }
                </div>
            </div>
        </Drawer>
    )
}

export default inject(({ news }) => ({
    news: news,
}))(observer(Search));