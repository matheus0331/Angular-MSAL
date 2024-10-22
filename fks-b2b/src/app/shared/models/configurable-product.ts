export interface ConfigurableProduct {
  configId: string;
  groups: Group[];
  linkedToCartItem: boolean;
  quantity: number;
}

export interface Group {
  collapsed: boolean;
  collapsedInSpecificationTree: boolean;
  configurable: boolean;
  cstics: Cstic[];
  numberErrorCstics: number;
  oneConfigurableSubGroup: boolean;
  visited: boolean;
}

export interface Cstic {
  domainvalues: Domainvalue[];
  intervalInDomain: boolean;
  key: string;
  langdepname: string;
  longTextHTMLFormat: boolean;
  maxlength: number;
  numberScale: number;
  position: number;
  priceRelevant: boolean;
  required: boolean;
  retractTriggered: boolean;
  showFullLongText: boolean;
  typeLength: number;
  value: string;
  visible: boolean;
}

export interface Domainvalue {
  attributeCode: string;
  attributeName: string;
  attributeOptions: AttributeOption[];
  key: string;
  langdepname: string;
  longTextHTMLFormat: boolean;
  name: string;
  readonly: boolean;
  selected: boolean;
  showDeltaPrice: boolean;
}

export interface AttributeOption {
  key: string;
  langdepname: string;
  longTextHTMLFormat: boolean;
  name: string;
  readonly: boolean;
  selected: boolean;
  showDeltaPrice: boolean;
}
