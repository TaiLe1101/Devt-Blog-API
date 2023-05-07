export type FileUploads =
    | {
          [fieldname: string]: Express.Multer.File[];
      }
    | Express.Multer.File[]
    | undefined;

export type FileUpload = Express.Multer.File | undefined;
