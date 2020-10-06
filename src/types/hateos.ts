// Just to make life easier
export interface HalLink {
    href: string;
}

// This is the metadata attached to each response
export interface HalMeta {
    status?: Number;
    title?: string;
    host?: string;
    version?: string;
}

// This is high level object send to a client
export interface HalResponse  {
    _links: {
        self: HalLink;
    };
    _meta: HalMeta;
    _embedded?: {};   
}


export class Hal {
    // this creates a wrapper for a JSON object so it returns as a nicely packaged HATEOS/HAL object
    static create (req: any, payload?: any, meta?: HalMeta, links?: any, embedded?: any) {
        // make sure we have a root object
        if (!payload) payload = {};
        
        // create our links
        (links) ? payload['_links'] = links : payload['_links'] = {};
        payload['_links']['self'] = { href: `${req.protocol }://${req.get('host')}${req.originalUrl}`};

        // attach any embedded objects
        if (embedded) payload['_embedded'] = embedded;
        
        // set our metadata 
        (meta) ? payload['_meta'] = meta : payload['_meta'] = {}
        if (!payload['_meta']['status']) payload['_meta']['status'] = 200

        // return with a type for safety
        return payload as HalResponse;
    }
}