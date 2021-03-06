import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from 'ng2-translate/ng2-translate';

import { UtilsService } from './utils.service';
import { AppConfig } from '../../app.config';
import { School } from '../models/school';
import { Role } from '../models/role';
import { Avatar } from '../models/avatar';
import { Teacher } from '../models/teacher';
import { Student } from '../models/student';
import { Point } from '../models/point';
import { Grade } from '../models/grade';
import { Matter } from '../models/matter';


@Injectable()
export class PointService {

  constructor(
    public http: Http,
    public translateService: TranslateService,
    public utilsService: UtilsService
  ) { }

  /**
   * Returns a grade object with all the information from a grade
   * identifier. This method is used to fill all the information
   * of the groups we are querying
   * @return {Grade} grade object with all the information
   */
  public getPoint(id: number): Observable<Point> {

    const options = this.utilsService.getOptions();

    return this.http.get(AppConfig.POINT_URL + '/' + id, options)
      .map((response: Response, index: number) => Point.toObject(response.json()));
  }

  public getPointName(id: number): Observable<Point> {

    const options = this.utilsService.getOptions();

    return this.http.get(AppConfig.POINT_URL + '/' + id, options)
      .map((response: Response, index: number) => Point.toObject(response.json()));
  }




  /**
     * Returns the list of students by a group id.
     * @return {Array<Point>} returns the list of points
     */
  private getMySchoolPoints(): Observable<Array<Point>> {

    const options = this.utilsService.getOptions();
    const url: string = this.utilsService.getMySchoolUrl() + AppConfig.POINTS_URL;

    return this.http.get(url, options)
      .map((response: Response, index: number) => Point.toObjectArray(response.json()));
  }


  /**
   * This method calls the REST API for performing a post of point against
   * the common services for the application
   * @param {Point} point Object with login credentials
   * @return {Observable<Point>} observable object with the login response
   */
  public postPoint(point: Point): Observable<Response> {

    const options = this.utilsService.getOptions();
    const url = AppConfig.POINT_URL;

    return this.http.post(url, point)
      .map(response => {
        return response;
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }
  public savePoint(name: string, value: number, image: string = ''): Observable<Point> {

    const options = this.utilsService.getOptions();

    let url: string;
    url = AppConfig.POINT_URL;
    const postParams = {
      name: name,
      // value: value,
      value: 1,
      teacherId: this.utilsService.currentUser.userId,
      schoolId: this.utilsService.currentSchool.id,
      image: image
    };

    return this.http.post(url, postParams, options)
      .map(response => {

        return Point.toObject(response.json());
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));

  }


  public deletePoint(id: string): Observable<Point> {

    const options = this.utilsService.getOptions();

    return this.http.delete(AppConfig.POINT_URL + '/' + id, options)
      .map(response => {
        return response;
      })
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

  public getAllPoints(): Observable<Point[]> {

    const options = this.utilsService.getOptions();

    return this.http.get(AppConfig.POINT_URL, options)
      .map((response: Response, index: number) => Point.toObjectArray(response.json()))
      .catch((error: Response) => this.utilsService.handleAPIError(error));
  }

}
