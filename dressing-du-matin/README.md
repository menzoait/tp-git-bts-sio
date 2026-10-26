# Dressing du matin

Application personnelle de garde-robe : elle propose chaque matin des tenues selon la météo, l’occasion et le style voulu, et les montre sur un mannequin 3D.

**Voir le site : https://menzoait.github.io/tp-git-bts-sio/dressing-du-matin/**

## Ce qu’elle fait

- **Garde-robe** : hauts, bas, pièces uniques, vestes et manteaux, chaussures, accessoires. Ajout par photo (fond détouré automatiquement), par capture d’écran de la fiche produit, ou par marque et référence. Lecture d’étiquette pour la marque, la référence et la matière.
- **Météo du jour** : à l’ouverture, l’appli propose d’utiliser la localisation ; sinon, une barre de recherche permet de saisir sa ville. La carte météo s’anime selon le temps (soleil, nuages, pluie, neige, orage, brouillard, vent, nuit) et donne le ressenti du matin et de l’après-midi, la pluie et le vent. Les valeurs restent ajustables à la main.
- **Tenues du jour** : trois looks construits à partir de la température du matin et de l’après-midi, de la pluie et du vent, de l’occasion et du style. Le styliste IA peut choisir et expliquer les looks.
- **Mannequin 3D** : femme ou homme, taille, poids, corpulence, épaules, hanches, teint et cheveux. Moteur WebGL écrit à la main, sans bibliothèque.
- **Tendances** : couleurs et pièces de la saison, avec les pièces que tu as déjà.
- **Historique** : tenues portées et notées. L’appli évite de reproposer la tenue de la veille et apprend tes goûts.

## Fonctionnement

L’appli tient dans un seul fichier, `index.html`, sans dépendance à installer. On peut l’utiliser de deux façons.

**Sur le site (GitHub Pages)**, pour tout le monde :

- la garde-robe, les photos de vêtements, l’historique et les réglages sont enregistrés dans le navigateur de l’appareil (localStorage pour les fiches, IndexedDB pour les photos) ;
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
- Les photos d’étiquette servent seulement à la lecture et ne sont pas gardées.
- Pour la météo, seule la ville choisie, ou la position arrondie à 1 km environ, est envoyée aux services météo. La position n’est enregistrée que dans le navigateur et peut être oubliée depuis les réglages. Refuser la localisation n’empêche rien : il suffit de chercher sa ville.
- Sur le site, les données restent dans le navigateur : effacer les données du site dans le navigateur les supprime aussi.
- Les données peuvent être exportées (JSON) ou supprimées en entier depuis les réglages.

## Structure du code

Tout est dans `index.html` :

- les styles (design « studio » : blanc, noir, gris pierre, Bodoni Moda et Hanken Grotesk) ;
- le moteur 3D « Atelier » (corps et vêtements modélisés par champs de distance dans un Web Worker, éclairage de studio en WebGL) ;
- les rendus de vêtements façon photo produit (SVG avec relief et matière) ;
- le module météo (localisation, recherche de ville, prévisions, icônes animées en SVG) ;
- les règles de tenue (couches selon la température, accords de couleurs, rotation des pièces, tendances, goûts appris) ;
- l’interface : Aujourd’hui, Garde-robe, Silhouette, Historique, Réglages.
