# Cadralis Landing Page

Landing page professionnelle pour Cadralis avec intégrations Typeform et Calendly.

## 🚀 Caractéristiques

- **Design Corporate** : Couleurs Cadralis (Bleu #00153C, Or #F4CB61)
- **Responsive Design** : Optimisé mobile-first
- **Intégration Typeform** : Questionnaire personnalisé intégré
- **Intégration Calendly** : Prise de rendez-vous conditionnelle
- **Performance** : HTML/CSS/JS vanilla, optimisé pour le chargement
- **Accessibilité** : Conforme aux bonnes pratiques

## 📁 Structure

```
cadralis/
├── index.html      # Page principale
├── styles.css      # Styles CSS avec design system
├── script.js       # Logique JavaScript
└── README.md       # Documentation
```

## 🎯 Fonctionnalités

### Navigation
- Logo Cadralis cliquable (retour en haut)
- Smooth scroll entre les sections
- Header fixe avec backdrop blur

### Hero Section
- Titre impactant avec mot-clé en surbrillance
- CTA vers le questionnaire
- Design épuré et professionnel

### Questionnaire (Typeform)
- Intégration via le code fourni : `01KAY6RHP6T9D7ZXZBEV11K7EB`
- Détection automatique de completion
- Interface responsive

### Calendly (Conditionnel)
- Révélé uniquement après completion du questionnaire
- Scroll automatique après questionnaire
- Message de succès temporaire
- URL : `https://calendly.com/cadralis/30min`

## 🛠️ Développement

### Serveur local
```bash
# Serveur Python simple
python3 -m http.server 8000

# Ou avec Node.js (si installé)
npx serve .

# Ou ouvrir directement index.html dans le navigateur
```

### Debug
En développement (localhost), utiliser la console :
```javascript
// Simuler completion Typeform
window.cadralisDebug.simulateTypeformCompletion();

// Réinitialiser l'état
window.cadralisDebug.reset();

// Voir l'état actuel
window.cadralisDebug.getState();

// Forcer l'affichage Calendly
window.cadralisDebug.showCalendly();
```

## 🎨 Design System

### Couleurs
- **Cadralis Blue** : `#00153C` (couleur principale)
- **Cadralis Gold** : `#F4CB61` (accent, CTAs)
- **Variations** : Automatically generated

### Typographie
- **Police** : Inter (Google Fonts)
- **Tailles** : Variables CSS responsives
- **Poids** : 400, 500, 600, 700

### Espacements
- **Base** : 8px
- **Variables** : `--space-1` à `--space-24`

## 📱 Responsive

- **Mobile First** : Design optimisé mobile
- **Breakpoints** : 768px (tablet), 1024px (desktop)
- **Conteneur** : Max-width 1200px, centré

## ⚡ Performance

- **HTML Sémantique** : Bonne structure pour SEO
- **CSS Optimisé** : Variables CSS, pas de framework lourd
- **JavaScript Léger** : Vanilla JS, pas de dépendances
- **Images** : Logos optimisés (à fournir)
- **Fonts** : Google Fonts avec preload

## 🔧 Configuration

### Typeform
```javascript
// Dans script.js, ligne 10
TYPEFORM_ID: '01KAY6RHP6T9D7ZXZBEV11K7EB'
```

### Calendly
```javascript
// Dans script.js, ligne 11
CALENDLY_URL: 'https://calendly.com/cadralis/30min'
```

## 📋 TODO

- [ ] Ajouter les vrais logos Cadralis
- [ ] Tester sur différents navigateurs
- [ ] Optimiser les images
- [ ] Configurer les meta tags pour partage social
- [ ] Ajouter Google Analytics (optionnel)

## 🚢 Déploiement

La page peut être déployée sur :
- **GitHub Pages**
- **Netlify** (recommandé)
- **Vercel**
- **Serveur web classique**

Simplement uploader les fichiers à la racine du serveur web.

---

**Cadralis** - Votre expertise digitale