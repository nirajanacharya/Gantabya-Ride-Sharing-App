import { createContext, useContext, useState } from 'react';

// Create context
export const CaptainDataContext = createContext();

export const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Update captain data function
    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    };

    const value = {
        captain,
        isLoading,
        error,
        updateCaptain, // Provide the updateCaptain function in the context value
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;
