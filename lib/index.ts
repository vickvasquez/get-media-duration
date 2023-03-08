import execa from 'execa'
import match from '@vickvasquez/ts-match'

import {
  FileNotFound,
  FilePathMissing,
  InvalidFile,
  InvalidURL,
  MediaNotFound,
  NotFoundBinary,
  ProcessingMediaError
} from './errors'

const ffprobe = 'ffprobe'
const SECONDS_PER_MINUTE = 60
const OPTIONS = ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1']

const isURL = (url: string): boolean => {
  try {
    // eslint-disable-next-line no-new
    new URL(url)

    return true
  } catch (error) {
    return false
  }
}

const isValidHTTPURL = (url: string): boolean => {
  try {
    const newUrl = new URL(url)

    return newUrl.protocol === 'http:' || newUrl.protocol === 'https:'
  } catch (error) {
    return false
  }
}

const hasBinaryInSystem = async (): Promise<boolean> => {
  try {
    await execa(ffprobe, ['-h'])

    return true
  } catch (error) {
    return false
  }
}

const matchError = (type: string, input: string): ProcessingMediaError => {
  return match(type, {
    'No such file or directory': new FileNotFound(input),
    'Invalid data found when processing input': new InvalidFile(input),
    'Server returned 404 Not Found': new MediaNotFound(input),
    default: new ProcessingMediaError(input)
  })
}

const getDuration = async (input: string): Promise<number> => {
  if (input === '') {
    throw new FilePathMissing()
  }

  if (!(await hasBinaryInSystem())) {
    throw new NotFoundBinary()
  }

  if (isURL(input) && !isValidHTTPURL(input)) {
    throw new InvalidURL(input)
  }

  try {
    const { stdout } = await execa(ffprobe, [...OPTIONS, input])

    return Number(stdout)
  } catch (error: any) {
    const { stderr } = error
    const [, message] = stderr.split(':')

    if (isURL(input)) {
      throw new MediaNotFound(input)
    }

    throw matchError(message.trim(), input)
  }
}

const getDurationInMinutes = async (input: string): Promise<number> => {
  const duration = await getDuration(input)

  return duration / SECONDS_PER_MINUTE
}

export { getDuration, getDurationInMinutes }
