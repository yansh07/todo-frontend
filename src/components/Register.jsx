import React from "react";
import { Github, Chrome, Shield, ArrowRight, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// import ThemeToggle from "./Themetoggle.jsx";


function Register() {
  const navigate = useNavigate();
  const { loginWithRedirect, isLoading: auth0Loading } = useAuth0();

  const handleGoogleSignup = () => {
    loginWithRedirect({
      connection: 'google-oauth2',
      screen_hint: 'signup',
    });
  };

  const handleGitHubSignup = () => {
    loginWithRedirect({
      connection: 'github',
      screen_hint: 'signup',
    });
  };

  if (auth0Loading) {
    return (
      <div className="min-h-screen bg-theme-primary flex items-center justify-center p-4">
        <div className="card-theme p-6 sm:p-8 rounded-2xl shadow-theme max-w-sm w-full">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-theme-accent border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-theme-primary font-[Nunito] text-base sm:text-lg">
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
      {/* <div className="absolute top-4 right-2 xl:right-24 z-50">
        <ThemeToggle />
      </div> */}

      {/* Main Content Container */}
      <div className="flex items-center justify-center min-h-screen p-4 pt-16 sm:pt-4">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
          <div className="card-theme p-6 sm:p-8 lg:p-10 rounded-2xl shadow-theme">
            
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full btn-theme card-theme shadow-theme flex items-center justify-center">
                <UserPlus className="w-6 h-6 sm:w-8 sm:h-8 text-theme-secondary" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-[Nunito] font-bold text-theme-gradient mb-2">
                Join PlanIt 📋
              </h2>
              <p className="text-theme-secondary font-[Nunito] text-sm sm:text-base lg:text-lg font-medium px-2">
                Start your journey with us today 🚀
              </p>
            </div>

            {/* Auth0 Signup Buttons */}
            <div className="space-y-3 sm:space-y-4">
              <button
                onClick={handleGoogleSignup}
                disabled={auth0Loading}
                className="group btn-theme w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold text-sm sm:text-base lg:text-lg flex items-center justify-center gap-2 sm:gap-3 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                <Chrome className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
                <span className="flex-1">Sign up with Google</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
              </button>

              <button
                onClick={handleGitHubSignup}
                disabled={auth0Loading}
                className="group btn-theme w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold text-sm sm:text-base lg:text-lg flex items-center justify-center gap-2 sm:gap-3 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                <Github className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
                <span className="flex-1">Sign up with GitHub</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
              </button>
            </div>

            {/* Footer */}
            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-theme-secondary font-[Nunito] text-xs sm:text-sm mb-3 sm:mb-4">
                Secured by Auth0 🔒
              </p>
              <p className="font-[Nunito] text-theme-secondary text-sm sm:text-base">
                Already have an account?
                <button
                  onClick={() => navigate("/login")}
                  className="ml-2 text-theme-accent underline hover:text-theme-gradient transition-all duration-200 font-semibold text-sm sm:text-base"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;