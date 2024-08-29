from django.core.exceptions import ValidationError

def validator_cognitive_deficit(value):
    if value == 0:
        raise ValidationError('Por favor seleccione.')
    else:
        return value

def validator_document_number(value):    
    if value.isdigit():    
        if len(value) <5:
            raise ValidationError('Por favor verifique. El número de documento es muy corto.')
        elif len(value) > 15:
            raise ValidationError('Por favor verifique. El número de documento es muy largo.')
        else:
            return value
    else:
        raise ValidationError('Por favor ingrese un número de documento válido.')
    
def validator_document_type(value):
    if value == 0:
        raise ValidationError('Por favor seleccione el tipo de documento.')
    else:
        return value
    
def validator_phone_number(value):
    err = 'Por favor verifique el número telefónico.'
    if value.isdigit():    
        if len(value)>10 or len(value)<7:
            raise ValidationError(err)
    else:
        raise ValidationError('Por favor ingrese un número de teléfono válido.')

def validator_age(value):
    err = 'Por favor verifique la edad.'
    if value.isdigit():    
        if len(value)>2:
            raise ValidationError(err)
        else:
            return value
    else:
        raise ValidationError(err)

def validator_sex_type(value):
    if value == 0:
        raise ValidationError('Por favor seleccione el género.')
    else:
        return value
    
def validator_education_choices(value):
    if value == 0:
        raise ValidationError('Por favor seleccione su nivel de educación.')
    else:
        return value

def validator_satisfaction_scale(value):
    if value == 0:
        raise ValidationError('Por favor seleccione su escala de satisfacción.')
    else:
        return value

def validator_maritalStatus_choices(value):
    if value == 0:
        raise ValidationError('Por favor seleccione su estado civil.')
    else:
        return value
    
def validator_time_taken_to_complete(value):
    err = 'Por favor verifique el tiempo tomado.'
    if value.isdigit():    
        if len(value)>2:
            raise ValidationError(err)
        else:
            return value
    else:
        raise ValidationError(err)
        