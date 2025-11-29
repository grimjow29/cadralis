/**
 * CADRALIS LANDING PAGE - LOGIQUE D'INTERACTION
 * Gestion des interactions Typeform/Calendly et navigation smooth
 */

// Configuration
const CONFIG = {
    TYPEFORM_ID: '01KAY6RHP6T9D7ZXZBEV11K7EB',
    CALENDLY_URL: 'https://calendly.com/cadralis/30min',
    SCROLL_OFFSET: 80,
    ANIMATION_DURATION: 600,
    SUCCESS_MESSAGE_DURATION: 3000
};

// État de l'application
let state = {
    isTypeformCompleted: false,
    isCalendlyVisible: false,
    successMessageTimeout: null
};

/**
 * Initialisation de l'application
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Cadralis Landing Page - Initialisation');
    
    // Initialiser la gestion des logos
    initializeLogos();
    
    // Initialiser les event listeners
    initializeEventListeners();
    
    // Initialiser Typeform
    initializeTypeform();
    
    // Observer les changements de section pour les animations
    initializeIntersectionObserver();
    
    // Plus besoin des boutons de test - Calendly est maintenant permanent
    
    console.log('✅ Application initialisée');
});

/**
 * Initialise la gestion des logos avec fallback
 */
function initializeLogos() {
    const logoImg = document.querySelector('.logo-img');
    const footerLogoImg = document.querySelector('.footer-logo-img');
    
    // Gestion du logo principal
    if (logoImg) {
        logoImg.onerror = function() {
            console.log('📷 Logo principal non trouvé, affichage du fallback');
            this.style.display = 'none';
            const placeholder = this.nextElementSibling;
            if (placeholder && placeholder.classList.contains('logo-placeholder')) {
                placeholder.style.display = 'block';
            }
        };
        
        logoImg.onload = function() {
            console.log('✅ Logo principal chargé');
            const placeholder = this.nextElementSibling;
            if (placeholder && placeholder.classList.contains('logo-placeholder')) {
                placeholder.style.display = 'none';
            }
        };
    }
    
    // Gestion du logo footer
    if (footerLogoImg) {
        footerLogoImg.onerror = function() {
            console.log('📷 Logo footer non trouvé, affichage du fallback');
            this.style.display = 'none';
            const placeholder = this.nextElementSibling;
            if (placeholder && placeholder.classList.contains('logo-placeholder')) {
                placeholder.style.display = 'block';
            }
        };
        
        footerLogoImg.onload = function() {
            console.log('✅ Logo footer chargé');
            const placeholder = this.nextElementSibling;
            if (placeholder && placeholder.classList.contains('logo-placeholder')) {
                placeholder.style.display = 'none';
            }
        };
    }
}

/**
 * Initialise tous les event listeners
 */
function initializeEventListeners() {
    // Event listener pour les messages Typeform
    window.addEventListener('message', handleTypeformMessage);
    
    // Event listener pour le smooth scroll
    document.addEventListener('click', handleSmoothScroll);
    
    // Event listener pour fermer le message de succès
    document.addEventListener('click', handleSuccessMessageClose);
    
    console.log('📡 Event listeners initialisés');
}

/**
 * Gestion des messages du Typeform
 */
function handleTypeformMessage(event) {
    // Vérifier que le message provient bien de Typeform
    if (!event.data || typeof event.data !== 'object') {
        return;
    }
    
    const { type, formId, payload } = event.data;
    
    console.log('📨 Message Typeform reçu:', event.data);
    
    // Gérer les différents types d'événements Typeform (nouveaux et anciens)
    switch (type) {
        case 'form_submit':
        case 'form-submit':
            handleTypeformSubmission();
            break;
            
        case 'form_response':
        case 'form-response':
            console.log('📝 Réponse Typeform reçue');
            handleTypeformSubmission();
            break;
            
        case 'form_screen_changed':
        case 'form-screen-changed':
            console.log('📄 Changement d\'écran Typeform');
            break;
            
        case 'form_ready':
        case 'form-ready':
            console.log('✅ Typeform prêt');
            break;
            
        // Événement spécifique pour form completed
        case 'form_completed':
        case 'form-completed':
            console.log('🎉 Typeform terminé !');
            handleTypeformSubmission();
            break;
            
        default:
            console.log('ℹ️ Événement Typeform non géré:', type);
            // Si on reçoit un payload avec responseId, c'est probablement une completion
            if (payload && payload.responseId) {
                console.log('📋 Détection completion via responseId:', payload.responseId);
                handleTypeformSubmission();
            }
    }
}

/**
 * Gestion de la soumission du Typeform
 */
function handleTypeformSubmission() {
    console.log('🎉 Typeform complété !');
    
    state.isTypeformCompleted = true;
    
    // Afficher le message de succès
    showSuccessMessage();
    
    // Attendre un peu puis révéler Calendly et scroll
    setTimeout(() => {
        revealCalendlySection();
        scrollToCalendly();
    }, 1500);
}

/**
 * Affiche le message de succès
 */
function showSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    
    if (successMessage) {
        successMessage.classList.remove('hidden');
        successMessage.classList.add('show');
        
        // Programmer la fermeture automatique
        if (state.successMessageTimeout) {
            clearTimeout(state.successMessageTimeout);
        }
        
        state.successMessageTimeout = setTimeout(() => {
            hideSuccessMessage();
        }, CONFIG.SUCCESS_MESSAGE_DURATION);
    }
}

/**
 * Cache le message de succès
 */
function hideSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    
    if (successMessage) {
        successMessage.classList.remove('show');
        
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 300);
    }
    
    if (state.successMessageTimeout) {
        clearTimeout(state.successMessageTimeout);
        state.successMessageTimeout = null;
    }
}

/**
 * Gestion du clic pour fermer le message de succès
 */
function handleSuccessMessageClose(event) {
    const successMessage = document.getElementById('success-message');
    
    if (successMessage && 
        !successMessage.classList.contains('hidden') && 
        event.target === successMessage) {
        hideSuccessMessage();
    }
}

/**
 * Révèle la section Calendly avec animation
 */
function revealCalendlySection() {
    const calendlySection = document.getElementById('calendly');
    
    if (calendlySection && !state.isCalendlyVisible) {
        console.log('📅 Révélation section Calendly');
        
        calendlySection.classList.remove('hidden');
        calendlySection.classList.add('fade-in');
        
        state.isCalendlyVisible = true;
        
        // Mettre à jour l'iframe Calendly avec les bons paramètres
        const iframe = calendlySection.querySelector('iframe');
        if (iframe) {
            const currentDomain = window.location.hostname;
            iframe.src = `${CONFIG.CALENDLY_URL}?embed_domain=${currentDomain}&embed_type=Inline&hide_gdpr_banner=1`;
        }
    }
}

/**
 * Scroll vers la section Calendly
 */
function scrollToCalendly() {
    setTimeout(() => {
        scrollToSection('calendly');
    }, 600);
}

/**
 * Navigation smooth scroll vers une section
 */
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight || 0;
        const elementPosition = element.offsetTop - headerHeight - CONFIG.SCROLL_OFFSET;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
        
        console.log(`📍 Scroll vers: ${sectionId}`);
    } else {
        console.warn(`⚠️ Section non trouvée: ${sectionId}`);
    }
}

/**
 * Gestion du smooth scroll pour les liens
 */
function handleSmoothScroll(event) {
    const target = event.target.closest('a[href^="#"]');
    
    if (target) {
        event.preventDefault();
        const sectionId = target.getAttribute('href').substring(1);
        scrollToSection(sectionId);
    }
}

/**
 * Initialise Typeform avec méthodes alternatives
 */
function initializeTypeform() {
    console.log('📝 Initialisation Typeform...');
    
    // Vérifier que le script Typeform est chargé
    if (typeof window.tf !== 'undefined' && window.tf.load) {
        console.log('✅ Script Typeform déjà chargé');
    } else {
        console.log('⏳ En attente du chargement du script Typeform...');
    }
    
    // Observer l'élément Typeform pour s'assurer qu'il est bien rendu
    const typeformElement = document.querySelector('[data-tf-live]');
    if (typeformElement) {
        console.log('📋 Élément Typeform trouvé');
        
        // Observer quand l'élément devient visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('👀 Typeform visible dans le viewport');
                    setupTypeformObserver();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(typeformElement);
    } else {
        console.error('❌ Élément Typeform non trouvé');
    }
    
    // Méthode alternative : observer les changements dans l'iframe Typeform
    setupAlternativeTypeformDetection();
}

/**
 * Configure un observateur pour détecter les changements Typeform
 */
function setupTypeformObserver() {
    // Observer les changements dans le container Typeform
    const typeformContainer = document.querySelector('.typeform-container');
    if (typeformContainer) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                // Chercher des indices de completion
                if (mutation.type === 'childList') {
                    const addedNodes = Array.from(mutation.addedNodes);
                    addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            // Chercher des classes ou attributs indiquant la completion
                            if (node.className && (
                                node.className.includes('thank') ||
                                node.className.includes('complete') ||
                                node.className.includes('finish')
                            )) {
                                console.log('🎉 Completion Typeform détectée via DOM !');
                                handleTypeformSubmission();
                            }
                        }
                    });
                }
            });
        });
        
        observer.observe(typeformContainer, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'data-state']
        });
        
        console.log('👀 Observateur DOM Typeform configuré');
    }
}

/**
 * Méthode alternative pour détecter la completion du Typeform
 */
function setupAlternativeTypeformDetection() {
    // Écouter TOUS les messages postMessage pour debug complet
    window.addEventListener('message', function(event) {
        console.log('📨 Message postMessage reçu:', {
            origin: event.origin,
            data: event.data,
            source: event.source
        });
        
        // Vérification extensive des événements Typeform
        if (event.origin && event.origin.includes('typeform')) {
            console.log('🟢 Message de Typeform détecté:', event.data);
            
            // Tenter de traiter le message
            handleTypeformMessage(event);
        }
        
        // Autres patterns possibles
        if (event.data && typeof event.data === 'object') {
            const { type, eventType, action } = event.data;
            
            if (type && (type.includes('form') || type.includes('submit'))) {
                console.log('🟡 Possible événement Typeform:', event.data);
                handleTypeformMessage(event);
            }
        }
    });
    
    // Vérification périodique de l'état du Typeform
    let checkCount = 0;
    const maxChecks = 100; // 5 minutes maximum
    
    const periodicCheck = setInterval(() => {
        checkCount++;
        
        // Chercher dans l'iframe Typeform des indices de completion
        const iframes = document.querySelectorAll('iframe[src*="typeform"]');
        
        if (iframes.length > 0) {
            console.log(`🔍 Vérification périodique ${checkCount}/${maxChecks} - ${iframes.length} iframe(s) Typeform trouvée(s)`);
        }
        
        // Arrêter après un certain temps
        if (checkCount >= maxChecks) {
            clearInterval(periodicCheck);
            console.log('⏰ Arrêt de la vérification périodique');
        }
    }, 3000); // Vérifier toutes les 3 secondes
}

/**
 * Initialise l'observer pour les animations au scroll
 */
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observer les sections pour les animations
    const sectionsToObserve = document.querySelectorAll('.questionnaire-section, .calendly-section');
    sectionsToObserve.forEach(section => observer.observe(section));
}

/**
 * Fonctions utilitaires pour le debugging
 */
window.cadralisDebug = {
    // Simuler la completion du Typeform (pour les tests)
    simulateTypeformCompletion: function() {
        console.log('🧪 Simulation completion Typeform');
        handleTypeformSubmission();
    },
    
    // Réinitialiser l'état
    reset: function() {
        console.log('🔄 Réinitialisation de l\'état');
        state.isTypeformCompleted = false;
        state.isCalendlyVisible = false;
        
        const calendlySection = document.getElementById('calendly');
        if (calendlySection) {
            calendlySection.classList.add('hidden');
            calendlySection.classList.remove('fade-in');
        }
        
        hideSuccessMessage();
    },
    
    // Afficher l'état actuel
    getState: function() {
        return { ...state };
    },
    
    // Forcer l'affichage de Calendly
    showCalendly: function() {
        console.log('🧪 Affichage forcé de Calendly');
        revealCalendlySection();
    },
    
    // Tester les messages Typeform
    testTypeformMessage: function(type = 'form_submit') {
        const testEvent = {
            data: {
                type: type,
                formId: CONFIG.TYPEFORM_ID,
                payload: { responseId: 'test-' + Date.now() }
            },
            origin: 'https://embed.typeform.com'
        };
        console.log('🧪 Test message Typeform:', testEvent);
        handleTypeformMessage(testEvent);
    }
};

/**
 * Ajoute un bouton de test en mode développement
 */
function addTestButton() {
    console.log('🔍 addTestButton appelée, hostname:', window.location.hostname);
    
    // FORCER l'affichage pour le debug (temporaire)
    console.log('✅ Création forcée du bouton de test...');
    
    // Attendre que le DOM soit complètement chargé
    setTimeout(() => {
        // Créer le bouton de test
        const testButton = document.createElement('button');
        testButton.innerHTML = '🧪 Test Calendly';
        testButton.id = 'floating-test-button';
        testButton.style.cssText = `
            position: fixed !important;
            bottom: 20px !important;
            right: 20px !important;
            z-index: 9999 !important;
            background: #F4CB61 !important;
            color: #00153C !important;
            border: 2px solid #00153C !important;
            padding: 12px 16px !important;
            border-radius: 8px !important;
            font-weight: bold !important;
            cursor: pointer !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
            font-size: 14px !important;
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
        `;
        
        testButton.onclick = () => {
            console.log('🧪 Bouton flottant test cliqué');
            if (window.cadralisDebug && window.cadralisDebug.simulateTypeformCompletion) {
                window.cadralisDebug.simulateTypeformCompletion();
            } else {
                console.error('❌ cadralisDebug non disponible, tentative directe...');
                // Tentative directe
                handleTypeformSubmission();
            }
        };
        
        document.body.appendChild(testButton);
        console.log('✅ Bouton de test flottant ajouté au DOM');
        
        // Vérifier qu'il est bien visible
        setTimeout(() => {
            const btn = document.getElementById('floating-test-button');
            if (btn) {
                console.log('✅ Bouton confirmé dans le DOM:', btn.getBoundingClientRect());
            }
        }, 100);
    }, 500);
}

/**
 * Affiche la section de test en mode développement
 */
function showDevTestSection() {
    console.log('🔍 showDevTestSection appelée');
    const devTestSection = document.getElementById('dev-test');
    if (devTestSection) {
        devTestSection.style.display = 'block';
        console.log('✅ Section de test dev affichée');
    } else {
        console.error('❌ Section dev-test non trouvée dans le DOM');
        // Lister les éléments pour debug
        console.log('🔍 Éléments avec ID dans le DOM:', 
            Array.from(document.querySelectorAll('[id]')).map(el => el.id));
    }
}

// Exposer pour le debugging en développement
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🔧 Mode développement - Debug disponible via window.cadralisDebug');
}

/**
 * Gestion des erreurs globales
 */
window.addEventListener('error', function(event) {
    console.error('❌ Erreur globale:', event.error);
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('❌ Promise rejetée:', event.reason);
});

console.log('📄 Script Cadralis chargé - Version 1.0.0');