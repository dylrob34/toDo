
import React, { useState } from "react";
import { Redirect } from "react-router";
import { FiUser } from "react-icons/fi";


const Landing1 = () => {
    const [redirectS, setRedirectS] = useState(false)
    const [redirectL, setRedirectL] = useState(false)


    const handleRedirectS = () => {
        setRedirectS(true)
    }
    const handleRedirectL = () => {
        setRedirectL(true)
    }


    if (redirectS === true) {
        return <Redirect to="/signup" />;
    }
    if (redirectL === true) {
        return <Redirect to="/login" />
    }


  return (
    <body className="body">
        <div className="wrapper">

            {/* Hero Section */}
            <section className="landing-hero-container">
                <img alt="Blocks Logo" src="/blocks.svg" className="landing-logo landing-element"></img>
                <div className="font-hero">
                    Build Your Productive Life. One Block at a Time.
                </div>
                <div className="btn-container">
                    <>
                        <button className="btn btn-hero" onClick={handleRedirectS}> Sign Up</button>
                    </>
                    <>
                        <button className="btn btn-link" onClick={handleRedirectL}>Login</button>
                    </>
                </div>
            </section>

            {/* Mission Section */}
            <section className="landing-mission-container">
                <div className="font-header">
                   <span>Our</span> <span style={{color:"#34B487"}}>Mission</span> 
                </div>
                <div className="font-content">
                    Blockz was created with a goal of helping individuals build patterns to improve
                    productivity across all aspects of life. Our focus is on increasing personal
                    awareness about how we use our most valuable resource: Time
                </div>
                <div className="mission-toolbar-container">
                    <div className="timeblock-tool mission-img">
                        <span className="font-mission">Time Blocking Tool</span>
                        <img src="/Landing-Timeblock-small.svg" alt="Timeblocking Tool" />
                    </div>
                    <div className="task-tool mission-img">
                        <span className="font-mission">Task Lists</span>
                        <img src="/Landing-Tasks-small.svg" alt="Task Lists" />
                    </div>
                    <div className="capture-tool mission-img">
                        <span className="font-mission">Capture Ideas</span>
                        <img src="/Landing-Capture-small.svg" alt="Capture Ideas" />
                    </div>
                </div>
            </section>

            {/* Timeblocking Section */}
            <section className="landing-timeblock-container">
                <img className="landing-timeblock-img" src="/Timeblock_Render.svg" alt="Placeholder for Tasking SVG">

                </img>
                <div className="landing-timeblock-body">
                    <div className="landing-timeblock-header">
                        Flexible Timeblocking
                    </div>
                    <div className="landing-timeblock-text">
                        BLOCKZ's primary tool is the timeblocking
                        table. This table allows users to employ 
                        timeblocking principles. (link to article)

                        Build your week with discrete time intervals, 
                        create categories to help allocate your time, 
                        and link tasks to timeblocks to help you stay 
                        focused and productive.
                    </div>
                </div>
            </section>

            {/* Task Section */}
            <section className="landing-task-container">
                <div className="landing-task-body">
                    <div className="landing-task-header">
                        Focused Tasking
                    </div>
                    <div className="landing-task-text">
                    BLOCKZ is your all-in-one productivity suite. 
                    Compile all your tasks, filter them by custom buckets 
                    then link those buckets to your timeblock table for seamless integration.

                    Each task comes equip with a reminder, due date, and keyword functionality. 
                    There are several tools baked into each task item to increase your efficiency.
                    </div>
                </div>
                <img className="landing-task-img" src="/Landing-Tasks.svg" alt="Placeholder for Tasking SVG"></img>
            </section>

            {/* Team Section */}
            <section className="landing-team-container">
                <div className="landing-team-header font-header">
                    <span>The</span> <span style={{color:"#34B487"}}>Team</span>
                </div>
                <div className="landing-team-deck">
                    <div className="landing-team-card card1">
                        <FiUser className="user-icon"></FiUser>
                        <div className="landing-team-text">
                            <span className="teamcard-title font-content">Christian K.</span>
                            <span className="teamcard-position font-sub-content">Co-Creator</span>
                        </div>
                    </div>
                    <div className="landing-team-card card2">
                        <FiUser className="user-icon"></FiUser>
                        <div className="landing-team-text">
                            <span className="teamcard-title font-content">Dylan A.</span>
                            <span className="teamcard-position font-sub-content">Co-Creator</span>
                        </div>
                    </div>
                    <div className="landing-team-card card3">
                        <FiUser className="user-icon"></FiUser>
                        <div className="landing-team-text">
                            <span className="teamcard-title font-content">Kanishq</span>
                            <span className="teamcard-position font-sub-content">Frontend Dev</span>
                        </div>
                    </div>
                </div>
                <button className="landing-support btn btn-hero">Support BlOCKZ</button>
            </section>

        </div>
        {/* Wrapper ends here */}

    </body>
  )
}

export default Landing1