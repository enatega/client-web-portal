export interface ITippingsForm {
  tip1: string;
  tip2: string;
  tip3: string;
}

export interface ITippingErrors {
  tip1?: string[];
  tip2?: string[];
  tip3?: string[];
}

export interface ITippingResponse {
  tips: {
    __typename: 'Tipping';
    _id: string;
    tipVariations: number[];
    enabled: boolean;
  };
}
