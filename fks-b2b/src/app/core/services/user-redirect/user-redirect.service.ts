import {Injectable} from '@angular/core';
import {Actions, ofType} from '@ngrx/effects';
import {CmsActions, GlobalMessageService} from '@spartacus/core';
import {UserLogoutService} from '../user-logout/user-logout.service';

export const LOAD_CMS_PAGE_DATA_FAIL = '[Cms] Load Page Data Fail';
export const LOAD_CMS_COMPONENT_FAIL = '[Cms] Load Component Fail';

@Injectable({
  providedIn: 'root',
})
export class UserRedirectService {
  constructor(
    private actions$: Actions,
    private globalMessages: GlobalMessageService,
    private userLogoutService: UserLogoutService
  ) {
  }

  static onUserRedirectFail(
    userRedirectService: UserRedirectService
  ): () => void {
    const userRedirectFailFunction = () => {
      userRedirectService.actions$
        .pipe(
          ofType<
            CmsActions.LoadCmsPageDataFail | CmsActions.LoadCmsComponentFail
          >(LOAD_CMS_PAGE_DATA_FAIL, LOAD_CMS_COMPONENT_FAIL)
        )
        .subscribe((cmsAction) => {
          if (
            cmsAction.type === LOAD_CMS_PAGE_DATA_FAIL ||
            cmsAction.type === LOAD_CMS_COMPONENT_FAIL
          ) {
            /* userRedirectService.globalMessages.add(
              { key: 'errorHandlers.loadPage' },
              GlobalMessageType.MSG_TYPE_ERROR
            );
            setTimeout(() => {
              userRedirectService.userLogoutService.logout();
            }, 5000); */
            console.error(cmsAction.type + ' on ' + cmsAction.meta.entityId);
          }
        });
    };
    return userRedirectFailFunction;
  }
}
