import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FieldMessage } from 'src/models/fieldmessage';
import { StorageService } from 'src/services/storage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertCtrl: AlertController) {}
 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error;
            }         
            console.log("Interceptor Log: " + error.message);

            switch (error.status) {
                case 401: 
                    this.handle401();
                    break;
                case 403:
                    this.handle403(error);            
                    break;
                case 422:
                    this.handle422(error);
                    break;
                default:
                    this.handleDefaultError(error);
            }
            return throwError(error.error);
        }));
    }

    async handle401() {
        const alert = await this.alertCtrl.create({
            header: 'Erro 401: falha de autenticação',
            message: 'Email ou senha incorretos',
            buttons: ['OK']
        });
        await alert.present();
    }

    handle403(error) {
        if (error.url == null) {
            this.storage.setLocalUser(null);    
        }
    }

   async handle422(error) {
        const alert = await this.alertCtrl.create({
            header: 'Erro 422: Validação',
            message: this.listErrors(error.errors),
            buttons: ['OK']
        });
        await alert.present();
    }

    async handleDefaultError(error) {
        const alert = await this.alertCtrl.create({
            header: 'Erro ' + error.status + ': ' + error.error,
            message: error.message,
            buttons: ['OK']
        });
        await alert.present();
    }

    private listErrors(messages : FieldMessage[]) : string {
        let s : string = '';
        for (var i=0; i < messages.length; i++) {
            s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
        }
        return s;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};