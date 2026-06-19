# 🧺 POKRZ — Paniers de Fruits & Légumes Frais à Marrakech

**Des paniers composés chaque matin au souk, livrés via WhatsApp.**

Domaine concept : `pokrz.com`
Contact : `+212 612 605 737` (WhatsApp) · `salatrir@gmail.com`

---

## 📦 Contenu du projet

Site statique, 100% français, sans backend — prêt pour GitHub Pages. Réutilise l'architecture technique de CurateGreen (HTML/CSS/JS vanilla) mais avec une identité visuelle et un modèle de catalogue propres : **des paniers à composition fixe, déclinés en 3 tailles (S/M/L)**, plutôt que des produits individuels.

```
pokrz/
├── index.html              Page d'accueil
├── paniers.html             Liste des paniers + filtres par thème
├── panier.html              Page détail d'un panier (sélection taille)
├── faq.html                  FAQ accordéon
├── contact.html               Formulaire de contact + carte
├── blog.html                  Index du blog
├── blog/                     6 articles complets
├── assets/
│   ├── css/style.css         Design system (palette terracotta/olive partagée
│   │                         avec CurateGreen, motif "tressage d'osier" distinct)
│   └── js/
│       ├── app.js            Logique principale, rendu, lien WhatsApp
│       └── paniers.js        Catalogue des paniers (données)
├── manifest.json
├── sitemap.xml
├── robots.txt
└── .gitignore
```

**Différence clé avec CurateGreen :** ce site est unilingue français (pas de système i18n AR/FR/EN), et le catalogue est organisé autour de **paniers à composition fixe** plutôt que de produits vendus à l'unité.

---

## 🚀 Déploiement GitHub Pages

```bash
git init
git add .
git commit -m "Launch POKRZ"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/pokrz.git
git push -u origin main
```

Puis sur GitHub : **Settings → Pages → Source → Deploy from branch → `main` → `/ (root)`**.

**Domaine personnalisé (pokrz.com) :** ajoutez un fichier `CNAME` à la racine contenant :
```
pokrz.com
```
Puis configurez le DNS de votre domaine pour pointer vers GitHub Pages.

---

## 🧺 Gérer les paniers

Tous les paniers vivent dans **`assets/js/paniers.js`**, sous forme d'un tableau unique. Chaque panier a une composition fixe et trois tarifs (S/M/L) :

```js
{
  id: "panier-tajine",
  nom: "Panier Tajine",
  theme: "cuisine",              // "cuisine" | "frais" | "fruits" | "mixte"
  description: "...",
  image: "https://images.unsplash.com/...",
  composition: ["Tomates", "Pommes de terre", "Carottes", "Oignons"],
  tailles: {
    S: { prix: 45, poids: "≈ 3 kg", portions: "2-3 personnes" },
    M: { prix: 75, poids: "≈ 5 kg", portions: "4-5 personnes" },
    L: { prix: 110, poids: "≈ 8 kg", portions: "6-8 personnes" }
  },
  populaire: true                // affiche un badge "Populaire"
}
```

**Pour ajouter un nouveau panier :** dupliquez un bloc existant, changez `id` (utilisé dans les URLs `panier.html?id=...`), `nom`, `composition`, et les trois niveaux de prix. Le panier apparaît automatiquement sur `paniers.html`, obtient sa propre page de détail, et est inclus dans la recherche.

**La composition est volontairement fixe** par panier (conformément à la demande) — seules les *quantités* changent selon la taille choisie, pas la liste des produits.

---

## 💬 Système de commande WhatsApp

Chaque bouton "Commander" est généré par `buildWaUrl()` dans `app.js`, qui construit un lien `https://wa.me/212612605737?text=...` pré-rempli avec :

- Le nom du panier
- La taille sélectionnée (S/M/L)
- La zone de livraison

**Pour changer le numéro WhatsApp**, modifiez la constante unique en haut de `assets/js/app.js` :

```js
const WA_NUMBER = "212612605737";
```

Cette constante contrôle le bouton flottant, le bouton d'en-tête, la barre mobile, et tous les boutons "Commander" du site.

---

## 📈 SEO

- **`sitemap.xml`** — liste toutes les pages et tous les paniers individuels (`panier.html?id=...`).
- **`robots.txt`** — autorise tout le crawl, pointe vers le sitemap.
- **Open Graph + Twitter Card** sur chaque page.
- **schema.org :** `LocalBusiness` + `WebSite` sur l'accueil, `Product` dynamique sur chaque panier, `FAQPage` sur la FAQ, `Article` sur chaque billet de blog.

### Ajouter un article de blog

Ce projet inclut **6 articles complets et originaux** (pas de contenu de remplissage). Pour en ajouter un :

1. Dupliquez un fichier existant dans `/blog/`.
2. Mettez à jour `<title>`, `<meta description>`, l'URL canonique, et le bloc JSON-LD `Article`.
3. Rédigez un `<h1>`, une introduction, 2-4 `<h2>`, et un bloc CTA (`.article-cta`).
4. Ajoutez 2-3 liens internes vers des articles ou paniers liés en bas de page.
5. Ajoutez une entrée `<article class="blog-card">` dans `blog.html`.
6. Ajoutez une entrée `<url>` dans `sitemap.xml`.

**Pistes de sujets supplémentaires :** une recette par panier thématique, des guides de quartier ("livraison à Guéliz", "livraison à l'Hivernage"...), des comparatifs saisonniers, des articles destinés aux expatriés ou visiteurs.

---

## ✅ Check-list avant lancement

- [ ] Remplacer `https://pokrz.com` par le vrai domaine partout (canonical, schema, sitemap, Open Graph).
- [ ] Vérifier que le numéro WhatsApp `+212612605737` est correct et actif.
- [ ] Soumettre `sitemap.xml` à Google Search Console.
- [ ] Tester le flux de commande WhatsApp sur mobile et desktop.
- [ ] Remplacer les photos Unsplash par de vraies photos de paniers si possible.
- [ ] Créer une fiche Google Business Profile pour renforcer le schema LocalBusiness.

---

## 🧩 Notes techniques

- **Aucun framework.** HTML/CSS/JS pur — hébergeable n'importe où, sans pipeline de build.
- **Aucun backend, aucune base de données.** L'état de la "commande" vit entièrement dans le message WhatsApp généré.
- **Catalogue volontairement simple** : la recherche est un filtre texte côté client, suffisant pour 8 paniers — à revoir si le catalogue dépasse plusieurs dizaines d'entrées.

---

© POKRZ.com — Marrakech, Maroc 🇲🇦
