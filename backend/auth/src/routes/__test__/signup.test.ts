import request from 'supertest';
import { app } from '../../providers/app';
import { User } from '../../models/User';

describe('Signup route', () => {
  it('returns a 201 on successful signup', async () => {
    await request(app)
      .post('/user/signup')
      .send({
        email: 'test1232@test.com',
        password: 'password'
      })
      .expect(201);

    const user = await User.findOne({ email: 'test@test.com' });
    expect(user).not.toBeNull();
  });

  it('returns a 400 with an invalid email', async () => {
    await request(app)
      .post('/user/signup')
      .send({
        email: 'invalid-email',
        password: 'password'
      })
      .expect(400);
  });

  it('returns a 400 with a short password', async () => {
    await request(app)
      .post('/user/signup')
      .send({
        email: 'test@test.com',
        password: 'p'
      })
      .expect(400);
  });

  it('returns a 400 with missing email and password', async () => {
    await request(app)
      .post('/user/signup')
      .send({})
      .expect(400);
  });

  it('returns a 400 with an email that already exists', async () => {
    await request(app)
      .post('/user/signup')
      .send({
        email: 'test1232@test.com',
        password: 'password'
      })
      .expect(201);

    await request(app)
      .post('/user/signup')
      .send({
        email: 'test1232@test.com',
        password: 'password'
      })
      .expect(400);
  });
});
