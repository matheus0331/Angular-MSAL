import { Brand } from './brand';

export interface FrankeNavigationNode {
  title?: string;
  url?: string | string[];
  localizedUrl?: string | string[];
  target?: string | boolean;
  children?: Array<FrankeNavigationNode>;
  brands?: Array<Brand>;
  image?: any;
}
