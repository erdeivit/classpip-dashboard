import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { UtilsService } from './utils.service';
import { AppConfig } from '../../app.config';
import { School } from '../models/school';
import { Role } from '../models/role';
import { Avatar } from '../models/avatar';
import { Teacher } from '../models/teacher';
import { Student } from '../models/student';
import { Badge } from '../models/badge';
import { Grade } from '../models/grade';
import { Matter } from '../models/matter';


@Injectable()
export class BadgeService {

  constructor(
    public http: Http,
    public utilsService: UtilsService) { }

  /**
   * Returns a grade object with all the information from a grade
   * identifier. This method is used to fill all the information
   * of the groups we are querying
   * @return {Grade} grade object with all the information
   */
  public getBadge(id: number): Observable<Badge> {

    const options = this.utilsService.getOptions();

    return this.http.get(AppConfig.BADGE_URL + '/' + id, options)
      .map((response: Response, index: number) => Badge.toObject(response.json()));
  }



  public deleteBadge(id: string): Observable<Badge> {

    const options = this.utilsService.getOptions();

    return this.http.delete(AppConfig.BADGE_URL + '/' + id, options)
      .map(response => {
        return response;
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

  public getBadgeName(id: number): Observable<Badge> {

    const options = this.utilsService.getOptions();

    return this.http.get(AppConfig.BADGE_URL + '/' + id, options)
      .map((response: Response, index: number) => Badge.toObject(response.json()));
  }




  /**
     * Returns the list of students by a group id.
     * @return {Array<Badge>} returns the list of badges
     */
  private getMySchoolBadges(): Observable<Array<Badge>> {

    const options = this.utilsService.getOptions();
    const url: string = this.utilsService.getMySchoolUrl() + AppConfig.BADGES_URL;

    return this.http.get(url, options)
      .map((response: Response, index: number) => Badge.toObjectArray(response.json()));
  }


  /**
   * This method calls the REST API for performing a post of badge against
   * the common services for the application
   * @param {Badge} badge Object with login credentials
   * @return {Observable<Badge>} observable object with the login response
   */
  public postBadge(badge: Badge): Observable<Response> {

    const options = this.utilsService.getOptions();
    const url = AppConfig.BADGE_URL;

    return this.http.post(url, badge)
      .map(response => {
        return response;
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }
  public saveBadge(name: string, value: number, image: string): Observable<Badge> {

    const options = this.utilsService.getOptions();

    const url = AppConfig.BADGE_URL;
    const postParams = {
      name: name,
      value: value,
      image: image,
      teacherId: this.utilsService.currentUser.userId,
      schoolId: this.utilsService.currentSchool.id
    };

    return this.http.post(url, postParams, options)
      .map(response => {

        return Badge.toObject(response.json());
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));

  }

  public getAllBadges(): Observable<Badge[]> {

    const options = this.utilsService.getOptions();

    const url = AppConfig.BADGE_URL;
    return this.http.get(url, options)
      .map((response: Response, index: number) => Badge.toObjectArray(response.json()))
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }
}
