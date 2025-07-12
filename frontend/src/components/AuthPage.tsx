import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useAuth } from "../contexts/AuthContext";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, register } = useAuth();

  const handleLogin = async (loginData: {
    email: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      setError(null);
      await login(loginData.email, loginData.password);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (registerData: {
    email: string;
    username: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      setError(null);
      await register(
        registerData.email,
        registerData.username,
        registerData.password
      );
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const switchToLogin = () => {
    setIsLogin(true);
    setError(null);
  };

  const switchToRegister = () => {
    setIsLogin(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <div className="flex justify-between items-center">
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="text-red-700 hover:text-red-900 ml-4"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {isLogin ? (
        <LoginForm
          onSubmit={handleLogin}
          onSwitchToRegister={switchToRegister}
          isLoading={isLoading}
        />
      ) : (
        <RegisterForm
          onSubmit={handleRegister}
          onSwitchToLogin={switchToLogin}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default AuthPage;
