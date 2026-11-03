# Dressing du matin

Application personnelle de garde-robe : elle propose chaque matin des tenues selon la météo, l’occasion et le style voulu, et les montre sur un mannequin 3D.

**Voir le site : https://menzoait.github.io/tp-git-bts-sio/dressing-du-matin/**

## Ce qu’elle fait

- **Éclairage** : au premier lancement, l’appli demande le mode clair ou le mode sombre (ou de suivre l’appareil). Le choix se change à tout moment dans les réglages, et le studio 3D adapte sa lumière.
- **Garde-robe** : hauts, bas, pièces uniques, vestes et manteaux, chaussures, accessoires, présentés comme un catalogue de marque. Chaque pièce est photographiée portée sur ton mannequin 3D, en studio et cadrée sur elle, comme les photos de mannequins des boutiques en ligne ; la pièce seule s’affiche au survol. Rayons en onglets, recherche, vue à 1, 2 ou 3 colonnes, filtres (propres ou au sale, favoris, achetées en boutique, couleur), tri (par rayon, récentes, moins portées) et cœur pour les favoris. Chaque pièce s’ouvre sur une fiche façon fiche produit : galerie de photos, matière, style, chaleur, dernière fois portée, et les gestes « Porter aujourd’hui », « Favori », « Au sale » et « Modifier la fiche ». Ajout par photo (fond détouré automatiquement), par capture d’écran de la fiche produit, par marque et référence, ou par un lien d’ajout (une adresse qui se termine par `#ajout=…` : l’appli montre les pièces et demande confirmation avant de les ranger). Lecture d’étiquette pour la marque, la référence et la matière.
- **Météo du jour** : à l’ouverture, l’appli propose d’utiliser la localisation ; sinon, une barre de recherche permet de saisir sa ville. La carte météo s’anime selon le temps (soleil, nuages, pluie, neige, orage, brouillard, vent, nuit) et donne le ressenti du matin et de l’après-midi, la pluie et le vent. Les valeurs restent ajustables à la main.
- **Tenues du jour** : trois looks construits à partir de la température du matin et de l’après-midi, de la pluie et du vent, de l’occasion et du style. Le styliste IA peut choisir et expliquer les looks.
- **Mannequin 3D réaliste** : vrai corps humain (maillage MakeHuman, CC0) déformé selon le sexe, la taille, le poids (IMC), la corpulence, les épaules et les hanches, en pose naturelle, bras le long du corps. Les vêtements sont taillés sur ce corps : ajustés, tombé, plis, ourlets nets, cols, revers, boutons, surpiqûres, chaussures, cheveux et accessoires. Rendu façon photo de studio : ombres portées au sol et ombres douces entre les pièces (shadow mapping), relief des matières (laine, maille, denim, cuir, peau), rendu filmique et suréchantillonnage pour des contours nets. Moteur WebGL écrit à la main, sans bibliothèque.
- **Boutiques** : une sélection de vraies pièces chez Uniqlo, Zara, Decathlon, Levi’s, Dr. Martens, Nike, Adidas et Carhartt, avec leurs vraies photos, rangée en onglets : **Femme** et **Homme** (avec leurs rayons en sous-onglets : vestes et manteaux, hauts, pantalons, robes, chaussures, accessoires, promos), **Marques** (une page par marque) et **Envies**. Grande image, recherche, vue à 1, 2 ou 3 colonnes, filtres par marque et par couleur. Chaque pièce s’essaie sur le mannequin : l’appli construit des looks autour d’elle avec les vêtements de ta garde-robe. On choisit le coloris, on garde les pièces qui plaisent dans une liste d’envies (avec le total) et on achète sur le site de la boutique. Au retour dans l’appli, elle demande « Tu l’as acheté ? » : un geste, et la pièce arrive dans la garde-robe avec sa photo (l’appli ne voit pas ce qui se passe sur le site de la boutique, c’est pourquoi elle pose la question).
- **Tendances** : couleurs et pièces de la saison, expliquées dans l’appli (ce que c’est, à quoi sert le badge « Tendance », ce que veut dire la coche). Chaque couleur s’ouvre : avec quoi la porter, tes pièces de cette couleur et celles des boutiques.
- **Historique** : tenues portées et notées. L’appli évite de reproposer la tenue de la veille et apprend tes goûts.

## Fonctionnement

L’appli tient dans un seul fichier, `index.html`, sans dépendance à installer. On peut l’utiliser de deux façons.

**Sur le site (GitHub Pages)**, pour tout le monde :

- la garde-robe, les photos de vêtements, la liste d’envies, l’historique, les réglages et le choix d’éclairage sont enregistrés dans le navigateur de l’appareil (localStorage pour les fiches, IndexedDB pour les photos) ;
- chaque personne a sa propre garde-robe, rien n’est envoyé en ligne ;
- les fiches se remplissent à la main et les captures de fiche produit se recadrent avec les curseurs ;
- la météo vient d’Open-Meteo (prévisions et recherche de ville, sans clé) et de BigDataCloud (nom de la ville à partir de la position) ;
- l’export JSON est disponible dans les réglages.

**Dans Claude**, comme artefact :

- les données sont enregistrées sur le compte Claude et suivent sur tous ses appareils ;
- la météo se règle à la main (un artefact Claude ne peut ni localiser ni appeler un service extérieur) ;
- le styliste IA est disponible : analyse des photos, des captures et des étiquettes, choix et explication des looks.

## Données personnelles

- La silhouette (taille, poids, morphologie) reste dans le navigateur de l’appareil. Elle n’est jamais envoyée, ni au stockage en ligne ni au styliste IA.
- Aucune photo de la personne n’est demandée.
- Les photos portées de la garde-robe sont calculées sur l’appareil et gardées dans son navigateur ; elles ne sont envoyées nulle part.
- Les photos d’étiquette servent seulement à la lecture et ne sont pas gardées.
- Pour la météo, seule la ville choisie, ou la position arrondie à 1 km environ, est envoyée aux services météo. La position n’est enregistrée que dans le navigateur et peut être oubliée depuis les réglages. Refuser la localisation n’empêche rien : il suffit de chercher sa ville.
- Sur le site, les données restent dans le navigateur : effacer les données du site dans le navigateur les supprime aussi.
- Les données peuvent être exportées (JSON) ou supprimées en entier depuis les réglages.

## Structure du code

Tout est dans `index.html` :

- les styles (design « studio » en deux éclairages, clair et sombre : blanc, noir, gris pierre, Bodoni Moda et Hanken Grotesk) ;
- le moteur 3D « Atelier » : corps MakeHuman compressé dans la page, morphing et squelette simplifié, vêtements générés dans un Web Worker (coques subdivisées, découpes nettes, tombé, plis), rendu WebGL façon studio photo (ombres, relief des matières, rendu filmique) ;
- les rendus de vêtements façon photo produit (SVG avec relief et matière) ;
- le module météo (localisation, recherche de ville, prévisions, icônes animées en SVG) ;
- les règles de tenue (couches selon la température, accords de couleurs, rotation des pièces, tendances, goûts appris) ;
- le studio photo : les pièces de la garde-robe rendues portées sur le mannequin, hors écran, puis gardées dans le navigateur (IndexedDB) ;
- la sélection des boutiques (pièces, prix relevés, liens vers les sites) et la liste d’envies ;
- l’interface : Aujourd’hui, Garde-robe, Boutiques, Silhouette, Historique, Réglages.

## Crédits

Les boutiques citées n’ont aucun lien avec l’appli. Les prix ont été relevés sur leurs sites le 30 octobre 2026 : le site de la marque fait foi. Les photos des pièces appartiennent aux marques : elles sont affichées depuis leurs sites (rien n’est copié dans le dépôt) et chaque pièce renvoie vers sa page d’origine. Si une photo ne se charge pas, l’appli montre son propre rendu de la pièce.

Le corps 3D vient de MakeHuman (maillage de base, morphs et poids de squelette), publié sous licence CC0 par la communauté MakeHuman : http://www.makehumancommunity.org
