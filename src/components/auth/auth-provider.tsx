import React, { useState } from "react";

import { IAPIToken } from "../../model/api-token";

export const AuthContext = React.createContext<{
    setToken: (token: IAPIToken | undefined) => void;
    token: IAPIToken | undefined;
}>({
    setToken: () => undefined,
    token: undefined,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState();

    return <AuthContext.Provider value={{ token, setToken }}>{children}</AuthContext.Provider>;
};
