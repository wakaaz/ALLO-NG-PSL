import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'dictionary',
    loadChildren: () => import('./components/dictionary/dictionary.module').then(m => m.DictionaryModule)
  },
  {
    path: 'teacherTutorials',
    loadChildren: () => import('./components/teachers-tutorial/teachers-tutorial.module').then(m => m.TeachersTutorialModule)
  },
  {
    path: 'stories',
    loadChildren: () => import('./components/story/story.module').then(m => m.StoryModule)
  },
  {
    path: 'learningTutorials',
    loadChildren: () => import('./components/learning-tutorial/learning-tutorial.module').then(m => m.LearningTutorialModule)
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
