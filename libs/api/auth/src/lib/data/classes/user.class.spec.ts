import { User } from './user.class';

describe('User', () => {
  describe('id', () => {
    it('should return id', () => {
      const id = 'testId';
      let user = new User(id);
      expect(user.id).toStrictEqual(id);
      const anotherId = 'anotherTestId';
      user = new User(anotherId);
      expect(user.id).toStrictEqual(anotherId);
    });
  });

  describe('roles', () => {
    it('should return roles', () => {
      const id = 'testId';
      let user = new User(id);
      expect(user.roles).toStrictEqual([]);
      const roles = ['Role1', 'Role2'];
      user = new User(id, roles);
      expect(user.roles).toStrictEqual(roles);
      const differentRoles = ['Role3'];
      user = new User(id, differentRoles);
      expect(user.roles).toStrictEqual(differentRoles);
    });

    it('should copy input roles', () => {
      const roles: string[] = [];
      const user = new User('testId', roles);
      expect(user.roles).toStrictEqual([]);
      roles.push('Role');
      expect(roles).toStrictEqual(['Role']);
      expect(user.roles).toStrictEqual([]);
    });

    it('should copy output roles', () => {
      const initialRoles: string[] = [];
      const user = new User('testId', initialRoles);
      const roles = user.roles;
      expect(roles).toStrictEqual(initialRoles);
      roles.push('role');
      expect(roles).toStrictEqual(['role']);
      expect(user.roles).toStrictEqual(initialRoles);
    });
  });
});
