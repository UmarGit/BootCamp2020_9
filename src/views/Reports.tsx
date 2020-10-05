import React from 'react';
import {motion} from "framer-motion";
import REPORT_MAIN from '../components/REPORT_MAIN/REPORT_MAIN'

function Reports({navigate}: {navigate: boolean}) {
    var transitionWay: number

    if(navigate){
        transitionWay = window.innerWidth
    }
    else{
        transitionWay = -(window.innerWidth)
    }

    const side_animate = {
        open: {
            x: [transitionWay, 0],
            scale: [0, 1],
            transition: {
                type: "spring",
                stiffness: 20,
                restDelta: 2,
                duration: 0.4,
            }
        },
        closed: {
            x: -transitionWay,
            scale: 0,
            transition: {
                delay: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 40,
                duration: 0.4,
            }
        }
    }


    return (
        <motion.div className="Reports"
                    variants={side_animate}
                    initial={"closed"}
                    animate={"open"}
        >
            <REPORT_MAIN/>
        </motion.div>
    );
}

export default Reports;
