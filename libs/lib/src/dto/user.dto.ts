// export class CreateUserDto {
//   readonly name: string;        // Full name
//   readonly email: string;       // Unique email
//   readonly password: string;    // Required for registration
//   readonly roleId: string;      // Role reference (admin, customer, etc.)
// }



// export class UpdateUserDto {
//   readonly name?: string;       // Optional
//   readonly email?: string;      // Optional
//   readonly password?: string;   // Optional, hash before saving
//   readonly roleId?: string;     // Optional role update
// }


// export class LoginUserDto {
//   readonly email: string;
//   readonly password: string;
// }



// export class UserResponseDto {
//   readonly id: string;
//   readonly name: string;
//   readonly email: string;
//   readonly roleId: string;
//   readonly createdAt?: Date;
//   readonly updatedAt?: Date;
// }


// export class AuthResponseDto {
//   readonly access_token: string; // JWT token
//   readonly user: UserResponseDto; // User info
// }
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Full name of the user', example: 'Muhammad Yousaf' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'Unique email address', example: 'test@example.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'Password for registration', example: 'strongPassword123' })
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiProperty({ description: 'Role reference (admin, customer, etc.)', example: 'admin' })
  @IsString()
  readonly roleId: string;
}

// PartialType allows Update DTO to inherit Create DTO and make all fields optional
export class UpdateUserDto extends PartialType(CreateUserDto) {}

// Login DTO
export class LoginUserDto {
  @ApiProperty({ description: 'Email address for login', example: 'test@example.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'Password for login', example: 'strongPassword123' })
  @IsString()
  readonly password: string;
}

// User response
export class UserResponseDto {
  @ApiProperty({ description: 'User ID', example: '63f1c1e7f8b1c23456789012' })
  readonly id: string;

  @ApiProperty({ description: 'Full name of the user', example: 'Muhammad Yousaf' })
  readonly name: string;

  @ApiProperty({ description: 'Email address', example: 'test@example.com' })
  readonly email: string;

  @ApiProperty({ description: 'Role ID of the user', example: 'admin' })
  readonly roleId: string;

  @ApiProperty({ description: 'User creation timestamp', required: false })
  readonly createdAt?: Date;

  @ApiProperty({ description: 'User update timestamp', required: false })
  readonly updatedAt?: Date;
}

// Auth response
export class AuthResponseDto {
  @ApiProperty({ description: 'JWT access token', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  readonly access_token: string;

  @ApiProperty({ description: 'User information', type: UserResponseDto })
  readonly user: UserResponseDto;
}
