# Contenus à obtenir de la cliente

Claude Code met cette liste à jour à chaque texte ou image provisoire ajouté.

## Textes
- [ ] Présentation du cabinet (À propos) : mission, vision, valeurs
- [ ] Biographie de la fondatrice
- [ ] Liste des services avec description de chacun
- [ ] Expériences / missions réalisées / références
- [ ] Validation de la signature FR : « Bâtir la résilience. Renforcer l'avenir. »
- [ ] Traductions anglaises
- [ ] Accueil, hero : titre, surtitre et paragraphe d'introduction (`home.hero.*` dans `src/i18n/*.json`, provisoires)
- [ ] Accueil : textes des trois piliers Risk / Resilience / Recovery (`pillar.*`) et intros de sections (`home.*`)
- [ ] Accueil, section « Pour qui » : 4 publics provisoires (institutions publiques, ONG, entreprises, partenaires internationaux) dans `audience.*` ; à confirmer avec la cible réelle (voir le doute sur les 15-20 ans)
- [ ] Services : 4 fiches provisoires dans `src/content/services/{fr,en}/` (`placeholder: true`), à remplacer par la vraie liste
- [ ] Page Services : titre, introduction et les 4 étapes « Notre approche » (Comprendre, Concevoir, Accompagner, Pérenniser) dans `services.*` et `approach.*`, provisoires
- [ ] Pages de détail des services : contenu des fiches (« Ce que nous faisons », « Ce que vous obtenez ») provisoire
- [ ] Expériences : logos et noms des partenaires institutionnels (rubrique à ajouter sur la page Expériences)
- [ ] Expériences : 3 exemples fictifs dans `src/content/experiences/{fr,en}/`, affichés avec un badge « Exemple » ; à remplacer par de vraies missions (titre, client ou type de client, année, résumé)
- [ ] Phrase de présentation du footer (`footer.description` dans `src/i18n/fr.json` et `en.json`, texte provisoire)
- [ ] À propos : mission, vision, 4 valeurs (Rigueur, Engagement, Proximité, Impact), rôle et biographie de la fondatrice (`about.*`, `value.*`), provisoires
- [ ] Contact : tranches de budget du formulaire de devis (devise USD et montants à valider)
- [ ] Confidentialité : durée de conservation des données (3 ans proposé) et outil d'automatisation (n8n ou Make)

## Visuels
- [ ] Logo en SVG ou PNG transparent
- [ ] Logo version claire (pour fonds bleu marine)
- [ ] Photo de la fondatrice (emplacement prévu sur la page À propos, monogramme « ED » en attendant)
- [ ] Photos de missions / ateliers

## Informations
- [x] Indicatif téléphonique : +509 3273-0712 (WhatsApp actif)
- [ ] Liens réseaux sociaux
- [x] Outil de rendez-vous : Cal.com
- [x] Lien de réservation Cal.com branché pour la préversion (compte de l'agence : cal.com/gedeon-freycinet-eobavh/30min)
- [ ] Avant la mise en ligne : compte Cal.com au nom d'Ernestia, puis mettre son lien dans `PUBLIC_BOOKING_URL` (ou `src/config/site.ts`)
- [ ] Mentions légales : raison sociale, adresse, numéro d'enregistrement, hébergeur définitif, nom de l'agence (champs « [À compléter] » dans `src/content/legal/`)

## Technique (agence)
- [ ] Webhook n8n / Make pour les formulaires, puis `PUBLIC_FORM_ENDPOINT` (en attendant, les formulaires renvoient vers l'e-mail)
- [ ] `PUBLIC_WHATSAPP_NUMBER` et `PUBLIC_BOOKING_URL` (variables GitHub Actions pour la préversion)
