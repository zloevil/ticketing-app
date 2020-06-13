import { JwtPayloadDto } from '../src/app/common/dto/jwt-payload.dto';
import { server, user, jwtService } from './setup';

describe('sing-in', () => {
  beforeAll(async () => {
    await server.inject({
      method: 'POST',
      url: '/api/users/sign-up',
      payload: {
        email: 'zlo@evil.io',
        password: 'zloevil',
      },
    });
  });

  it('returns a 201 with token and user.dto', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/users/sign-in',
      payload: {
        email: 'zlo@evil.io',
        password: 'zloevil',
      },
    });
    const responseBody = JSON.parse(response.body);
    expect(response.statusCode).toBe(201);
    expect(responseBody.id).toBe(user.id);
    expect(responseBody.email).toBe(user.email);
    expect((jwtService.verify(response.cookies[0].value) as JwtPayloadDto).id).toBe(user.id);
  });

  it('returns a 400 with an invalid email', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/users/sign-in',
      payload: {
        email: 'test.com',
        password: 'keklolrofl',
      },
    });
    const responseBody = JSON.parse(response.body);
    expect(response.statusCode).toBe(400);
    expect(responseBody.message[0]).toBe('email must be an email');
  });

  it('returns a 400 with an invalid password', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/users/sign-in',
      payload: {
        email: 'test@test.com',
        password: 'k',
      },
    });
    const responseBody = JSON.parse(response.body);
    expect(response.statusCode).toBe(400);
    expect(responseBody.message[0]).toBe('password must be longer than or equal to 6 characters');
  });

  it('returns a 400 with an invalid password', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/users/sign-in',
      payload: {
        email: 'test@test.com',
      },
    });
    const responseBody = JSON.parse(response.body);
    expect(response.statusCode).toBe(400);
    expect(responseBody.message[0]).toBe('password must be longer than or equal to 6 characters');
  });

  it('returns a 400 with an all kinds of validation errors', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/users/sign-in',
    });
    const responseBody = JSON.parse(response.body);
    expect(response.statusCode).toBe(400);
    expect(responseBody.message[0]).toBe('email must be an email');
    expect(responseBody.message[1]).toBe('email should not be empty');
    expect(responseBody.message[2]).toBe('password must be longer than or equal to 6 characters');
    expect(responseBody.message[3]).toBe('password should not be empty');
  });

  it('returns a 400 with incorrect credentials', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/users/sign-in',
      payload: {
        email: 'zlo@evil.net',
        password: 'zloevil',
      },
    });
    const responseBody = JSON.parse(response.body);
    expect(response.statusCode).toBe(400);
    expect(responseBody.message).toBe('Incorrect credentials');
  });

  it('returns a 400 with incorrect credentials', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/users/sign-in',
      payload: {
        email: 'zlo@evil.io',
        password: 'zloevil666',
      },
    });
    const responseBody = JSON.parse(response.body);
    expect(response.statusCode).toBe(400);
    expect(responseBody.message).toBe('Incorrect credentials');
  });
});
