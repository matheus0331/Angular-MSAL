import {Injectable} from '@angular/core';
import {LanguageService, OccConfig, OccEndpointsService, Product, TranslationService} from '@spartacus/core';
import {FrankeProduct} from '@shared/models/franke-order';
import {groupBy} from '@modules/utils/groupby';
import {FrankeDocuments} from '@shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class DownloadProductDocumentsService {
  language = '';

  constructor(
    private translation: TranslationService,
    protected endpointService: OccEndpointsService,
    protected occConfig: OccConfig,
    protected languageService: LanguageService
  ) {
    this.getCurrentLang();
  }

  createGroups(product: FrankeProduct): any {
    const groupedFeatures = groupBy(
      product.documents,
      (attribute) => attribute.documentType
    );
    delete groupedFeatures.undefined;
    const groups = Object.keys(groupedFeatures)
      .map((key: any) => {
        return {
          groupLabel: key,
          documents: groupedFeatures[key],
          group: key,
        };
      });

    const specSheets = [];
    this.translation.translate('productDownloads.productSheet')
      .subscribe((label) => {
        specSheets.push(this.createSpecSheet(product, label, label, groups));
        if (product.bundleTemplates) {
          product.bundleTemplates.forEach((bt) =>
            bt.products.forEach((bprod) =>
              specSheets.push(this.createSpecSheet(bprod, bprod.families[0].name + ': ' + label, label, groups))
            )
          );
        }
      });
    groups.unshift({
      groupLabel: specSheets[0].documentType,
      documents: specSheets,
      group: specSheets[0].documentType,
    });
    return groups;
  }

  createSpecSheet(product: FrankeProduct, label: string, group: string, groups: Array<any>): FrankeDocuments {
    return {
      documentName: label,
      documentType: group,
      documentInfo: {
        documentSize: '500 KB',
        documentFormat: 'PDF'
      },
      documentLink: this.getSpecDownloadURL(product)
    };
  }

  getSpecDownloadURL(product: Product): string {
    this.getCurrentLang();
    return this.endpointService.buildUrl(
      `products/${product.code}/specreport?lang=${this.language}`
    );
  }

  getDocumentDownloadURL(documentLink: string): string {
    if (this.isAbsoluteDocumentUrl(documentLink)) {
      return documentLink;
    }
    return this.occConfig.backend.occ.baseUrl + documentLink;
  }

  getCurrentLang(): void {
    this.languageService.getActive().subscribe((currentLanguage) => {
      this.language = currentLanguage;
    });
  }

  private isAbsoluteDocumentUrl(documentLink: string): boolean {
    return documentLink.startsWith('http://') || documentLink.startsWith('https://');
  }
}

