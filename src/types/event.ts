import { LngLat } from "./location";

/**
 * The data object passed to fire, extended with target and type properties.
 */
export interface EventData {
  [key: string]: any;
  target: any;
  type: string;
}
