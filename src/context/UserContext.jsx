import { createContext, useContext, useState } from "react";

//create context
const UserContext = createContext();

//provider
export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);