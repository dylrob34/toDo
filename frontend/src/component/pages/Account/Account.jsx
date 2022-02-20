import React, {useEffect, useState} from 'react'


const Account = (props) => {
    const [profile, setProfile] = useState(false)
    const [page, setPage] = useState("profile");
    const [data, setData] = useState(props.data);

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
                    { page==="profile" ? <div>
                        <h3 className='account-info-header'>Profile Information</h3>
                        <div>
                            <div>Name:</div>
                            <input type="text" />
                        </div>
                        <div>
                            <div>Gender:</div>
                            <select name="gender" id="gender">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="pnts">Prefer not to say</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <div>Date of Birth:</div>
                            <div name="cols">
                                <input type="text" name='day' />
                                <input type="text" name='month' />
                                <input type="text" name='year' />
                            </div>
                        </div>
                        <div>
                            <div>Change Password:</div>
                            <input type="text" />
                            <input type="text" />
                            <button>Change Password</button>
                        </div>
                    </div> : null}
                    { page==="general" ? <div> General</div> : null }
                    {page ==="display" ? <div> Display</div> : null }
                    {page ==="data privacy" ? <div> Data Privacy</div> : null}
                    
                    
                </div>
            </div>
        </div>
    </div>

  )

}

export default Account