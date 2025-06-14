// declare module 'formidable' {
//   export interface Fields {
//     [key: string]: string | string[]
//   }

//   export interface Files {
//     [key: string]: File | File[]
//   }

//   export interface File {
//     filepath:          string
//     originalFilename:  string | null
//     newFilename:       string
//     mimetype:          string | null
//     size:              number
//     lastModifiedDate?: Date
//     hashAlgorithm?:    boolean | string
//     hash?:             string
//   }

//   export interface Options {
//     encoding?:       string
//     uploadDir?:      string
//     keepExtensions?: boolean
//     maxFileSize?:    number
//     maxFieldsSize?:  number
//     maxFields?:      number
//     hash?:           boolean | string
//     multiples?:      boolean
//   }

//   export class IncomingForm {
//     constructor(options?: Options)
//     parse(req: any, callback: (err: Error | null, fields: Fields, files: Files) => void): void
//     parse(req: any): Promise<[Fields, Files]>
//   }
// } 