import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {

  http = inject(HttpClient);
  apiUrl: string = `http://${window.location.hostname}:3000/api/upload`;

  uploadImage1(file: File, fileTypeId: number): Promise<any> {
    const formData = new FormData();
    formData.append('fileTypeId', fileTypeId.toString());
    formData.append('file', file);
    return this.http.post<any>(this.apiUrl, formData).toPromise();
  }

  uploadImage(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}
