import { Exception } from '../common/exception';

export default function* (next) {
  try {
    yield next;
  } catch (err) {
    if (err instanceof Exception) {
      // it transform the exception to an object literal
      this.body = err.toObject();
      this.status = err.statusCode;
    } else {
      // unknow error
      console.log(err);
      this.body = { message: 'Unexpected error.' };
      this.status = 500;
    }
  }
};
