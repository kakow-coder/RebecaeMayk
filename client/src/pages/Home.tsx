import { Button } from "@/components/ui/button";
import { Heart, Gift } from "lucide-react";
import { useState } from "react";
import { NameModal } from "@/components/NameModal";

interface GiftItem {
  id: string;
  name: string;
  category: string;
  emoji: string;
}

interface SelectedGift {
  itemId: string;
  itemName: string;
  selectedBy: string;
}

const giftItems: GiftItem[] = [
  // Itens de Cozinha
  { id: "1", name: "Jogo de Panela", category: "Cozinha", emoji: "🍳" },
  { id: "2", name: "Panela de Pressão", category: "Cozinha", emoji: "🍲​" },
  { id: "3", name: "Jogo de Talheres", category: "Cozinha", emoji: "🍴" },
  { id: "4", name: "Jogo de Copos", category: "Cozinha", emoji: "🥤" },
  { id: "5", name: "Jogo de Taças", category: "Cozinha", emoji: "🍷" },
  { id: "6", name: "Jogo de Xícara", category: "Cozinha", emoji: "☕" },
  { id: "7", name: "Jogo de Faca", category: "Cozinha", emoji: "🔪" },
  { id: "8", name: "Descanso de Panela", category: "Cozinha", emoji: "🥘​" },
  { id: "9", name: "Pano de Prato", category: "Cozinha", emoji: "🎴" },
  { id: "10", name: "Jogo Americano", category: "Cozinha", emoji: "🍽️" },
  { id: "11", name: "Toalha de Mesa", category: "Cozinha", emoji: "🎴" },
  { id: "12", name: "Potes de Mantimentos", category: "Cozinha", emoji: "🏺" },
  { id: "13", name: "Cortador de Pizza e Bolo", category: "Cozinha", emoji: "🍕" },
  { id: "14", name: "Colher de Arroz", category: "Cozinha", emoji: "🥄" },
  { id: "15", name: "Socador", category: "Cozinha", emoji: "🔨" },
  { id: "16", name: "Colheres de Pau ou Silicone", category: "Cozinha", emoji: "🥄" },
  { id: "17", name: "Pegador", category: "Cozinha", emoji: "​​🥢​" },
  { id: "18", name: "Tigelas", category: "Cozinha", emoji: "🥣" },
  { id: "19", name: "Colher de Sorvete", category: "Cozinha", emoji: "🍦" },
  { id: "20", name: "Jarros", category: "Cozinha", emoji: "🏺" },
  { id: "21", name: "Sanduicheira", category: "Cozinha", emoji: "🥪" },
  { id: "22", name: "Garrafa Térmica", category: "Cozinha", emoji: "🍶​" },
  { id: "23", name: "Formas para Bolo", category: "Cozinha", emoji: "🎂" },
  { id: "24", name: "Luva Térmica", category: "Cozinha", emoji: "🧤" },
  { id: "25", name: "Cuscuzeira", category: "Cozinha", emoji: "🥘" },
  { id: "26", name: "Conchas para Feijão", category: "Cozinha", emoji: "🥄" },
  { id: "27", name: "Escorredor de Louça e Talheres", category: "Cozinha", emoji: "🍽️" },
  { id: "28", name: "Formas de Pudim", category: "Cozinha", emoji: "🍮" },
  { id: "29", name: "Mixer", category: "Cozinha", emoji: "​​🧋​" },
  { id: "30", name: "Espremedor de Frutas", category: "Cozinha", emoji: "🍊" },

  // Itens de Banheiro
  { id: "31", name: "Toalhas de Banho", category: "Banheiro", emoji: "🛁" },
  { id: "32", name: "Tapete", category: "Banheiro", emoji: "​​🎴​" },
  { id: "33", name: "Lixeira", category: "Banheiro", emoji: "🗑️" },

  // Itens de Lavanderia
  { id: "34", name: "Mopi", category: "Lavanderia", emoji: "🧹" },
  { id: "35", name: "Baldes", category: "Lavanderia", emoji: "🪣" },
  { id: "36", name: "Varal de Roupa de Chão", category: "Lavanderia", emoji: "👕" },
  { id: "37", name: "Panos de Chão", category: "Lavanderia", emoji: "​​🎴​" },

  // Itens de Sala e Quarto
  { id: "38", name: "Mantas do Sofá", category: "Sala e Quarto", emoji: "🛋️" },
  { id: "39", name: "Lençóis", category: "Sala e Quarto", emoji: "🛏️" },
  { id: "40", name: "Edredom", category: "Sala e Quarto", emoji: "🛏️" },
  { id: "41", name: "Cobre Leito", category: "Sala e Quarto", emoji: "🛏️" },
  { id: "42", name: "Fronhas", category: "Sala e Quarto", emoji: "🛏️" },
  { id: "43", name: "Colcha", category: "Sala e Quarto", emoji: "​​🎴​" },
];

const categories = ["Cozinha", "Banheiro", "Lavanderia", "Sala e Quarto"];

const colorNote = "Os presentes devem ser nas cores branca ou preta";

// Função para gerar cor de fundo aleatória mas consistente
const getEmojiBackgroundColor = (id: string) => {
  const colors = [
    "from-blue-100 to-blue-50",
    "from-purple-100 to-purple-50",
    "from-pink-100 to-pink-50",
    "from-green-100 to-green-50",
    "from-yellow-100 to-yellow-50",
    "from-indigo-100 to-indigo-50",
  ];
  const index = parseInt(id) % colors.length;
  return colors[index];
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedGifts, setSelectedGifts] = useState<Map<string, SelectedGift>>(new Map());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingItemId, setPendingItemId] = useState<string | null>(null);
  const [pendingItemName, setPendingItemName] = useState<string>("");

  const filteredItems = selectedCategory
    ? giftItems.filter((item) => item.category === selectedCategory)
    : giftItems;

  const handleSelectGift = (id: string, name: string) => {
    if (selectedGifts.has(id)) {
      // Se já foi selecionado, remove
      const newSelected = new Map(selectedGifts);
      newSelected.delete(id);
      setSelectedGifts(newSelected);
    } else {
      // Se não foi selecionado, abre modal para pedir nome
      setPendingItemId(id);
      setPendingItemName(name);
      setIsModalOpen(true);
    }
  };

  const handleConfirmName = (name: string) => {
    if (pendingItemId) {
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
              para combinar com a decoração da nossa casa.
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
                  <div className="relative h-48 overflow-hidden rounded-t-md bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                    <div className="text-6xl">{item.emoji}</div>
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
            © 2025 Chá de Panela Rebeca & Mayk. Todos os direitos reservados.
          </p>
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
