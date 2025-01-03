// Generated by nitro
import type { Serialize, Simplify } from "nitropack/types";
declare module "nitropack/types" {
  type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
  interface InternalApi {
    '/api/session': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/session').default>>>>
    }
    '/api/store': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../server/api/store').default>>>>
    }
    '/__nuxt_error': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/nuxt/dist/core/runtime/nitro/renderer').default>>>>
    }
  }
}
export {}