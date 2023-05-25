
export interface IDocumentTypes{
    readonly id : 'CC' | 'TI' | 'RC' | 'CE' | 'CI' | 'DNI' 
    readonly label : 'Cédula de Ciudadanía' | 'Tarjeta de Identidad' | 'Registro Civil' | 'Cédula de Extranjería' | 'Carné de Identidad' | 'Documento Nacional de Identidad'
}

export const DocumentTypes : Array<IDocumentTypes> = [
    {
        id: "CC",
        label: "Cédula de Ciudadanía"
    },
    {
        id: 'TI', 
        label: 'Tarjeta de Identidad'
    },
    {
        id: 'RC', 
        label: 'Registro Civil'
    },
    {
        id: 'CE', 
        label: 'Cédula de Extranjería'
    },
    {
        id: 'CI', 
        label: 'Carné de Identidad'
    },
    {
        id: 'DNI', 
        label: 'Documento Nacional de Identidad'
    },
] 