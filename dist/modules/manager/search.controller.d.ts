import { SearchService } from './search.service';
export declare class SearchController {
    private service;
    constructor(service: SearchService);
    index(res: any): void;
    postSearch(req: any, res: any): Promise<void>;
}
