import { useEffect, useState } from "react";
import { getClientConfig } from "../api/clientConfigApi.js";

export function useClientConfig() {
  const [config, setConfig] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getClientConfig()
      .then((result) => {
        if (!cancelled) setConfig(result);
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setError(err);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { config, error };
}
