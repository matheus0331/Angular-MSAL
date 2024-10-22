import {DIALOG_TYPE, LayoutConfig} from '@spartacus/storefront';
import {FRANKE_LAUNCH_CALLER} from '@shared/models/augmented-core';
import {
  FrankeAlternativeProductsCarouselModalContentComponent
} from '@modules/alternative-products/modal-content/franke-alternative-products-carousel-modal-content.component';

export const layoutConfig: LayoutConfig = {
  launch: {
    [FRANKE_LAUNCH_CALLER.ALTERNATIVE_PRODUCTS]: {
      inlineRoot: true,
      component: FrankeAlternativeProductsCarouselModalContentComponent,
      dialogType: DIALOG_TYPE.POPOVER_CENTER_BACKDROP,

    },
    [FRANKE_LAUNCH_CALLER.REPLACE_PRODUCTS]: {
      inlineRoot: true,
      component: FrankeAlternativeProductsCarouselModalContentComponent,
      dialogType: DIALOG_TYPE.POPOVER_CENTER_BACKDROP,
    },
  },
  layoutSlots: {
    header: {
      lg: {
        slots: [
          'PreHeader',
          'SiteContext',
          'SearchBox',
          'SiteLogo',
          'SiteLogin',
          'MiniCart',
          'NavigationBar',
        ],
      },
      md: {
        slots: [
          'PreHeader',
          'SiteContext',
          'SearchBox',
          'SiteLogo',
          'MiniCart',
          'NavigationBar',
        ],
      },
      xs: {
        slots: [
          'PreHeader',
          'SiteContext',
          'SearchBox',
          'SiteLogo',
          'MiniCart',
          'NavigationBar',
        ],
      },
      slots: ['PreHeader', 'SiteLogo', 'SearchBox', 'MiniCart'],
    },
    navigation: {
      lg: {
        slots: [
          'SiteLogin',
          'NavigationBar',
          'SiteContext',
          'SiteLinks',
        ],
      },
      md: {
        slots: [
          'SiteLogin',
          'NavigationBar',
          'SiteContext',
          'SiteLinks',
        ],
      },
      xs: {
        slots: [
          'SiteLogin',
          'NavigationBar',
          'SiteContext',
          'SiteLinks',
        ],
      },
      slots: ['navigation'],
    },
    footer: {
      lg: {
        slots: [
          'FooterSlot', 'Footer'
        ],
      },
      md: {
        slots: [
          'FooterSlot', 'Footer'
        ],
      },
      xs: {
        slots: [
          'FooterSlot', 'Footer'
        ],
      },
      slots: ['FooterSlot', 'Footer'],
    },

    LandingPage2Template: {
      pageFold: 'Section2',
      slots: ['Notification', 'Section1', 'Section2', 'Section3'],
    },

    InspirationPageTemplate: {
      pageFold: 'Section2',
      slots: [
        'Notification',
        'Section1',
        'Section2',
        'Section3',
        'Section4',
        'Section5',
        'Section6',
        'Section7',
        'Section8',
        'Section9',
        'Section10',
      ],
    },
    ClientServicePageTemplate: {
      pageFold: 'Section2',
      slots: ['Section1', 'Section2', 'Section3', 'Section4', 'Section5'],
    },
    AccountPageTemplate: {
      pageFold: 'Section2',
      slots: [
        'Section1',
        'Section2',
        'Section3',
        'Section4',
        'Section5',
        'BodyContent',
      ],
    },
    FaqAnswerPageTemplate: {
      header: {
        lg: {
          slots: [],
        },
        slots: [],
      },

      slots: ['Section2'],
    },
    CartPageTemplate: {
      slots: ['TopContent', 'CenterRightContentSlot', 'EmptyCartMiddleContent'],
    },
    MultiStepCheckoutSummaryPageTemplate: {
      slots: ['TopContent', 'BodyContent', 'SideContent'],
    },

    ErrorPageTemplate: {
      slots: ['TopContent', 'MiddleContent', 'BottomContent'],
    },
    OrderConfirmationPageTemplate: {
      slots: ['BodyContent', 'SideContent'],
    },
    ProductFamilyListPageTemplate: {
      slots: ['Section2', 'ProductFamilyResultsListSlot', 'Section4'],
    },
    ProductDetailsPageTemplate: {
      lg: {
        pageFold: 'UpSelling',
      },
      pageFold: 'Summary',
      slots: [
        'Notification',
        'Summary',
        'Substitutes',
        'Tabs',
        'UpSelling',
        'CrossSelling',
        'PlaceholderContentSlot',
      ],
    },
    DashboardPageTemplate: {
      pageFold: 'Section2',
      slots: [
        'Section1',
        'Section2',
        'Section3',
        'Section4',
        'Section5',
        'Section6',
        'Section7',
        'Section8',
      ],
    },
    SearchResultsListPageTemplate: {
      slots: [
        'Section2',
        'ProductLeftRefinements',
        'SearchResultsListSlot',
        'Section4',
      ],
    },
  },
};

export const b2cLayoutConfig: LayoutConfig = layoutConfig;
