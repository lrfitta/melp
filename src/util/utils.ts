export class Utils {
  /**
   * Transform a String to Int
   * @param str  String to transform
   * @param def Default value
   * @returns Numeric value.
   */
  static toInt(str: string, def = 0): number {
    try {
      const parsed = parseInt(String(str || '0').trim(), 10);
      return parsed;
    } catch (e) {
      return def;
    }
  }

  /**
 * Transform a String to Float
 * @param str  String to transform
 * @param def Default value
 * @returns Numeric value.
 */
  static parseNumber(str, def = 0): number {
    try {
      const parsed = parseFloat(String(str || '0').trim());
      return parsed;
    } catch (e) {
      return def;
    }
  }
}
