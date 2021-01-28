import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'dictionary',
    loadChildren: () => import('./components/dictionary/dictionary.module').then(m => m.DictionaryModule)
  },
  {
    path: 'teacherTutorials',
    loadChildren: () => import('./components/teachers-tutorial/teachers-tutorial.module').then(m => m.TeachersTutorialModule)
  },

  {
    path: 'play',
    loadChildren: () => import('./components/player/player.module').then(m => m.PlayerModule)
  },
  { path: 'components/story', loadChildren: () => import('./components/story/story.module').then(m => m.StoryModule) },
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
