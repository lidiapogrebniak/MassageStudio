let clientConfigPromise = null;

export function getClientConfig() {
  if (!clientConfigPromise) {
    clientConfigPromise = fetch("/api/client-config")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch client config: " + res.statusText);
        }
        return res.json();
      })
      .catch((error) => {
        // Allow a retry on the next call instead of caching the failure
        clientConfigPromise = null;
        throw error;
      });
  }

  return clientConfigPromise;
}
