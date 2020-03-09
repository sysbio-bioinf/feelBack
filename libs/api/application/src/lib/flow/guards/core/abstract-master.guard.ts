import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AbstractRealmGuard } from './abstract-realm.guard';
// import { AbstractRoleGuard } from './abstract-role.guard';

export abstract class AbstractMasterGuard implements CanActivate {
  constructor(
    protected realmGuard: AbstractRealmGuard, // protected roleGuard: AbstractRoleGuard, // protected jwtGuard: CanActivate,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // first, we simply call the realmGuard and check this result
    const realmGuardResult = await this.realmGuard.canActivate(context);

    if (realmGuardResult === true) {
      return true;
    }

    // const jwtGuardResult = await this.jwtGuard.canActivate(context);
    // const roleGuardResult = await this.roleGuard.canActivate(context);
    // // and now we check, if both (jwt & role) guards are true
    // if (jwtGuardResult === true && roleGuardResult === true) {
    //   return true;
    // }

    return false;
  }
}
