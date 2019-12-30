import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(private afAuth: AngularFireAuth, ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.afAuth.auth.currentUser.getIdToken()).pipe(
            mergeMap((token: any) => {
                if (token) {
                    request = request.clone({ setHeaders: { Authorization: `JWT ${token}` } });
                }
                return next.handle(request);

            }));

    }
}