import { Request, Response, NextFunction } from 'express';

const wrapWithErrorHandling = (handler: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handler(req, res, next);
        } catch (error) {
            console.error('Error in route handler:', error);

            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
};

export default wrapWithErrorHandling;
