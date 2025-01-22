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
import { DiscordModalType, Discord, DiscordTypes } from "@/types/discord";

interface DiscordModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  type: DiscordModalType;
  onSubmit: (data: Discord) => void;
  isLoading: boolean;
}

const DiscordModal: React.FC<DiscordModalProps> = ({
  isOpen,
  onOpen,
  onOpenChange,
  type,
  onSubmit,
  isLoading,
}) => {
  // Initialzustand mit 'amount' als Zahl
  const [data, setData] = useState<Discord>({
    token: "",
    guildId: "",
    delay: 0,
    amount: 0, // amount als Zahl
    name: "",
    channelId: "",
    message: "",
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
    onOpenChange(false); // Schließt das Modal nach dem Absenden
    setData({
      token: "",
      guildId: "",
      delay: 0,
      amount: 0,
      name: "",
      channelId: "",
      message: "",
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={() => {
        onOpenChange(false);
        setData({
          token: "",
          guildId: "",
          delay: 0,
          amount: 0,
          name: "",
          channelId: "",
          message: "",
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
        <ModalHeader className="flex flex-col gap-1 dark:text-white">
          {type === DiscordTypes.MASSCREATECHANNELS && "Mass Create Channels"}
          {type === DiscordTypes.MASSCREATEROLES && "Mass Create Roles"}
          {type === DiscordTypes.BANALLMEMBERS && "Ban All Members"}
          {type === DiscordTypes.KICKALL && "Kick All Members"}
          {type === DiscordTypes.DELETEALLCHANNELS && "Delete All Channels"}
          {type === DiscordTypes.DELETEALLROLES && "Delete All Roles"}
          {type === DiscordTypes.ACCOUNTMESSAGESPAM && "Account Message Spam"}
        </ModalHeader>
        <form onSubmit={handleFormSubmit}>
          <ModalBody>
            {type === DiscordTypes.MASSCREATECHANNELS && (
              <>
                <Input
                  label="Channel Name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
                <Input
                  label="Amount"
                  type="number"
                  value={data.amount.toString()} // Konvertiere den Wert in einen string
                  onChange={(e) =>
                    setData({
                      ...data,
                      amount: parseInt(e.target.value, 10) || 0, // sicherstellen, dass 'amount' eine Zahl ist
                    })
                  }
                />
              </>
            )}
            {type === DiscordTypes.MASSCREATEROLES && (
              <>
                <Input
                  label="Role Name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
                <Input
                  label="Amount"
                  type="number"
                  value={data.amount.toString()} // Konvertiere den Wert in einen string
                  onChange={(e) =>
                    setData({
                      ...data,
                      amount: parseInt(e.target.value, 10) || 0, // sicherstellen, dass 'amount' eine Zahl ist
                    })
                  }
                />
              </>
            )}
            {type === DiscordTypes.ACCOUNTMESSAGESPAM && (
              <>
                <Input
                  label="Channel ID"
                  value={data.channelId}
                  onChange={(e) =>
                    setData({ ...data, channelId: e.target.value })
                  }
                />
                <Input
                  label="Message"
                  value={data.message}
                  onChange={(e) =>
                    setData({ ...data, message: e.target.value })
                  }
                />
                <Input
                  label="Amount"
                  type="number"
                  value={data.amount.toString()} // Konvertiere den Wert in einen string
                  onChange={(e) =>
                    setData({
                      ...data,
                      amount: parseInt(e.target.value, 10) || 0, // sicherstellen, dass 'amount' eine Zahl ist
                    })
                  }
                />
                <Input
                  label="Delay (ms)"
                  type="number"
                  value={data.delay.toString()} // Konvertiere den Wert in einen string
                  onChange={(e) =>
                    setData({
                      ...data,
                      delay: parseInt(e.target.value, 10) || 0, // sicherstellen, dass 'delay' eine Zahl ist
                    })
                  }
                />
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button isLoading={isLoading} type="submit">
              Send
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default DiscordModal;
