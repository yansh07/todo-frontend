import React from "react";
import { Github, Chrome, Shield, ArrowRight, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ThemeToggle from "./Themetoggle.jsx";

function Register() {
  const navigate = useNavigate();
  // We only need loginWithRedirect and isLoading from Auth0 here.
  const { loginWithRedirect, isLoading: auth0Loading } = useAuth0();

  // This function's only job is to send the user to Auth0. That's it.
  const handleGoogleSignup = () => {
    loginWithRedirect({
      connection: 'google-oauth2',
      screen_hint: 'signup', // Tell Auth0 to show the signup page
    });
  };

  const handleGitHubSignup = () => {
    loginWithRedirect({
      connection: 'github',
      screen_hint: 'signup',
    });
  };

  // If Auth0 is busy preparing the redirect, show a simple loading state.
  if (auth0Loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-theme-primary">
        <div className="card-theme p-8 rounded-2xl shadow-theme">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-theme-accent border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-theme-primary font-[satoshi] text-lg">Redirecting to login...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-theme-primary px-4 md:px-0 pt-16 md:pt-30 lg:pt-38 xl:pt-4">
      
      <div className="fixed top-10 right-2 z-50 md:right-30 md:pt-4 lg:pt-4 lg:right-54 xl:right-106 xl:top-6">
        <ThemeToggle />
      </div>

      <div className="card-theme p-8 md:p-10 lg:p-12 rounded-2xl shadow-theme w-full max-w-md md:max-w-lg lg:max-w-xl mb-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full btn-theme card-theme shadow-theme flex items-center justify-center">
            <UserPlus className="w-8 h-8 text-theme-gradient" />
          </div>
          <h2 className="text-3xl md:text-4xl font-[satoshi] font-bold text-theme-gradient  mb-2">
            Join PlanIt 📋
          </h2>
          <p className="text-theme-secondary font-[satoshi] text-lg font-medium">
            Start your journey with us today 🚀
          </p>
        </div>

        {/* Auth0 Signup Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleGoogleSignup}
            disabled={auth0Loading}
            className="group btn-theme w-full py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Chrome className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            Sign up with Google
            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
          </button>

          <button
            onClick={handleGitHubSignup}
            disabled={auth0Loading}
            className="group btn-theme w-full py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Github className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            Sign up with GitHub
            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-theme-secondary font-[satoshi] text-sm mb-4">
            Secured by Auth0 🔒
          </p>
          <p className="font-[satoshi] text-theme-secondary">
            Already have an account?
            <button
              onClick={() => navigate("/login")}
              className="ml-2 text-theme-accent underline hover:text-theme-gradient transition-all duration-200 font-semibold"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;