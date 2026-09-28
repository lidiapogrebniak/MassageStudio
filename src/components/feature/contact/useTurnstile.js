import { useEffect, useRef, useState } from "react";
import { texts } from "../../../data/texts.uk";

const TURNSTILE_POLL_INTERVAL_MS = 300;
const TURNSTILE_GIVEUP_TIMEOUT_MS = 10000;

export function useTurnstile(siteKey) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [token, setToken] = useState(null);
  const [loadError, setLoadError] = useState(null);

  const reset = () => {
    if (widgetIdRef.current !== null && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
    setToken(null);
  };

  useEffect(() => {
    // The site key arrives asynchronously from /api/client-config
    if (!siteKey) return;

    let cancelled = false;
    let intervalId = null;
    let giveupTimeoutId = null;

    const renderWidget = () => {
      if (cancelled || widgetIdRef.current !== null || !containerRef.current) {
        return;
      }
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token) => {
          setToken(token);
        },
        "expired-callback": () => {
          setToken(null);
        },
        "error-callback": () => {
          setToken(null);
        },
      });
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
      if (giveupTimeoutId !== null) {
        clearTimeout(giveupTimeoutId);
        giveupTimeoutId = null;
      }
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      intervalId = setInterval(() => {
        if (!cancelled && window.turnstile) {
          renderWidget();
        }
      }, TURNSTILE_POLL_INTERVAL_MS);

      giveupTimeoutId = setTimeout(() => {
        if (cancelled) return;
        if (intervalId !== null) {
          clearInterval(intervalId);
          intervalId = null;
        }
        if (widgetIdRef.current === null) {
          setLoadError(texts.contactModal.captchaLoadErrorMessage);
        }
      }, TURNSTILE_GIVEUP_TIMEOUT_MS);
    }

    return () => {
      cancelled = true;
      if (intervalId !== null) clearInterval(intervalId);
      if (giveupTimeoutId !== null) clearTimeout(giveupTimeoutId);
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  return { token, containerRef, loadError, reset };
}
