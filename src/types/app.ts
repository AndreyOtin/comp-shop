import { Status } from 'consts/enum';

export type StatusData = {
  status: {
    [key: string]: Status;
  };
  code?: {
    [key: string]: string;
  };
};
