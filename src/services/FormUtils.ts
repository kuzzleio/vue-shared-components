import transform from 'lodash/transform';

const typesCorrespondance = {
  boolean: 'bootstrap-checkbox',
  number: 'bootstrap-input',
  string: 'bootstrap-input'
};

const defaultValue = {
  boolean: false,
  number: 0,
  string: ''
};

const inputTypesCorrespondance = {
  string: 'text',
  number: 'number',
  boolean: ''
};

type Argument = {
  /**
   * Argument type
   */
  type: 'boolean' | 'number' | 'string';
  /**
   * Argument description
   */
  description: string;
  /**
   * Makes the argument optional
   */
  optional?: true;
};

type Arguments = {
  [name: string]: Argument;
};

interface FormField {
  name: string;
  type: string;
  inputType?: string;
  label: string;
  model: string;
  required?: boolean;
  placeholder?: string;
  default: string | number | boolean | null;
}

interface FormSchema {
  fields: FormField[];
}

export const generateSchema = (args: Arguments): FormSchema => {
  return {
    fields: transform(
      args,
      (result: FormField[], value: Argument, key: string) => {
        result.push({
          name: key,
          type: typesCorrespondance[value.type],
          inputType: inputTypesCorrespondance[value.type] as string,
          label: key,
          model: key,
          required: !value.optional,
          placeholder: value.description,
          default: defaultValue[value.type]
        });
      },
      []
    )
  };
};
