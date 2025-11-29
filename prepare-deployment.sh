#!/bin/bash

# 🚀 SCRIPT DE PRÉPARATION POUR DÉPLOIEMENT CADRALIS

echo "🚀 Préparation du déploiement Cadralis..."

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour demander le domaine
read_domain() {
    echo ""
    echo -e "${YELLOW}Quel sera votre nom de domaine ? (exemple: cadralis.com)${NC}"
    read -p "Domaine: " domain
    
    if [ -z "$domain" ]; then
        echo -e "${RED}Erreur: Veuillez entrer un nom de domaine${NC}"
        read_domain
    fi
}

# Demander le domaine à l'utilisateur
read_domain

echo ""
echo -e "${GREEN}✅ Configuration pour: $domain${NC}"

# 1. Mettre à jour Calendly embed domain
echo "📅 Mise à jour Calendly embed domain..."
sed -i.bak "s/embed_domain=localhost/embed_domain=$domain/g" index.html

# 2. Mettre à jour config.json
echo "⚙️ Mise à jour config.json..."
sed -i.bak "s|\"url\": \".*\"|\"url\": \"https://$domain\"|g" config.json

# 3. Créer le fichier _redirects pour Netlify (optionnel)
echo "🔗 Création fichier _redirects..."
echo "/*    /index.html   200" > _redirects

# 4. Créer .gitignore
echo "📁 Création .gitignore..."
cat > .gitignore << EOL
# Logs
*.log
server.log

# OS
.DS_Store
Thumbs.db

# Temporary files
*.tmp
*.bak

# Development
node_modules/
.env
EOL

# 5. Nettoyer les fichiers temporaires
echo "🧹 Nettoyage..."
rm -f *.bak
rm -f server.log

# 6. Créer une archive pour déploiement
echo "📦 Création archive de déploiement..."
zip -r "cadralis-production.zip" . -x "*.sh" "*.bak" "server.log" ".DS_Store" "DEPLOYMENT_GUIDE.md"

echo ""
echo -e "${GREEN}✅ Préparation terminée !${NC}"
echo ""
echo -e "${YELLOW}📦 Fichier prêt pour déploiement: cadralis-production.zip${NC}"
echo ""
echo -e "${GREEN}🚀 PROCHAINES ÉTAPES :${NC}"
echo "1. Allez sur https://netlify.com (recommandé)"
echo "2. Glissez-déposez le fichier cadralis-production.zip"
echo "3. Configurez votre domaine $domain dans Netlify"
echo "4. Votre site sera en ligne à https://$domain !"
echo ""
echo -e "${YELLOW}📚 Guide détaillé disponible dans: DEPLOYMENT_GUIDE.md${NC}"