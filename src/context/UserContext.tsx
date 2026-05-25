import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface User {
  name: string;
  email: string;
}

export interface AssignedMember {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface OnboardingProject {
  name: string;
  category: string;
  dueDate: string;
  description: string;
}

interface SessionState {
  user: User | null;
  project: OnboardingProject | null;
  assignedMembers: AssignedMember[];
}

type UserContextType = SessionState & {
  registerUser: (user: User) => void;
  signInUser: (user: User) => void;
  completeSetup: (project: OnboardingProject, assignedMembers: AssignedMember[]) => void;
  addAssignedMember: (member: Omit<AssignedMember, "id">) => void;
};

const STORAGE_KEY = "goodday-onboarding";
const initialSession: SessionState = { user: null, project: null, assignedMembers: [] };
const UserContext = createContext<UserContextType | undefined>(undefined);

function loadSession(): SessionState {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return initialSession;

  try {
    return { ...initialSession, ...JSON.parse(saved) as SessionState };
  } catch {
    return initialSession;
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<SessionState>(loadSession);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }, [session]);

  function registerUser(user: User) {
    setSession({ user, project: null, assignedMembers: [] });
  }

  function signInUser(user: User) {
    setSession((current) => (
      current.user?.email === user.email
        ? { ...current, user }
        : { user, project: null, assignedMembers: [] }
    ));
  }

  function completeSetup(project: OnboardingProject, assignedMembers: AssignedMember[]) {
    setSession((current) => ({ ...current, project, assignedMembers }));
  }

  function addAssignedMember(member: Omit<AssignedMember, "id">) {
    setSession((current) => ({
      ...current,
      assignedMembers: [
        ...current.assignedMembers,
        { ...member, id: `assigned-${Date.now()}` },
      ],
    }));
  }

  return (
    <UserContext.Provider value={{ ...session, registerUser, signInUser, completeSetup, addAssignedMember }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
}
