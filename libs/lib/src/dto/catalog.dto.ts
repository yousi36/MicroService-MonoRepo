export class CreateCatalogDto {
  readonly name: string;
  readonly categories: string[];
  readonly isActive?: boolean; // optional, defaults to true
}

export class UpdateCatalogDto {
  readonly name?: string;
  readonly categories?: string[];
  readonly isActive?: boolean;
}
