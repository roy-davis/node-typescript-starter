import { response } from "express";
import { config } from '../config';

// Just to make life easier
export interface HalLink {
    href: string;
}

// Just to make life easier
export interface HalRequest {
    links?: any;
    meta?: HalMeta;
    embedded?: any;
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

// augment the `express-serve-static-core` module
declare module "express-serve-static-core" {
  // first, declare that we are adding a method to `Response` (the interface)
  export interface Response {
    hal(data: any, metadata?: HalMeta, links?: any, embedded?: any): this;
  }
}

// now actually add it to `response` (the prototype)
response.hal = function(payload: any, meta?: HalMeta, links?: HalLink[], embedded?: any) {

        if (!payload) payload = {};

        // create our links
        (links) ? payload['_links'] = links : payload['_links'] = {};

        if (this.req)
            payload['_links']['self'] = { href: `${this.req.protocol }://${this.req.get('host')}${this.req.originalUrl}`};

        // attach any embedded objects
        if (embedded) payload['_embedded'] = embedded;
        
        const serverMeta:HalMeta = {
            version: config.version,
            host: config.host_id
        }

        // set our metadata 
        payload['_meta'] = { ...serverMeta, ...meta};
        if (!payload['_meta']['status']) payload['_meta']['status'] = 200
        
        return this.json(payload);
};
