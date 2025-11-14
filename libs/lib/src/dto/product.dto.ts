export class CreateProductDto {
  readonly name: string;
  readonly price: number;
}

export class UpdateProductDto {
  readonly name?: string;
  readonly price?: number;
}
