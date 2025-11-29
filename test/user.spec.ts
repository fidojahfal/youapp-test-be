import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { TestModule } from './test.module';
import { TestService } from './test.service';

describe('UserController', () => {
  let app: INestApplication<App>;
  let testService: TestService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    testService = app.get(TestService);
  });

  describe('POST /api/register', () => {
    beforeEach(async () => {
      await testService.deleteUser();
    });

    it('should be throw an error', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/register')
        .send({
          email: '',
          username: '',
          password: '',
          confirm_password: '',
        });

      expect(response.status).toBe(403);
      expect(response.body.errors).toBeDefined();
    });

    it('should create new user', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/register')
        .send({
          email: 'test123@test.com',
          username: 'test123',
          password: 'testes123',
          confirm_password: 'testes123',
        });

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.username).toBe('test123');
    });

    it('should throw an error when user already exist', async () => {
      await testService.createUser();

      const response = await request(app.getHttpServer())
        .post('/api/register')
        .send({
          email: 'test123@test.com',
          username: 'test123',
          password: 'testes123',
          confirm_password: 'testes123',
        });

      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('POST /api/login', () => {
    beforeEach(async () => {
      await testService.deleteUser();
      await testService.createUser();
    });

    it('should be throw an invalid when no input', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/login')
        .send({
          email: '',
          username: '',
          password: '',
        });

      expect(response.status).toBe(403);
      expect(response.body.errors).toBeDefined();
    });

    it('should return id, username and token', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/login')
        .send({
          email: 'test123@test.com',
          username: 'test123',
          password: 'testes123',
        });

        console.log(response.body)

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.username).toBe('test123');
      expect(response.body.data.token).toBeDefined();
    });
  });
});
