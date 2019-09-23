
/**
 * The data object passed to fire, extended with target and type properties.
 */
interface EventData {
  [key: string]: any;
  target: any;
  type: any;
}

export { EventData };
