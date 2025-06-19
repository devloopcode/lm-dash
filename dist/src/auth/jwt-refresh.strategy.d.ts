declare const JwtRefreshStrategy_base: new (...args: any) => any;
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    constructor();
    validate(req: any, payload: any): Promise<{
        userId: any;
        email: any;
    }>;
}
export {};
