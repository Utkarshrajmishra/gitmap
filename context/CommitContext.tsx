"use client"

import { BranchData } from "@/types";
import { createContext, ReactNode, useState } from "react";

interface CommitContextType {
  branches: BranchData[];
  setCommitData: (data: BranchData[]) => void;
}

const CommitContext = createContext<CommitContextType>({
  branches: [],
  setCommitData: () => {},
});

const CommitContextProvider = ({ children }: { children: ReactNode }) => {
  const [branches, setCommitData] = useState<BranchData[]>([]);

  return (
    <CommitContext.Provider value={{branches,setCommitData}}>
      {children}
    </CommitContext.Provider>
  );
};

export { CommitContext, CommitContextProvider };
