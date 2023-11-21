import { Publication } from './publication';

export class Comment {
  idComment: number = 0;
  idPublication: Publication = new Publication();
  description: string = '';
}
