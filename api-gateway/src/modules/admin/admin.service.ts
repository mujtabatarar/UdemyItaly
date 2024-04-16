import {
  BadGatewayException,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import {
  ClientKafka,
  Client,
  ClientProxy,
  Transport,
} from '@nestjs/microservices';
import {
  udemyMicroServiceConfigKafka,
  udemyMicroServiceConfigTcp,
  udemyMicroServiceConfigRedis,
} from 'src/microServiceConfigs';
import { errorMessage } from 'src/constants/error-message-constant';
import { LoggerHandler } from 'src/helpers/logger-handler';
import { RedisHandler } from 'src/helpers/redis-handler-with-pool';
import {
  CREATE_COURSE,
  CREATE_COURSE_SECTION,
  CREATE_SECTION_LESSON,
  CREATE_TEACHER,
  CREATE_USER,
  ENROLL_USER,
  GET_COURSE_ALL_DETAILS_KAFKA,
  GET_COURSE_ALL_DETAILS_REDIS,
  GET_COURSE_ALL_DETAILS_TCP,
  UPDATE_SECTION_LESSON,
} from 'src/constants/message.constant';
@Injectable()
export class AdminService implements OnModuleInit {
  private readonly logger = new LoggerHandler(AdminService.name).getInstance();

  constructor(
    private redisHandler: RedisHandler, // private readonly clientRedis: ClientProxy, // @Inject('UDEMY_MICRO_SERVICE_CONFIG') private clientUdemyTCP: ClientProxy,
  ) {}

  @Client({
    ...udemyMicroServiceConfigKafka,
    options: {
      ...udemyMicroServiceConfigKafka.options,
      consumer: {
        groupId: 'udemy-consumer-admin',
      },
    },
  })
  clientUdemyKafka: ClientKafka;

  @Client(udemyMicroServiceConfigTcp)
  clientUdemyTCP: ClientProxy;

  @Client(udemyMicroServiceConfigRedis)
  clientUdemyREDIS: ClientProxy;

  onModuleInit() {
    // adminudemyPatterns.forEach((pattern) => {
    //   this.clientUdemyKafka.subscribeToResponseOf(pattern);
    // });
  }
  async createUser(params: any): Promise<any> {
    try {
      const res = await this.clientUdemyTCP
        .send(CREATE_USER, JSON.stringify(params))
        .pipe()
        .toPromise();
      return res;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
  async createCourse(params: any): Promise<any> {
    try {
      return await this.clientUdemyTCP
        .send(CREATE_COURSE, JSON.stringify(params))
        .pipe()
        .toPromise();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async createSection(params: any): Promise<any> {
    try {
      return await this.clientUdemyTCP
        .send(CREATE_COURSE_SECTION, JSON.stringify(params))
        .pipe()
        .toPromise();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
  async createLesson(params: any): Promise<any> {
    try {
      return await this.clientUdemyTCP
        .send(CREATE_SECTION_LESSON, JSON.stringify(params))
        .pipe()
        .toPromise();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async updateLesson(params: any): Promise<any> {
    try {
      console.log(params);
      return await this.clientUdemyTCP
        .send(UPDATE_SECTION_LESSON, JSON.stringify(params))
        .pipe()
        .toPromise();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async createEnrollment(params: any): Promise<any> {
    try {
      return await this.clientUdemyTCP
        .send(ENROLL_USER, JSON.stringify(params))
        .pipe()
        .toPromise();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
  async createTeacher(params: any): Promise<any> {
    try {
      return await this.clientUdemyTCP
        .send(CREATE_TEACHER, JSON.stringify(params))
        .pipe()
        .toPromise();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async getCourseAllDetailsTcp(params: any): Promise<any> {
    try {
      return await this.clientUdemyTCP
        .send(GET_COURSE_ALL_DETAILS_TCP, JSON.stringify(params))
        .pipe()
        .toPromise();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
  async getCourseAllDetailsKafka(params: any): Promise<any> {
    try {
      return await this.clientUdemyKafka
        .send(GET_COURSE_ALL_DETAILS_KAFKA, JSON.stringify(params))
        .pipe()
        .toPromise();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
  async getCourseAllDetailsRedis(params: any): Promise<any> {
    try {
      return await this.clientUdemyREDIS
        .send(GET_COURSE_ALL_DETAILS_REDIS, JSON.stringify(params))
        .pipe()
        .toPromise();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
