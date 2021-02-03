import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dictionary } from '../_models/dictionary';
import { LearningTutorial } from '../_models/learning-tutorial';
import { Skill } from '../_models/skill';
import { Story } from '../_models/story';
import { TeacherTutorial } from '../_models/teacher-tutorial';
import { LocalStorageSerivce } from './local-storage-serivce';
import { RestSerivce } from './rest-serivce';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  private _dictionaryCategories$ = new BehaviorSubject<Dictionary[]>([]);
  private _teacherTutorial$ = new BehaviorSubject<TeacherTutorial[]>([]);
  private _storyTypes$ = new BehaviorSubject<Story[]>([]);
  private _stories$ = new BehaviorSubject<Story[]>([]);
  private _learnginSkill$ = new BehaviorSubject<Skill[]>([]);
  private _learningTutorial$ = new BehaviorSubject<LearningTutorial[]>([]);
  private _dictionaries$ = new BehaviorSubject<Dictionary[]>([]);

  constructor(
    private restService: RestSerivce,
    private localStorageSerivce: LocalStorageSerivce
  ) { }

  // dictionary categories subject
  get dictionaryCategories$(): Observable<Dictionary[]> {
    return this._dictionaryCategories$.asObservable();
  }
  // get dictionaries list
  get dictionaries$(): Observable<Dictionary[]> {
    return this._dictionaries$.asObservable();
  }

  // get Teacher teturial grades
  get teacherTutorial$(): Observable<TeacherTutorial[]> {
    return this._teacherTutorial$.asObservable();
  }

  // get Story types
  get storyTypes$(): Observable<Story[]> {
    return this._storyTypes$.asObservable();
  }
  // get Story types
  get stories$(): Observable<Story[]> {
    return this._stories$.asObservable();
  }

  // get Learnign Skills
  get learnginSkill$(): Observable<Story[]> {
    return this._learnginSkill$.asObservable();
  }
  // get Learnign Skills
  get learningTutorial$(): Observable<LearningTutorial[]> {
    return this._learningTutorial$.asObservable();
  }
  // Emtpty dictionary
  setEmptyDictionaries(): void {
    this._dictionaries$.next([]);
  }
  // Empty Teacher teturial
  setEmptyTeacherTutorials(): void {
    this._teacherTutorial$.next([]);
  }
  // Empty Stories
  setEmptyStories(): void {
    this._storyTypes$.next([]);
  }
  getDictionaryCategories(): void {
    this.restService.getRequest<any>('/Preferences').pipe(map(x => x.object)).subscribe(x => {
      this._dictionaryCategories$.next(x.dictionary_categories);
      this._teacherTutorial$.next(x.tut_grades);
      this._storyTypes$.next(x.story_types);
      this._learnginSkill$.next(x.life_skills);
      this._learningTutorial$.next(x.learning_tut_grades);
    });
  }

  getDictionaries(id: number): void {
    this.restService.postRequest('/Dictionary', { category_id: id }).pipe(map(x => x.data)).subscribe(x => {
      this._dictionaries$.next(x);
    });
  }
  // getStoriesVedios
  getStoriesVedios(id: number): void {
    this.restService.postRequest('/Stories', { type_id: id }).pipe(map(x => x.data)).subscribe(x => {
      this._stories$.next(x);
    });
  }

  getPreferences(): void {
    this.getDictionaryCategories();
  }
}
