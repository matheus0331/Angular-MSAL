import {Injectable} from "@angular/core";
import {AuthService} from "@spartacus/core";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class FrankeAuthService extends AuthService {

  isUserLoggedIn(): Observable<boolean> {
    return of(true);
  }
}
