declare namespace Express {
    interface Request {
      clientIp?: string;
      clientIpv4?: string | null;
      clientIpv6?: string | null;
    }
  }