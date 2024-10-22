import {HttpUrlEncodingCodec} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {FacetService} from '@spartacus/storefront';

@Injectable({
  providedIn: 'root',
})
export class FrankeFacetService extends FacetService {
  getLinkParams(query: string): { [key: string]: string } {
    return {
      query: new HttpUrlEncodingCodec().decodeValue(query),
    };
  }
}
 
