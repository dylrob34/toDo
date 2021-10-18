// import React, { useContext, createContext, useState } from 'react'

// // Creating a custom Hook(s) so that we can use this throughout the App.
// export function useCounter() {
//     return useContext(CounterContext)
// }
// export function useCounterUpdate() {
//     return useContext(CounterUpdateContext)
// }


// // This was creating the 
// const CounterContext = React.createContext();
// const CounterUpdateContext = React.createContext();

// export function CounterProvider({ children }) {

//     const [counter, setCounter] = useState(0)

//     function incCounter() {
//         setCounter(counter + 1)

//     }
//     return (
//         <CounterContext.Provider value={counter}>
//             <CounterUpdateContext.Provider value={incCounter}>
//                 {children}
//             </CounterUpdateContext.Provider>
//         </CounterContext.Provider>
//     )
// }



