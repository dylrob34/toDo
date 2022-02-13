
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
      {/* <h2>Welcome to this todo application</h2>
      <p>pretty stuff</p> */}
        <div className="landing-page">
            <div className="landing-section1 landing-section" id="hero-panel">
              <img alt="Blocks Logo" src="/blocks.svg" className="landing-logo landing-element" />
              <div className="landing-element" > 
                <div className="landing-call2action">
                  Build Your Productive Life. One Block at a Time.
                </div>
                <button className="btn-lg landing-btn-signup" onClick={handleRedirect}>Sign Up Here</button>
              </div>
            </div>
            <div className="landing-section2 landing-section" id="tasking-panel">
              <div className="landing-element landing-taskpanel-header-pos">
                <div className="landing-item">
                  <h1 className="landing-item-F">FOCUSED</h1>
                  <h1 className="landing-item-T">TASKING</h1>
                </div>
                <div className="landing-item landing-item-taskpanel-text">BLOCKZ offers...Use our buckets feature to filter tasks exactly as you want to see them. If that still not enough sort by any number of parameters or change the view of the whole page to best fit your style.</div>
              </div>
              <div className="landing-element">
                <img src="/Landing-Tasks.svg" alt="Placeholder for Tasking SVG" className="landing-tasks-image" />
              </div>
            </div>
            <div className="landing-section" id="timeblock-panel">
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

