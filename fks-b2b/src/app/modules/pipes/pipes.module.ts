import {NgModule} from '@angular/core';
import {AbsPipe} from './abs/abs.pipe';
import {ReplacePipe} from './replace/replace.pipe.ts';
import {UniquePipe} from './unique/unique.pipe.ts';

@NgModule({
  declarations: [AbsPipe, ReplacePipe, UniquePipe],
  exports: [AbsPipe, ReplacePipe, UniquePipe],
})
export class FrankePipesModule {
}
