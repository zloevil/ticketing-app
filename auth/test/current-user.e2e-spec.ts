import { JwtPayloadDto } from '../src/app/common/dto/jwt-payload.dto';
import { server, user } from './setup';

describe('sing-in', () => {
  let cookies = null;
  beforeAll(async () => {
    cookies = await global.getCookies(server);
  });

  it('returns a 201 with user.dto', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/users/current-user',
      cookies,
    });
    const requestBody = JSON.parse(response.body) as JwtPayloadDto;
    expect(response.statusCode).toBe(200);
    expect(requestBody.email).toBe(user.email);
    expect(requestBody.id).toBe(user.id);
    expect(requestBody.iat).toBeDefined();
    expect(requestBody.exp).toBeDefined();
  });

  it('returns a 400 with invalid token', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/users/current-user',
      cookies: {
        jwt: 'token',
      },
    });
    expect(response.statusCode).toBe(401);
  });

  it('returns a 400 with invalid token', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/api/users/current-user',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('');
  });
});
