import { Injectable } from '@nestjs/common';

@Injectable()
export class ExceptionService {
  fetch(id): string {
    return `exception for ${id}`;
  }

  save(message): string {
    return `Set exception ${message}`;
  }

  update(id: string, message: string): string {
    return `Update exception ${id}: ${message}`;
  }

  remove(id: string): string {
    return `remove exception ${id}`;
  }
}
