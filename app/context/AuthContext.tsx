import { createContext, useContext, useState } from "react";

interface AuthContextType {
  unlocked: boolean;
  allowUnlock: boolean;
  unlock: () => void;
  lock: () => void;
  grantUnlockAccess: () => void;
  revokeUnlockAccess: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [unlocked, setUnlocked] = useState(false);
  const [allowUnlock, setAllowUnlock] = useState(false);

  const unlock = () => setUnlocked(true);
  const lock = () => setUnlocked(false);

  const grantUnlockAccess = () => setAllowUnlock(true);
  const revokeUnlockAccess = () => setAllowUnlock(false);

  return (
    <AuthContext.Provider
      value={{
        unlocked,
        allowUnlock,
        unlock,
        lock,
        grantUnlockAccess,
        revokeUnlockAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  return context;
};
