import { Request, Response, NextFunction } from "express"

export default function errorResponseHandeler(data: any = {}, req: Request, res: Response, next: NextFunction) {
  if (Array.isArray(data)) {
    data.map(item => console.log(item));
  }
  res.status(data.statusCode || 400).json({
    error: true,
    message: data.message || "",
    data: data.data || null
  })
}