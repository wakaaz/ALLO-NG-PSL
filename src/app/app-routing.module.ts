import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, PreloadingStrategy } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/dictionary/dictionary.module').then(m => m.DictionaryModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      preloadingStrategy: PreloadAllModules
    }
  )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
