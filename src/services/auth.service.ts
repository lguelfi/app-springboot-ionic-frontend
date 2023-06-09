import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelper } from "angular2-jwt";
import { API_CONFIG } from "src/config/api.config";
import { CredentialsDTO } from "src/models/credentials.dto";
import { LocalUser } from "src/models/local_user";
import { CartService } from "./domain/cart.service";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(
        public http: HttpClient, 
        public storage: StorageService,
        public cartService: CartService){}

    authenticate(credentials: CredentialsDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/login`, credentials,{observe: 'response', responseType: 'text'});
    }

    refreshToken() {
        return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`, {}, { observe: 'response', responseType: 'text'});
    }

    successfulLogin(authorizationValue : string) {
        let tok = authorizationValue.substring(7);
        let user : LocalUser = { token : tok, email : this.jwtHelper.decodeToken(tok).sub};
        this.storage.setLocalUser(user);
        this.cartService.createOrClearCart();
    }

    logout() {
        this.storage.setLocalUser(null);
    }
}