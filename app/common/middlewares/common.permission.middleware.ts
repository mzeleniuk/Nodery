export class CommonPermissionMiddleware {
  public static MAX_PERMISSION: number = 4096 * 2;
  public static BASIC_PERMISSION: number = 1;

  constructor() { }

  public minimumPermissionLevelRequired(requiredPermissionLevel: any): any {
    return (req: any, res: any, next: any) => {
      try {
        const userPermissionLevel: number = parseInt(req.jwt.permissionLevel);

        if (userPermissionLevel & Number.parseInt(requiredPermissionLevel)) {
          next();
        } else {
          res.status(403).send({});
        }
      } catch (e) {
        console.error(e);
      }
    };
  }

  public async onlySameUserOrAdminCanDoThisAction(req: any, res: any, next: any): Promise<any> {
    const userPermissionLevel: number = parseInt(req.jwt.permissionLevel);
    const id: string = req.jwt.id;

    if (req.params && req.params.id && id === req.params.id) {
      return next();
    } else {
      if (userPermissionLevel & CommonPermissionMiddleware.MAX_PERMISSION) {
        return next();
      } else {
        return res.status(403).send({});
      }
    }
  }

  public async onlyAdminCanDoThisAction(req: any, res: any, next: any): Promise<any> {
    const userPermissionLevel: any = parseInt(req.jwt.permissionLevel);

    if (userPermissionLevel & CommonPermissionMiddleware.MAX_PERMISSION) {
      return next();
    } else {
      return res.status(403).send({});
    }
  }
}
