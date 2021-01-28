import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dictionary } from '../_models/dictionary';
import { TeacherTutorial } from '../_models/teacher-tutorial';
import { LocalStorageSerivce } from './local-storage-serivce';
import { RestSerivce } from './rest-serivce';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  private _dictionaryCategories$ = new BehaviorSubject<Dictionary[]>([]);
  private _teacherTutorial$ = new BehaviorSubject<TeacherTutorial[]>([]);
  private _dictionaries$ = new BehaviorSubject<Dictionary[]>([]);
  constructor(
    private restService: RestSerivce,
    private localStorageSerivce: LocalStorageSerivce
  ) { }

  get dictionaryCategories$(): Observable<Dictionary[]> {
    return this._dictionaryCategories$.asObservable();
  }

  get dictionaries$(): Observable<Dictionary[]> {
    return this._dictionaries$.asObservable();
  }

  get teacherTutorial$(): Observable<TeacherTutorial[]> {
    return this._teacherTutorial$.asObservable();
  }
  setEmptyDictionaries(): void {
    this._dictionaries$.next([]);
  }
  getDictionaryCategories(): void {
    this.restService.getRequest<any>('/Preferences').pipe(map(x => x.object)).subscribe(x => {
      this._dictionaryCategories$.next(x.dictionary_categories);
      this._teacherTutorial$.next(x.tut_grades);
    });
  }

  getDictionaries(id: number): void {
    this.restService.postRequest('/Dictionary', { category_id: id }).pipe(map(x => x.data)).subscribe(x => {
      this._dictionaries$.next(x);
    });
  }
  getPreferences(): void {
    this.getDictionaryCategories();
  }
}
