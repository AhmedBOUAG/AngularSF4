import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class RouterService {
    constructor(private router: Router) {
    }

    navigateByBreadcrumb(breadcrumb: string, config?: { id: string }): void {
        let routes: any;
        this.router.config.forEach(route => {
            //routes[route ? route.path as string : 'no_parent'] = [];
            /*if (route._loade && route.data.breadcrumb === breadcrumb) {
                if (config) {
                    this.router.navigate([route.path, config.id]);
                } else {
                    this.router.navigate([route.path]);
                }
            }*/
            console.log(routes, route);
        });
    }
}