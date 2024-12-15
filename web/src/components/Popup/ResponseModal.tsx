/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface ResponseModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  result: any;
}

const ResponseModal: React.FC<ResponseModalProps> = ({
  isOpen,
  onOpenChange,
  onOpen,
  result,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      placement="center"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Antwort</ModalHeader>
        <ModalBody>
          {result ? (
            <pre className="whitespace-pre-wrap text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          ) : (
            <p>Es gab ein Problem bei der Anfrage.</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="light"
            onPress={() => onOpenChange(false)}
          >
            Schließen
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ResponseModal;
