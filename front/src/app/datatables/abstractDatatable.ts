import { Page } from '../models/page';

export abstract class AbstractDatatable {
    page = new Page();
    rows: any[];
    public currentPageLimit: number = 10;
    public currentVisible: number = 3;
    public readonly pageLimitOptions = [5, 10, 25, 50, 100];
    protected abstract getData(): any[];
}