import path from 'path'

import { FileNotFound, FilePathMissing, InvalidFile, InvalidURL, MediaNotFound } from '../lib/errors'
import { getDuration, getDurationInMinutes } from '../lib'

const TIMEOUT = 20000
const URL_AUDIO = 'https://samplelib.com/lib/preview/mp3/sample-3s.mp3'
const URL_AUDIO_NOT_FOUND = 'https://samplelib.com/lib/preview/mp3/sample-3sw.mp3'
const FILE_PATH = path.join(__dirname, './fixtures/sample-15s.mp3')

describe('GetMediaDuration', () => {
  describe('getDuration', () => {
    it('should return duration in seconds from local storage', async () => {
      const duration = await getDuration(FILE_PATH)

      expect(duration).toBe(19.2)
    })

    it('should return duration in seconds from url', async () => {
      const duration = await getDuration(URL_AUDIO)

      expect(duration).toBe(3.239184)
    }, TIMEOUT)
  })

  describe('getDurationInMinutes', () => {
    it('should return duration in minutes from local storage', async () => {
      const duration = await getDurationInMinutes(FILE_PATH)

      expect(duration).toBe(0.32)
    })

    it('should return duration in minutes from url', async () => {
      const duration = await getDurationInMinutes(URL_AUDIO)

      expect(duration).toBe(0.0539864)
    }, TIMEOUT)
  })

  it('should throw error if file path is empty', () => {
    expect(async () => await getDuration('')).rejects.toThrowError(FilePathMissing)
  })

  it('should throw error when file is not audio', () => {
    expect(async () => await getDuration(path.join(__dirname, './fixtures/file.txt'))).rejects.toThrowError(InvalidFile)
  })

  it('should throw error when file is not exist', () => {
    expect(async () => await getDuration('./not-exist')).rejects.toThrowError(FileNotFound)
  })
  it('should throw error when url is not http', () => {
    expect(async () => await getDuration('mailto://example.com')).rejects.toThrowError(InvalidURL)
  })

  it('should throw error when url not found', () => {
    return expect(async () => await getDuration(URL_AUDIO_NOT_FOUND)).rejects.toThrowError(MediaNotFound)
  }, TIMEOUT)
})
