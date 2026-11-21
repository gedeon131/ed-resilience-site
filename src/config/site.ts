/**
 * Coordonnées et liens du cabinet, centralisés ici pour être modifiés sans toucher aux composants.
 */

export const contactEmail = 'Ernestia.d@edresilienceconsulting.com';

/** Numéro WhatsApp au format international sans + ni espaces (ex. 50932730712). */
// TODO(client): confirmer l'indicatif (+509 ?) du 3273-0712, puis renseigner PUBLIC_WHATSAPP_NUMBER dans .env
export const whatsappNumber: string = (import.meta.env.PUBLIC_WHATSAPP_NUMBER ?? '').replace(
  /\D/g,
  '',
);

/** Lien wa.me avec message prérempli, ou chaîne vide si le numéro n'est pas configuré. */
export function getWhatsAppHref(message: string): string {
  return whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    : '';
}

/** Lien de réservation Cal.com ou Calendly. */
// TODO(client): choisir l'outil de rendez-vous et renseigner PUBLIC_BOOKING_URL
export const bookingUrl: string = import.meta.env.PUBLIC_BOOKING_URL ?? '';

/**
 * Adresse qui reçoit les formulaires (webhook n8n / Make), appelée depuis le navigateur.
 * Le site est statique : cette adresse est donc visible publiquement. Le webhook doit filtrer
 * le spam (champ « website » = pot de miel) et valider les données côté serveur.
 */
export const formEndpoint: string = import.meta.env.PUBLIC_FORM_ENDPOINT ?? '';

export interface SocialLink {
  name: string;
  href: string;
}

// TODO(client): obtenir les liens des réseaux sociaux (LinkedIn, Facebook, Instagram…)
export const socialLinks: SocialLink[] = [];
