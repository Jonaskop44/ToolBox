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
  // Hilfsfunktion für Formatierung der Daten
  const formatResult = (data: any) => {
    if (!data) return "No Data Available";
    const formattedText = Object.entries(data)
      .map(([key, value]) => {
        // Schlüssel in ausgeschriebene Begriffe mit Großbuchstaben umwandeln
        const formattedKey = key
          .replace(/^ip$/i, "IP Address")
          .replace(/^url$/i, "Web Address (URL)")
          .replace(/^username$/i, "Username")
          .replace(/^hostname$/i, "Hostname")
          .replace(/^status$/i, "Status")
          .replace(/^email$/i, "Email Address")
          .replace(/^phone$/i, "Phone Number")
          .replace(/^address$/i, "Address")
          .replace(/^created_at$/i, "Created At")
          .replace(/^updated_at$/i, "Updated At")
          .replace(/^city$/i, "City")
          .replace(/^region$/i, "Region")
          .replace(/^country$/i, "Country")
          .replace(/^postal$/i, "Postal Code")
          .replace(/^timezone$/i, "Timezone")
          .replace(/^anycast$/i, "Anycast")
          .replace(/^loc$/i, "Location")
          .replace(/^org$/i, "Organization");
        return `${formattedKey}: ${
          typeof value === "object" ? JSON.stringify(value, null, 2) : value
        }`;
      })
      .join("\n");
    return formattedText;
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      placement="center"
      className="rounded-lg shadow-lg"
    >
      <ModalContent className="bg-white border border-[#38bdf8] rounded-lg">
        <ModalHeader className="flex flex-col items-center justify-center bg-gradient-to-r from-[#38bdf8] to-[#38bdf8] text-white py-4 rounded-t-lg">
          <h3 className="text-xl font-bold">Request Response</h3>
          <p className="text-sm opacity-90">Details Of The Response</p>
        </ModalHeader>
        <ModalBody className="p-6">
          {result ? (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 overflow-auto max-h-64">
              <pre className="whitespace-pre-wrap text-sm text-gray-800">
                {formatResult(result)}
              </pre>
            </div>
          ) : (
            <div className="text-center text-red-600">
              <p className="text-base font-semibold">
                There Was A Problem During The Request
              </p>
            </div>
          )}
        </ModalBody>
        <ModalFooter className="flex justify-end bg-gray-100 py-4 rounded-b-lg">
          <Button
            color="primary"
            variant="flat"
            className="border-[#38bdf8]"
            onPress={() => onOpenChange(false)}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ResponseModal;
