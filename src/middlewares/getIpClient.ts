import { Express, Request, Response, NextFunction } from "express";

/**
 * Middleware for extracting and logging client IP addresses (both IPv4 and IPv6)
 * @param app Express application instance
 */
const getIpClient = (app: Express) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    const forwardedIps = req.headers["x-forwarded-for"] as string | undefined;
    const remoteIp = req.socket.remoteAddress;
    
    const clientIp = forwardedIps 
      ? forwardedIps.split(',')[0].trim() 
      : remoteIp;
    
    let ipv4 = null;
    let ipv6 = null;
    
    if (clientIp) {
      if (clientIp.includes(':')) {
        ipv6 = clientIp;
        
        if (clientIp === '::1') {
          ipv4 = '127.0.0.1';
        }
      } else {
        ipv4 = clientIp;
      }
    }
    
    req.clientIp = clientIp;
    req.clientIpv4 = ipv4;
    req.clientIpv6 = ipv6;
    
    console.log(`💻 Client IPv4: ${ipv4 || 'Not available'} | Client IPv6: ${ipv6 || 'Not available'}`);
    next();
  });
};

export default getIpClient;