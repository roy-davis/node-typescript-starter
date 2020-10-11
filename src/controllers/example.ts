import { Request, Response } from 'express';

export const sample = async (req: Request, res: Response) => {
    const payload = {
        "test": 123
    };
    res.hal( payload, { title: 'Sample HAL response.'} );
}