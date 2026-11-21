/**
 * Envoi des formulaires (contact et devis) vers le webhook d'automatisation.
 * Chaque <form data-ed-form> porte son type, l'adresse d'envoi et les messages traduits en data-*.
 */

type Tone = 'success' | 'error';

function setStatus(form: HTMLFormElement, message: string, tone: Tone) {
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  if (!status) return;
  status.textContent = message;
  status.dataset.tone = tone;
  status.hidden = false;
}

function setSending(form: HTMLFormElement, sending: boolean) {
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const label = form.querySelector<HTMLElement>('[data-submit-label]');
  if (!button || !label) return;
  button.disabled = sending;
  if (sending) {
    label.dataset.idle = label.textContent ?? '';
    label.textContent = form.dataset.msgSending ?? '';
  } else if (label.dataset.idle) {
    label.textContent = label.dataset.idle;
  }
}

async function handleSubmit(event: SubmitEvent) {
  event.preventDefault();
  const form = event.currentTarget as HTMLFormElement;
  const msg = form.dataset;
  form.dataset.submitted = '';

  if (!form.checkValidity()) {
    setStatus(form, msg.msgInvalid ?? '', 'error');
    form.querySelector<HTMLElement>(':invalid')?.focus();
    return;
  }

  const fields = Object.fromEntries(new FormData(form)) as Record<string, string>;

  // Pot de miel rempli : on fait comme si tout s'était bien passé, sans rien envoyer
  if (fields.website) {
    form.reset();
    setStatus(form, msg.msgSuccess ?? '', 'success');
    return;
  }
  delete fields.website;

  const endpoint = msg.endpoint;
  if (!endpoint) {
    setStatus(form, msg.msgInactive ?? '', 'error');
    return;
  }

  setSending(form, true);
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: msg.type,
        lang: msg.lang,
        page: window.location.href,
        sentAt: new Date().toISOString(),
        ...fields,
      }),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    form.reset();
    delete form.dataset.submitted;
    setStatus(form, msg.msgSuccess ?? '', 'success');
  } catch {
    setStatus(form, msg.msgError ?? '', 'error');
  } finally {
    setSending(form, false);
  }
}

export function initForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-ed-form]').forEach((form) => {
    form.addEventListener('submit', handleSubmit);
  });
}
