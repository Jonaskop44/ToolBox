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
import {
  Downloader,
  DownloaderModalType,
  DownloaderTypes,
} from "@/types/downloader";
import { div } from "framer-motion/client";

interface DownloaderModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  type: DownloaderModalType;
  onSubmit: (data: Downloader) => void;
  isLoading: boolean;
}

const DownloaderModal: React.FC<DownloaderModalProps> = ({
  isOpen,
  onOpen,
  onOpenChange,
  type,
  onSubmit,
  isLoading,
}) => {
  const [data, setData] = useState<Downloader>({
    url: "",
    clientId: "",
    clientSecret: "",
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
            url: "",
            clientId: "",
            clientSecret: "",
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
                {type === DownloaderTypes.DOWNLOADVIDEO && "Download Video"}
                {type === DownloaderTypes.DOWNLOADSONG && "Download Song"}
                {type === DownloaderTypes.DOWNLOADPLAYLIST &&
                  "Download Playlist"}
              </ModalHeader>
              <ModalBody>
                {type === DownloaderTypes.DOWNLOADVIDEO && (
                  <Input
                    label="Url"
                    value={data.url}
                    onChange={(e) => setData({ ...data, url: e.target.value })}
                  />
                )}
                {type === DownloaderTypes.DOWNLOADSONG && (
                  <div>
                    <Input
                      label="Url"
                      value={data.url}
                      onChange={(e) =>
                        setData({ ...data, url: e.target.value })
                      }
                    />
                    <Input
                      label="Client ID"
                      value={data.clientId}
                      onChange={(e) =>
                        setData({ ...data, clientId: e.target.value })
                      }
                    />
                    <Input
                      label="Client Secret"
                      value={data.clientSecret}
                      onChange={(e) =>
                        setData({ ...data, clientSecret: e.target.value })
                      }
                    />
                  </div>
                )}
                {type === DownloaderTypes.DOWNLOADPLAYLIST && (
                  <div>
                    <Input
                      label="Url"
                      value={data.url}
                      onChange={(e) =>
                        setData({ ...data, url: e.target.value })
                      }
                    />
                    <Input
                      label="Client ID"
                      value={data.clientId}
                      onChange={(e) =>
                        setData({ ...data, clientId: e.target.value })
                      }
                    />
                    <Input
                      label="Client Secret"
                      value={data.clientSecret}
                      onChange={(e) =>
                        setData({ ...data, clientSecret: e.target.value })
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

export default DownloaderModal;
