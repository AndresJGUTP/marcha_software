import type { InputProps as RcInputProps } from 'rc-input';

export interface IMapInput {
    label: string,
    type: RcInputProps["type"] | 'DatePicker'
}

export const mapPatientLabels: Record<string, IMapInput> = {
    nombre : {
      label: 'Nombre',
      type: 'text',
    },
    primer_apellido : {
      label: 'Primer Apellido',
      type: 'text',
    },
    segundo_apellido : {
      label: 'Segundo Apellido',
      type: 'text',
    },
    id_documento : {
      label: 'Documento',
      type: 'text',
    },
    edad : {
      label: 'Edad',
      type: 'number',
    },
    fecha_nacimiento : {
      label: 'Fecha de Nacimiento',
      type: 'DatePicker',
    },
  }

  export const mapParentLabels: Record<string, Record<string, string>> = {
    nombre : {
      label: 'Nombre',
      type: 'text',
    },
    primer_apellido : {
      label: 'Primer Apellido',
      type: 'text',
    },
    segundo_apellido : {
      label: 'Segundo Apellido',
      type: 'text',
    },
    id_documento : {
      label: 'Documento',
      type: 'text',
    },
    edad : {
      label: 'Edad',
      type: 'number',
    },
    fecha_nacimiento : {
      label: 'Fecha de Nacimiento',
      type: 'DatePicker',
    },
    telefono: {
        label: 'Teléfono',
        type: 'tel',
    },
    email: {
        label: 'Correo electrónico',
        type: 'email',
    },
    departamento: {
        label: 'Departamento',
        type: 'text'
    },
    ciudad: {
        label: 'Ciudad',
        type: 'text'
    },
    direccion: {
        label: 'Dirección',
        type: 'text'
    }
  }