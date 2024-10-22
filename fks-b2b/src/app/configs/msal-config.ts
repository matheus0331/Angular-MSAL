import {MsalGuardConfiguration, MsalInterceptorConfiguration} from '@azure/msal-angular';
import {BrowserCacheLocation, InteractionType, IPublicClientApplication, LogLevel, PublicClientApplication} from '@azure/msal-browser';
import isProduction, {apiEndpointMarker, isProd} from './runtime-env';

function getLogoutRedirectUri(): string {
  return isProduction()
    ? 'https://b2b-portal.franke.com'
    : 'https://b2b-portal.franke.com/main/en/test.html';
}

const baseRedirectUri =
  typeof window !== 'undefined'
    ? window.location.protocol + '//' + window.location.host + '/'
    : '';

export function loggerCallback(logLevel: any, message: any): void {
  console.log(message);
}

export const qaConfig = {
  clientId: '95897b29-ccd5-4fd7-9e6d-08857dac3f4e',
  knownAuthorities: ['frankeidqa.b2clogin.com'],
  scopes: ['95897b29-ccd5-4fd7-9e6d-08857dac3f4e'],
  b2cPolicies: {
    names: {
      signSignIn: 'b2c_1a_signin_localonly_franke',
      forgotPassword: 'B2C_1A_PASSWORDRESET',
    },
    authorities: {
      signSignIn: {
        authority:
          'https://frankeidqa.b2clogin.com/frankeidqa.onmicrosoft.com/b2c_1a_signin_localonly_franke',
      },
      forgotPassword: {
        authority:
          'https://frankeidqa.b2clogin.com/frankeidqa.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1A_PASSWORDRESET',
      },
    },
  },
};

export const prodConfig = {
  clientId: '59b002b0-8bd2-4cf2-acf5-0907e5d1a52a',
  knownAuthorities: ['frankeid.b2clogin.com'],
  scopes: ['59b002b0-8bd2-4cf2-acf5-0907e5d1a52a'],
  b2cPolicies: {
    names: {
      signSignIn: 'b2c_1a_signin_localonly_franke',
      forgotPassword: 'B2C_1A_PASSWORDRESET',
    },
    authorities: {
      signSignIn: {
        authority:
          'https://frankeid.b2clogin.com/frankeid.onmicrosoft.com/b2c_1a_signin_localonly_franke',
      },
      forgotPassword: {
        authority:
          'https://frankeid.b2clogin.com/frankeid.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1A_PASSWORDRESET',
      },
    },
  },
};

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: isProd ? prodConfig.clientId : qaConfig.clientId,
      authority: isProd
        ? prodConfig.b2cPolicies.authorities.signSignIn.authority
        : qaConfig.b2cPolicies.authorities.signSignIn.authority,
      postLogoutRedirectUri: getLogoutRedirectUri(),
      redirectUri: baseRedirectUri,
      navigateToLoginRequestUrl: true,
      knownAuthorities: isProd
        ? prodConfig.knownAuthorities
        : qaConfig.knownAuthorities,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.SessionStorage,
      storeAuthStateInCookie: true,
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Error,
        piiLoggingEnabled: false,
      },
      allowRedirectInIframe: true,
    },
  });
}

// franke API + scope
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();

  protectedResourceMap.set(
    apiEndpointMarker + '/*',
    isProd ? prodConfig.scopes : qaConfig.scopes
  );

  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Popup,
    authRequest: {
      scopes: [
        'openid',
        'profile',
        isProd ? prodConfig.clientId : qaConfig.clientId,
      ],
    },
  };
}
