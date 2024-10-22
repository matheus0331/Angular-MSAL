import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {StorageCheckService} from './storage-check.service';
import {apiEndpointMarker} from './app/configs/runtime-env';


// Enable production mode if in a production environment
if (environment.production) {
  enableProdMode();
}

// We check if this is SSR, and if it’s not, we can safely check storage and cookies.
const isServerSide = typeof window === 'undefined';

// For CSR, create an instance of the StorageCheckService
const storageCheckService = !isServerSide ? new StorageCheckService() : null;

// Refactored cookie test to use `cookieTest` function
const cookieTest = (iFrameUri: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const messageHandler = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        resolve(data['result']);
      } catch (error) {
        reject(error);
      } finally {
        window.removeEventListener('message', messageHandler);
        document.body.removeChild(frame);
      }
    };
    
    window.addEventListener('message', messageHandler);
    
    const frame = document.createElement('iframe');
    frame.src = iFrameUri;
    frame.style.display = 'none';

    frame.onload = () => {
      frame.contentWindow?.postMessage(JSON.stringify({test: 'cookie'}), '*');
    };

    document.body.appendChild(frame);
  });
};

// Function to test backend availability by making a fetch request
const testBackendAvailability = async (): Promise<boolean> => {
  try {
    const response = await fetch(apiEndpointMarker + '/occ/v2/basesites'); // Replace with actual backend health check URL
    return response.ok;
  } catch (error) {
    console.error('Backend is not reachable:', error);
    return false; // Error during fetch means backend is unavailable
  }
};

// Function to test both storage and third-party cookies
const testCookiesAndStorage = async (): Promise<boolean> => {
  if (window.self !== window.top) {
    console.log('This page is running inside an iframe.');
    return true;
  }
  const urlParams = new URLSearchParams(window.location.search);

  // Check if cmsTicketId is present in the query parameters
  if (urlParams.has('cmsTicketId')) {
    console.log('cmsTicketId is present in the URL:', urlParams.get('cmsTicketId'));
    return true;
  }
  // Check if '/cx-preview' is part of the URL path
  else if (window.location.pathname.includes('/cx-preview')) {
    console.log('URL contains /cx-preview');
    return true;
  }
  if (!storageCheckService) {
    return false;
  }

  // Test for backend availability
  const backendAvailable = await testBackendAvailability();
  if (!backendAvailable) {
    return false;
  }

  // Test for regular storage issues
  if (!storageCheckService.shouldProceedWithAppInitialization()) {
    console.warn('Initialization halted due to storage/cookie issues.');
    return false;
  }
// Check if running on localhost
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    // Test for third-party cookie issues using the cookieTest function
    try {
      const thirdPartyCookiesEnabled = await cookieTest(apiEndpointMarker + '/cookie.html'); // Change to the actual iframe URL
      if (!thirdPartyCookiesEnabled) {
        console.warn('Third-party cookies are disabled.');
        return false;
      }
    } catch (error) {
      console.error('Error during third-party cookie test:', error);
      return false;
    }
  } else {
    console.log('Skipping third-party cookie check on localhost.');
  }

  return true;
};

// Initialize the app only if the checks pass or it's a server-side rendering
if (!isServerSide) {
  testCookiesAndStorage().then((canProceed) => {
    if (canProceed) {
      platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch(err => console.error(err));
    } else {
      storageCheckService.showStrictSettingsOverlay();
    }
  });
} else {
  // Always bootstrap Angular for SSR
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
}
