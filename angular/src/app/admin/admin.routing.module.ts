import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IngredientComponent } from './ingredient/ingredient.component';
import { UnitComponent } from './unit/unit.component';
import { TagComponent } from './tag/tag.component';
import { TagResolverService } from './tag/tag-resolver.service'
import { IngredientResolverService } from './ingredient/ingredient-resolver.service';
import { UnitResolverService } from './unit/unit-resolver.service';
import { GeneralResolverService } from '../store/general/general-resolver.service';


const routes: Routes = [
    {
        path: "ingredients",
        component: IngredientComponent,
        resolve: [IngredientResolverService]
    },
    {
        path: "units",
        component: UnitComponent,
        resolve: [UnitResolverService],
    },
    {
        path: "tags",
        component: TagComponent,
        resolve: [TagResolverService, GeneralResolverService]
    },
    // catch all - redirect to home
    { path: '**', redirectTo: '/' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
