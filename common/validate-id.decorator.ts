import { BadRequestException } from '@nestjs/common';

export function ValidateId() {
  return function (target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
      const id = args[0];
      if (!Number.isInteger(+id) || isNaN(+id)) {
        throw new BadRequestException('Invalid id. ID must be a valid number.');
      }
      return originalMethod.apply(this, args);
    };
  };
}
