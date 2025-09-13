import React, { useEffect, useState } from "react";
import { Github, Chrome, Shield, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../context/UserContext.jsx";
import ThemeToggle from "./Themetoggle.jsx";
import Register from "./Register.jsx";

function Login() {
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
            import.meta.env.VITE_BACKEND_URL + "/api/user/auth0-login",
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
                auth0Id: auth0User.sub
              }),
            }
          );

          const data = await res.json();

          if (res.ok) {
            // Store your backend token
            localStorage.setItem("token", data.token);
            setUser(data.user);
            navigate("/dashboard");
          } else {
            setErrors({ general: data.error || "Authentication failed" });
          }
        } catch (err) {
          console.error("Auth0 integration error:", err);
          setErrors({ general: "Authentication failed. Please try again." });
        } finally {
          setIsLoading(false);
        }
      }
    };

    handleAuth0Success();
  }, [isAuthenticated, auth0User, auth0Loading, getAccessTokenSilently, setUser, navigate]);

  const handleGoogleLogin = () => {
    loginWithRedirect({
      connection: 'google-oauth2',
      appState: {
        returnTo: "/dashboard"
      }
    });
  };

  const handleGitHubLogin = () => {
    loginWithRedirect({
      connection: 'github',
      appState: {
        returnTo: "/dashboard"
      }
    });
  };

  // const handleEmailLogin = () => {
  //   loginWithRedirect({
  //     appState: {
  //       returnTo: "/dashboard"
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
            <p className="text-theme-primary font-[satoshi] text-lg">Authenticating...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-theme-primary px-4 md:px-0 pt-24 xl:pt-2">
      
      <div className="fixed top-10 right-2 z-50 md:right-30 md:pt-4 lg:pt-4 lg:right-54 xl:right-106 xl:top-6">
        <ThemeToggle />
      </div>

      <div className="card-theme p-8 md:p-10 lg:p-12 rounded-2xl shadow-theme w-full max-w-md md:max-w-lg lg:max-w-xl">
        {errors.general && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="error-theme text-sm text-center">{errors.general}</p>
          </div>
        )}
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full btn-theme card-theme shadow-theme flex items-center justify-center">
            <Shield className="w-8 h-8 text-theme-gradient" />
          </div>
          <h2 className="text-3xl md:text-4xl font-[satoshi] font-bold text-theme-gradient glow-effect mb-2">
            Welcome Back 🚀
          </h2>
          <p className="text-theme-secondary font-[satoshi] text-lg font-medium">
            Sign in securely to manage your tasks
          </p>
        </div>

        {/* Auth0 Login Buttons */}
        <div className="space-y-4">
          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="group btn-theme w-full py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Chrome className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            Continue with Google
            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
          </button>

          {/* GitHub Login */}
          <button
            onClick={handleGitHubLogin}
            disabled={isLoading}
            className="group btn-theme w-full py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Github className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            Continue with GitHub
            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
          </button>

          {/* Email/Password via Auth0 */}
          {/* <button
            onClick={handleEmailLogin}
            disabled={isLoading}
            className="group btn-theme w-full py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Shield className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            Continue with Email
            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
          </button> */}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-theme-secondary font-[satoshi] text-sm">
            Secured by Auth0 🔒
          </p>
          <p className="mt-4 font-[satoshi] text-theme-secondary">
            Don't have an account?
            <span className="ml-2 text-theme-accent font-semibold cursor-pointer hover:text-theme-gradient transition-all duration-200">
              Sign up automatically on first login ✨
            </span>
          </p>
        </div>

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-theme-primary/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-theme-accent border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-theme-primary font-[satoshi]">Please wait...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;