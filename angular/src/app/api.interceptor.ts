import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.auth.getUserIdToken().pipe(
            mergeMap((token: any) => {
                if (token) {
                    request = request.clone({ setHeaders: { Authorization: `JWT ${token}` } });
                }
                return next.handle(request);

            }));

    }
}