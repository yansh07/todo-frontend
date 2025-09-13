import React, { useEffect, useState } from "react";
import { Github, Chrome, Shield, ArrowRight, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../context/UserContext.jsx";
import ThemeToggle from "./Themetoggle.jsx";
import { toast } from "react-toastify";

function Register() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const { 
    loginWithRedirect, 
    isAuthenticated, 
    user: auth0User, 
    isLoading: auth0Loading,
    getAccessTokenSilently 
  } = useAuth0();

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Handle Auth0 authentication success
  useEffect(() => {
    const handleAuth0Success = async () => {
      if (isAuthenticated && auth0User && !auth0Loading) {
        try {
          setIsLoading(true);
          
          // Get Auth0 access token
          const accessToken = await getAccessTokenSilently();
          
          // Send user data to your backend to create/update user
          const res = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/api/user/auth0-signup",
            {
              method: "POST",
              headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
              },
              body: JSON.stringify({
                email: auth0User.email,
                fullName: auth0User.name,
                profilePic: auth0User.picture,
                auth0Id: auth0User.sub,
                isNewUser: true // Flag to indicate this is a signup
              }),
            }
          );

          const data = await res.json();

          if (res.ok) {
            // Show success toast
            toast.success("Account created successfully! Welcome aboard! 🎉");
            // Store your backend token
            localStorage.setItem("token", data.token);
            setUser(data.user);
            navigate("/dashboard");
          } else {
            setErrors({ general: data.error || "Registration failed" });
            toast.error(data.error || "Registration failed");
          }
        } catch (err) {
          console.error("Auth0 registration error:", err);
          setErrors({ general: "Registration failed. Please try again." });
          toast.error("Registration failed. Please try again.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    handleAuth0Success();
  }, [isAuthenticated, auth0User, auth0Loading, getAccessTokenSilently, setUser, navigate]);

  const handleGoogleSignup = () => {
    loginWithRedirect({
      connection: 'google-oauth2',
      screen_hint: 'signup', // This tells Auth0 to show signup flow
      appState: {
        returnTo: "/dashboard",
        mode: "signup"
      }
    });
  };

  const handleGitHubSignup = () => {
    loginWithRedirect({
      connection: 'github',
      screen_hint: 'signup',
      appState: {
        returnTo: "/dashboard",
        mode: "signup"
      }
    });
  };

  // const handleEmailSignup = () => {
  //   loginWithRedirect({
  //     screen_hint: 'signup', // This tells Auth0 to show signup form by default
  //     appState: {
  //       returnTo: "/dashboard",
  //       mode: "signup"
  //     }
  //   });
  // };

  // Show loading state
  if (auth0Loading || (isAuthenticated && isLoading)) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-theme-primary">
        <div className="card-theme p-8 rounded-2xl shadow-theme">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-theme-accent border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-theme-primary font-[satoshi] text-lg">Creating your account...</p>
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
        {errors.general && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="error-theme text-sm text-center">{errors.general}</p>
          </div>
        )}
        
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
          {/* Google Signup */}
          <button
            onClick={handleGoogleSignup}
            disabled={isLoading}
            className="group btn-theme w-full py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Chrome className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            Sign up with Google
            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
          </button>

          {/* GitHub Signup */}
          <button
            onClick={handleGitHubSignup}
            disabled={isLoading}
            className="group btn-theme w-full py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Github className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            Sign up with GitHub
            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
          </button>

          {/* Email/Password via Auth0 */}
          {/* <button
            onClick={handleEmailSignup}
            disabled={isLoading}
            className="group btn-theme w-full py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Shield className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            Sign up with Email
            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
          </button> */}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-theme-secondary font-[satoshi] text-sm mb-4">
            Secured by Auth0 🔒
          </p>
          <p className="font-[satoshi] text-theme-secondary">
            Already have an account?
            <a
              href="/login"
              className="ml-2 text-theme-accent underline hover:text-theme-gradient transition-all duration-200 font-semibold"
            >
              Login
            </a>
          </p>
        </div>

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-theme-primary/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-theme-accent border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-theme-primary font-[satoshi]">Creating account...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;