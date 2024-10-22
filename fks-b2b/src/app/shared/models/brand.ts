export interface Brand {
  code: string;
  logo: Logo;
  name: string;
  active?: boolean;
  families?: ProductFamily[];
}

export interface Logo {
  code: string;
  url: string;
}

export interface ProductFamily {
  code: string;
  name: string;
}
