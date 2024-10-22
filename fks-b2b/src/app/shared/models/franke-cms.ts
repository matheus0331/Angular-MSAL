import { CmsComponent } from '@spartacus/core';

export interface FrankeProductCategoryInspirationCmsComponent
  extends CmsComponent {
  title?: string;
  description?: string;
  frankeInspirationItemComponents?: string;
  container?: string;
  popup?: string;
  scroll?: string;
  link?: FrankeLinkComponent;
  gridLayout?: string;
  class?: string;
  image?: FrankeImgComponent;
}

export interface FrankeImgComponent {
  code?: string;
  mime?: string;
  url?: string;
}

export interface FrankeLinkComponent {
  localizedUrl?: string;
  linkName?: string;
  url?: string;
}

export interface FrankeBannerComponent extends CmsComponent {
  title?: string;
  componentText?: string;
  headline?: string;
  image?: FrankeImgComponent;
  leftLink?: FrankeLinkComponent;
  rightLink?: FrankeLinkComponent;
  orientation?: string;
  frankeCollectionComponents?: string;
}

export interface FrankeAlternativeProductsOverlayButton extends CmsComponent {
  title?: string;
}

export interface FrankeAlternativeProducts extends CmsComponent {
  title?: string;
}
