// filepath: src/js/script.test.js

describe('Username validation regex', () => {
  // The regex from script.js
  const regex = /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

  it('should pass for a valid username with uppercase, special char, and 8+ chars', () => {
    expect(regex.test('Password!')).toBe(true);
    expect(regex.test('A1b2c3d$')).toBe(true);
    expect(regex.test('Test@2024')).toBe(true);
  });

  it('should fail if less than 8 characters', () => {
    expect(regex.test('Abc!123')).toBe(false);
    expect(regex.test('A!b2c3')).toBe(false);
  });

  it('should fail if no uppercase letter', () => {
    expect(regex.test('password!')).toBe(false);
    expect(regex.test('test@2024')).toBe(false);
  });

  it('should fail if no special character', () => {
    expect(regex.test('Password1')).toBe(false);
    expect(regex.test('Abcdefgh')).toBe(false);
  });

  it('should fail if no uppercase and no special character', () => {
    expect(regex.test('password1')).toBe(false);
    expect(regex.test('abcdefgh')).toBe(false);
  });

  it('should pass for multiple special characters and uppercase', () => {
    expect(regex.test('A!@#1234')).toBe(true);
    expect(regex.test('Z$Z$Z$Z$')).toBe(true);
  });
});
