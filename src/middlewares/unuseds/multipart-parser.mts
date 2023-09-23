import type {Context,Next} from 'koa'
import { IncomingForm } from 'formidable';

// @NOTE specifically built to ignore all the file field, so the array build up from formData won't work here
// @IMP NO LONGER BE USING AS FORMIDDABLE DEFAULT STORING THE FILE INTO STORAGE AT FIRST <using multer instead>
export default () => {
    return async (ctx:Context, next:Next) => {
        if (!ctx.is('multipart/form-data')) {
            return await next();
        }
      

        let form = new IncomingForm();    
        await new Promise((resolve, reject) => {
            form.parse(ctx.req, function(err, fields, _files) {
                if (err) {
                    reject(err);
                return;
                }
                ctx.request.body = Object.keys(fields).reduce((acc,key) => {
                    return Object.assign(acc,{[key]: fields[key]![0]})
                },{});
                //ctx.request.files = files; // @NOTE omitting out because we are using the multer for this job
                resolve(true);
            });
        });
    
        return await next();
    }
}