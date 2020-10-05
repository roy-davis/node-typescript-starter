export interface HalLink {
    href: string;
}
  
export interface HalResponse  {
    [key: string]: HalLink | HalLink[] | {} | undefined;

    _links: {
        self: HalLink;
    };
    _meta: HalMeta;
    _embedded?: {};   
}

export interface HalMeta {
    status?: Number;
    title?: string;
    host?: string;
    version?: string;
}

export class Hal {
    static create (req: any, payload?: any, meta?: HalMeta, links?: any, embedded?: any) {
        if (!payload)
            payload = {};
            
        (links) ? payload['_links'] = links : payload['_links'] = {};
        payload['_links']['self'] = { href: `${req.protocol }://${req.get('host')}${req.originalUrl}`};

        if (embedded)
            payload['_embedded'] = embedded;
        
        (meta) ? payload['_meta'] = meta : payload['_meta'] = {}

        if (!payload['_meta']['status'])
            payload['_meta']['status'] = 200


        return payload as HalResponse;
    }
}