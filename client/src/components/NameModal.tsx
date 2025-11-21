import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface NameModalProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: (name: string) => void;
  onCancel: () => void;
}

export function NameModal({
  isOpen,
  itemName,
  onConfirm,
  onCancel,
}: NameModalProps) {
  const [name, setName] = useState("");

  const handleConfirm = () => {
    if (name.trim()) {
      onConfirm(name.trim());
      setName("");
    }
  };

  const handleCancel = () => {
    setName("");
    onCancel();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleConfirm();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirmar Seleção</DialogTitle>
          <DialogDescription>
            Qual é o seu nome? Assim saberemos quem está presenteando com o{" "}
            <span className="font-semibold text-foreground">{itemName}</span>.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
            autoFocus
            className="rounded-lg"
          />
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="rounded-lg"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!name.trim()}
              className="rounded-lg"
            >
              Confirmar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
