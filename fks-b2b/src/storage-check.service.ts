export class StorageCheckService {
  // Load the appropriate HTML content based on the user's browser language
  loadLocalizedHtml(): Promise<string> {
    if (this.isServer()) {
      return Promise.resolve('');  // Return an empty string during SSR
    }

    const language = this.getBrowserLanguage(); // Get the browser language
    const url = `assets/cookie/${language}.html`;

    // Try to fetch the localized HTML, fallback to English if not found
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          // If the localized HTML is not found, fall back to English
          return fetch('assets/cookie/en.html').then((fallbackResponse) => fallbackResponse.text());
        }
        // Return the localized HTML content
        return response.text();
      })
      .catch(() => fetch('assets/cookie/en.html').then((res) => res.text())); // Fallback if fetch fails
  }

  // Get the browser language
  getBrowserLanguage(): string {
    if (this.isServer()) {
      return 'en';  // Default to English during SSR
    }
    // @ts-ignore
    const language = navigator.language || navigator.userLanguage;
    return language.split('-')[0]; // Return language part, e.g., "en", "fr", "de"
  }

  // Show an error overlay with localized content
  showStrictSettingsOverlay(): void {
    if (this.isServer()) {
      return;  // Prevent execution during SSR
    }
    this.loadLocalizedHtml().then((htmlContent) => {
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100vw';
      overlay.style.height = '100vh';
      overlay.style.backgroundColor = 'white'; // White background
      overlay.style.zIndex = '10000';
      overlay.innerHTML = htmlContent; // Inject the localized content
      document.body.appendChild(overlay);
      const spinnerElement = document.querySelector('.spinner');
      if (spinnerElement) {
        spinnerElement.remove();
      }
    });
  }

  // Method to check if storage and cookies are available
  shouldProceedWithAppInitialization(): boolean {
    // Basic storage checks
    if (!this.isLocalStorageAvailable() || !this.areCookiesEnabled()) {
      console.warn('LocalStorage or cookies are disabled');
      return false;
    }

    return true;  // Proceed if all checks pass
  }

  // Check if localStorage is accessible
  isLocalStorageAccessible(): boolean {
    if (this.isServer()) {
      return false;  // Cannot access localStorage on the server
    }
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch (e) {
      console.warn('localStorage is not accessible:', e);
      return false;
    }
  }

  // Check if localStorage is available
  isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Check if cookies are enabled
  areCookiesEnabled(): boolean {
    if (this.isServer()) {
      return false;  // Cannot check cookies on the server
    }
    try {
      document.cookie = 'testCookie=1';
      const cookieEnabled = document.cookie.indexOf('testCookie') !== -1;
      document.cookie = 'testCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      return cookieEnabled;
    } catch (e) {
      console.warn('Cookies are not accessible:', e);
      return false;
    }
  }


  // Helper function to check if the code is running on the server (SSR) or browser
  private isServer(): boolean {
    return typeof window === 'undefined' || typeof document === 'undefined';
  }
}
