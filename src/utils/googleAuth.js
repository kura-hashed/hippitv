/**
 * Google Identity Services (GIS) & OAuth 2.0 Integration for HippiTV
 * Client ID: 636192574810-avallqa8rd4ms83opoo4qgliqr32vh5u.apps.googleusercontent.com
 */

export const GOOGLE_CLIENT_ID = '636192574810-avallqa8rd4ms83opoo4qgliqr32vh5u.apps.googleusercontent.com';

/**
 * Safely parse Google JWT ID Token payload
 */
export function parseGoogleJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error('Failed to parse Google ID token:', err);
    return null;
  }
}

/**
 * Ensure Google Identity Services script is loaded
 */
export function loadGoogleScript() {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts) {
      resolve(window.google);
      return;
    }

    const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.google));
      existingScript.addEventListener('error', (e) => reject(e));
      // Poll briefly if already loaded
      const timer = setInterval(() => {
        if (window.google?.accounts) {
          clearInterval(timer);
          resolve(window.google);
        }
      }, 100);
      setTimeout(() => {
        clearInterval(timer);
        if (window.google?.accounts) resolve(window.google);
        else reject(new Error('Timeout loading Google SDK'));
      }, 5000);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google);
    script.onerror = (e) => reject(e);
    document.head.appendChild(script);
  });
}

/**
 * Initialize Google Identity Services (GIS)
 */
export function initGoogleIdentity({ onSuccess, onError, autoSelect = false }) {
  if (!window.google?.accounts?.id) {
    console.warn('Google accounts ID library not ready');
    return;
  }

  window.google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: (response) => {
      if (!response.credential) {
        if (onError) onError(new Error('No credential returned from Google'));
        return;
      }
      const payload = parseGoogleJwt(response.credential);
      if (!payload) {
        if (onError) onError(new Error('Failed to parse Google user payload'));
        return;
      }
      const user = {
        googleId: payload.sub,
        email: payload.email,
        name: payload.name,
        avatar: payload.picture,
        emailVerified: payload.email_verified,
        loginMethod: 'google_gis',
        credential: response.credential,
        loginAt: Date.now()
      };
      if (onSuccess) onSuccess(user);
    },
    auto_select: autoSelect,
    cancel_on_tap_outside: true,
  });
}

/**
 * Render official Google Sign-In button into a DOM container
 */
export function renderGoogleButton(containerElement, options = {}) {
  if (!window.google?.accounts?.id || !containerElement) return;

  const defaultOptions = {
    theme: 'outline',
    size: 'large',
    type: 'standard',
    shape: 'pill',
    text: 'signin_with',
    logo_alignment: 'left',
    width: 320,
    ...options
  };

  try {
    window.google.accounts.id.renderButton(containerElement, defaultOptions);
  } catch (e) {
    console.error('Failed to render Google button:', e);
  }
}

/**
 * Trigger authentic Google OAuth 2.0 popup using OAuth2 Token Client
 * Returns user profile via Google UserInfo API
 */
export function triggerGoogleOAuthPopup({ onSuccess, onError, onStart }) {
  if (!window.google?.accounts?.oauth2) {
    if (onError) onError(new Error('Google OAuth2 SDK not loaded yet. Please wait a moment.'));
    return;
  }

  if (onStart) onStart();

  try {
    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: 'email profile openid',
      callback: async (tokenResponse) => {
        if (tokenResponse.error) {
          console.error('Google OAuth token error:', tokenResponse);
          if (onError) onError(new Error(tokenResponse.error_description || tokenResponse.error));
          return;
        }

        if (!tokenResponse.access_token) {
          if (onError) onError(new Error('No access token received from Google'));
          return;
        }

        try {
          // Fetch authenticated Google user profile from Google's userinfo API
          const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          });

          if (!res.ok) {
            throw new Error(`Google UserInfo API returned status ${res.status}`);
          }

          const profile = await res.json();
          const user = {
            googleId: profile.sub,
            email: profile.email,
            name: profile.name,
            avatar: profile.picture,
            emailVerified: profile.email_verified,
            loginMethod: 'google_oauth2_popup',
            accessToken: tokenResponse.access_token,
            loginAt: Date.now()
          };

          if (onSuccess) onSuccess(user);
        } catch (fetchErr) {
          console.error('Failed to fetch Google profile with token:', fetchErr);
          if (onError) onError(fetchErr);
        }
      },
      error_callback: (err) => {
        console.error('Google OAuth2 Client error:', err);
        if (onError) onError(new Error(err.message || 'Google popup sign-in was closed or failed.'));
      }
    });

    tokenClient.requestAccessToken({ prompt: 'select_account' });
  } catch (err) {
    console.error('Exception starting Google OAuth popup:', err);
    if (onError) onError(err);
  }
}
