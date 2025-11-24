import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function Admin() {
  const [, setLocation] = useLocation();
  const { data: selections, isLoading } = trpc.gifts.getSelections.useQuery();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ["Cozinha", "Banheiro", "Lavanderia", "Sala e Quarto"];

  const filteredSelections = selectedCategory
    ? selections?.filter((sel: any) => {
        const giftItems: any[] = [
          { id: "1", name: "Jogo de Panela", category: "Cozinha" },
          { id: "2", name: "Panela de Pressão", category: "Cozinha" },
          { id: "3", name: "Jogo de Talheres", category: "Cozinha" },
          { id: "4", name: "Jogo de Copos", category: "Cozinha" },
          { id: "5", name: "Jogo de Taças", category: "Cozinha" },
          { id: "6", name: "Jogo de Xícara", category: "Cozinha" },
          { id: "7", name: "Jogo de Faca", category: "Cozinha" },
          { id: "8", name: "Descanso de Panela", category: "Cozinha" },
          { id: "9", name: "Pano de Prato", category: "Cozinha" },
          { id: "10", name: "Jogo Americano", category: "Cozinha" },
          { id: "11", name: "Toalha de Mesa", category: "Cozinha" },
          { id: "12", name: "Potes de Mantimentos", category: "Cozinha" },
          { id: "13", name: "Cortador de Pizza e Bolo", category: "Cozinha" },
          { id: "14", name: "Colher de Arroz", category: "Cozinha" },
          { id: "15", name: "Socador", category: "Cozinha" },
          { id: "16", name: "Colheres de Pau ou Silicone", category: "Cozinha" },
          { id: "17", name: "Pegador", category: "Cozinha" },
          { id: "18", name: "Tigelas", category: "Cozinha" },
          { id: "19", name: "Colher de Sorvete", category: "Cozinha" },
          { id: "20", name: "Jarros", category: "Cozinha" },
          { id: "21", name: "Sanduicheira", category: "Cozinha" },
          { id: "22", name: "Garrafa Térmica", category: "Cozinha" },
          { id: "23", name: "Formas para Bolo", category: "Cozinha" },
          { id: "24", name: "Luva Térmica", category: "Cozinha" },
          { id: "25", name: "Cuscuzeira", category: "Cozinha" },
          { id: "26", name: "Conchas para Feijão", category: "Cozinha" },
          { id: "27", name: "Escorredor de Louça e Talheres", category: "Cozinha" },
          { id: "28", name: "Formas de Pudim", category: "Cozinha" },
          { id: "29", name: "Mixer", category: "Cozinha" },
          { id: "30", name: "Espremedor de Frutas", category: "Cozinha" },
          { id: "31", name: "Toalhas de Banho", category: "Banheiro" },
          { id: "32", name: "Tapete", category: "Banheiro" },
          { id: "33", name: "Lixeira", category: "Banheiro" },
          { id: "34", name: "Mopi", category: "Lavanderia" },
          { id: "35", name: "Baldes", category: "Lavanderia" },
          { id: "36", name: "Varal de Roupa de Chão", category: "Lavanderia" },
          { id: "37", name: "Panos de Chão", category: "Lavanderia" },
          { id: "38", name: "Mantas do Sofá", category: "Sala e Quarto" },
          { id: "39", name: "Lençóis", category: "Sala e Quarto" },
          { id: "40", name: "Edredom", category: "Sala e Quarto" },
          { id: "41", name: "Cobre Leito", category: "Sala e Quarto" },
          { id: "42", name: "Fronhas", category: "Sala e Quarto" },
          { id: "43", name: "Colcha", category: "Sala e Quarto" },
        ];
        const gift = giftItems.find((g) => g.id === sel.giftId);
        return gift?.category === selectedCategory;
      })
    : selections;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Painel de Presentes Selecionados
          </h1>
          <Button
            variant="outline"
            onClick={() => setLocation("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </div>

        <div className="mb-6">
          <p className="text-lg font-semibold mb-4">
            Total de presentes selecionados: {filteredSelections?.length || 0}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
            >
              Todos
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-accent text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Presente</th>
                  <th className="px-6 py-3 text-left">Selecionado por</th>
                  <th className="px-6 py-3 text-left">Data</th>
                </tr>
              </thead>
              <tbody>
                {filteredSelections && filteredSelections.length > 0 ? (
                  filteredSelections.map((sel: any, idx: number) => (
                    <tr
                      key={idx}
                      className="border-b hover:bg-muted transition-colors"
                    >
                      <td className="px-6 py-4 font-medium">{sel.giftName}</td>
                      <td className="px-6 py-4">{sel.selectedBy}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(sel.createdAt).toLocaleDateString("pt-BR")}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">
                      Nenhum presente selecionado nesta categoria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
