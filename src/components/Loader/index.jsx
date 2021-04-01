import React from 'react'
import './loader.scss';
import { useSpring, animated } from "react-spring";
export default function Loader() {
    const propsAni = useSpring({
        // opacity: 0,
        // from: { opacity: 1 },
        // config: { duration: 1000 },
      });
    return (
        <animated.div style={propsAni} className='loader'>
            <img src={require('../../assets/images/Spinner.gif').default} alt=""/>
        </animated.div>
    )
}
