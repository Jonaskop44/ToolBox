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
  useDisclosure,
} from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import ApiClient from "@/api";

interface ResetPasswordModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  email: string;
}
const apiClient = new ApiClient();

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  isOpen,
  onOpen,
  onOpenChange,
  email,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
    useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);
  const togglePasswordConfirmVisibility = () =>
    setIsPasswordConfirmVisible(!isPasswordConfirmVisible);
  const [code, setCode] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [touchedPasswordConfirm, setTouchedPasswordConfirm] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const {
    isOpen: isOpenReset,
    onOpen: onOpenReset,
    onOpenChange: onOpenChangeReset,
  } = useDisclosure();

  const isCodeValid = useMemo(() => {
    return code.trim() === "";
  }, [code]);

  const isPasswordValid = useMemo(() => {
    return password.trim() === "";
  }, [password]);

  const isPasswordConfirmValid = useMemo(() => {
    return passwordConfirm.trim() === "";
  }, [passwordConfirm]);

  const onSubmit = async () => {
    setIsLoading(true);
    const token = await apiClient.auth.helper.checkPasswordRestToken(
      code.trim()
    );

    if (token.status) {
      onOpenChange(false);
      onOpenChangeReset();
      setCode("");
      setTouched(false);
      setIsVisible(false);
      setIsLoading(false);
      setIsDisabled(false);
    } else {
      toast.error("Der Sicherheitscode ist ungültig");
      setIsLoading(false);
    }
  };

  const onResend = async () => {
    const email_ = await apiClient.auth.helper.sendPasswordResetEmail(email);
    setIsDisabled(true);

    if (email_.status) {
      toast.success("Sicherheitscode wurde erneut gesendet");
    } else {
      toast.error("E-Mail konnte nicht gesendet werden");
      setIsDisabled(false);
    }
  };

  const onReset = async () => {
    setIsLoading(true);
    const reset = await apiClient.auth.helper.resetPassword(
      email,
      password,
      token.trim()
    );

    if (reset.status) {
      toast.success("Passwort erfolgreich zurückgesetzt");
      onOpenChangeReset();
      setIsLoading(false);
    } else {
      toast.error("Passwort konnte nicht zurückgesetzt werden");
      setIsLoading(false);
    }
  };

  const arePasswordsMatching = useMemo(() => {
    return password === passwordConfirm;
  }, [password, passwordConfirm]);

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
              <ModalHeader className="flex flex-col gap-1">
                Passwort zurücksetzen
              </ModalHeader>
              <ModalBody>
                <p>
                  Um Ihr Passwort zurückzusetzen, benötigen wir einen
                  Sicherheitscode den wir Ihnen per E-Mail gesendet haben.
                </p>
                <Input
                  label="Sicherheitscode"
                  type={isVisible ? "text" : "password"}
                  isRequired
                  onBlur={() => setTouched(true)}
                  color={touched && isCodeValid ? "danger" : "default"}
                  isInvalid={touched && isCodeValid}
                  errorMessage="Bitte geben Sie den Sicherheitscode ein"
                  variant="underlined"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setToken(e.target.value);
                  }}
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
                    Sicherheitscode erneut senden
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  isLoading={isLoading}
                  isDisabled={isCodeValid}
                  color="primary"
                  onPress={onSubmit}
                  className={"cursor-pointer"}
                >
                  Prüfen
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpenReset}
        onOpenChange={() => {
          onOpenChangeReset();
          setPassword("");
          setTouchedPassword(false);
          setIsPasswordVisible(false);
          setPasswordConfirm("");
          setTouchedPasswordConfirm(false);
          setIsPasswordConfirmVisible(false);
          setIsLoading(false);
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
              <ModalHeader className="flex flex-col gap-1">
                Passwort zurücksetzen
              </ModalHeader>
              <ModalBody>
                <p>
                  Geben Sie nun ein neues Passwort ein um den Vorgang
                  abzuschließen.
                </p>
                <Input
                  label="Neues Passwort"
                  type={isPasswordVisible ? "text" : "password"}
                  isRequired
                  onBlur={() => setTouchedPassword(true)}
                  color={
                    touchedPassword && isPasswordValid ? "danger" : "default"
                  }
                  isInvalid={touchedPassword && isPasswordValid}
                  errorMessage="Bitte geben Sie ein Passwort ein"
                  variant="underlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={togglePasswordVisibility}
                      aria-label="toggle password visibility"
                    >
                      {isPasswordVisible ? (
                        <FaRegEye className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                />
                <Input
                  label="Neues Passwort Bestätigen"
                  type={isPasswordConfirmVisible ? "text" : "password"}
                  isRequired
                  onBlur={() => setTouchedPasswordConfirm(true)}
                  color={
                    touchedPasswordConfirm && isPasswordConfirmValid
                      ? "danger"
                      : "default"
                  }
                  isInvalid={
                    (touchedPasswordConfirm && isPasswordConfirmValid) ||
                    !arePasswordsMatching
                  }
                  errorMessage="Bitte geben Sie das gleiche Passwort ein"
                  variant="underlined"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={togglePasswordConfirmVisibility}
                      aria-label="toggle password visibility"
                    >
                      {isPasswordConfirmVisible ? (
                        <FaRegEye className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <FaRegEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  isLoading={isLoading}
                  isDisabled={
                    isPasswordValid ||
                    isPasswordConfirmValid ||
                    !arePasswordsMatching
                  }
                  color="primary"
                  onPress={onReset}
                  className={"cursor-pointer"}
                >
                  Zurücksetzen
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ResetPasswordModal;
