import { CityDTO } from "./city.dto";

export interface AddressDTO {
    id : string;
    streetName : string;
    number : string;
    additionalInfo : string;
    district : string;
    zipcode : string;
    city : CityDTO;
}