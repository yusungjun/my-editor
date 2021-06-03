import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderAtomic = ({ editor, block, type, src }) => {
    const [imgSize, setImgSize] = useState({ width: 320, height:  200});
    const [anchorEl, setAnchorEl] = useState(null);
    const [srcList, setSrcList] = useState([...src]);
    const baseUrl = '/rozeus_editor/images'
    const settings = {
        dots: true,
        lazyLoad: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0
    };

    const handleClick = (e) => {
        if(!editor.readOnly){
        //     setAnchorEl(anchorEl ? null : event.currentTarget);
        }else{
            window.open(e.target.src)
        }
    }

    const SliderItems = ({src}) => {
        return (
            <div>
                <img src={baseUrl + src} style={{width: imgSize.width, height: imgSize.height}} onClick={handleClick} />
            </div>
        )
    }

    return (
        <div style={{display:'flex', justifyContent: 'center' }}>
            <div style={{ resize: 'both', overflow: 'hidden', width: imgSize.width, height: imgSize.height+20 }}>
                <Slider {...settings}>
                    {
                        srcList&&
                        srcList.map((e,i)=>{
                            return <SliderItems src={e} key={i}/>
                        })
                    }
                </Slider>
            </div>
        </div>
    )
}

export default inject(({ editor }) => ({
    editor: editor,
}))(observer(SliderAtomic));
