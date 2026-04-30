export interface Recipe {
  id: string;
  slug: string;
  title: string;
  image: string;
  prepTime: string;
  difficulty: 1 | 2 | 3; // 1 = Fácil, 2 = Media, 3 = Pro
  baseFlavor: string;
  alcoholFree: boolean;
  occasion: string[];
  ingredients: { name: string; amount: string; icon?: string }[];
  instructions: string[];
  bartenderTip: string;
}

export const recipesData: Recipe[] = [
  {
    id: "1",
    slug: "mojito-clasico",
    title: "Mojito Clásico",
    image: "/images/FlorMojito-Clasico.jpg",
    prepTime: "30 seg",
    difficulty: 1,
    baseFlavor: "Clásico",
    alcoholFree: false,
    occasion: ["Aperitivo", "Fiesta", "Tardeo"],
    ingredients: [
      { name: "Flor de Mojito Clásico", amount: "3 cl" },
      { name: "Ron blanco", amount: "4 cl" },
      { name: "Agua con gas", amount: "Top up" },
      { name: "Hielo pilé", amount: "Llenar vaso" }
    ],
    instructions: [
      "Llena un vaso alto con hielo pilé.",
      "Añade 3 cl de la base Flor de Mojito Clásico.",
      "Vierte 4 cl de tu ron blanco favorito.",
      "Completa con agua con gas, remueve suavemente y decora con una ramita de menta."
    ],
    bartenderTip: "Remueve desde el fondo hacia arriba para integrar perfectamente la base con el ron y el gas."
  },
  {
    id: "3",
    slug: "virgin-mojito",
    title: "Virgin Mojito",
    image: "/images/FlorMojito-Clasico.jpg",
    prepTime: "30 seg",
    difficulty: 1,
    baseFlavor: "Clásico",
    alcoholFree: true,
    occasion: ["Cualquier momento", "Brunch"],
    ingredients: [
      { name: "Flor de Mojito Clásico", amount: "3 cl" },
      { name: "Agua con gas o Sprite", amount: "Top up" },
      { name: "Hielo pilé", amount: "Llenar vaso" }
    ],
    instructions: [
      "Llena el vaso con abundante hielo.",
      "Añade Flor de Mojito.",
      "Completa con agua con gas muy fría y remueve."
    ],
    bartenderTip: "Si usas refresco de limón en lugar de agua con gas, añade unas gotas de lima extra para balancear el dulzor."
  },
  {
    id: "8",
    slug: "mojito-sangria",
    title: "Mojito Sangría",
    image: "/images/FlorMojito-Fraise.jpg",
    prepTime: "1 min",
    difficulty: 2,
    baseFlavor: "Fresa",
    alcoholFree: false,
    occasion: ["Fiesta", "Cena"],
    ingredients: [
      { name: "Flor de Mojito Fresa", amount: "3 cl" },
      { name: "Vino tinto joven", amount: "5 cl" },
      { name: "Gaseosa o Sprite", amount: "Top up" },
      { name: "Trozos de fruta", amount: "Al gusto" }
    ],
    instructions: [
      "En una copa de balón, añade mucho hielo y la fruta picada.",
      "Vierte Flor de Mojito Fresa.",
      "Añade el vino tinto y mezcla suavemente.",
      "Completa con gaseosa para el toque final."
    ],
    bartenderTip: "Prepara una jarra grande multiplicando por 4 las cantidades para compartir con amigos."
  }
];
