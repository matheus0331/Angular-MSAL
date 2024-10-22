import {environment} from '../../environments/environment';

export const apiEndpointMarker = environment.occBaseUrl
  ? environment.occBaseUrl
  : typeof window !== 'undefined'
    ? (Array.from(window.document.head.children).find(
      (element: any) => element.name === 'occ-backend-base-url'
    ) as Element & { content: string })?.content
    : '';
export const isProd = isProduction();

export function getEnvironmentName(): string {
  if (apiEndpointMarker.includes('-')) {
    return apiEndpointMarker.split('-')[2];
  } else {
    return 'S1';
  }
}

export default function isProduction(): boolean {
  return getEnvironmentName() === 'p1' ? true : false;
}
