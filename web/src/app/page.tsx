import ApiClient from "@/api";
import { motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { Button, Checkbox, Input } from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

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
      {/* <!-- ===== SignUp Form Start ===== --> */}
      <div>
        <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
          <div className="relative z-1 mx-auto max-w-c-1016 px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
            <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
            <div className="absolute bottom-17.5 left-0 -z-1 h-1/3 w-full">
              <Image
                draggable={false}
                src="/images/shape/shape-dotted-light.svg"
                alt="Dotted"
                className="dark:hidden"
                fill
              />
              <Image
                draggable={false}
                src="/images/shape/shape-dotted-dark.svg"
                alt="Dotted"
                className="hidden dark:block"
                fill
              />
            </div>

            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top rounded-lg bg-white px-7.5 pt-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:px-15 xl:pt-15"
            >
              <h2 className="mb-15 text-center text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
                {variant === "LOGIN" ? "Anmelden" : "Erstelle ein Konto"}
              </h2>

              <form>
                {variant === "SIGNUP" && (
                  <div className="mb-7.5 flex flex-col gap-7.5 lg:mb-12.5 lg:flex-row lg:justify-between lg:gap-14">
                    <Input
                      label="Username"
                      isRequired
                      type="text"
                      variant="underlined"
                      className="w-full pb-3.5 lg:w-1/2"
                      value={data.username}
                      onChange={(e) =>
                        setData({ ...data, username: e.target.value })
                      }
                      onBlur={() => handleBlur("firstName")}
                      isInvalid={touched.username && isUsernameValid}
                      errorMessage="Bitte geben Sie Ihren Vornamen ein"
                      color={
                        touched.username && isUsernameValid
                          ? "danger"
                          : "default"
                      }
                    />
                  </div>
                )}

                <div className="mb-7.5 flex flex-col gap-7.5 lg:mb-12.5 lg:flex-row lg:justify-between lg:gap-14">
                  <Input
                    label="Email Adresse"
                    isRequired
                    type="email"
                    variant="underlined"
                    className="w-full pb-3.5 lg:w-1/2"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    onBlur={() => handleBlur("email")}
                    isInvalid={touched.email && isInvalidEmail}
                    errorMessage="Bitte geben Sie Ihre E-Mail-Adresse ein"
                    color={
                      touched.email && isInvalidEmail ? "danger" : "default"
                    }
                  />

                  <Input
                    label="Passwort"
                    isRequired
                    type={isVisible ? "text" : "password"}
                    variant="underlined"
                    className="w-full pb-3.5 lg:w-1/2"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    endContent={
                      <button
                        className="focus:outline-none"
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
                    errorMessage="Bitte geben Sie ein Passwort ein"
                    color={
                      touched.password && isPasswordValid ? "danger" : "default"
                    }
                  />
                </div>

                <div className="flex flex-wrap gap-10 md:justify-between xl:gap-15">
                  <div className="mb-4 flex items-center">
                    <Checkbox
                      size="md"
                      isSelected={data.rememberMe}
                      onValueChange={(value) => {
                        setData({ ...data, rememberMe: value });
                      }}
                    />
                    <p className="flex max-w-[425px] pl-3">
                      Angemeldet bleiben
                    </p>
                  </div>

                  <Button
                    disabled={!isFormValid}
                    isLoading={isLoading}
                    className={`inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho ${
                      isFormValid ? "" : "opacity-50 cursor-not-allowed"
                    }`}
                    size="lg"
                    type="submit"
                  >
                    {variant === "LOGIN" ? "Anmelden" : "Konto erstellen"}
                    <svg
                      className="fill-white"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                        fill=""
                      />
                    </svg>
                  </Button>
                </div>

                {variant === "LOGIN" ? (
                  <div className="mt-12.5 border-t border-stroke py-5 flex justify-around dark:border-strokedark">
                    <p className="cursor-pointer text-black hover:text-primary dark:text-white dark:hover:text-primary font-medium">
                      Passwort vergessen?
                    </p>
                    <p>
                      Sie besitzen kein Konto?{" "}
                      <span
                        className="text-black hover:text-primary dark:text-white dark:hover:text-primary cursor-pointer font-medium"
                        onClick={toggleVariant}
                      >
                        Registrieren
                      </span>
                    </p>
                  </div>
                ) : (
                  <div className="mt-12.5 border-t border-stroke py-5 text-center dark:border-strokedark">
                    <p>
                      Sie besitzen bereits ein Konto?{" "}
                      <span
                        className="text-black hover:text-primary dark:text-white dark:hover:text-primary cursor-pointer font-medium"
                        onClick={toggleVariant}
                      >
                        Anmelden
                      </span>
                    </p>
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
