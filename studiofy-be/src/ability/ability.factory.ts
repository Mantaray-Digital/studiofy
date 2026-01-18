import { Injectable } from '@nestjs/common';
import { createMongoAbility, MongoAbility, AbilityBuilder } from '@casl/ability';
import { User, UserDocument } from 'src/modules/users/entities/users.entity';
import { UserRole } from 'src/modules/users/enums/user-role';


export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects = User | typeof User;

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  definedUserAbility(user: UserDocument) {
    const { build, can, cannot } = new AbilityBuilder(createMongoAbility);
    if (user.roles === UserRole.ADMIN) {
      can(Action.Manage, 'all');
    } else {
      cannot(Action.Manage, 'all');

      can(Action.Read, User.name, { _id: user._id });
      can(Action.Update, User.name, { _id: user._id });
      can(Action.Delete, User.name, { _id: user._id });
    }

    return build();
  }
}
