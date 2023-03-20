import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "src/config/storage_keys.config";
import { Cart } from "src/models/cart";
import { LocalUser } from "src/models/local_user";
import { OrderDTO } from "src/models/order.dto";

@Injectable()
export class StorageService {

    getLocalUser() : LocalUser {
        let user = localStorage.getItem(STORAGE_KEYS.localUser);
        if (user == null) {
            return null;
        } else {
            return JSON.parse(user);
        }
    }

    setLocalUser(obj : LocalUser) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        } else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }

    getCategoryId() : string {
        return localStorage.getItem(STORAGE_KEYS.categoryId);
    }

    setCategoryId(categoryId : string) {
        localStorage.setItem(STORAGE_KEYS.categoryId, categoryId);
    }

    getProductId() : string {
        return localStorage.getItem(STORAGE_KEYS.productId);
    }

    setProductId(productId : string) {
        localStorage.setItem(STORAGE_KEYS.productId, productId);
    }

    getCart() : Cart {
        let str = localStorage.getItem(STORAGE_KEYS.cart);
        if (str != null) {
            return JSON.parse(str);
        } else {
            return null;
        }
    }

    setCart(obj : Cart) {
        if (obj != null) {
            localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
        } else {
            localStorage.removeItem(STORAGE_KEYS.cart);
        }
    }

    getOrder() : OrderDTO {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.order));
    }

    setOrder(order: OrderDTO) {
        localStorage.setItem(STORAGE_KEYS.order, JSON.stringify(order));
    }
}