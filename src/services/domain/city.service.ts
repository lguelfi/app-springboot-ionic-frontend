import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/config/api.config";
import { CityDTO } from "src/models/city.dto";

@Injectable()
export class CityService {

    constructor(public http: HttpClient) {
    }

    findAll(stateId : string): Observable<CityDTO[]> {
        return this.http.get<CityDTO[]>(`${API_CONFIG.baseUrl}/states/${stateId}/cities`);
    }
}