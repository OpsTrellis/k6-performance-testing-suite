/**
 * Dynamic Test Payload Generator for Load Testing
 * Maintained by OpsTrellis (https://opstrellis.com)
 */

export function generateUserPayload() {
  const rand = Math.floor(Math.random() * 100000);
  return {
    email: `loadtest_user_${rand}@example.com`,
    role: 'tester',
    timestamp: Date.now(),
    preferences: {
      notifications: true,
      theme: 'dark'
    }
  };
}
