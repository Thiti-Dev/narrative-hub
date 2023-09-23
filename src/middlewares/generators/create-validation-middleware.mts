import { plainToInstance } from "class-transformer"
import { validateSync } from "class-validator"
import { Context, Middleware, Next } from "koa"
import { TRegularClassType } from "../../core/modulization/interfaces.mjs"
import snakecaseKeys from 'snakecase-keys'

// need an implementation for nested validation
export function createValidationMiddleware(classBlueprint: TRegularClassType): Middleware{
    return async(ctx:Context,next:Next) => {
        const dto = plainToInstance(classBlueprint, ctx.request.body)
        const errors = validateSync(dto,{stopAtFirstError:true})
        if(!errors.length){
            ctx.request.dto = dto // persiting the transformed body to the dto in request context
            return await next()
        }
        const properErrorResponse = snakecaseKeys(errors.reduce((acc,error) => {
            const errorMessage = error.constraints ? error.constraints[Object.keys(error.constraints)[0]] : 'validate failed'
            return Object.assign(acc,{[error.property]: errorMessage.substring(error.property.length + 1)})
        },{}))
        ctx.status = 422 // Unprocessable Entity being used because it's easier to distinguish from the frontwork
        ctx.body = {
            ...snakecaseKeys(
                {errorCode:1,errorType:'validation_error'}
            ),
            errors:properErrorResponse
        }
    }
}