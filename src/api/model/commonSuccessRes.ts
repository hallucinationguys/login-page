/**
 * Generated by orval v6.25.0 🍺
 * Do not edit manually.
 * Login Service API
 * Ecosystem Hallucination Guys API Document
 * OpenAPI spec version: 1.0
 */
import type { CommonSuccessResData } from './commonSuccessResData'
import type { CommonSuccessResFilter } from './commonSuccessResFilter'
import type { CommonSuccessResPaging } from './commonSuccessResPaging'

export interface CommonSuccessRes {
  data?: CommonSuccessResData
  filter?: CommonSuccessResFilter
  paging?: CommonSuccessResPaging
  status_code?: number
}