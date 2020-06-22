/**
 * Represents a user that is currently logged in.
 */
export class User {
  private _id: string;

  /**
   * The Keycloak ID.
   */
  get id(): string {
    return this._id;
  }

  private _roles: string[];

  /**
   * The roles of this user.
   */
  get roles(): string[] {
    return Object.assign([], this._roles);
  }

  /**
   * @param id The Keycloak ID.
   * @param roles The roles.
   */
  constructor(id: string, roles?: string[]) {
    this._id = id;
    this._roles = roles ? Object.assign([], roles) : [];
  }
}
