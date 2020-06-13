import { server } from './setup';

describe('sing-in', () => {
  let cookies = null;
  beforeAll(async () => {
    cookies = await global.getCookies(server);
  });

  it('returns a 201 with reset token', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/users/sign-out',
      payload: {
        email: 'zlo@evil.io',
        password: 'zloevil',
      },
      cookies,
    });
    expect(response.statusCode).toBe(201);
    expect(response.cookies.find((c) => c.name === 'jwt').value).toBe('');
  });

  it('returns a 400 with invalid token', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/users/sign-out',
      payload: {
        email: 'zlo@evil.io',
        password: 'zloevil',
      },
      cookies: {
        jwt: 'token',
      },
    });
    expect(response.statusCode).toBe(401);
  });

  it('returns a 201 with reset token', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/users/sign-out',
      payload: {
        email: 'zlo@evil.io',
        password: 'zloevil',
      },
    });
    expect(response.statusCode).toBe(201);
    expect(response.cookies.find((c) => c.name === 'jwt').value).toBe('');
  });
});
