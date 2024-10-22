import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubstituteProductsService {
  substituteProducts$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
  }
}
