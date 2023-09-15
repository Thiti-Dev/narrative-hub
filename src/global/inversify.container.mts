import { Container } from "inversify";
import { MikroORM } from "../databases/mikrorm/instance.mjs";

const globalContainer = new Container()
globalContainer.bind<MikroORM>(MikroORM).toSelf().inSingletonScope();

export {
    globalContainer
}