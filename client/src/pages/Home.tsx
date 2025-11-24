import { Button } from "@/components/ui/button";
import { Heart, Gift, Loader2, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { NameModal } from "@/components/NameModal";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";

interface GiftItem {
  id: string;
  name: string;
  category: string;
  image: string;
}

interface SelectedGift {
  itemId: string;
  itemName: string;
  selectedBy: string;
}

const giftItems: GiftItem[] = [
  // Itens de Cozinha
  { id: "1", name: "Jogo de Panela", category: "Cozinha", image: "/placeholder.jpg" },
  { id: "2", name: "Panela de Pressão", category: "Cozinha", image: "/placeholder.jpg" },
  { id: "3", name: "Jogo de Talheres", category: "Cozinha", image: "/placeholder.jpg" },
  { id: "4", name: "Jogo de Copos", category: "Cozinha", image: "/placeholder.jpg" },
  { id: "5", name: "Jogo de Taças", category: "Cozinha", image: "/placeholder.jpg" },
  { id: "6", name: "Jogo de Xícara", category: "Cozinha", image: "/placeholder.jpg" },
  { id: "7", name: "Jogo de Faca", category: "Cozinha", image: "/placeholder.jpg" },
  { id: "8", name: "Descanso de Panela", category: "Cozinha", image: "/placeholder.jpg" },
  { id: "9", name: "Pano de Prato", category: "Cozinha", image: "/placeholder.jpg" },
  { id: "10", name: "Jogo Americano", category: "Cozinha", image: "/placeholder.jpg" },
  { id: "11", name: "Toalha de Mesa", category: "Cozinha", image: "/placeholder.jpg" },
  { id: "12", name: "Potes de Mantimentos", category: "Cozinha", image: "/placeholder.jpg" },
  { id: "13", name: "Cortador de Pizza e Bolo", category: "Cozinha", image: "/placeholder.jpg" },
  { id: "14", name: "Colher de Arroz", category: "Cozinha", image: "/placeholder.jpg" },
  { id: "15", name: "Socador", category: "Cozinha", image: "/placeholder.jpg" },
  { id: "16", name: "Colheres de Pau ou Silicone", category: "Cozinha", image: "/placeholder.jpg" },
  { id: "17", name: "Pegador", category: "Cozinha", image: "/placeholder.jpg" },
  { id: "18", name: "Tigelas", category: "Cozinha", image: "/placeholder.jpg" },
  { id: "19", name: "Colher de Sorvete", category: "Cozinha", image: "/placeholder.jpg" },
  { id: "20", name: "Jarros", category: "Cozinha", image: "/placeholder.jpg" },
  { id: "21", name: "Sanduicheira", category: "Cozinha", image: "/placeholder.jpg" },
  { id: "22", name: "Garrafa Térmica", category: "Cozinha", image: "/placeholder.jpg" },
  { id: "23", name: "Formas para Bolo", category: "Cozinha", image: "/placeholder.jpg" },
  { id: "24", name: "Luva Térmica", category: "Cozinha", image: "/placeholder.jpg" },
  { id: "25", name: "Cuscuzeira", category: "Cozinha", image: "/placeholder.jpg" },
  { id: "26", name: "Conchas para Feijão", category: "Cozinha", image: "/placeholder.jpg" },
  { id: "27", name: "Escorredor de Louça e Talheres", category: "Cozinha", image: "/placeholder.jpg" },
  { id: "28", name: "Formas de Pudim", category: "Cozinha", image: "/placeholder.jpg" },
  { id: "29", name: "Mixer", category: "Cozinha", image: "/placeholder.jpg" },
  { id: "30", name: "Espremedor de Frutas", category: "Cozinha", image: "/placeholder.jpg" },

  // Itens de Banheiro
  { id: "31", name: "Toalhas de Banho", category: "Banheiro", image: "/placeholder.jpg" },
  { id: "32", name: "Tapete", category: "Banheiro", image: "/placeholder.jpg" },
  { id: "33", name: "Lixeira", category: "Banheiro", image: "/placeholder.jpg" },

  // Itens de Lavanderia
  { id: "34", name: "Mopi", category: "Lavanderia", image: "/placeholder.jpg" },
  { id: "35", name: "Baldes", category: "Lavanderia", image: "/placeholder.jpg" },
  { id: "36", name: "Varal de Roupa de Chão", category: "Lavanderia", image: "/placeholder.jpg" },
  { id: "37", name: "Panos de Chão", category: "Lavanderia", image: "/placeholder.jpg" },

  // Itens de Sala e Quarto
  { id: "38", name: "Mantas do Sofá", category: "Sala e Quarto", image: "/placeholder.jpg" },
  { id: "39", name: "Lençóis", category: "Sala e Quarto", image: "/placeholder.jpg" },
  { id: "40", name: "Edredom", category: "Sala e Quarto", image: "/placeholder.jpg" },
  { id: "41", name: "Cobre Leito", category: "Sala e Quarto", image: "/placeholder.jpg" },
  { id: "42", name: "Fronhas", category: "Sala e Quarto", image: "/placeholder.jpg" },
  { id: "43", name: "Colcha", category: "Sala e Quarto", image: "/placeholder.jpg" },
];

const categories = ["Cozinha", "Banheiro", "Lavanderia", "Sala e Quarto"];

function AdminButton() {
  const [, setLocation] = useLocation();
  
  return (
    <button
      onClick={() => setLocation("/admin")}
      className="inline-flex items-center gap-2 px-3 py-2 text-xs rounded-md bg-accent/20 hover:bg-accent/30 text-accent transition-colors mt-4"
      title="Painel de Administrador"
    >
      <Settings className="h-4 w-4" />
      Painel
    </button>
  );
}

export default function Home() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedGifts, setSelectedGifts] = useState<Map<string, SelectedGift>>(new Map());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingItemId, setPendingItemId] = useState<string | null>(null);
  const [pendingItemName, setPendingItemName] = useState<string>("");

  // Carregar seleções do banco de dados
  const { data: selections, isLoading } = trpc.gifts.getSelections.useQuery();
  const saveMutation = trpc.gifts.saveSelection.useMutation();
  const removeMutation = trpc.gifts.removeSelection.useMutation();

  useEffect(() => {
    if (selections) {
      const map = new Map<string, SelectedGift>();
      selections.forEach((sel: any) => {
        map.set(sel.giftId, {
          itemId: sel.giftId,
          itemName: sel.giftName,
          selectedBy: sel.selectedBy,
        });
      });
      setSelectedGifts(map);
    }
  }, [selections]);

  const filteredItems = selectedCategory
    ? giftItems.filter((item) => item.category === selectedCategory)
    : giftItems;

  const handleSelectGift = (id: string, name: string) => {
    if (selectedGifts.has(id)) {
      // Remove selection
      removeMutation.mutate({ giftId: id });
      const newSelected = new Map(selectedGifts);
      newSelected.delete(id);
      setSelectedGifts(newSelected);
    } else {
      // Open modal to ask for name
      setPendingItemId(id);
      setPendingItemName(name);
      setIsModalOpen(true);
    }
  };

  const handleConfirmName = (name: string) => {
    if (pendingItemId) {
      saveMutation.mutate({
        giftId: pendingItemId,
        giftName: pendingItemName,
        selectedBy: name,
      });
      const newSelected = new Map(selectedGifts);
      newSelected.set(pendingItemId, {
        itemId: pendingItemId,
        itemName: pendingItemName,
        selectedBy: name,
      });
      setSelectedGifts(newSelected);
    }
    setIsModalOpen(false);
    setPendingItemId(null);
    setPendingItemName("");
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
    setPendingItemId(null);
    setPendingItemName("");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Seção de Capa */}
      <section className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-accent/20 to-background">
        <img
          src="/capa.jpg"
          alt="Rebeca e Mayk"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-white md:text-6xl">
              Rebeca & Mayk
            </h1>
            <p className="text-xl text-white/90 md:text-2xl">
              Chá de Panela
            </p>
            <div className="flex justify-center gap-2 text-white">
              <Heart className="h-6 w-6 fill-current" />
              <Heart className="h-6 w-6 fill-current" />
              <Heart className="h-6 w-6 fill-current" />
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Apresentação */}
      <section className="bg-white py-16 px-4 md:py-24">
        <div className="container max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Bem-vindo ao Nosso Chá de Panela
          </h2>
          <p className="text-lg text-foreground/80">
            Estamos felizes em convidá-lo para celebrar conosco este momento especial. 
            Aqui você encontrará uma seleção de presentes que nos ajudarão a montar nosso novo lar.
          </p>
          <p className="text-base text-foreground/70">
            Escolha um ou mais itens da lista abaixo. Sua presença é o mais importante!
          </p>
          <div className="mt-8 p-4 bg-accent/10 rounded-lg border-2 border-accent">
            <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-2">
              🌟 Informação Importante
            </p>
            <p className="text-base text-foreground">
              Os presentes da lista devem ser preferencialmente nas cores <span className="font-bold">branca ou preta</span>, 
              para combinar com a decoração do nosso casamento.
            </p>
          </div>
        </div>
      </section>

      {/* Seção de Filtro de Categorias */}
      <section className="bg-accent/10 py-8 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              onClick={() => setSelectedCategory(null)}
              variant={selectedCategory === null ? "default" : "outline"}
              className="rounded-full"
            >
              Todos os Itens
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Seção de Lista de Presentes */}
      <section className="py-16 px-4 md:py-24">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center md:text-4xl">
            Lista de Presentes
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => {
              const isSelected = selectedGifts.has(item.id);
              const selectedGift = selectedGifts.get(item.id);

              return (
                <div
                  key={item.id}
                  className="group cursor-pointer rounded-lg border-2 border-border bg-white transition-all hover:shadow-lg hover:border-accent"
                  onClick={() => handleSelectGift(item.id, item.name)}
                >
                  {/* Imagem do Produto */}
                  <div className="relative h-48 overflow-hidden rounded-t-md bg-accent/10">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain bg-gray-100 transition-transform group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.jpg";
                      }}
                    />
                    {isSelected && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-accent/80 space-y-2">
                        <Gift className="h-8 w-8 text-white" />
                        <p className="text-xs text-white font-semibold text-center px-2">
                          {selectedGift?.selectedBy}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Informações do Produto */}
                  <div className="space-y-3 p-4">
                    <p className="text-sm font-semibold text-accent uppercase tracking-wide">
                      {item.category}
                    </p>
                    <h3 className="text-lg font-semibold text-foreground line-clamp-2">
                      {item.name}
                    </h3>
                    <Button
                      variant={isSelected ? "default" : "outline"}
                      className="w-full rounded-lg"
                      size="sm"
                      disabled={saveMutation.isPending || removeMutation.isPending}
                    >
                      {isSelected ? "Já selecionado ✓" : "Selecionar"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-foreground/70">
                Nenhum item encontrado nesta categoria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Seção de Rodapé */}
      <section className="bg-secondary text-secondary-foreground py-12 px-4">
        <div className="container max-w-6xl mx-auto text-center space-y-4">
          <p className="text-lg font-semibold">
            Obrigado por fazer parte deste momento especial!
          </p>
          <p className="text-sm opacity-90">
            Rebeca & Mayk
          </p>
          <p className="text-xs opacity-75">
            © 2024 Chá de Panela. Todos os direitos reservados.
          </p>
          <AdminButton />
        </div>
      </section>

      {/* Modal de Nome */}
      <NameModal
        isOpen={isModalOpen}
        itemName={pendingItemName}
        onConfirm={handleConfirmName}
        onCancel={handleCancelModal}
      />
    </div>
  );
}
