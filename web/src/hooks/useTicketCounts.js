import { useCallback, useEffect, useState } from "react";
import { fetchTicketCounts, TICKET_LIMITS } from "../lib/registrations";

export function useTicketCounts() {
  const [state, setState] = useState({
    goldLeft: null,
    silverLeft: null,
    loading: true,
    error: null,
  });

  const refresh = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: null }));
    fetchTicketCounts()
      .then(({ goldLeft, silverLeft }) =>
        setState({ goldLeft, silverLeft, loading: false, error: null })
      )
      .catch((error) =>
        setState((s) => ({ ...s, loading: false, error }))
      );
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { ...state, limits: TICKET_LIMITS, refresh };
}
