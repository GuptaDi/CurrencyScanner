import {NgModule} from '@angular/core';

import {DynamicComponent} from './DynamicComponent';

@NgModule({
    declarations: [
        DynamicComponent
    ],
    exports: [
        DynamicComponent
    ]
})
export class DynamicComponentModule {
}
