import { DefaultDraftBlockRenderMap } from "draft-js";
import Immutable from "immutable";
import AtominController from "../atomic/AtominController";
import React from 'react';
import Quotation from "./Quotation";
import BlockSplitter from './blockSplitter';

export const blockRenderer = contentBlock => {
    const type = contentBlock.getType();
    if (type === "atomic") {
        return {
            component: AtominController,
            editable: false,
            // props: {}
        };
    }
};

const CustomUnorlderedList = ({children}) => {//list wrapper tag
    return (
        <React.Fragment>
            <ul style={{listStyleType: 'square'}}>
                {children}
            </ul>
            {
                // <BlockSplitter blockKey={children[children.length-1].key}/>
            }
        </React.Fragment>
    );
}

const blockRenderMap = Immutable.Map({
    'TEXT_LEFT': {
        element: 'div'
    },
    'TEXT_CENTER': {
        element: 'div'
    },
    'TEXT_RIGHT': {
        element: 'div'
    },
    'UL_SQUARE': {
        element: 'li',
        wrapper: <CustomUnorlderedList/>
    },    
    'QUOTE_MEMO': {
        element: 'span',
        wrapper: <Quotation type={'memo'}/>
    },    
    'QUOTE_VERTICAL': {
        element: 'span',
        wrapper: <Quotation type={'vertical'}/>
    },    
    'QUOTE_BALLOON': {
        element: 'span',
        wrapper: <Quotation type={'balloon'}/>
    },    
    'QUOTE_DOUBLE': {
        element: 'span',
        wrapper: <Quotation type={'double'}/>
    }
})

export const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap)

export const blockStyleFn = (contentBlock) => {
    switch (contentBlock.getType()) {
        case 'UL_SQUARE': return 'UL_SQUARE'
        case 'TEXT_LEFT': return 'TEXT_LEFT'
        case 'TEXT_CENTER': return 'TEXT_CENTER'
        case 'TEXT_RIGHT': return 'TEXT_RIGHT'
        case 'QUOTE_MEMO': return 'QUOTE_MEMO'
        case 'QUOTE_VERTICAL': return 'QUOTE_VERTICAL'
        case 'QUOTE_BALLOON': return 'QUOTE_BALLOON'
        case 'QUOTE_DOUBLE': return 'QUOTE_DOUBLE'
        default: return null
    }
}