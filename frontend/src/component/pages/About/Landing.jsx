
import React, { useState } from "react";
import { Redirect } from "react-router";

const Landing = () => {

  const [redirect, setRedirect] = useState(false)

  const handleRedirect = () => {
    setRedirect(true)
  }


  if (redirect === true) {
    return <Redirect to="/signup" />;
  }

  return (
      <div className="welcome">
        <div className="landing-page scroll-container">
            <div className="landing-section1 landing-section scroll-child" id="hero-panel">
              <img alt="Blocks Logo" src="/blocks.svg" className="landing-logo landing-element" />
              <div className="landing-element" > 
                <div className="landing-call2action font-call2action">
                  Build Your Productive Life. One Block at a Time.
                </div>
                <button className="btn-lg landing-btn-signup font-item" onClick={handleRedirect}>Sign Up Here</button>

              </div>
            </div>

            {/* Mission Section */}
              <div className="landing-section-mission landing-section scroll-child" id='mission-panel'>
                  <div className="landing-element">
                    <div className="landing-item font-header">
                      <span>OUR </span>
                      <span className="font-item-green">MISSION</span>
                    </div>
                    <div className="landing-item font-item" style={{margin:'2rem 14rem 12rem 14rem'}}>
                    BLOCKZ was created with a goal of helping individuals build patterns to improve productivity across all aspects of life. 
                    Our focus is on increasing personal awareness about how we use our most valuable resource, time.
                    </div>
                  </div>
                  <div className="landing-element mission-toolbar">
                    <div className="landing-item font-call2action mission-toolbar-item">
                      Time Blocking Tool 
                    </div>
                    <div className="landing-item font-call2action mission-toolbar-item">
                      To Do Lists 
                    </div>
                    <div className="landing-item font-call2action mission-toolbar-item">
                      Capture your Ideas 
                    </div>
                  </div>
              </div>


            {/* Timeblock Section */}
            <div className="landing-section2 landing-section scroll-child" id="tasking-panel">
                <div className="landing-element">
                  <img src="/Timeblock_Render.svg" alt="Placeholder for Tasking SVG" className="landing-timeblock-image" />
                </div>
                <div className="landing-element landing-taskpanel-header-pos">
                  <div className="landing-item">
                    <h1 className="font-item-green font-header">FLEXIBLE</h1>
                    <h1 className="font-item-translate1 font-header" >TIMEBLOCKING</h1>
                  </div>
                  <div className="landing-item landing-item-taskpanel-text">{`{Place Holder Text}`}</div>
                </div>
            </div>

            {/* To Do List Section */}
            <div className="landing-section2 landing-section scroll-child" id="tasking-panel">
                <div className="landing-element landing-taskpanel-header-pos">
                  <div className="landing-item">
                    <h1 className="font-item-green font-header">FOCUSED</h1>
                    <h1 className="font-item-translate2 font-header">TASKING</h1>
                  </div>
                  <div className="landing-item-task landing-item-taskpanel-text">{`{Place Holder Text}`}</div>
                </div>
                <div className="landing-element">
                  <img src="/Landing-Tasks.svg" alt="Placeholder for Tasking SVG" className="landing-tasks-image" />
                </div>
            </div>

            {/* <div className="landing-section4 landing-section" id='timeline-panel'>
              <div className='landing-roadmap-title'>
                <h1 className='roadmap-item-R'>Road</h1>
                <h1 className='roadmap-item-M'>Map</h1>
              </div>
              <div className='upper-roadmap-text' style={{display: 'flex', flexDirection:"row", justifyContent:'space-evenly', width:'100%'}}>
                <div style={{transform: "translateX(-125%)"}}>text 1 </div>
                <div> text 3 </div>
                <div> text 5 </div>
              </div>
              <img src="/Landing-Timeline.svg" alt="Placeholder for Timeline SVG" className="landing-timeline-image"/>
              <div className='lower-roadmap-text' style={{display: 'flex', flexDirection:"row", justifyContent:'space-evenly', width:'100%'}}>
                <div>text 2 </div>
                <div> text 4 </div>
              </div>
            </div> */}

        </div>
      </div>
    )

}

export default Landing

