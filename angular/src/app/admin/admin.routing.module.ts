import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IngredientComponent } from './ingredient/ingredient.component';
import { UnitComponent } from './unit/unit.component';
import { TagComponent } from './tag/tag.component';
import { TagResolverService } from './tag/tag-resolver.service'



const routes: Routes = [
    { path: "ingredients", component: IngredientComponent },
    { path: "units", component: UnitComponent },
    {
        path: "tags",
        component: TagComponent,
        resolve: [TagResolverService]
    },
    // catch all - redirect to home
    { path: '**', redirectTo: '/' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
