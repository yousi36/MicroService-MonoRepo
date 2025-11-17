export class CreateUserDto {
  readonly name: string;        // Full name
  readonly email: string;       // Unique email
  readonly password: string;    // Required for registration
  readonly roleId: string;      // Role reference (admin, customer, etc.)
}



export class UpdateUserDto {
  readonly name?: string;       // Optional
  readonly email?: string;      // Optional
  readonly password?: string;   // Optional, hash before saving
  readonly roleId?: string;     // Optional role update
}


export class LoginUserDto {
  readonly email: string;
  readonly password: string;
}



export class UserResponseDto {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly roleId: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}


export class AuthResponseDto {
  readonly access_token: string; // JWT token
  readonly user: UserResponseDto; // User info
}
