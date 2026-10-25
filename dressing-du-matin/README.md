# Dressing du matin

Application personnelle de garde-robe : elle propose chaque matin des tenues selon la météo, l’occasion et le style voulu, et les montre sur un mannequin 3D.

**Voir le site : https://menzoait.github.io/tp-git-bts-sio/dressing-du-matin/** (aperçu de l’interface et du mannequin 3D ; la garde-robe et le styliste IA fonctionnent dans Claude, voir plus bas)

## Ce qu’elle fait

- **Garde-robe** : hauts, bas, pièces uniques, vestes et manteaux, chaussures, accessoires. Ajout par photo (fond détouré automatiquement), par capture d’écran de la fiche produit, ou par marque et référence. Lecture d’étiquette pour la marque, la référence et la matière.
- **Tenues du jour** : trois looks construits à partir de la température du matin et de l’après-midi, de la pluie et du vent, de l’occasion et du style. Le styliste IA peut choisir et expliquer les looks.
- **Mannequin 3D** : femme ou homme, taille, poids, corpulence, épaules, hanches, teint et cheveux. Moteur WebGL écrit à la main, sans bibliothèque.
- **Tendances** : couleurs et pièces de la saison, avec les pièces que tu as déjà.
- **Historique** : tenues portées et notées. L’appli évite de reproposer la tenue de la veille et apprend tes goûts.

## Fonctionnement

L’appli tient dans un seul fichier, `index.html`, sans dépendance à installer.

Elle est faite pour tourner comme artefact dans Claude, qui lui fournit :

- le stockage de la garde-robe, de l’historique et des réglages ;
- le stockage des photos de vêtements ;
- le styliste IA (analyse des photos, des captures et des étiquettes, choix et explication des looks) ;
- l’export des données en JSON.

Ouverte directement dans un navigateur, hors de Claude, la page s’affiche et le mannequin 3D fonctionne, mais rien n’est enregistré et le styliste IA est indisponible.

## Données personnelles

- La silhouette (taille, poids, morphologie) reste dans le navigateur de l’appareil. Elle n’est jamais envoyée, ni au stockage en ligne ni au styliste IA.
- Aucune photo de la personne n’est demandée.
- Les photos d’étiquette servent seulement à la lecture et ne sont pas gardées.
- Les données peuvent être exportées (JSON) ou supprimées en entier depuis les réglages.

## Structure du code

Tout est dans `index.html` :

- les styles (design « vitrine de boutique le soir » : façade bleu nuit, laiton, Bodoni Moda et Jost) ;
- le moteur 3D « Atelier » (géométrie du corps, habillage des vêtements, éclairage de vitrine, socle) ;
- les règles de tenue (couches selon la température, accords de couleurs, rotation des pièces, tendances, goûts appris) ;
- l’interface : Aujourd’hui, Garde-robe, Silhouette, Historique, Réglages.
