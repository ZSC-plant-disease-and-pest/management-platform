import http from '@/utils/http';
import { searchByInfo } from './baseInterface';

export interface MarkParams extends searchByInfo {
  // id
  id?: number
}

export class markHttp {}
