import React, { useState, useEffect, useRef } from 'react';
import { X, ShieldCheck, AlertCircle, Loader2, ExternalLink, CheckCircle2 } from 'lucide-react';
import {
  GOOGLE_CLIENT_ID,
  loadGoogleScript,
  initGoogleIdentity,
  renderGoogleButton,
  triggerGoogleOAuthPopup
} from '../utils/googleAuth';

export default function GoogleAuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sdkReady, setSdkReady] = useState(false);
  const googleBtnContainerRef = useRef(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);

  // Load Google SDK and mount official button
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setErrorMessage('');

    loadGoogleScript()
      .then(() => {
        if (!isMounted) return;
        setSdkReady(true);

        // Initialize GIS for One Tap & Credential callback
        initGoogleIdentity({
          onSuccess: (user) => {
            if (!isMounted) return;
            setIsLoading(false);
            onLoginSuccess(user);
            onClose();
          },
          onError: (err) => {
            if (!isMounted) return;
            setIsLoading(false);
            console.error('Google Auth callback error:', err);
            setErrorMessage(err.message || 'Google Sign-In failed.');
          }
        });

        // Render official Google button into container
        if (googleBtnContainerRef.current) {
          googleBtnContainerRef.current.innerHTML = '';
          renderGoogleButton(googleBtnContainerRef.current, {
            theme: 'outline',
            size: 'large',
            shape: 'pill',
            width: 320,
            text: 'continue_with'
          });
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error('Failed to load Google SDK:', err);
        setErrorMessage('Failed to load Google Identity Services SDK. Please check internet connection.');
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, onLoginSuccess, onClose]);

  // Handle direct OAuth Popup button click
  const handlePopupLogin = () => {
    setErrorMessage('');
    triggerGoogleOAuthPopup({
      onStart: () => setIsLoading(true),
      onSuccess: (user) => {
        setIsLoading(false);
        onLoginSuccess(user);
        onClose();
      },
      onError: (err) => {
        setIsLoading(false);
        console.error('Google OAuth popup error:', err);
        setErrorMessage(
          err.message?.includes('origin')
            ? `Google origin mismatch: ${window.location.origin} is not registered in your Google Cloud Console Authorized JavaScript origins. Use http://localhost:5173 or add this URL to Google Cloud Console.`
            : (err.message || 'Google sign-in popup was cancelled or failed.')
        );
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col my-auto text-white">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Google 4-color SVG Logo */}
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-md shrink-0">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-black text-lg text-white">Google Sign In</h3>
              <p className="text-xs text-slate-400">OAuth 2.0 Authentication for HippiTV</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          <div className="space-y-1.5 text-center">
            <h4 className="text-sm font-bold text-slate-200">
              Sign in with your verified Google Account
            </h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Your child’s watch history and exact resume timestamps will be synchronized securely like YouTube.
            </p>
          </div>

          {/* Error Notice */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <div className="space-y-1">
                <p className="font-bold">Authentication Note</p>
                <p className="text-[11px] leading-relaxed text-rose-200/90">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Main Action Buttons */}
          <div className="space-y-3 flex flex-col items-center">
            
            {/* Primary Action: Direct Google OAuth Popup Flow */}
            <button
              onClick={handlePopupLogin}
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-black text-sm shadow-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-98 cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-slate-900" />
                  <span>Connecting with Google...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="w-full flex items-center gap-3 py-1">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">or official GIS button</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            {/* Official Google Identity Services Rendered Button Container */}
            <div className="w-full flex justify-center min-h-[44px]">
              <div ref={googleBtnContainerRef} className="flex justify-center" />
            </div>

          </div>

          {/* Security & Client ID Verification Badge */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                OAuth 2.0 Verified
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {window.location.hostname}
              </span>
            </div>
            
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Connected to Google Cloud Client:
              <span className="block font-mono text-[10px] text-amber-300/80 truncate mt-0.5">
                {GOOGLE_CLIENT_ID}
              </span>
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>Protected by Google Identity Services SDK</span>
          </div>

        </div>

      </div>
    </div>
  );
}
