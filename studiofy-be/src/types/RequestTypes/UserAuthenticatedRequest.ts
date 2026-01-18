import { Request } from 'express';
import { UserDocument } from 'src/modules/users/entities/users.entity';

export interface UserAuthenticatedRequest extends Request {
  user: UserDocument;
}
