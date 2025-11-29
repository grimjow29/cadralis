# 🚀 GUIDE DE DÉPLOIEMENT CADRALIS LANDING PAGE

Guide complet pour déployer votre landing page Cadralis en ligne avec un domaine personnalisé.

## ✅ Corrections Finales Terminées

- ✅ Emoji supprimé du bouton
- ✅ Espacement du titre augmenté
- ✅ Design final validé

---

## 🌐 OPTIONS DE DÉPLOIEMENT

### 🥇 OPTION 1 : NETLIFY (RECOMMANDÉ)
**Gratuit • Facile • Domaine personnalisé inclus**

#### Étapes détaillées :

1. **Créer un compte Netlify**
   - Allez sur https://netlify.com
   - Cliquez "Sign up" → Utilisez GitHub/Google/Email

2. **Préparer vos fichiers**
   ```bash
   # Dans le Terminal, allez dans votre dossier
   cd /Users/grimjow/Desktop/cadralis
   
   # Créer un fichier zip de tous les fichiers
   zip -r cadralis-site.zip . -x "server.log" "*.DS_Store"
   ```

3. **Déployer sur Netlify**
   - Connectez-vous à Netlify
   - Glissez-déposez le fichier `cadralis-site.zip` sur la page d'accueil
   - Votre site sera en ligne instantanément !
   - Netlify vous donne une URL temporaire : `https://random-name.netlify.app`

4. **Configurer votre domaine personnalisé**
   
   **A. Si vous avez déjà un domaine :**
   - Allez dans votre dashboard Netlify → Site settings → Domain management
   - Cliquez "Add custom domain"
   - Entrez votre domaine : `cadralis.com`
   - Netlify vous donnera les DNS à configurer chez votre registrar
   
   **B. Si vous n'avez pas de domaine :**
   - Achetez un domaine chez : Namecheap, OVH, Gandi, ou Google Domains
   - Puis suivez l'étape A

5. **Configuration DNS**
   ```
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   
   Type: A
   Name: @
   Value: 75.2.60.5 (IP Netlify)
   ```

---

### 🥈 OPTION 2 : VERCEL
**Gratuit • Très rapide • Parfait pour sites statiques**

#### Étapes :

1. **Créer un compte Vercel**
   - https://vercel.com → Sign up

2. **Déployer**
   - Glissez votre dossier `cadralis` dans Vercel
   - Ou connectez un repo GitHub
   - Déploiement automatique !

3. **Domaine personnalisé**
   - Dashboard Vercel → Votre projet → Settings → Domains
   - Ajouter votre domaine
   - Configurer les DNS fournis

---

### 🥉 OPTION 3 : GITHUB PAGES
**100% Gratuit • Hébergement par GitHub**

#### Étapes :

1. **Créer un repo GitHub**
   ```bash
   cd /Users/grimjow/Desktop/cadralis
   git init
   git add .
   git commit -m "Initial Cadralis landing page"
   git branch -M main
   git remote add origin https://github.com/VOTRE-USERNAME/cadralis.git
   git push -u origin main
   ```

2. **Activer GitHub Pages**
   - GitHub → Votre repo → Settings → Pages
   - Source : Deploy from a branch → main
   - Votre site : `https://VOTRE-USERNAME.github.io/cadralis`

3. **Domaine personnalisé**
   - Settings → Pages → Custom domain
   - Entrer votre domaine
   - Configurer DNS CNAME vers `VOTRE-USERNAME.github.io`

---

## 🔧 CONFIGURATION DOMAINE PERSONNALISÉ

### Acheter un domaine (si vous n'en avez pas) :

**Recommandations :**
- **Namecheap** : ~10€/an, facile
- **OVH** : ~8€/an, français
- **Google Domains** : ~12€/an, fiable
- **Gandi** : ~15€/an, éthique

### Configuration DNS typique :

```
Type    Name    Value                    TTL
A       @       75.2.60.5 (Netlify)    300
CNAME   www     votre-site.netlify.app  300
```

---

## ⚡ MODIFICATIONS AVANT DÉPLOIEMENT

### 1. Modifier Calendly pour production

Dans `/Users/grimjow/Desktop/cadralis/index.html`, ligne ~108 :

**AVANT :**
```html
src="https://calendly.com/cadralis/30min?embed_domain=localhost&embed_type=Inline"
```

**APRÈS :**
```html
src="https://calendly.com/cadralis/30min?embed_domain=votre-domaine.com&embed_type=Inline"
```

### 2. Mise à jour config.json

Dans `/Users/grimjow/Desktop/cadralis/config.json` :

```json
{
  "site": {
    "title": "Cadralis Connect - Votre expertise digitale",
    "url": "https://votre-domaine.com"
  }
}
```

---

## 📊 APRÈS DÉPLOIEMENT

### Tests à effectuer :

1. ✅ **Page se charge correctement**
2. ✅ **Logo s'affiche bien**
3. ✅ **Typeform fonctionne**
4. ✅ **Calendly s'affiche**
5. ✅ **Réseaux sociaux redirigent**
6. ✅ **Responsive mobile**

### Optimisations recommandées :

1. **Google Analytics** (optionnel)
2. **Google Search Console** pour SEO
3. **SSL automatique** (Netlify/Vercel l'activent automatiquement)

---

## 🆘 RÉSOLUTION DE PROBLÈMES

### Problème : "Site not secure"
- **Solution :** Attendez 24h pour que SSL soit activé automatiquement

### Problème : Calendly ne s'affiche pas
- **Solution :** Vérifiez l'URL embed_domain dans index.html

### Problème : Logo ne s'affiche pas
- **Solution :** Vérifiez que les fichiers sont dans `assets/images/`

### Problème : Domaine ne fonctionne pas
- **Solution :** Vérifiez configuration DNS, attendre 24-48h

---

## 💰 COÛTS

### Gratuit :
- Hébergement : Netlify/Vercel/GitHub Pages
- SSL : Inclus
- CDN : Inclus

### Payant :
- Nom de domaine : 8-15€/an
- Emails personnalisés : 5€/mois (optionnel)

---

**🎯 RÉSULTAT FINAL :**
Votre landing page Cadralis sera accessible à `https://votre-domaine.com` avec :
- ✅ HTTPS automatique
- ✅ Vitesse optimale
- ✅ Uptime 99.9%
- ✅ Domaine professionnel