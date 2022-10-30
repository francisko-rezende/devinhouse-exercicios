export interface QueryParamsFindMyPizzas {
  name?: string;
}

export interface Pizza {
  id: string;
  name: string;
  description: string;
  url: string;
  price: number;
  ingredients: string[];
}

export interface BodyParamsCreatePizza {
  name: string;
  description: string;
  url: string;
  pice: number;
  ingredients: string[];
}

export interface BodyParamsUpdatePizza {
  id: string;
  name: string;
  description: string;
  url: string;
  pice: number;
  ingredients: string[];
}
