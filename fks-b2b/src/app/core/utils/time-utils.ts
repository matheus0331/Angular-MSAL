export class TimeUtils {
  /**
   * return the current time in Unix time (seconds).
   */
  static nowSeconds(): number {
    // Date.getTime() returns in milliseconds.
    return Math.round(new Date().getTime() / 1000.0);
  }

  /**
   * check if a token is expired based on given UTC time in seconds.
   */
  static isTokenExpired(expiresOn: string, offset: number): boolean {
    // check for access token expiry
    const expirationSec = Number(expiresOn) || 0;
    const offsetCurrentTimeSec = TimeUtils.nowSeconds() + offset;

    // If current time + offset is greater than token expiration time, then token is expired.
    return offsetCurrentTimeSec > expirationSec;
  }
}
