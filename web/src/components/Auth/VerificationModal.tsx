/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Link,
} from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import ApiClient from "@/api";
import Cookies from "js-cookie";

interface VerificationModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  data: any;
}
const apiClient = new ApiClient();

const VerificationModal: React.FC<VerificationModalProps> = ({
  isOpen,
  onOpen,
  onOpenChange,
  data,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const isCodeValid = useMemo(() => {
    return code.trim() === "";
  }, [code]);

  const onSubmit = async () => {
    setIsLoading(true);
    const token = await apiClient.auth.helper.activateUser(code);

    if (token.status) {
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
      window.location.replace("/dashboard");

      onOpenChange(false);
      setCode("");
      setTouched(false);
      setIsVisible(false);
      setIsLoading(false);
      setIsDisabled(false);
    } else {
      toast.error("Der Bestätigungscode ist ungültig");
    }

    setIsLoading(false);
  };

  const onResend = async () => {
    const email_ = await apiClient.auth.helper.resendActivationEmail(
      data.email
    );
    setIsDisabled(true);

    if (email_.status) {
      toast.success("Bestätigungscode wurde erneut gesendet");
    } else {
      toast.error("E-Mail konnte nicht gesendet werden");
      setIsDisabled(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange(false);
          setCode("");
          setTouched(false);
          setIsVisible(false);
          setIsLoading(false);
          setIsDisabled(false);
        }}
        placement="center"
        backdrop="blur"
        className="z-99999"
        classNames={{
          base: "dark:bg-black",
        }}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 dark:text-white">
                Activate account
              </ModalHeader>
              <ModalBody>
                <p>
                  To activate your account, please enter the 15-minute
                  validation code that we have sent to{" "}
                  <span className="font-semibold">{data.email}</span>
                </p>
                <Input
                  label="Bestätigungscode"
                  type={isVisible ? "text" : "password"}
                  isRequired
                  onBlur={() => setTouched(true)}
                  color={touched && isCodeValid ? "danger" : "default"}
                  isInvalid={touched && isCodeValid}
                  errorMessage="Bitte geben Sie den Bestätigungscode ein"
                  variant="underlined"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
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
                />
                <div className="flex py-2 px-1 justify-between">
                  <Link
                    color="primary"
                    size="sm"
                    isDisabled={isDisabled}
                    onPress={onResend}
                    className="cursor-pointer"
                  >
                    Send confirmation code again
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  isLoading={isLoading}
                  disabled={isCodeValid}
                  color="primary"
                  onPress={onSubmit}
                  className={`cursor-pointer ${
                    isCodeValid ? "cursor-not-allowed opacity-50" : ""
                  }`}
                >
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default VerificationModal;
