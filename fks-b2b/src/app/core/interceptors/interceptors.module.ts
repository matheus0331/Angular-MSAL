import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrandsInterceptor} from './brands/brands.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: BrandsInterceptor, multi: true},
  ],
})
export class InterceptorsModule {
}
