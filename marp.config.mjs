import inlineSvg from './plugins/inline-svg.mjs'

export default {
  engine: ({ marp }) => marp.use(inlineSvg, { root: process.cwd() }),
}
