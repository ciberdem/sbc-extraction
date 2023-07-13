import { ManagerService } from './manager.service';
export declare class ManagerController {
    private service;
    constructor(service: ManagerService);
    index(res: any): void;
    postSearch(req: any, res: any): Promise<void>;
    getHome(): {};
}
