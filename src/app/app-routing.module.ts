import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'dictionary',
    loadChildren: () => import('./components/dictionary/dictionary.module').then(m => m.DictionaryModule)
  },
  {
    path: 'play',
    loadChildren: () => import('./components/player/player.module').then(m => m.PlayerModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled',
      urlUpdateStrategy: 'eager',
    }
  )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
