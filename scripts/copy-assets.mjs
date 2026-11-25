import { copyFile, mkdir } from 'node:fs/promises'

const source = new URL('../figures/error.svg', import.meta.url)
const outputDirectory = new URL('../dist/figures/', import.meta.url)
const destination = new URL('error.svg', outputDirectory)

await mkdir(outputDirectory, { recursive: true })
await copyFile(source, destination)

console.log('Copied figures/error.svg to dist/figures/error.svg')
