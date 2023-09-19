export function createMouseEvent(eventName:string){
    return new MouseEvent(eventName, {
        bubbles: true,
        cancelable: true,
        view: window,
      });
}