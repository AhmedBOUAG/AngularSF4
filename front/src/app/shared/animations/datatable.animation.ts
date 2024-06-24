import { trigger, transition, animate, style, query, stagger } from '@angular/animations';

export const pageAnimations = trigger('pageAnimations', [
    transition(':enter', [
        query('.content-tr, form', [
            style({ opacity: 0, transform: 'translateY(-100px)' }),
            stagger(-30, [
                animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
            ])
        ], { optional: true })
    ])
]);

export const filterAnimation = trigger('filterAnimation', [
    transition(':enter, * => 0, * => -1', []),
    transition(':increment', [
        query(':enter', [
            style({ opacity: 0, width: '0px' }),
            stagger(50, [
                animate('300ms ease-out', style({ opacity: 1, width: '*' })),
            ]),
        ], { optional: true })
    ]),
    transition(':decrement', [
        query(':leave', [
            stagger(50, [
                animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
            ]),
        ])
    ]),
]);