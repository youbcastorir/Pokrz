/* ==========================================================================
   POKRZ — paniers.js
   Chaque panier a une composition FIXE déclinée en 3 tailles (S/M/L).
   Le prix varie selon la taille ; la composition (liste d'articles) reste
   la même, seules les quantités changent.
   ========================================================================== */

const PKZ_PANIERS = [
  {
    id: "panier-tajine",
    nom: "Panier Tajine",
    theme: "cuisine",
    description: "Tout ce qu'il faut pour un tajine marocain réussi : légumes de base fraîchement sélectionnés au souk.",
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=700&q=80",
    composition: [
      "Tomates", "Pommes de terre", "Carottes", "Oignons", "Courgettes (selon saison)"
    ],
    tailles: {
      S: { prix: 45, poids: "≈ 3 kg", portions: "2-3 personnes" },
      M: { prix: 75, poids: "≈ 5 kg", portions: "4-5 personnes" },
      L: { prix: 110, poids: "≈ 8 kg", portions: "6-8 personnes" }
    },
    populaire: true
  },
  {
    id: "panier-salade",
    nom: "Panier Salade",
    theme: "frais",
    description: "Une sélection croquante et fraîche pour vos salades quotidiennes : laitue, concombre, tomates et plus.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700&q=80",
    composition: [
      "Laitue", "Concombres", "Tomates", "Carottes", "Citron"
    ],
    tailles: {
      S: { prix: 35, poids: "≈ 2 kg", portions: "2-3 personnes" },
      M: { prix: 58, poids: "≈ 3.5 kg", portions: "4-5 personnes" },
      L: { prix: 85, poids: "≈ 5.5 kg", portions: "6-8 personnes" }
    },
    populaire: true
  },
  {
    id: "panier-couscous",
    nom: "Panier Couscous du Vendredi",
    theme: "cuisine",
    description: "Les sept légumes traditionnels du couscous marocain, prêts pour votre repas du vendredi en famille.",
    image: "https://images.unsplash.com/photo-1591486825750-d5dcf1f2c4ff?w=700&q=80",
    composition: [
      "Carottes", "Courgettes", "Navets", "Chou", "Pommes de terre", "Potiron", "Tomates"
    ],
    tailles: {
      S: { prix: 55, poids: "≈ 4 kg", portions: "3-4 personnes" },
      M: { prix: 90, poids: "≈ 6.5 kg", portions: "5-6 personnes" },
      L: { prix: 130, poids: "≈ 10 kg", portions: "8-10 personnes" }
    },
    populaire: true
  },
  {
    id: "panier-jus",
    nom: "Panier Jus & Smoothies",
    theme: "fruits",
    description: "Fruits juteux sélectionnés pour vos jus frais du matin : oranges, pommes, bananes et fruits de saison.",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=700&q=80",
    composition: [
      "Oranges", "Pommes", "Bananes", "Citrons", "Fruit de saison au choix du marché"
    ],
    tailles: {
      S: { prix: 40, poids: "≈ 3 kg", portions: "2-3 personnes" },
      M: { prix: 68, poids: "≈ 5 kg", portions: "4-5 personnes" },
      L: { prix: 98, poids: "≈ 7.5 kg", portions: "6-8 personnes" }
    },
    populaire: false
  },
  {
    id: "panier-famille",
    nom: "Panier Famille",
    theme: "mixte",
    description: "Le panier le plus complet : un mélange équilibré de fruits et légumes pour couvrir une semaine de repas familiaux.",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=700&q=80",
    composition: [
      "Tomates", "Pommes de terre", "Oignons", "Carottes", "Pommes", "Bananes", "Oranges", "Salade"
    ],
    tailles: {
      S: { prix: 80, poids: "≈ 6 kg", portions: "famille de 3" },
      M: { prix: 135, poids: "≈ 10 kg", portions: "famille de 4-5" },
      L: { prix: 190, poids: "≈ 15 kg", portions: "famille de 6+" }
    },
    populaire: true
  },
  {
    id: "panier-soupe",
    nom: "Panier Harira & Soupes",
    theme: "cuisine",
    description: "Les légumes essentiels pour une harira ou une soupe marocaine maison réconfortante.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=700&q=80",
    composition: [
      "Tomates", "Oignons", "Céleri", "Persil & coriandre fraîche", "Citron"
    ],
    tailles: {
      S: { prix: 30, poids: "≈ 2 kg", portions: "2-3 personnes" },
      M: { prix: 50, poids: "≈ 3.5 kg", portions: "4-5 personnes" },
      L: { prix: 72, poids: "≈ 5 kg", portions: "6-8 personnes" }
    },
    populaire: false
  },
  {
    id: "panier-fruits-saison",
    nom: "Panier Fruits de Saison",
    theme: "fruits",
    description: "La surprise du marché : un mélange des meilleurs fruits de saison choisis chaque matin à Marrakech.",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=700&q=80",
    composition: [
      "Sélection selon la saison : fraises, pastèque, raisins, figues, agrumes ou autres"
    ],
    tailles: {
      S: { prix: 45, poids: "≈ 3 kg", portions: "2-3 personnes" },
      M: { prix: 75, poids: "≈ 5 kg", portions: "4-5 personnes" },
      L: { prix: 105, poids: "≈ 7 kg", portions: "6-8 personnes" }
    },
    populaire: false
  },
  {
    id: "panier-petit-dejeuner",
    nom: "Panier Petit-Déjeuner",
    theme: "mixte",
    description: "Fruits frais et essentiels pour bien démarrer la journée en famille.",
    image: "https://images.unsplash.com/photo-1601598851547-4302969d0614?w=700&q=80",
    composition: [
      "Bananes", "Oranges", "Pommes", "Citrons", "Avocat (selon disponibilité)"
    ],
    tailles: {
      S: { prix: 38, poids: "≈ 2.5 kg", portions: "2-3 personnes" },
      M: { prix: 62, poids: "≈ 4 kg", portions: "4-5 personnes" },
      L: { prix: 88, poids: "≈ 6 kg", portions: "6-8 personnes" }
    },
    populaire: false
  }
];

if (typeof module !== "undefined") module.exports = PKZ_PANIERS;
