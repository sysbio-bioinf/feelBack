import { InjectionToken, Type } from '@angular/core';

// TODO: This has to be moved to a dedicated shared package because it is also used by ionic

/**
 * Various InjectionTokens shared across all platforms
 * Always suffix with 'Token' for clarity and consistency
 */
export const PlatformLanguageToken = new InjectionToken<string>(
  'PlatformLanguageToken',
);
