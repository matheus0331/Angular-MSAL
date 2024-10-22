import {Injectable} from '@angular/core';
import {EventService, RoutingService, SearchboxService, TranslationService, WindowRef} from '@spartacus/core';
import {SearchBoxComponentService, SearchBoxConfig, SearchResults} from '@spartacus/storefront';
import {combineLatest, Observable, of} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';

const HAS_SEARCH_RESULT_CLASS = 'has-searchbox-results';

@Injectable({
  providedIn: 'root',
})
export class FrankeSearchBoxComponentService extends SearchBoxComponentService {
  constructor(
    searchService: SearchboxService,
    protected routingService: RoutingService,
    translationService: TranslationService,
    winRef: WindowRef, eventService: EventService
  ) {
    super(searchService, routingService, translationService, winRef, eventService);
  }

  getResults(config: SearchBoxConfig): Observable<SearchResults> {
    return combineLatest([
      this.getProductResults(config),
      this.getProductSuggestions(config),
      this.getSearchMessage(config),
    ]).pipe(
      map(([productResults, suggestions, message]) => {
        return {
          products: productResults ? productResults.products : null,
          typoSuggestions: productResults.spellingSuggestion
            ? productResults.spellingSuggestion.suggestion
            : null,
          suggestions,
          message,
          total: productResults
            ? productResults.pagination?.totalResults
            : null,
        };
      }),
      tap((results) =>
        this.toggleBodyClass(HAS_SEARCH_RESULT_CLASS, this.hasResults(results))
      )
    );
  }

  protected getProductSuggestions(
    config: SearchBoxConfig
  ): Observable<string[]> {
    if (!config.displaySuggestions) {
      return of([]);
    } else {
      return this.searchService.getSuggestionResults().pipe(
        map((res) => res.map((suggestion) => suggestion.value)),
        switchMap((suggestions) => {
          if (suggestions.length === 0) {
            return of([]);
          } else {
            return of(suggestions);
          }
        })
      );
    }
  }
}
