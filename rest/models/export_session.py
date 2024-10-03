from import_export import resources, fields
from .session import Session

class SessionResource(resources.ModelResource):
    class Meta:
        model = Session
        fields = ('id',)  # Solo el campo 'id' inicialmente
        export_order = ('id',)  # Inicializar con el campo 'id'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Crear una lista de campos a agregar a Meta.fields
        additional_fields = []

        # Iterar sobre los campos del modelo y generar métodos de deshidratación dinámicamente
        for field in Session._meta.fields:
            field_name = field.name  # Usar el nombre original del campo, sin sufijo

            if field.choices:  # Verificar si el campo tiene choices
                # Crear el nombre del método de deshidratación para choices
                display_method = f"get_{field.name}_display"

                # Crear la función de deshidratación usando el método correspondiente a choices
                setattr(self, f"dehydrate_{field.name}", 
                        lambda instance, method=display_method: getattr(instance, method)())
                
                # Agregar el campo como un Field en el recurso, usando el nombre original del campo
                additional_field = fields.Field(column_name=field_name, attribute=field_name)
                self.fields[field_name] = additional_field

            else:
                # Para campos sin choices, simplemente usar el atributo
                setattr(self, f"dehydrate_{field.name}", 
                        lambda instance, field_name=field.name: getattr(instance, field_name))
                
                # Agregar el campo como un Field en el recurso, usando el nombre original del campo
                additional_field = fields.Field(column_name=field_name, attribute=field.name)
                self.fields[field_name] = additional_field
            
            additional_fields.append(field_name)

        # Actualizar el atributo fields de Meta con los nuevos campos dinámicos
        self._meta.fields += tuple(additional_fields)  # Agregar los campos dinámicos

        # Asegúrate de que los campos dinámicos se incluyan en la exportación
        self._meta.export_order += tuple(additional_fields)  # Agregar al orden de exportación

    def get_fields(self):
        # Obtiene los campos de la clase padre
        fields = super().get_fields()
        # Agrega los campos adicionales definidos
        for field_name in self._meta.fields:
            if field_name not in [f.column_name for f in fields]:
                fields.append(self.fields[field_name])
        return fields
