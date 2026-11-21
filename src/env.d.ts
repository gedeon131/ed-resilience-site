interface ImportMetaEnv {
  readonly PUBLIC_WHATSAPP_NUMBER?: string;
  readonly PUBLIC_BOOKING_URL?: string;
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_NOINDEX?: string;
  readonly FORM_WEBHOOK_URL?: string;
  readonly PUBLIC_FORM_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
