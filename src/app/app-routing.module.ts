import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
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
  {
    path: 'resources',
    loadChildren: () => import('./components/resouces/resouces.module').then(m => m.ResoucesModule)
  },
  {
    path: 'about-psl',
    loadChildren: () => import('./components/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'about-fesf',
    loadChildren: () => import('./components/fesf/fesf.module').then(m => m.FesfModule)
  },
  {
    path: 'deaf-reach-program',
    loadChildren: () => import('./components/deaf-reach-program/deaf-reach-program.module').then(m => m.DeafReachProgramModule)
  },
  {
    path: 'testimonial',
    loadChildren: () => import('./components/testimonial/testimonial.module').then(m => m.TestimonialModule)
  },
  {
    path: 'partners',
    loadChildren: () => import('./components/partners/partners.module').then(m => m.PartnersModule)
  },
  {
    path: 'faqs',
    loadChildren: () => import('./components/faqs/faqs.module').then(m => m.FaqsModule)
  },
  {
    path: 'iqra',
    loadChildren: () => import('./components/iqra/iqra.module').then(m => m.IqraModule)
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
