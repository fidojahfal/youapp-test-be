import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { TestModule } from './test.module';
import { TestService } from './test.service';
import request from 'supertest';
import { App } from 'supertest/types';
import {
  CanActivate,
  ExecutionContext,
  INestApplication,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthMiddleware } from '../src/common/middleware/auth.middleware';

describe('ProfileController', () => {
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

  describe('POST /api/createProfile', () => {
    beforeEach(async () => {
      await testService.deleteUser();
      await testService.createUser();
    });

    it('should be throw an error when input is empty', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/createProfile')
        .send({
          name: '',
          gender: '',
          birthday: '',
          height: '',
          weight: '',
        });

      expect(response.status).toBe(403);
      expect(response.body.errors).toBeDefined();
    });

    it('should create new profile', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/createProfile')
        .send({
          name: 'User 123',
          gender: 'male',
          birthday: '2002-12-09T17:00:00.000Z',
          height: 179,
          weight: 70,
        });

      expect(response.status).toBe(201);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.username).toBe('test123');
      expect(response.body.data.profile.name).toBe('User 123');
      expect(response.body.data.profile.gender).toBe('male');
      expect(response.body.data.profile.birthday).toBe(
        '2002-12-09T17:00:00.000Z',
      );
      expect(response.body.data.profile.height).toBe(179);
      expect(response.body.data.profile.weight).toBe(70);
    });

    it('should throw an error when profile already exist', async () => {
      await testService.createProfile();

      const response = await request(app.getHttpServer())
        .post('/api/createProfile')
        .send({
          name: 'User 123',
          gender: 'male',
          birthday: '2002-12-09T17:00:00.000Z',
          height: 179,
          weight: 70,
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('GET /api/getProfile', () => {
    beforeEach(async () => {
      await testService.deleteUser();
      await testService.createUser();
      await testService.createProfile();
    });

    it('should be throw an error when user profile not found', async () => {
      await testService.deleteUser();

      const response = await request(app.getHttpServer()).get(
        '/api/getProfile',
      );
      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be return user profile when found', async () => {
      const response = await request(app.getHttpServer()).get(
        '/api/getProfile',
      );
      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.username).toBe('test123');
      expect(response.body.data.profile).toBeDefined();
    });
  });

  describe('PUT /api/updateProfile', () => {
    beforeEach(async () => {
      await testService.deleteUser();
      await testService.createUser();
      await testService.createProfile();
    });

    it('should be throw an error when input is empty', async () => {
      const response = await request(app.getHttpServer())
        .put('/api/updateProfile')
        .send({
          name: '',
          gender: '',
          birthday: '',
          height: '',
          weight: '',
        });

      expect(response.status).toBe(403);
      expect(response.body.errors).toBeDefined();
    });

    it('should update the profile', async () => {
      const response = await request(app.getHttpServer())
        .put('/api/updateProfile')
        .send({
          name: 'User 223',
          gender: 'male',
          birthday: '2002-05-09T17:00:00.000Z',
          height: 172,
          weight: 70,
        });

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.username).toBe('test123');
      expect(response.body.data.profile.name).toBe('User 223');
      expect(response.body.data.profile.gender).toBe('male');
      expect(response.body.data.profile.birthday).toBe(
        '2002-05-09T17:00:00.000Z',
      );
      expect(response.body.data.profile.height).toBe(172);
      expect(response.body.data.profile.weight).toBe(70);
    });

    it('should throw an error when user profile not found', async () => {
      await testService.deleteUser();

      const response = await request(app.getHttpServer())
        .put('/api/updateProfile')
        .send({
          name: 'User 123',
          gender: 'male',
          birthday: '2002-12-09T17:00:00.000Z',
          height: 179,
          weight: 70,
        });

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });
  });
});
