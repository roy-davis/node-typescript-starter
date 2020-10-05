interface HalLink {
    href: string;
}
  
export interface HalResponse  {
    [key: string]: HalLink | HalLink[] | {} | undefined;

    _links: {
        self: HalLink;
    };
    _embedded?: {};   
}

// static utility method to package up the response 
export class Hal {
    static create (req: any, payload: any, embedded?: any, status?: Number) {
        payload['_links'] = {  self: { href: `${req.protocol }://${req.get('host')}${req.originalUrl}`} };
        if (embedded)
            payload['_embedded'] = embedded;
        if (!status)
            status = 200
        payload['_meta'] = { status: status } 
        return payload;
    }
}