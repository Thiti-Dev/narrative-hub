import { plainToInstance } from "class-transformer"
import { validateSync } from "class-validator"
import { Context, Middleware, Next } from "koa"
import { TRegularClassType } from "../../core/modulization/interfaces.mjs"

// need an implementation for nested validation
export function createValidationMiddleware(classBlueprint: TRegularClassType): Middleware{
    return async(ctx:Context,next:Next) => {
        const dto = plainToInstance(classBlueprint, ctx.request.body)
        const errors = validateSync(dto,{stopAtFirstError:true})
        if(!errors.length) return await next()
        
        const properErrorResponse = errors.reduce((acc,error) => {
            const errorMessage = error.constraints ? error.constraints[Object.keys(error.constraints)[0]] : 'validate failed'
            return Object.assign(acc,{[error.property]: errorMessage})
        },{})
        ctx.status = 422 // Unprocessable Entity being used because it's easier to distinguish from the frontwork
        ctx.body = properErrorResponse
    }
}