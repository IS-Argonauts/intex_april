// hooks/useCookieConsent.ts
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';


export type ConsentStatus = 'granted' | 'denied' | 'unset';

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<ConsentStatus>('unset');

  useEffect(() => {
    const storedConsent = Cookies.get('cineniche_cookie_consent') as ConsentStatus | undefined;
    if (storedConsent) {
      setConsent(storedConsent);
    }
  }, []);

  const grantConsent = () => {
    Cookies.set('cineniche_cookie_consent', 'granted', { expires: 365 });
    setConsent('granted');
  };

  const denyConsent = () => {
    Cookies.set('cineniche_cookie_consent', 'denied', { expires: 365 });
    setConsent('denied');
  };

  const resetConsent = () => {
    Cookies.remove('cineniche_cookie_consent');
    setConsent('unset');
  };

  return { consent, grantConsent, denyConsent, resetConsent };
};
