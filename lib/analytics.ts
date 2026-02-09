// Google Analytics 4 Event Tracking

declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      eventParams?: Record<string, any>
    ) => void;
  }
}

export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

// Predefined events
export const events = {
  downloadCV: () => trackEvent('download_cv', { category: 'engagement' }),
  
  viewProject: (projectName: string) =>
    trackEvent('view_project', {
      category: 'engagement',
      project_name: projectName,
    }),
  
  clickWhatsApp: () =>
    trackEvent('whatsapp_click', { category: 'contact' }),
  
  clickEmail: () => trackEvent('email_click', { category: 'contact' }),
  
  clickLinkedIn: () =>
    trackEvent('linkedin_click', { category: 'contact' }),
  
  switchLanguage: (language: string) =>
    trackEvent('language_switch', {
      category: 'navigation',
      language,
    }),
};
