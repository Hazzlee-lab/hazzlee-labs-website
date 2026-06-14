// Next.js injects baseline polyfills for every browser, but our supported
// targets already implement them. Keep only URL.canParse for Safari < 17.
const URLConstructor = URL as typeof URL & {
  canParse?: (url: string, base?: string) => boolean;
};

if (!URLConstructor.canParse) {
  URLConstructor.canParse = (url: string, base?: string) => {
    try {
      new URL(url, base);
      return true;
    } catch {
      return false;
    }
  };
}
