import { globalContainer } from "../../../global/inversify.container.mjs";
import { IMoulizationProperty } from "../interfaces.mjs";
import { Container } from "inversify";

export function Modulize(props:IMoulizationProperty) {
    return function (target: Function) {
        target.prototype.controllers = props.controllers
        const container = new Container();
        container.parent = globalContainer; // setting up the parent container <Global Container>
        [...(props.controllers || []),...(props.services || [])].forEach((target) => container.bind(target).toSelf().inSingletonScope())
        target.prototype.container = container
        target.prototype.getContainer = () => target.prototype.container
        target.prototype.prefix = props.prefix
    }
}
