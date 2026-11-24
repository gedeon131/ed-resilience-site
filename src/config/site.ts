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

/** Lien de réservation Cal.com. PUBLIC_BOOKING_URL permet de le remplacer sans toucher au code. */
// TODO(client): avant la mise en ligne, remplacer par le compte Cal.com d'Ernestia
// (celui-ci est le compte de l'agence, utilisé pour la préversion)
export const bookingUrl: string =
  import.meta.env.PUBLIC_BOOKING_URL || 'https://cal.com/gedeon-freycinet-eobavh/30min';

/** Chemin Cal.com (ex. « equipe/30min ») utilisé par la fenêtre de réservation intégrée. */
export const calLink: string = (() => {
  try {
    const url = new URL(bookingUrl);
    return url.hostname.endsWith('cal.com') ? url.pathname.replace(/^\/|\/$/g, '') : '';
  } catch {
    return '';
  }
})();

/**
 * Attributs d'un lien « Prendre rendez-vous ».
 * Avec JavaScript, le clic ouvre l'agenda Cal.com dans une fenêtre sur le site (voir BookingModal ; attribut data-booking et non data-cal-link, que le script Cal.com intercepterait aussi) ;
 * sans JavaScript, le lien ouvre Cal.com dans un nouvel onglet. Sans lien de réservation : page Contact.
 */
export function getBookingLink(label: string, hint: string, fallbackHref: string) {
  return bookingUrl
    ? {
        href: bookingUrl,
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': `${label} ${hint}`,
        'data-booking': calLink || undefined,
      }
    : { href: fallbackHref };
}

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
