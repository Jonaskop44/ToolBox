"use client";

import ApiClient from "@/api";
import { motion } from "framer-motion";
import React, { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { Button, Checkbox, Input } from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { MdOutlineEmail } from "react-icons/md";
import { MdVpnKey } from "react-icons/md";
import { CiUser } from "react-icons/ci";


const apiClient = new ApiClient();
type Variant = "LOGIN" | "SIGNUP";

const Home = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const style = {
    background: "linear-gradient(to bottom right, violet, lightblue)"
  };

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

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    if (variant === "LOGIN") {
      const response = await apiClient.auth.login.post(data);
      if (response.status === false) {
        toast.error("Invalid credentials");
      } else {
        toast.success("Login successful");
        if (data.rememberMe) {
          Cookies.set("accessToken", response.data.backendTokens.accessToken, {
            expires: 1,
          });
          Cookies.set(
            "refreshToken",
            response.data.backendTokens.refreshToken,
            {
              expires: 7,
            }
          );
        } else {
          Cookies.set("accessToken", response.data.backendTokens.accessToken);
        }
        window.location.reload();
      }
      setIsLoading(false);
    }

    if (variant === "SIGNUP") {
      const response = await apiClient.auth.register.post(data);
      if (response.status === false) {
        toast.error("There is already an account with this email address");
      } else {
        const login = await apiClient.auth.login.post(data);
        if (data.rememberMe) {
          Cookies.set("accessToken", login.data.backendTokens.accessToken, {
            expires: 1,
          });
          Cookies.set("refreshToken", login.data.backendTokens.refreshToken, {
            expires: 7,
          });
        } else {
          Cookies.set("accessToken", login.data.backendTokens.accessToken);
        }
        window.location.reload();
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-900 h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            alt="Logo"
            height="1000"
            width="1000"
            className="mx-auto w-auto"
            src="/images/box-1.png"
          />
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tighter text-gray-200">
            {variant == "LOGIN"
              ? "Sign in to your account"
              : "Create an account"}
          </h2>
          <div className="bg-gray-800 border border-x-indigo-500  border-y-blue-500 px-4 py-8 shadow-2xl sm:rounded-lg sm:px-10" >   
            <form
              onSubmit={(event) => {
                if (isFormValid) {
                  onSubmit(event);
                } else {
                  event.preventDefault();
                }
              }}
              className="space-y-6 "
            >
              {variant == "SIGNUP" && (
                <Input
                  label="Username"
                  isRequired
                  classNames={{
                    label: "text-white/50",
                    input: [
                      "bg-transparent",
                      "text-black/90 dark:text-white/90",
                      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    inputWrapper:[
                      "bg-default-200/60",
                    ],
                  }}
                  type="text"
                  startContent={
                    <CiUser className="text-2xl text-black pointer-events-none flex-shrink-0" />
                  }
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
                label="Email"
                isRequired
                type="email"
                variant="flat"
                startContent={
                  <MdOutlineEmail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                onBlur={() => handleBlur("email")}
                isInvalid={touched.email && isInvalidEmail}
                errorMessage="Email is required"
                color={touched.email && isInvalidEmail ? "danger" : "default"}
              />

              <Input
                label="Password"
                isRequired
                variant="flat"
                startContent={
                  <MdVpnKey className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
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
                <Checkbox
                  isSelected={data.rememberMe}
                  onValueChange={(value) => {
                    setData({ ...data, rememberMe: value });
                  }}
                >

                <span className="text-sm text-[#38bdf8] font-semibold">  
                  Remember me
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#38bdf8] transition-all duration-300 group-hover:w-full"></span>
                </span>
                </Checkbox>
                <button className="relative text-sm font-semibold text-[#38bdf8] group no-underlineunderline">
                  <Link href="" className="relativ group-hover:no-underline">
                  Forgot password?
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#38bdf8] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </button>
              </div>
              <div>
                <Button
                  fullWidth
                  isLoading={isLoading}
                  isDisabled={!isFormValid}
                  variant="solid"
                  type="submit"
                  className="bg-[#38bdf8] text-white font-semibold hover:bg-[#38bdf8]"
                >
                  {variant === "LOGIN" ? "Sign in" : "Register"}
                </Button>
              </div>
            </form>
          </div>
          <div>
            <p className="mt-2 text-center text-sm text-gray-300">
              {variant === "LOGIN"
                ? "Don't have an account?"
                : "Already have an account?"}
              <span className="relative ml-1 font-medium text-[#38bdf8] group no-underline">
                <button
                onClick={toggleVariant}
                className="ml-1 font-medium text-[#38bdf8] group no-underline"
              >
                {variant === "LOGIN" ? "Register" : "Sign in"}
                </button>
                <span className="absolute left-1 bottom-0 w-0 h-[2px] bg-[#38bdf8] transition-all duration-300 group-hover:w-full"></span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
