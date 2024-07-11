export interface IToast {
    key?: string;
    sticky?: boolean;
    position?: string;
    severity: string;
    summary: string;
    detail: string;
}