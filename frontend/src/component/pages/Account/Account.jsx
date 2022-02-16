import React from 'react'


const Account = () => {
  return (
    <div className='account-page'>
        <div className='account-grid-wrapper'>
            <div className='account-grid-left'>
                <div className='account-nav-container'>
                    <h3 className='account-nav-header'>Account Settings</h3>
                    <div className='account-nav-element'> Profile Information </div>
                    <div className='account-nav-element'> General </div>
                    <div className='account-nav-element'> Display </div>
                    <div className='account-nav-element'> Data Privacy </div>
                </div>
            </div>
            <div className='account-grid-right'>
                <div className='account-information-container'>
                    Profile Information
                </div>
            </div>
        </div>
    </div>

  )
}

export default Account