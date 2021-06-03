import React from 'react';
import { makeStyles} from '@material-ui/core';
import BlockSplitter from './blockSplitter';
import { observer, inject } from 'mobx-react';

const useStyles = makeStyles(theme => ({
    memo : {//포스트잇
        border: '4px solid #e4e4e4', 
        boxSizing: 'border-box', 
        padding: '25px',
        width: '100%',
        textAlign: 'center',
        position: 'relative',
        "&:after": {
            content: '""',
            position: 'absolute',
            bottom: '-4px',
            right: '-4px',
            borderWidth: '25px 25px 0px 0px',
            borderStyle: 'solid',
            borderColor: '#e4e4e4  transparent',
            display: 'block',
        },
        "&:before": {
            content: '""',
            position: 'absolute',
            bottom: '-4px',
            right: '-4px',
            borderWidth: '0px 0px 25px 25px',
            borderStyle: 'solid',
            borderColor: '#fff transparent',
            display: 'block',
        }
    },
    vertical : {//세로
        borderLeft: '6px solid #515151', 
        boxSizing: 'border-box', 
        padding: '2px 15px',
        width: '100%',
        textAlign: 'left',
    },
    balloon : {//말풍선
        border: '4px solid #e4e4e4', 
        boxSizing: 'border-box', 
        padding: '25px',
        // marginBottom: '40px',
        width: '100%',
        textAlign: 'center',
        position: 'relative',
        display: 'inline-block',
        "&:after": {
            content: '""',
            position: 'absolute',
            bottom: '-25px',
            left: '100px',
            borderWidth: '25px 25px 0px 0px',
            borderStyle: 'solid',
            borderColor: '#e4e4e4  transparent',
            display: 'block',
        },
        "&:before": {
            content: '""',
            position: 'absolute',
            bottom: '-14px',
            left: '104px',
            borderWidth: '14px 14px 0px 0px',
            borderStyle: 'solid',
            borderColor: '#fff transparent',
            display: 'block',
            zIndex: '1'
        }
    },
    double : {//더블쿼테이션
        boxSizing: 'border-box', 
        padding: '2px 15px',
        width: '100%',
        textAlign: 'center',
        '&:before' : {
            content : '"❝"',
            opacity : '0.4',
            fontSize : '30px',
            position: 'relative',
            top: '10px'
        },
        '&:after' : {
            content : '"❞"',
            opacity : '0.4',
            fontSize : '30px'
        }
    },
    placeholder : {//기본문구
        opacity : '0.4',
        position : 'relative',
        '&.center:before' : {
            content : '"내용을 입력하세요."',
            position : 'absolute',
            width: '150px',
            left: '50%',
            transform: 'translate(-50%)'
        },
        '&.left:before' : {
            content : '"내용을 입력하세요."',
            position : 'absolute',
            width: '150px',
            left: '0',
            transform: 'translate(0%)'
        }
    },
}));

const Quotation = ({children, type, editor}) => {//인용구
    const classes = useStyles();
    const checkEmpty = (children) => {//비어있으면 문구 출력
        return children.length==1 ? (children[0].props.children.props.block.text == ""?true:false) : false;
    }
    return (
        <div style={{ width: 'calc(100% - 60px)', margin: 'auto', position:'relative', marginTop: '30px', marginBottom: '30px'}}>
            <div className={classes[type]} >
                {
                    checkEmpty(children) &&
                    <div>
                        <span className={`${classes.placeholder} ${type=='vertical'?'left':'center'}`}></span>
                    </div>
                }
                <div>
                    {children}
                </div>
            </div>
            <BlockSplitter blockKey={children[children.length-1].key}/>
        </div>
    );
}
export default inject(({ editor }) => ({
    editor: editor,
}))(observer(Quotation));
