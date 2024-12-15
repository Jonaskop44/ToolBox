import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { NettoolModalType, Nettools, NettoolsTypes } from "@/types/nettools";

interface NettoolModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  type: NettoolModalType;
  onSubmit: (data: Nettools) => void;
  isLoading: boolean;
}

const NettoolModal: React.FC<NettoolModalProps> = ({
  isOpen,
  onOpen,
  onOpenChange,
  type,
  onSubmit,
  isLoading,
}) => {
  const [data, setData] = useState<Nettools>({
    ip: "",
    mac: "",
    startPort: "",
    endPort: "",
  });
  const handleFormSubmit = () => {
    onSubmit(data);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange(false);
          setData({
            ip: "",
            mac: "",
            startPort: "",
            endPort: "",
          });
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
                {type === NettoolsTypes.IPINFO && "IP Info"}
                {type === NettoolsTypes.MACLOOKUP && "MAC Lookup"}
                {type === NettoolsTypes.PORTSCAN && "Port Scan"}
              </ModalHeader>
              <ModalBody>
                {type === NettoolsTypes.IPINFO && (
                  <Input
                    label="IP Adresse"
                    value={data.ip}
                    onChange={(e) => setData({ ...data, ip: e.target.value })}
                  />
                )}
                {type === NettoolsTypes.MACLOOKUP && (
                  <Input
                    label="MAC Adresse"
                    value={data.mac}
                    onChange={(e) => setData({ ...data, mac: e.target.value })}
                  />
                )}
                {type === NettoolsTypes.PORTSCAN && (
                  <div>
                    <Input
                      label="IP Adresse"
                      value={data.ip}
                      onChange={(e) => setData({ ...data, ip: e.target.value })}
                    />
                    <Input
                      label="Start Port"
                      value={data.startPort}
                      onChange={(e) =>
                        setData({ ...data, startPort: e.target.value })
                      }
                    />
                    <Input
                      label="End Port"
                      value={data.endPort}
                      onChange={(e) =>
                        setData({ ...data, endPort: e.target.value })
                      }
                    />
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button isLoading={isLoading} onPress={handleFormSubmit}>
                  Send
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default NettoolModal;
