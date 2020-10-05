import React from 'react';
import {useNavigate} from 'react-router-dom'
import Particles from "react-tsparticles";
import {Button} from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { motion, useCycle } from "framer-motion";

function Home() {
    const [isOpen, toggleOpen] = useCycle(false, true);
    const navigate = useNavigate()

    const side_animate = {
        open: {
            x: [-(window.innerWidth), 0],
            scale: [0, 1],
            transition: {
                type: "spring",
                stiffness: 20,
                restDelta: 2,
                duration: 0.4,
            }
        },
        closed: {
            x: -(window.innerWidth),
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
        <motion.div className="Home"
                    variants={side_animate}
                    initial={false}
                    animate={isOpen ? "closed" :  "open"}
        >
            <Particles className="Home"
                id="ts-particles"
                options={{
                    background: {
                        size: 'cover'
                    },
                    fpsLimit: 60,
                    interactivity: {
                        detectsOn: "canvas",
                        modes: {
                            bubble: {
                                distance: 400,
                                duration: 2,
                                opacity: 0.8,
                                size: 80,
                            },
                            push: {
                                quantity: 4,
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#ff0061",
                        },
                        links: {
                            color: "#ffebc2",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 4,
                        },
                        collisions: {
                            enable: true,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outMode: "bounce",
                            random: false,
                            speed: 6,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                value_area: 2000,
                            },
                            value: 80,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            random: true,
                            value: 8,
                        },
                    },
                    detectRetina: true,
                }}
            />
            <div className="Home-Absolute-Text">
                <h1>It's Your Money Own It</h1>
            </div>
            <div className="Home-Absolute-Button">
                <Button  onClick={() => {
                    toggleOpen()
                    setTimeout(()=>{navigate('/reports-go')},10)
                }}>START <NavigateNextIcon fontSize='inherit'/></Button>
            </div>
        </motion.div>
    );
}

export default Home;
