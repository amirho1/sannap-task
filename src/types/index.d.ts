export interface ResponseT {
  status_code: number;
  message: string;
  is_success: boolean;
  error_details: {
    type: string;
    code: string;
    detail: string;
    attr: string;
    fa_details: string;
  };
  response: null | any;
}

export interface Inputs<Name = string, Item = unknown> {
  name: Name;
  label: string;
  placeholder: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: inputType;
  renderItem?: (item: Item) => React.JSX;
}

export interface ProvinceOption {
  id: number;
  is_active: boolean;
  name: string;
  code: string;
  name_split: string;
  creator_user: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
  };
  country: string;
}

export interface CityOption {
  id: number;
  is_active: boolean;
  name: string;
  fanavaran_code: string;
  name_split: string;
  province: {
    id: number;
    is_active: boolean;
    name: string;
    code: string;
    name_split: string;
    creator_user: number;
    country: number;
  };
  creator_user: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
  };
}

export interface Branch {
  id: number;
  name: strings;
  insurance: number;
  province: number;
  county: number;
}
