/**
 * Coordonnées et liens du cabinet, centralisés ici pour être modifiés sans toucher aux composants.
 */

export const contactEmail = 'Ernestia.d@edresilienceconsulting.com';

/** Numéro WhatsApp au format international sans + ni espaces (ex. 50932730712). */
// Numéro confirmé : +509 3273-0712 (Haïti). PUBLIC_WHATSAPP_NUMBER permet de le remplacer sans toucher au code.
export const whatsappNumber: string = (
  import.meta.env.PUBLIC_WHATSAPP_NUMBER || '50932730712'
).replace(/\D/g, '');

/** Numéro affiché (téléphone et WhatsApp). */
export const phoneDisplay = '+509 3273-0712';

/** Lien wa.me avec message prérempli, ou chaîne vide si le numéro n'est pas configuré. */
export function getWhatsAppHref(message: string): string {
  return whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    : '';
}

/** Lien de réservation Cal.com (ex. https://cal.com/ed-resilience/30min). */
// TODO(client): créer le compte Cal.com et renseigner PUBLIC_BOOKING_URL (ou la valeur ci-dessous)
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
