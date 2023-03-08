export class ProcessingMediaError extends Error {}

export class FileNotFound extends ProcessingMediaError {
  constructor (file: string) {
    const message = `The file ${file} not exist, verify your path`
    super(message)

    this.name = 'FILE_NOT_EXIST'
  }
}

export class MediaNotFound extends ProcessingMediaError {
  constructor (url: string) {
    const message = `The url ${url} not found`
    super(message)

    this.name = 'NOT_FOUND_URL'
  }
}

export class InvalidFile extends ProcessingMediaError {
  constructor (file: string) {
    const message = `The file ${file} is not a valid, must be a media file.`
    super(message)

    this.name = 'INVALID_FILE'
  }
}

export class InvalidURL extends ProcessingMediaError {
  constructor (url: string) {
    const message = `Invalid URL: ${url}`
    super(message)

    this.name = 'INVALID_URL'
  }
}

export class NotFoundBinary extends Error {
  constructor () {
    super('ffprobe binary not found on this system')
    this.name = 'BINARY_NOT_FOUND'
  }
}

export class FilePathMissing extends ProcessingMediaError {
  constructor () {
    super('file path missing')
    this.name = 'FILE_PATH_MISSING'
  }
}
