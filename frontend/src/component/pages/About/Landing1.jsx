
import React, { useState } from "react";
import { Redirect } from "react-router";
import { FiUser } from "react-icons/fi";


const Landing1 = () => {
    const [redirect, setRedirect] = useState(false)

    const handleRedirect = () => {
        setRedirect(true)
    }

    if (redirect === true) {
        return <Redirect to="/signup" />;
    }
    
  return (
    <body>
        <div className="wrapper">

            {/* Hero Section */}
            <section className="landing-hero-container">
                <img alt="Blocks Logo" src="/blocks.svg" className="landing-logo landing-element"></img>
                <div>
                    Build Your Productive Life. One Block at a Time.
                </div>
                <button className="btn btn-hero"></button>
                <button className="btn btn-link"></button>
            </section>

            {/* Mission Section */}
            <section className="landing-mission-container">
                <div>
                    Our Mission
                </div>
                <div>
                    Blockz was created with a goal of helping individuals build patterns to improve
                    productivity across all aspects of life. Our focus is on increasing personal
                    awareness abou how we use our most valuable resource: Time
                </div>
                <div>
                    <span>Time Blocking Tool</span>
                    <img src="" alt="Timeblocking Tool" />
                </div>
                <div>
                    <span>Task Lists</span>
                    <img src="" alt="Task Lists" />
                </div>
                <div>
                    <span>Capture Ideas</span>
                    <img src="" alt="Capture Ideas" />
                </div>

            </section>

            {/* Timeblocking Section */}
            <section className="landing-timeblock-container">
                <img className="landing-timeblock-img" src="" alt="Timeblocking Image">

                </img>
                <div className="landing-timeblock-header">
                    Flexible Timeblocking
                </div>
                <div className="landing-timeblock-body">
                    BLOCKZ's primary tool is the timeblocking
                    table. This table allows users to employ 
                    timeblocking principles. (link to article)

                    Build your week with discrete time intervals, 
                    create categories to help allocate your time, 
                    and link tasks to timeblocks to help you stay 
                    focused and productive.
                </div>
            </section>

            {/* Task Section */}
            <section className="landing-task-container">
                <div className="landing-task-header">
                    Focused Tasking
                </div>
                <div className="landing-task-body">
                BLOCKZ is your all-in-one productivity suite. 
                Compile all your tasks, filter them by custom buckets 
                then link those buckets to your timeblock table for seamless integration.

                Each task comes equip with a reminder, due date, and keyword functionality. 
                There are several tools baked into each task item to increase your efficiency.
                </div>
                <img className="landing-task-img" src="" alt="Tasking Image"></img>
            </section>

            {/* Team Section */}
            <section className="landing-team-container">
                <div className="landing-team-header">
                    The Team
                </div>
                <div className="landing-team-card">
                    <FiUser></FiUser>
                    <span>Christian</span>
                    <span>Co-Creator</span>
                </div>
                <div className="landing-team-card">
                    <FiUser></FiUser>
                    <span>Dyland</span>
                    <span>Co-Creator</span>
                </div>
                <div className="landing-team-card">
                    <FiUser></FiUser>
                    <span>Kanishq</span>
                    <span>Frontend Dev</span>
                </div>
            </section>

        </div>
        {/* Wrapper ends here */}

    </body>
  )
}

export default Landing1