import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
  fetch(id): string {
    return `Hello Boris! ${id}`;
  }

  save(message): string {
    return `Saved message: ${message}`;
  }

  update(id: string, message: string): string {
    return `Update Heelo Done. ${id}: ${message} `;
  }

  remove(id: string): string {
    return `Remove Hello Done. ${id}: success `;
  }
}
