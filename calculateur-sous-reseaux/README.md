# Calculateur de sous-réseaux IP

Calculateur de sous-réseaux IPv4 en notation CIDR, réalisé dans le cadre du BTS SIO option SISR.

**Voir le site : https://menzoait.github.io/tp-git-bts-sio/calculateur-sous-reseaux/**

## Ce que fait le site

On saisit une adresse IP (par exemple `192.168.10.37`) et on choisit le préfixe avec le curseur, les boutons − / + ou les raccourcis /8, /16, /24, /26, /28 et /30. On peut aussi coller une notation complète comme `10.0.0.5/8`. Une virgule tapée sur le pavé numérique est remplacée automatiquement par un point.

Le site affiche :

- l'adresse réseau et le préfixe ;
- le masque de sous-réseau et le masque inverse (wildcard) ;
- l'adresse de broadcast ;
- la première et la dernière adresse utilisables ;
- le nombre total d'adresses et le nombre d'hôtes utilisables ;
- la classe de l'adresse (A, B, C, D, E) ;
- le type d'adresse : privée (RFC 1918), publique, bouclage, lien local (APIPA), CGNAT, multicast ou réservée ;
- la vue binaire des 32 bits de l'adresse, du masque et du réseau (adresse ET masque), avec les bits réseau en bleu et les bits hôte en orange.

Cas particuliers : un /31 compte 2 adresses utilisables (liaison point à point, RFC 3021) et un /32 désigne une seule machine.

## Technique

Le site tient dans un seul fichier, `index.html` (HTML, CSS et JavaScript, sans framework ni serveur). Les calculs se font dans le navigateur avec des opérations binaires (ET logique entre l'adresse et le masque, OU avec le masque inverse pour le broadcast). Il s'affiche en thème clair ou sombre selon le réglage de l'appareil.
