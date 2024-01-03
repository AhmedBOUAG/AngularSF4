import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable()
export class BreadCrumbService {

    items$ = new BehaviorSubject<any>([
        {
            text: 'Home',
            title: 'home',
            path: ''
        }
    ])

    addChild(item: any) {
        const currentItems = this.items$.value;
        if (currentItems.some((p: any) => p.title !== item.title)) {
            this.items$.next([...currentItems, item]);
        }
    }

    addParent(item: any) {
        this.items$.next([item]);
    }

    updateBreadcrumb(item: any) {
        const currentItems = this.items$.value;
        if (currentItems.some((p: any) => p.title === item.title)) {
            currentItems.pop();
        }
        this.items$.next([...currentItems]);
    }
}