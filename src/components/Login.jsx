import React from "react";
import { Github, Chrome, Shield, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ThemeToggle from "./Themetoggle.jsx";

function Login() {
  const navigate = useNavigate();
  const { loginWithRedirect, isLoading: auth0Loading } = useAuth0();

  const handleGoogleLogin = () => {
    loginWithRedirect({
      connection: 'google-oauth2',
    });
  };

  const handleGitHubLogin = () => {
    loginWithRedirect({
      connection: 'github',
    });
  };

  if (auth0Loading) {
    return (
      <div className="min-h-screen bg-theme-primary flex items-center justify-center p-4">
        <div className="card-theme p-6 sm:p-8 rounded-2xl shadow-theme max-w-sm w-full">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-theme-accent border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-theme-primary font-[satoshi] text-base sm:text-lg">
              Redirecting to login...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-primary relative">
      {/* Theme Toggle - Positioned responsively */}
      <div className="fixed bottom-4 right-2 z-50">
        <ThemeToggle />
      </div>

      {/* Main Content Container */}
      <div className="flex items-center justify-center min-h-screen p-4 pt-16 sm:pt-4">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
          <div className="card-theme p-6 sm:p-8 lg:p-10 rounded-2xl shadow-theme">
            
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full btn-theme card-theme shadow-theme flex items-center justify-center">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-theme-gradient" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-[satoshi] font-bold text-theme-gradient glow-effect mb-2">
                Welcome Back 🚀
              </h2>
              <p className="text-theme-secondary font-[satoshi] text-sm sm:text-base lg:text-lg font-medium px-2">
                Sign in securely to manage your tasks
              </p>
            </div>

            {/* Auth0 Login Buttons */}
            <div className="space-y-3 sm:space-y-4">
              <button
                onClick={handleGoogleLogin}
                disabled={auth0Loading}
                className="group btn-theme w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold text-sm sm:text-base lg:text-lg flex items-center justify-center gap-2 sm:gap-3 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                <Chrome className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
                <span className="flex-1">Continue with Google</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
              </button>

              <button
                onClick={handleGitHubLogin}
                disabled={auth0Loading}
                className="group btn-theme w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold text-sm sm:text-base lg:text-lg flex items-center justify-center gap-2 sm:gap-3 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                <Github className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
                <span className="flex-1">Continue with GitHub</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
              </button>
            </div>

            {/* Footer */}
            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-theme-secondary font-[satoshi] text-xs sm:text-sm mb-3 sm:mb-4">
                Secured by Auth0 🔒
              </p>
              <p className="font-[satoshi] text-theme-secondary text-sm sm:text-base">
                Don't have an account?
                <button
                  onClick={() => navigate("/register")}
                  className="ml-2 text-theme-accent font-semibold underline hover:text-theme-gradient transition-all duration-200 text-sm sm:text-base"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <ThemeToggle /> */}
    </div>
  );
}

export default Login;