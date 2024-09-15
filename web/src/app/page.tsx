"use client";

import ApiClient from "@/api";
import { motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { Button, Checkbox, Input } from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import Link from "next/link";

const apiClient = new ApiClient();
type Variant = "LOGIN" | "SIGNUP";

const Home = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    rememberMe: false,
  });

  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
  });

  const toggleVisibility = () => setIsVisible(!isVisible);
  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  };

  const isInvalidEmail = useMemo(() => {
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email);
  }, [data.email]);

  const isUsernameValid = useMemo(() => {
    return data.username.trim() === "";
  }, [data.username]);

  const isPasswordValid = useMemo(() => {
    return data.password.trim() === "";
  }, [data.password]);

  const toggleVariant = useCallback(() => {
    setData({
      username: "",
      email: "",
      password: "",
      rememberMe: false,
    });
    setTouched({
      username: false,
      email: false,
      password: false,
    });
    setIsVisible(false);
    if (variant === "LOGIN") {
      setVariant("SIGNUP");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const isFormValid = useMemo(() => {
    if (variant === "SIGNUP") {
      return !isInvalidEmail && !isUsernameValid && !isPasswordValid;
    } else {
      return !isInvalidEmail && !isPasswordValid;
    }
  }, [isInvalidEmail, isUsernameValid, isPasswordValid, variant]);

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100 h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            alt="Logo"
            height="48"
            width="48"
            className="mx-auto w-auto"
            src="/images/logo.png"
          />
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tighter text-gray-900">
            {variant == "LOGIN"
              ? "Sign in to your account"
              : "Create an account"}
          </h2>
          <div className="bg-white px-4 py-8 shadow-2xl sm:rounded-lg sm:px-10">
            <form className="space-y-6">
              {variant == "SIGNUP" && (
                <Input
                  label="Username"
                  isRequired
                  type="text"
                  variant="underlined"
                  value={data.username}
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                  onBlur={() => handleBlur("username")}
                  isInvalid={touched.username && isUsernameValid}
                  errorMessage="Username is required"
                  color={
                    touched.username && isUsernameValid ? "danger" : "default"
                  }
                />
              )}
              <Input
                label="Email Adresse"
                isRequired
                type="email"
                variant="underlined"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                onBlur={() => handleBlur("email")}
                isInvalid={touched.email && isInvalidEmail}
                errorMessage="Email is required"
                color={touched.email && isInvalidEmail ? "danger" : "default"}
              />

              <Input
                label="Passwort"
                isRequired
                variant="underlined"
                type={isVisible ? "text" : "password"}
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                endContent={
                  <button
                    className="focus:outline-none h-full"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isVisible ? (
                      <FaRegEye className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                onBlur={() => handleBlur("password")}
                isInvalid={touched.password && isPasswordValid}
                errorMessage="Password is required"
                color={
                  touched.password && isPasswordValid ? "danger" : "default"
                }
              />

              <div className="flex items-center justify-between">
                <Checkbox>Remember me</Checkbox>
                <button className="text-sm font-semibold text-[#0070e0] hover:underline">
                  <Link href="/forgot-password">Forgot password?</Link>
                </button>
              </div>
              <div>
                <Button
                  fullWidth
                  isLoading={isLoading}
                  disabled={!isFormValid}
                  variant="solid"
                  className={`bg-[#0544b5] text-white font-semibold hover:bg-[#0070e0] ${
                    isFormValid
                      ? ""
                      : "opacity-50 cursor-not-allowed hover:bg-[#0544b5]"
                  }`}
                >
                  {variant === "LOGIN" ? "Sign in" : "Register"}
                </Button>
              </div>
            </form>
          </div>
          <div>
            <p className="mt-2 text-center text-sm text-gray-600">
              {variant === "LOGIN"
                ? "Don't have an account?"
                : "Already have an account?"}
              <button
                onClick={toggleVariant}
                className="ml-1 font-medium text-blue-500 hover:underline"
              >
                {variant === "LOGIN" ? "Register" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
