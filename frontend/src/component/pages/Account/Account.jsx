import React, {useEffect, useState} from 'react'
import { useSettingsContext, useUpdateSettingsContext } from "../../../context/SettingsContext";
import { FiSquare, FiCheckSquare } from "react-icons/fi";

const Account = (props) => {
    const [profile, setProfile] = useState(false)
    const [page, setPage] = useState("profile");
    const [data, setData] = useState(props.data);
    const updateSettings = useUpdateSettingsContext();
    const settings = useSettingsContext();
    

    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    const save = (key, value) => {
        setData({...data, [key]: value})
    }

  return (
    <div className='account-page'>
        <div className='account-grid-wrapper'>
            <div className='account-grid-left'>
                <div className='account-nav-container'>
                    <h3 className='account-nav-header'>Account Settings</h3>
                    <div className='account-nav-element' onClick={() => setPage('profile') }> Profile Information </div>
                    <div className='account-nav-element' onClick={() => setPage('general')}> General </div>
                    <div className='account-nav-element' onClick={() => setPage('display')}> Display </div>
                    <div className='account-nav-element' onClick={() => setPage('data privacy')}> Data Privacy </div>
                </div>
            </div>
            <div className='account-grid-right'>
                <div className='account-information-container'>
                    { page==="profile" ? <div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start", width:"100%"}}>
                    <h3 className='account-info-header' style={{display:'flex', alignItems:'flex-start', paddingRight:'6.65rem'}}>Profile Information</h3>
                        <div className='account-info-content-row' style={{marginTop:'2rem'}}>
                            <div className='account-info-content-item account-font-label'>First Name:</div>
                            <input className="input-name account-font-input" type="text" value={settings.firstName} onChange={(e) => updateSettings({...settings, firstName: e.target.value})} />
                            <div className='account-info-content-item account-font-label'>Last Name:</div>
                            <input className="input-name account-font-input" type="text" value={settings.lastName} onChange={(e) => updateSettings({...settings, lastName: e.target.value})} />
                        </div>
                        <div className='account-info-content-row'>
                            <div className='account-info-content-item account-font-label'>Gender:</div>
                            <select className="selector-gender input-row account-font-input" name="gender" id="gender" value={settings.gender} onChange={(e) => updateSettings({...settings, gender: e.target.value})}>
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Pnts">Rather not say</option>
                            </select>
                        </div>
                        <div className='account-info-content-row'>
                            <div className='account-info-content-item account-font-label'>Date of Birth:</div>
                            <div id="row" className='input-row'>
                                <div className='stack-date'>
                                    <span className='account-font-DOB'>Day</span>
                                    <input className='input-DOB account-font-input' type="text" name='day' value={settings.day} onChange={(e) => updateSettings({...settings, day: e.target.value})}/>
                                </div>
                                <div className='stack-date'>
                                    <span className='account-font-DOB'>Month</span>
                                    <input className='input-DOB account-font-input' type="text" name='month' value={settings.month} onChange={(e) => updateSettings({...settings, month: e.target.value})} />
                                </div>
                                <div className='stack-date'>
                                    <span className='account-font-DOB'>Year</span>
                                    <input className='input-DOB account-font-input' type="text" name='year' value={settings.year} onChange={(e) => updateSettings({...settings, year: e.target.value})}/>
                                </div>
                            </div>
                        </div>
                        <div>
                            {/* <div>Change Password:</div>
                            <input type="text" />
                            <input type="text" />
                            <button>Change Password</button> */}
                        </div>
                    </div> : null}
                    {page==="general" ? <div> 
                        <h3 className='account-info-header' style={{display:'flex', alignItems:'flex-start'}}>General</h3>
                        <div className='account-gen-content-row'>
                            <div className='account-gen-content-item account-font-label stack-gen-button'>
                                <div className='account-font-title'>
                                    Show Completed Tasks
                                </div>
                                <span className='account-font-desc'>(Default shows completed tasks)</span>
                            </div>
                            <div className='gen-icon'>{settings.showCompleted ? <FiCheckSquare onClick={(e) => updateSettings({...settings, showCompleted: false})}/> : <FiSquare onClick={(e) => updateSettings({...settings, showCompleted: true})}/> }</div>
                        </div>
                        <div className='account-gen-content-row'>
                            <div className='account-gen-content-item account-font-label stack-gen-button'>
                                <div className='account-font-title'>
                                    Show Military Time
                                </div>
                                <span className='account-font-desc'>(Default shows standard time display)</span>
                            </div>
                            <div className='gen-icon'>{settings.timeSetting ? <FiCheckSquare onClick={(e) => updateSettings({...settings, timeSetting: false})}/> : <FiSquare onClick={(e) => updateSettings({...settings, timeSetting: true})}/> }</div>
                        </div>
                    </div> : null }
                    {page ==="display" ? <div> Display</div> : null }
                    {page ==="data privacy" ? <div> Data Privacy</div> : null}
                    
                    
                </div>
            </div>
        </div>
    </div>

  )

}

export default Account