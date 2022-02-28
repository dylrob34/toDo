import React, {useContext, createContext, useState, useEffect} from 'react';
import { post, get } from "../tools/request";

const settingsContext = createContext();
const updateSettingsContext = createContext();

export function useSettingsContext() {
    return useContext(settingsContext);
}

export function useUpdateSettingsContext() {
    return useContext(updateSettingsContext)
}


export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState({});

    const saveSettings = (newSettings) => {
        setSettings(newSettings);
        post("/api/user/updateUser", newSettings);
    }

    return (
        <settingsContext.Provider value={settings}>
            <updateSettingsContext.Provider value={saveSettings}>
                {children}
            </updateSettingsContext.Provider>
        </settingsContext.Provider>
    )
}

