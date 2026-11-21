/**
 * Coordonnées et liens du cabinet, centralisés ici pour être modifiés sans toucher aux composants.
 */

export const contactEmail = 'Ernestia.d@edresilienceconsulting.com';

/** Numéro WhatsApp au format international sans + ni espaces (ex. 50932730712). */
// TODO(client): confirmer l'indicatif (+509 ?) du 3273-0712, puis renseigner PUBLIC_WHATSAPP_NUMBER dans .env
export const whatsappNumber: string = import.meta.env.PUBLIC_WHATSAPP_NUMBER ?? '';

export interface SocialLink {
  name: string;
  href: string;
}

// TODO(client): obtenir les liens des réseaux sociaux (LinkedIn, Facebook, Instagram…)
export const socialLinks: SocialLink[] = [];
