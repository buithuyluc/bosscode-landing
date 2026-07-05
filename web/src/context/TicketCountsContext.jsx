import { createContext, useContext } from "react";
import { useTicketCounts } from "../hooks/useTicketCounts";

const TicketCountsContext = createContext(null);

export function TicketCountsProvider({ children }) {
  const value = useTicketCounts();
  return (
    <TicketCountsContext.Provider value={value}>
      {children}
    </TicketCountsContext.Provider>
  );
}

export function useTicketCountsContext() {
  const ctx = useContext(TicketCountsContext);
  if (!ctx) {
    throw new Error(
      "useTicketCountsContext must be used within a TicketCountsProvider"
    );
  }
  return ctx;
}
